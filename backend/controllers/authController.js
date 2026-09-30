const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ==================== REGISTER ====================

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      whatsapp,
      serviceType,
      bassniseName
    } = req.body;

    console.log("Register request:", {
      name,
      email,
      role,
      serviceType,
    });

    // =========================
    // التحقق من البيانات الأساسية
    // =========================
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "الاسم والبريد الإلكتروني وكلمة المرور مطلوبة",
      });
    }

    // =========================
    // تحديد نوع الحساب
    // =========================
    const accountRole = role || "visitor";

    // لا يمكن إنشاء حساب Admin من التسجيل العام
    if (accountRole === "admin") {
      return res.status(403).json({
        message: "لا يمكن إنشاء حساب إدارة من خلال التسجيل العام",
      });
    }

    // السماح فقط بالأنواع المعروفة
    if (!["visitor", "provider"].includes(accountRole)) {
      return res.status(400).json({
        message: "نوع الحساب غير صالح",
      });
    }

    // =========================
    // التحقق من بيانات مقدم الخدمة
    // =========================
    if (accountRole === "provider") {
      if (!phone || !serviceType) {
        return res.status(400).json({
          message: "رقم الهاتف ونوع الخدمة مطلوبان لمقدم الخدمة",
        });
      }
    }

    // =========================
    // التحقق من البريد
    // =========================
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "البريد الإلكتروني مستخدم بالفعل",
      });
    }

    // =========================
    // تشفير كلمة المرور
    // =========================
    const hashedPassword = await bcrypt.hash(password, 10);

    // =========================
const userData = {
  name: name.trim(),
  email: normalizedEmail,
  password: hashedPassword,
  role: accountRole,
  isApproved: accountRole === "visitor",
};


    // =========================
    // بيانات مقدم الخدمة فقط
    // =========================
    if (accountRole === "provider") {
      userData.phone = phone.trim();
      userData.whatsapp = whatsapp?.trim() || "";
      userData.serviceType = serviceType;
      userData.bassniseName=bassniseName
    }

    // =========================
    // إنشاء المستخدم
    // =========================
    const user = await User.create(userData);

    // =========================
    // الرد
    // =========================

    // حساب زائرة
    if (accountRole === "visitor") {
      return res.status(201).json({
        message: "تم إنشاء الحساب بنجاح",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isApproved: user.isApproved,
        },
      });
    }

    // حساب مقدم خدمة
    return res.status(201).json({
      message: "تم إنشاء الحساب بنجاح، بانتظار الموافقة",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        whatsapp: user.whatsapp,
        serviceType: user.serviceType,
        role: user.role,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "حدث خطأ أثناء إنشاء الحساب",
    });
  }
};



// ==================== LOGIN ====================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "البريد الإلكتروني وكلمة المرور مطلوبان",
      });
    }

    // Find user
const normalizedEmail = email.trim().toLowerCase();

const user = await User.findOne({
  email: normalizedEmail,
});
    if (!user) {
      return res.status(401).json({
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
    }

    // Check approval
    if (!user.isApproved && user.role==='provider') {
      return res.status(403).json({
        message: "حسابك بانتظار موافقة الإدارة",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "تم تسجيل الدخول بنجاح",
      token,
   user: {
  id: user._id,
  name: user.name,
  businessName: user.businessName,
  email: user.email,
  phone: user.phone,
  whatsapp: user.whatsapp,
  serviceType: user.serviceType,
  role: user.role,
  isApproved: user.isApproved,
},
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "حدث خطأ أثناء تسجيل الدخول",
    });
  }
};

module.exports = {
  register,
  login,
};