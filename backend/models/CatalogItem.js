const mongoose = require("mongoose");

const catalogItemSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    type: {
      type: String,
      required: true,

      enum: [
        "dress",
        "car",
        "suit",
        "hall",
        "beauty-service",
        "photography-service",
      ],
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
      default: 0,
      min: 0,
    },

    priceType: {
      type: String,

      enum: [
        "fixed",
        "starting-from",
        "contact",
      ],

      default: "fixed",
    },

    images: [
      {
        type: String,
      },
    ],

    features: [
      {
        type: String,
        trim: true,
      },
    ],

    /*
      هذا الجزء يحتوي المعلومات
      الخاصة بنوع العنصر نفسه.

      Dress:
      {
        sizes: [],
        colors: [],
        rental: true
      }

      Car:
      {
        model: "",
        year: 2025,
        withDriver: true
      }
    */
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CatalogItem",
  catalogItemSchema
);