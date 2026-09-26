const Business = require("../models/Business");

// ==================== CREATE BUSINESS ====================

const createBusiness = async (req, res) => {
  try {
    const {
      businessName,
      description,
      logo,
      coverImage,
      address,
      city,
      location,
      services,
    } = req.body;

    if (!businessName) {
      return res.status(400).json({
        message: "اسم النشاط مطلوب",
      });
    }

    const existingBusiness = await Business.findOne({
      owner: req.user._id,
    });

    if (existingBusiness) {
      return res.status(400).json({
        message: "لديك نشاط تجاري بالفعل",
      });
    }

    const business = await Business.create({
      owner: req.user._id,
      businessName,
      description,
      logo,
      coverImage,
      address,
      city,
      location,
      services,
    });

    res.status(201).json({
      message: "تم إنشاء النشاط بنجاح",
      business,
    });
  } catch (error) {
    console.error("Create business error:", error);

    res.status(500).json({
      message: "حدث خطأ أثناء إنشاء النشاط",
    });
  }
};

// ==================== GET MY BUSINESS ====================

const getMyBusiness = async (req, res) => {
  try {
    const business = await Business.findOne({
      owner: req.user._id,
    }).populate(
      "owner",
      "name email phone whatsapp serviceType"
    );

    if (!business) {
      return res.status(404).json({
        message: "لم يتم إنشاء نشاطك بعد",
      });
    }

    res.status(200).json({
      business,
    });
  } catch (error) {
    console.error("Get business error:", error);

    res.status(500).json({
      message: "حدث خطأ أثناء جلب بيانات النشاط",
    });
  }
};

// ==================== UPDATE MY BUSINESS ====================

const updateMyBusiness = async (req, res) => {
  try {
    const business = await Business.findOne({
      owner: req.user._id,
    });

    if (!business) {
      return res.status(404).json({
        message: "النشاط غير موجود",
      });
    }

    const {
      businessName,
      description,
      logo,
      coverImage,
      address,
      city,
      location,
      services,
      isPublished,
    } = req.body;

    business.businessName =
      businessName ?? business.businessName;

    business.description =
      description ?? business.description;

    business.logo =
      logo ?? business.logo;

    business.coverImage =
      coverImage ?? business.coverImage;

    business.address =
      address ?? business.address;

    business.city =
      city ?? business.city;

    business.location =
      location ?? business.location;

    business.services =
      services ?? business.services;

    business.isPublished =
      isPublished ?? business.isPublished;

    await business.save();

    res.status(200).json({
      message: "تم تحديث النشاط بنجاح",
      business,
    });
  } catch (error) {
    console.error("Update business error:", error);

    res.status(500).json({
      message: "حدث خطأ أثناء تحديث النشاط",
    });
  }
};


module.exports = {
  createBusiness,
  getMyBusiness,
  updateMyBusiness,
};