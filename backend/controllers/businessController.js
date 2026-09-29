const Business = require("../models/Business");

// =========================================================
// Get Businesses By Service Type
// =========================================================

const getBusinessesByServiceType = async (req, res) => {
  try {
    const { serviceType } = req.query;

    if (!serviceType) {
      return res.status(400).json({
        success: false,
        message: "serviceType is required",
      });
    }

    const businesses = await Business.find({
      "businessProfile.serviceType": serviceType,
    })
      .select(
        "businessProfile catalog packages gallery reels"
      )
      .lean();

    res.status(200).json({
      success: true,
      count: businesses.length,
      businesses,
    });
  } catch (error) {
    console.error(
      "getBusinessesByServiceType:",
      error
    );

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب مقدمي الخدمات",
    });
  }
};

// =========================================================
// Get ALL Catalog By Service Type
// =========================================================

const getCatalogByServiceType = async (req, res) => {
  try {
    const { serviceType } = req.query;

    if (!serviceType) {
      return res.status(400).json({
        success: false,
        message: "serviceType is required",
      });
    }

    const businesses = await Business.find({
      "businessProfile.serviceType": serviceType,
    }).select(
      "businessProfile catalog"
    );

    const catalog = businesses.flatMap((business) => {
      const profile = business.businessProfile || {};

      return (business.catalog || []).map((item) => ({
        _id: item._id,
        type: item.type,
        name: item.name,
        description: item.description,
        price: item.price,
        priceType: item.priceType,
        images: item.images || [],
        data: item.data || {},
        features: item.features || [],
        isActive: item.isActive,

        // Business information
        businessId: business._id,
        businessName: profile.name || "",
        serviceType: profile.serviceType || "",
        businessLogo: profile.logo || "",
        businessAddress:
          profile.address ||
          profile.governorate ||
          "",
        businessRating:
          profile.ratingAverage || 0,
        businessRatingCount:
          profile.ratingCount || 0,
      }));
    });

    res.status(200).json({
      success: true,
      count: catalog.length,
      catalog,
    });
  } catch (error) {
    console.error(
      "getCatalogByServiceType:",
      error
    );

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب الكتالوج",
    });
  }
};

// =========================================================
// Get ALL Catalog By Service Type
// =========================================================

const getSpecificCatalogItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceType } = req.query;
    if (!serviceType) {
      return res.status(400).json({
        success: false,
        message: "serviceType is required",
      });
    }

    const business = await Business.findOne({
      "businessProfile.serviceType": serviceType,
    })
      .select("businessProfile catalog")
      .lean();
  console.log(business)
    if (!business) {
      return res.status(404).json({
        success: false,
        message: "عنصر الكتالوج غير موجود",
      });
    }

    const item = business.catalog.find(
      (catalogItem) => catalogItem._id.toString() === id
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "عنصر الكتالوج غير موجود",
      });
    }

    const profile = business.businessProfile || {};

    res.status(200).json({
      success: true,
      item: {
        _id: item._id,
        type: item.type,
        name: item.name,
        description: item.description,
        price: item.price,
        priceType: item.priceType,
        images: item.images || [],
        data: item.data || {},
        features: item.features || [],
        isActive: item.isActive,

        businessId: business._id,
        businessName: profile.name || "",
        serviceType: profile.serviceType || "",
        businessLogo: profile.logo || "",
        businessAddress:
          profile.address || profile.governorate || "",
        businessPhone: profile.phone || "",
        businessWhatsapp: profile.whatsapp || "",
        businessRating: profile.ratingAverage || 0,
        businessRatingCount: profile.ratingCount || 0,
      },
    });
  } catch (error) {
    console.error("getSpecificCatalogItem:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب عنصر الكتالوج",
    });
  }
};
// =========================================================
// Get Business By ID
// =========================================================

const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await Business.findById(id)
      .populate(
        "owner",
        "name email phone"
      )
      .populate(
        "reviews.user",
        "name"
      )
      .lean();

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "مقدم الخدمة غير موجود",
      });
    }

    res.status(200).json({
      success: true,
      business,
    });
  } catch (error) {
    console.error(
      "getBusinessById:",
      error
    );

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب بيانات مقدم الخدمة",
    });
  }
};

module.exports = {
  getBusinessesByServiceType,
  getCatalogByServiceType,
  getBusinessById,getSpecificCatalogItem
};