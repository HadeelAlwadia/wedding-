const User = require("../models/User");
const { createBusiness } = require("./providerController");

// ========================================
// Get pending provider requests
// ========================================
const getPendingRequests = async (req, res) => {
  try {
    const requests = await User.find({
      role: "provider",
      isApproved: false,
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error("Get pending requests error:", error);

    res.status(500).json({
      message: "حدث خطأ أثناء جلب طلبات التسجيل",
    });
  }
};

// ========================================
// Approve provider
// ========================================
const approveProvider = async (req, res) => {
  try {
    // ========================================
    // Find Provider
    // ========================================

    const provider = await User.findOne({
      _id: req.params.id,
      role: "provider",
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على مقدم الخدمة",
      });
    }

    // ========================================
    // Check if already approved
    // ========================================

    if (provider.isApproved) {
      return res.status(400).json({
        success: false,
        message: "هذا الحساب معتمد مسبقًا",
      });
    }

    // ========================================
    // Approve Provider
    // ========================================

    provider.isApproved = true;

    await provider.save();

    // ========================================
    // Create Business
    // ========================================

    const {
      businessName,
      serviceType,id
    } = provider;


  createBusiness(id,
  businessName,
  serviceType)
    // ========================================
    // Remove password from response
    // ========================================

    const providerResponse = provider.toObject();

    delete providerResponse.password;

    // ========================================
    // Response
    // ========================================

    return res.status(200).json({
      success: true,
      message: "تم اعتماد الحساب وإنشاء النشاط بنجاح",
      provider: providerResponse,

    });

  } catch (error) {
    console.error(
      "Approve provider error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء اعتماد الحساب",
    });
  }
};


// ========================================
// Reject provider
// ========================================
const rejectProvider = async (req, res) => {
  try {
    const provider = await User.findOneAndDelete({
      _id: req.params.id,
      role: "provider",
      isApproved: false,
    });

    if (!provider) {
      return res.status(404).json({
        message: "لم يتم العثور على طلب التسجيل",
      });
    }

    res.status(200).json({
      message: "تم رفض طلب التسجيل",
    });
  } catch (error) {
    console.error("Reject provider error:", error);

    res.status(500).json({
      message: "حدث خطأ أثناء رفض الطلب",
    });
  }
};

// ========================================
// Get admin stats
// ========================================
const getAdminStats = async (req, res) => {
  try {
    const pending = await User.countDocuments({
      role: "provider",
      isApproved: false,
    });

    const approved = await User.countDocuments({
      role: "provider",
      isApproved: true,
    });

    const totalProviders = await User.countDocuments({
      role: "provider",
    });

    res.status(200).json({
      pending,
      approved,
      totalProviders,
    });
  } catch (error) {
    console.error("Get admin stats error:", error);

    res.status(500).json({
      message: "حدث خطأ أثناء جلب إحصائيات الإدارة",
    });
  }
};

// ========================================
// Get approved providers
// ========================================
const getProviders = async (req, res) => {
  try {
    const providers = await User.find({
      role: "provider",
      isApproved: true,
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(providers);
  } catch (error) {
    console.error("Get providers error:", error);

    res.status(500).json({
      message: "حدث خطأ أثناء جلب مقدمي الخدمات",
    });
  }
};

// ========================================
// Get admin staff
// ========================================
const getAdminStaff = async (req, res) => {
  try {
    const staff = await User.find({
      role: "admin",
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(staff);
  } catch (error) {
    console.error("Get admin staff error:", error);

    res.status(500).json({
      message: "حدث خطأ أثناء جلب أعضاء الإدارة",
    });
  }
};

// ========================================
// Create admin staff
// ========================================
const createAdminStaff = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "الاسم والبريد الإلكتروني وكلمة المرور مطلوبة",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "البريد الإلكتروني مستخدم بالفعل",
      });
    }

    const staff = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      role: "admin",
      isApproved: true,
    });

    const staffResponse = staff.toObject();
    delete staffResponse.password;

    res.status(201).json({
      message: "تم إنشاء عضو الإدارة بنجاح",
      staff: staffResponse,
    });
  } catch (error) {
    console.error("Create admin staff error:", error);

    res.status(500).json({
      message: "حدث خطأ أثناء إنشاء عضو الإدارة",
    });
  }
};

module.exports = {
  getPendingRequests,
  approveProvider,
  rejectProvider,
  getAdminStats,
  getProviders,
  getAdminStaff,
  createAdminStaff,
};