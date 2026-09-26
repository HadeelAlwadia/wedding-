const mongoose = require("mongoose");

// =========================================================
// Catalog Schema
// =========================================================

const catalogSchema = new mongoose.Schema(
  {
    // =======================================================
    // Business Owner
    // =======================================================
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    // =======================================================
    // Service Name
    // مثال:
    // قاعة كبار الشخصيات
    // باقة مكياج العروس
    // تصوير حفلات
    // =======================================================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // =======================================================
    // Description
    // =======================================================
    description: {
      type: String,
      trim: true,
      default: "",
    },

    // =======================================================
    // Price
    // =======================================================
    price: {
      type: Number,
      default: null,
      min: 0,
    },

    // =======================================================
    // Price Type
    // =======================================================
    priceType: {
      type: String,
      enum: ["fixed", "starting-from", "contact"],
      default: "fixed",
    },

    // =======================================================
    // Images
    // =======================================================
    images: {
      type: [String],
      default: [],
    },

    // =======================================================
    // Features
    // =======================================================
    features: {
      type: [String],
      default: [],
    },

    // =======================================================
    // Extra Data
    // تختلف حسب نوع الـ Business
    //
    // Hall:
    // {
    //   capacity: 500,
    //   parking: true,
    //   bridalRoom: true
    // }
    //
    // Beauty:
    // {
    //   duration: 180,
    //   homeService: true
    // }
    // =======================================================
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // =======================================================
    // Active / Inactive
    // =======================================================
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// =========================================================
// Index
// =========================================================

catalogSchema.index({
  business: 1,
  createdAt: -1,
});

module.exports = mongoose.model("Catalog", catalogSchema);   