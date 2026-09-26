const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      default: "",
    },

    features: [
      {
        type: String,
        trim: true,
      },
    ],

    /*
      العناصر الموجودة داخل الباقة
    */
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CatalogItem",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Package", packageSchema);