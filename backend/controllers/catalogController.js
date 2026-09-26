const mongoose = require("mongoose");
const Business = require("../models/Business");

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
// Export
// =========================================================

module.exports = {
  getCatalog,
  getCatalogItem,
  createCatalog,
  updateCatalog,
  deleteCatalog,
  toggleCatalogStatus,
};