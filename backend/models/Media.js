const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CatalogItem",
      default: null,
    },

    type: {
      type: String,
      required: true,

      enum: [
        "image",
        "reel",
      ],
    },

    url: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
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

module.exports = mongoose.model("Media", mediaSchema);