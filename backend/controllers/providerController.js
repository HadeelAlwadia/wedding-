const { default: mongoose } = require("mongoose");
const Business = require("../models/Business");
const User = require("../models/User");

const getBusinessProfile = async (req, res) => {
  try {
    const business = await Business.findOne({
      owner: req.user.id,
    }).select("businessName businessProfile serviceTypes");

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على بيانات النشاط",
      });
    }
    return res.status(200).json({
      success: true,
      businessName: business.businessName,
      businessProfile: business.businessProfile,
      serviceTypes: business.serviceTypes,
    });

  } catch (error) {
    console.error(
      "Get Business Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحميل بيانات النشاط",
    });
  }
};
const createBusiness = async (
  owner,
  businessName,
  serviceType
) => {
  try {
    const business = await Business.create({
      owner,

    

      businessProfile: {
        name: businessName,
      serviceType,
      },

      catalog: [],

      services: [],

      packages: [],

      reels: [],

    });

  } catch (error) {
    console.error(
      "Create Business Error:",
      error
    );

    throw error;
  }
};

const updateBusinessProfile = async (req, res) => {
  try {
    const { businessProfile } = req.body;

    if (!businessProfile) {
      return res.status(400).json({
        success: false,
        message: "بيانات النشاط مطلوبة",
      });
    }

    // البحث عن النشاط الخاص بمقدم الخدمة
    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على نشاط مقدم الخدمة",
      });
    }

    // تحديث بيانات Business Profile فقط
    business.businessProfile = {
      ...business.businessProfile?.toObject?.(),
      ...businessProfile,
    };

    await business.save();

    return res.status(200).json({
      success: true,
      message: "تم حفظ بيانات النشاط بنجاح",
      businessName: business.businessName,
      serviceType: business.serviceType,
      businessProfile: business.businessProfile,
    });
  } catch (error) {
    console.error("Update Business Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء حفظ بيانات النشاط",
    });
  }
};


const getProdviderDashboard = async (req, res) => {
  try {
    // ==========================================
    // Get provider
    // ==========================================

    const provider = await User.findById(req.user.id).select(
      "name businessName serviceType isApproved"
    );

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على مقدم الخدمة",
      });
    }

    // ==========================================
    // Get business
    // ==========================================

    const business = await Business.findOne({
      owner: req.user.id,
    }).select(
      "businessName serviceType businessProfile catalog services packages reels isPublished"
    );

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على نشاط مقدم الخدمة",
      });
    }

    // ==========================================
    // Business data
    // ==========================================

    const businessProfile = business.businessProfile || {};

    // ==========================================
    // Completion
    // ==========================================

    const completionItems = {
      profile: Boolean(
        businessProfile.name &&
        businessProfile.description &&
        businessProfile.address &&
        businessProfile.phone
      ),

      logo: Boolean(businessProfile.logo),

      services:
        business.services?.some(
          (service) => service.isActive !== false
        ) || false,

      packages:
        business.packages?.some(
          (item) => item.isActive !== false
        ) || false,

      gallery:
        business.catalog?.some(
          (item) =>
            item.images &&
            item.images.length > 0 &&
            item.isActive !== false
        ) || false,
    };

    const completedCount =
      Object.values(completionItems).filter(Boolean).length;

    const totalItems = Object.keys(completionItems).length;

    const completionPercentage = Math.round(
      (completedCount / totalItems) * 100
    );

    // ==========================================
    // Counts
    // ==========================================

    const servicesCount =
      business.services?.filter(
        (item) => item.isActive !== false
      ).length || 0;

    const packagesCount =
      business.packages?.filter(
        (item) => item.isActive !== false
      ).length || 0;

    const catalogCount =
      business.catalog?.filter(
        (item) => item.isActive !== false
      ).length || 0;

    const reelsCount =
      business.reels?.filter(
        (item) => item.isActive !== false
      ).length || 0;

    // ==========================================
    // Response
    // ==========================================

    return res.status(200).json({
      success: true,

      data: {
        business: {
          id: business._id,
          name:
            business.businessName ||
            businessProfile.name ||
            provider.businessName ||
            provider.name,

          serviceType: business.serviceType,

          logo: businessProfile.logo || "",

          isPublished: business.isPublished,

          isApproved: provider.isApproved,
        },

        stats: {
          services: servicesCount,
          packages: packagesCount,
          catalog: catalogCount,
          reels: reelsCount,

          // مؤقتًا إلى أن نضيف نظام الزيارات والحجوزات
          views: 0,
          bookings: 0,
          rating: 0,
          reviews: 0,
        },

        completion: {
          percentage: completionPercentage,

          items: completionItems,
        },

        counts: {
          services: servicesCount,
          packages: packagesCount,
          catalog: catalogCount,
          reels: reelsCount,
        },
      },
    });
  } catch (error) {
    console.error(
      "Get Provider Dashboard Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحميل لوحة التحكم",
    });
  }
};


// =========================================================
// Get Provider Packages
// =========================================================

const getPackages = async (req, res) => {
  try {
    const business = await Business.findOne({
      owner: req.user.id,
    }).select("packages");

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على ملف النشاط التجاري",
      });
    }

    res.status(200).json({
      success: true,
      packages: business.packages,
    });
  } catch (error) {
    console.error("Get Packages Error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب الباقات",
    });
  }
};

// =========================================================
// Create Package
// =========================================================

const createPackage = async (req, res) => {
  try {
    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على ملف النشاط التجاري",
      });
    }

    const {
      name,
      description,
      price,
      images,
      services,
      data,
      isActive,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "اسم الباقة مطلوب",
      });
    }

    business.packages.push({
      name: name.trim(),
      description: description || "",
      price: price || 0,
      images: images || [],
      services: services || [],
      data: data || {},
      isActive:
        typeof isActive === "boolean" ? isActive : true,
    });

    await business.save();

    const newPackage =
      business.packages[business.packages.length - 1];

    res.status(201).json({
      success: true,
      message: "تم إنشاء الباقة بنجاح",
      package: newPackage,
    });
  } catch (error) {
    console.error("Create Package Error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إنشاء الباقة",
    });
  }
};

// =========================================================
// Edit Package
// =========================================================

const editPackage = async (req, res) => {
  try {
    const { packageId } = req.params;

    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على ملف النشاط التجاري",
      });
    }

    const packageItem = business.packages.id(packageId);

    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: "الباقة غير موجودة",
      });
    }

    const {
      name,
      description,
      price,
      images,
      services,
      data,
      isActive,
    } = req.body;

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message: "اسم الباقة مطلوب",
        });
      }

      packageItem.name = name.trim();
    }

    if (description !== undefined) {
      packageItem.description = description;
    }

    if (price !== undefined) {
      packageItem.price = price;
    }

    if (images !== undefined) {
      packageItem.images = images;
    }

    if (services !== undefined) {
      packageItem.services = services;
    }

    if (data !== undefined) {
      packageItem.data = data;
    }

    if (isActive !== undefined) {
      packageItem.isActive = isActive;
    }

    await business.save();

    res.status(200).json({
      success: true,
      message: "تم تعديل الباقة بنجاح",
      package: packageItem,
    });
  } catch (error) {
    console.error("Edit Package Error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تعديل الباقة",
    });
  }
};

// =========================================================
// Delete Package
// =========================================================

const deletePackage = async (req, res) => {
  try {
    const { packageId } = req.params;

    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على ملف النشاط التجاري",
      });
    }

    const packageItem = business.packages.id(packageId);

    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: "الباقة غير موجودة",
      });
    }

    packageItem.deleteOne();

    await business.save();

    res.status(200).json({
      success: true,
      message: "تم حذف الباقة بنجاح",
    });
  } catch (error) {
    console.error("Delete Package Error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء حذف الباقة",
    });
  }
};



// =========================================================
// Get Reels
// =========================================================

const getReels = async (req, res) => {
  try {
    const business = await Business.findOne({
      owner: req.user.id,
    }).select("reels");

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على ملف النشاط التجاري",
      });
    }

    res.status(200).json({
      success: true,
      reels: business.reels,
    });
  } catch (error) {
    console.error("Get Reels Error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب الريلز",
    });
  }
};

// =========================================================
// Create Reel
// =========================================================

const createReel = async (req, res) => {
  try {
    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على ملف النشاط التجاري",
      });
    }

    const {
      title,
      videoUrl,
      thumbnail,
      description,
      isActive,
    } = req.body;

    if (!videoUrl || !videoUrl.trim()) {
      return res.status(400).json({
        success: false,
        message: "رابط الفيديو مطلوب",
      });
    }

    business.reels.push({
      title: title || "",
      videoUrl: videoUrl.trim(),
      thumbnail: thumbnail || "",
      description: description || "",
      isActive:
        typeof isActive === "boolean"
          ? isActive
          : true,
    });

    await business.save();

    const newReel =
      business.reels[business.reels.length - 1];

    res.status(201).json({
      success: true,
      message: "تم إضافة الريلز بنجاح",
      reel: newReel,
    });
  } catch (error) {
    console.error("Create Reel Error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إضافة الريلز",
    });
  }
};

// =========================================================
// Edit Reel
// =========================================================

const editReel = async (req, res) => {
  try {
    const { reelId } = req.params;

    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على ملف النشاط التجاري",
      });
    }

    const reel = business.reels.id(reelId);

    if (!reel) {
      return res.status(404).json({
        success: false,
        message: "الريلز غير موجود",
      });
    }

    const {
      title,
      videoUrl,
      thumbnail,
      description,
      isActive,
    } = req.body;

    if (title !== undefined) {
      reel.title = title;
    }

    if (videoUrl !== undefined) {
      if (!videoUrl.trim()) {
        return res.status(400).json({
          success: false,
          message: "رابط الفيديو مطلوب",
        });
      }

      reel.videoUrl = videoUrl.trim();
    }

    if (thumbnail !== undefined) {
      reel.thumbnail = thumbnail;
    }

    if (description !== undefined) {
      reel.description = description;
    }

    if (isActive !== undefined) {
      reel.isActive = isActive;
    }

    await business.save();

    res.status(200).json({
      success: true,
      message: "تم تعديل الريلز بنجاح",
      reel,
    });
  } catch (error) {
    console.error("Edit Reel Error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تعديل الريلز",
    });
  }
};

// =========================================================
// Delete Reel
// =========================================================

const deleteReel = async (req, res) => {
  try {
    const { reelId } = req.params;

    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على ملف النشاط التجاري",
      });
    }

    const reel = business.reels.id(reelId);

    if (!reel) {
      return res.status(404).json({
        success: false,
        message: "الريلز غير موجود",
      });
    }

    reel.deleteOne();

    await business.save();

    res.status(200).json({
      success: true,
      message: "تم حذف الريلز بنجاح",
    });
  } catch (error) {
    console.error("Delete Reel Error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء حذف الريلز",
    });
  }
};
// =========================================================
// Get Provider Gallery
// =========================================================

const getProviderGallery = async (req, res) => {
  try {
    const business = await Business.findOne({
      owner: req.user.id,
    }).select("gallery");

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على بيانات النشاط التجاري",
      });
    }

    return res.status(200).json({
      success: true,
      gallery: business.gallery || [],
    });
  } catch (error) {
    console.error("Get Provider Gallery Error:", error);

    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب معرض الصور",
    });
  }
};

// =========================================================
// Add Gallery Image
// =========================================================

const addGalleryImage = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      description,
    } = req.body;

    // -----------------------------------------
    // Validation
    // -----------------------------------------

    if (!imageUrl || !imageUrl.trim()) {
      return res.status(400).json({
        success: false,
        message: "رابط الصورة مطلوب",
      });
    }

    // -----------------------------------------
    // Get Provider Business
    // -----------------------------------------

    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على بيانات النشاط التجاري",
      });
    }

    // -----------------------------------------
    // Add Image
    // -----------------------------------------

    business.gallery.push({
      title: title?.trim() || "",
      imageUrl: imageUrl.trim(),
      description: description?.trim() || "",
      isActive: true,
    });

    // -----------------------------------------
    // Save To MongoDB
    // -----------------------------------------

    await business.save();

    // -----------------------------------------
    // Get Created Image
    // -----------------------------------------

    const createdImage =
      business.gallery[
        business.gallery.length - 1
      ];

    return res.status(201).json({
      success: true,
      message: "تمت إضافة الصورة بنجاح",
      image: createdImage,
    });
  } catch (error) {
    console.error("Add Gallery Image Error:", error);

    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إضافة الصورة",
    });
  }
};

// =========================================================
// Update Gallery Image
// =========================================================

const updateGalleryImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const {
      title,
      imageUrl,
      description,
      isActive,
    } = req.body;

    // -----------------------------------------
    // Get Business
    // -----------------------------------------

    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على بيانات النشاط التجاري",
      });
    }

    // -----------------------------------------
    // Find Image
    // -----------------------------------------

    const image =
      business.gallery.id(imageId);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "الصورة غير موجودة",
      });
    }

    // -----------------------------------------
    // Update Fields
    // -----------------------------------------

    if (title !== undefined) {
      image.title = title.trim();
    }

    if (description !== undefined) {
      image.description = description.trim();
    }

    if (
      imageUrl !== undefined &&
      imageUrl.trim()
    ) {
      image.imageUrl = imageUrl.trim();
    }

    if (isActive !== undefined) {
      image.isActive = isActive;
    }

    // -----------------------------------------
    // Save
    // -----------------------------------------

    await business.save();

    return res.status(200).json({
      success: true,
      message: "تم تحديث الصورة بنجاح",
      image,
    });
  } catch (error) {
    console.error(
      "Update Gallery Image Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحديث الصورة",
    });
  }
};

// =========================================================
// Delete Gallery Image
// =========================================================

const deleteGalleryImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    // -----------------------------------------
    // Get Business
    // -----------------------------------------

    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على بيانات النشاط التجاري",
      });
    }

    // -----------------------------------------
    // Find Image
    // -----------------------------------------

    const image =
      business.gallery.id(imageId);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "الصورة غير موجودة",
      });
    }

    // -----------------------------------------
    // Delete
    // -----------------------------------------

    image.deleteOne();

    await business.save();

    return res.status(200).json({
      success: true,
      message: "تم حذف الصورة بنجاح",
      imageId,
    });
  } catch (error) {
    console.error(
      "Delete Gallery Image Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء حذف الصورة",
    });
  }
};



// =========================================================
// Allowed Catalog Service Types
// =========================================================
//
// الصالات لا تستخدم Catalog.
//
// Catalog متاح لـ:
// - beauty
// - bridal-dresses
// - groom-suits
// - photographers
// - wedding-cars
//
// =========================================================

const CATALOG_SERVICE_TYPES = [
  "beauty",
  "bridal-dresses",
  "groom-suits",
  "photographers",
  "wedding-cars",
];

// =========================================================
// Helper: Get Current Business
// =========================================================

const getCurrentBusiness = async (userId) => {
  return Business.findOne({
    owner: userId,
  });
};

// =========================================================
// Helper: Check Catalog Availability
// =========================================================

const checkCatalogAvailability = (business) => {
  if (!business) {
    return {
      allowed: false,
      status: 404,
      message: "لم يتم العثور على النشاط التجاري",
    };
  }

  const serviceType =
    business.businessProfile?.serviceType;

  if (!serviceType) {
    return {
      allowed: false,
      status: 400,
      message: "نوع الخدمة غير محدد للنشاط التجاري",
    };
  }

  if (!CATALOG_SERVICE_TYPES.includes(serviceType)) {
    return {
      allowed: false,
      status: 403,
      message: "الكتالوج غير متاح لمقدم خدمة الصالات",
    };
  }

  return {
    allowed: true,
    serviceType,
  };
};

// =========================================================
// Get Catalog
// GET /api/provider/catalog
// =========================================================

const getCatalog = async (req, res) => {
  try {
    const business = await getCurrentBusiness(
      req.user._id
    );


    const availability =
      checkCatalogAvailability(business);

    if (!availability.allowed) {
      return res.status(availability.status).json({
        success: false,
        message: availability.message,
      });
    }


    res.status(200).json({
      success: true,

      serviceType:
        business.businessProfile.serviceType,

      count: business.catalog.length,

      items: business.catalog,
    });
  } catch (error) {
    console.error("Get catalog error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب الكتالوج",
    });
  }
};

// =========================================================
// Get Single Catalog Item
// GET /api/provider/catalog/:id
// =========================================================

const getCatalogItem = async (req, res) => {
  try {
    const { id } = req.params;

    // =======================================================
    // Validate ObjectId
    // =======================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "معرف العنصر غير صحيح",
      });
    }

    // =======================================================
    // Get Business
    // =======================================================

    const business = await getCurrentBusiness(
      req.user._id
    );

    const availability =
      checkCatalogAvailability(business);

    if (!availability.allowed) {
      return res.status(availability.status).json({
        success: false,
        message: availability.message,
      });
    }

    // =======================================================
    // Find Catalog Item
    // =======================================================

    const item = business.catalog.id(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "عنصر الكتالوج غير موجود",
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error(
      "Get catalog item error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب العنصر",
    });
  }
};

// =========================================================
// Create Catalog Item
// POST /api/provider/catalog
// =========================================================

const createCatalog = async (req, res) => {
  try {
    // =======================================================
    // Get Business
    // =======================================================

    const business = await getCurrentBusiness(
      req.user._id
    );

    const availability =
      checkCatalogAvailability(business);

    if (!availability.allowed) {
      return res.status(availability.status).json({
        success: false,
        message: availability.message,
      });
    }

    // =======================================================
    // Request Data
    // =======================================================

    const {
      type,
      name,
      description,
      price,
      priceType,
      images,
      data,
      isActive,
    } = req.body;

    // =======================================================
    // Validate Name
    // =======================================================

    if (
      !name ||
      typeof name !== "string" ||
      !name.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "اسم العنصر مطلوب",
      });
    }

    // =======================================================
    // Allowed Price Types
    // =======================================================

    const allowedPriceTypes = [
      "fixed",
      "starting",
      "hourly",
      "daily",
      "contact",
    ];

    const finalPriceType =
      priceType || "fixed";

    if (
      !allowedPriceTypes.includes(
        finalPriceType
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "نوع السعر غير صحيح",
      });
    }

    // =======================================================
    // Validate Price
    // =======================================================

    if (finalPriceType !== "contact") {
      if (
        price === undefined ||
        price === null ||
        price === "" ||
        Number.isNaN(Number(price)) ||
        Number(price) < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "يرجى إدخال سعر صحيح",
        });
      }
    }

    // =======================================================
    // Catalog Type
    // =======================================================
    //
    // النوع الحقيقي نأخذه من Business Profile.
    //
    // لا نعتمد على type المرسل من Frontend
    // حتى لا يستطيع Provider تغيير نوع الخدمة.
    //
    // =======================================================

    const finalType =
      business.businessProfile.serviceType;

    // =======================================================
    // Create Item
    // =======================================================

    const catalogItem = {
      type: finalType,

      name: name.trim(),

      description:
        typeof description === "string"
          ? description.trim()
          : "",

      price:
        finalPriceType === "contact"
          ? 0
          : Number(price),

      priceType: finalPriceType,

      images: Array.isArray(images)
        ? images.filter(
            (image) =>
              typeof image === "string" &&
              image.trim()
          )
        : [],

      data:
        data &&
        typeof data === "object" &&
        !Array.isArray(data)
          ? data
          : {},

      isActive:
        isActive !== undefined
          ? Boolean(isActive)
          : true,
    };

    // =======================================================
    // Add To Business Catalog
    // =======================================================

    business.catalog.push(catalogItem);

    await business.save();

    // =======================================================
    // Get Created Item
    // =======================================================

    const createdItem =
      business.catalog[
        business.catalog.length - 1
      ];

    res.status(201).json({
      success: true,
      message: "تمت إضافة العنصر بنجاح",
      item: createdItem,
    });
  } catch (error) {
    console.error(
      "Create catalog error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إضافة العنصر",
    });
  }
};

// =========================================================
// Update Catalog Item
// PUT /api/provider/catalog/:id
// =========================================================

const updateCatalog = async (req, res) => {
  try {
    const { id } = req.params;

    // =======================================================
    // Validate ID
    // =======================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "معرف العنصر غير صحيح",
      });
    }

    // =======================================================
    // Get Business
    // =======================================================

    const business = await getCurrentBusiness(
      req.user._id
    );

    const availability =
      checkCatalogAvailability(business);

    if (!availability.allowed) {
      return res.status(availability.status).json({
        success: false,
        message: availability.message,
      });
    }

    // =======================================================
    // Find Item
    // =======================================================

    const item = business.catalog.id(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "عنصر الكتالوج غير موجود",
      });
    }

    // =======================================================
    // Request Data
    // =======================================================

    const {
      name,
      description,
      price,
      priceType,
      images,
      data,
      isActive,
    } = req.body;

    // =======================================================
    // Name
    // =======================================================

    if (name !== undefined) {
      if (
        typeof name !== "string" ||
        !name.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "اسم العنصر مطلوب",
        });
      }

      item.name = name.trim();
    }

    // =======================================================
    // Description
    // =======================================================

    if (description !== undefined) {
      item.description =
        typeof description === "string"
          ? description.trim()
          : "";
    }

    // =======================================================
    // Price Type
    // =======================================================

    if (priceType !== undefined) {
      const allowedPriceTypes = [
        "fixed",
        "starting",
        "hourly",
        "daily",
        "contact",
      ];

      if (
        !allowedPriceTypes.includes(
          priceType
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "نوع السعر غير صحيح",
        });
      }

      item.priceType = priceType;
    }

    // =======================================================
    // Price
    // =======================================================

    if (item.priceType === "contact") {
      item.price = 0;
    } else if (price !== undefined) {
      if (
        price === "" ||
        price === null ||
        Number.isNaN(Number(price)) ||
        Number(price) < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "يرجى إدخال سعر صحيح",
        });
      }

      item.price = Number(price);
    }

    // =======================================================
    // Images
    // =======================================================

    if (images !== undefined) {
      if (!Array.isArray(images)) {
        return res.status(400).json({
          success: false,
          message: "الصور يجب أن تكون قائمة",
        });
      }

      item.images = images.filter(
        (image) =>
          typeof image === "string" &&
          image.trim()
      );
    }

    // =======================================================
    // Data
    // =======================================================

    if (data !== undefined) {
      if (
        typeof data !== "object" ||
        Array.isArray(data) ||
        data === null
      ) {
        return res.status(400).json({
          success: false,
          message: "بيانات العنصر غير صحيحة",
        });
      }

      item.data = data;
    }

    // =======================================================
    // Active
    // =======================================================

    if (isActive !== undefined) {
      item.isActive = Boolean(isActive);
    }

    // =======================================================
    // Keep Type Controlled By Business
    // =======================================================

    item.type =
      business.businessProfile.serviceType;

    // =======================================================
    // Save
    // =======================================================

    await business.save();

    res.status(200).json({
      success: true,
      message: "تم تحديث العنصر بنجاح",
      item,
    });
  } catch (error) {
    console.error(
      "Update catalog error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحديث العنصر",
    });
  }
};

// =========================================================
// Delete Catalog Item
// DELETE /api/provider/catalog/:id
// =========================================================

const deleteCatalog = async (req, res) => {
  try {
    const { id } = req.params;

    // =======================================================
    // Validate ID
    // =======================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "معرف العنصر غير صحيح",
      });
    }

    // =======================================================
    // Get Business
    // =======================================================

    const business = await getCurrentBusiness(
      req.user._id
    );

    const availability =
      checkCatalogAvailability(business);

    if (!availability.allowed) {
      return res.status(availability.status).json({
        success: false,
        message: availability.message,
      });
    }

    // =======================================================
    // Find Item
    // =======================================================

    const item = business.catalog.id(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "عنصر الكتالوج غير موجود",
      });
    }

    // =======================================================
    // Delete
    // =======================================================

    item.deleteOne();

    await business.save();

    res.status(200).json({
      success: true,
      message: "تم حذف العنصر بنجاح",
      itemId: id,
    });
  } catch (error) {
    console.error(
      "Delete catalog error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء حذف العنصر",
    });
  }
};

// =========================================================
// Toggle Catalog Item Status
// PATCH /api/provider/catalog/:id/toggle
// =========================================================

const toggleCatalogStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // =======================================================
    // Validate ID
    // =======================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "معرف العنصر غير صحيح",
      });
    }

    // =======================================================
    // Get Business
    // =======================================================

    const business = await getCurrentBusiness(
      req.user._id
    );

    const availability =
      checkCatalogAvailability(business);

    if (!availability.allowed) {
      return res.status(availability.status).json({
        success: false,
        message: availability.message,
      });
    }

    // =======================================================
    // Find Item
    // =======================================================

    const item = business.catalog.id(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "عنصر الكتالوج غير موجود",
      });
    }

    // =======================================================
    // Toggle
    // =======================================================

    item.isActive = !item.isActive;

    await business.save();

    res.status(200).json({
      success: true,

      message: item.isActive
        ? "تم تفعيل العنصر بنجاح"
        : "تم إيقاف العنصر بنجاح",

      item,
    });
  } catch (error) {
    console.error(
      "Toggle catalog status error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "حدث خطأ أثناء تغيير حالة العنصر",
    });
  }
};



// =========================================================
// Provider Dashboard
// =========================================================

const getProviderDashboard =
 async (req, res) => {
  try {
    const userId = req.user._id;

    // =======================================================
    // Get Business
    // =======================================================

    const business = await Business.findOne({
      owner: userId,
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "لم يتم العثور على النشاط التجاري",
      });
    }

    // =======================================================
    // Business Profile
    // =======================================================

    const profile = business.businessProfile || {};

    // =======================================================
    // Statistics
    // =======================================================

    const packagesCount =
      business.packages?.length || 0;

    const galleryCount =
      business.gallery?.length || 0;

    const reelsCount =
      business.reels?.length || 0;

    // =======================================================
    // Recent Packages
    // آخر 4 باقات
    // =======================================================

    const recentPackages = (business.packages || [])
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 4);

    // =======================================================
    // Dashboard Response
    // =======================================================

    return res.status(200).json({
      success: true,

      data: {
        // =====================================================
        // Business Profile
        // =====================================================

        businessProfile: {
          name: profile.name || "",

          description:
            profile.description || "",

          address:
            profile.address || "",

          phone:
            profile.phone || "",

          whatsapp:
            profile.whatsapp || "",

          governorate:
            profile.governorate || "",

          logo:
            profile.logo || "",

          serviceType:
            profile.serviceType || "",

          ratingAverage:
            profile.ratingAverage || 0,

          ratingCount:
            profile.ratingCount || 0,
        },

        // =====================================================
        // Statistics
        // =====================================================

        stats: {
          packages: packagesCount,

          gallery: galleryCount,

          reels: reelsCount,

          rating:
            profile.ratingAverage || 0,

          reviews:
            profile.ratingCount || 0,
        },

        // =====================================================
        // Recent Packages
        // =====================================================

        recentPackages,

        // =====================================================
        // Approval
        // =====================================================

        isApproved:
          req.user.isApproved || false,
      },
    });
  } catch (error) {
    console.error(
      "Get provider dashboard error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحميل لوحة التحكم",
    });
  }
};


module.exports = {
  getProviderDashboard,
};

module.exports = {
  getBusinessProfile,
  createBusiness,
  updateBusinessProfile,
  getProdviderDashboard,
  createPackage, editPackage, deletePackage, getPackages, getReels, editReel, createReel, deleteReel,
  getProviderGallery,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
    getCatalog,
  getCatalogItem,
  createCatalog,
  updateCatalog,
  deleteCatalog,
  toggleCatalogStatus,
  getProviderDashboard
};