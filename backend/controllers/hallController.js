const Business = require("../models/Business");
const Hall = require("../models/Hall");

// =====================================================
// Get all published halls
// =====================================================


const getHalls = async (req, res) => {
  try {
    const halls = await Business.find({
      serviceType: "hall",
    })
      .populate("businessProfile")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: halls.length,
      halls,
    });
  } catch (error) {
    console.error("Get halls error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب الصالات",
    });
  }
};

module.exports = {
  getHalls,
};
// =====================================================
// Get single published hall
// =====================================================

const getHallById = async (req, res) => {
  try {
    const hall = await Hall.findOne({
      _id: req.params.id,
      isPublished: true,
    }).populate(
      "provider",
      "name email phone whatsapp"
    );

    if (!hall) {
      return res.status(404).json({
        success: false,
        message: "الصالة غير موجودة",
      });
    }

    res.status(200).json({
      success: true,
      hall,
    });
  } catch (error) {
    console.error("Get hall by id error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب بيانات الصالة",
    });
  }
};

// =====================================================
// Create hall
// =====================================================

const createHall = async (req, res) => {
  try {
    const {
      name,
      location,
      description,
      phone,
      whatsapp,
      instagram,
      facebook,
      capacity,
      startingPrice,
      images,
      reels,
      services,
      packages,
      conditions,
    } = req.body;

    // ================================================
    // Validation
    // ================================================

    if (
      !name ||
      !location ||
      !description ||
      !phone ||
      capacity === undefined ||
      startingPrice === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "يرجى تعبئة جميع الحقول المطلوبة",
      });
    }

    // ================================================
    // Create
    // ================================================

    const hall = await Hall.create({
      provider: req.user._id,

      name,
      category: "hall",
      location,
      description,

      phone,
      whatsapp,
      instagram,
      facebook,

      capacity,
      startingPrice,

      images: Array.isArray(images) ? images : [],
      reels: Array.isArray(reels) ? reels : [],
      services: Array.isArray(services) ? services : [],
      packages: Array.isArray(packages) ? packages : [],
      conditions: Array.isArray(conditions)
        ? conditions
        : [],
    });

    res.status(201).json({
      success: true,
      message: "تم إنشاء الصالة بنجاح",
      hall,
    });
  } catch (error) {
    console.error("Create hall error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إنشاء الصالة",
    });
  }
};

// =====================================================
// Update hall
// =====================================================

const updateHall = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);

    if (!hall) {
      return res.status(404).json({
        success: false,
        message: "الصالة غير موجودة",
      });
    }

    // ================================================
    // Ownership
    // ================================================

    if (
      hall.provider.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "غير مصرح لك بتعديل هذه الصالة",
      });
    }

    const updatedHall =
      await Hall.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "تم تحديث بيانات الصالة بنجاح",
      hall: updatedHall,
    });
  } catch (error) {
    console.error("Update hall error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحديث الصالة",
    });
  }
};

// =====================================================
// Delete hall
// =====================================================

const deleteHall = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);

    if (!hall) {
      return res.status(404).json({
        success: false,
        message: "الصالة غير موجودة",
      });
    }

    // ================================================
    // Ownership
    // ================================================

    if (
      hall.provider.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "غير مصرح لك بحذف هذه الصالة",
      });
    }

    await hall.deleteOne();

    res.status(200).json({
      success: true,
      message: "تم حذف الصالة بنجاح",
    });
  } catch (error) {
    console.error("Delete hall error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء حذف الصالة",
    });
  }
};
// =====================================================
// Get halls of logged-in provider
// =====================================================
const getMyHalls = async (req, res) => {
  try {
    const halls = await Hall.find({
      provider: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: halls.length,
      halls,
    });
  } catch (error) {
    console.error("Get my halls error:", error);

    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب صالاتك",
    });
  }
};

// =====================================================
// Exports
// =====================================================

module.exports = {
  getMyHalls,
  getHalls,
  getHallById,
  createHall,
  updateHall,
  deleteHall,
};