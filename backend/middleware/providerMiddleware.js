const providerMiddleware = (req, res, next) => {
  try {
    // التأكد أن authMiddleware اشتغل أولًا
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "غير مصرح لك بالدخول",
      });
    }

    // التأكد أن المستخدم مقدم خدمة
    if (req.user.role !== "provider") {
      return res.status(403).json({
        success: false,
        message: "هذا القسم مخصص لمقدمي الخدمات فقط",
      });
    }

    // التأكد أن حساب مقدم الخدمة تمت الموافقة عليه
    if (!req.user.isApproved) {
      return res.status(403).json({
        success: false,
        message: "حسابك بانتظار موافقة الإدارة",
      });
    }

    // السماح بالانتقال للـ Controller
    next();
  } catch (error) {
    console.error("Provider Middleware Error:", error);

    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء التحقق من صلاحيات مقدم الخدمة",
    });
  }
};

module.exports = providerMiddleware;