
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      trim: true,
      default: "",
    },

    price: {
      type: Number,
      min: 0,
      default: 0,
    },

    duration: {
      type: String,
      trim: true,
      default: "",
    },

    serviceType: {
      type: String,
      enum: [
        "hall",
        "beauty",
        "bridal-dresses",
        "groom-suits",
        "photographers",
        "wedding-cars",
      ],
      required: true,
    },

    image: {
      type: String,
      default: "",
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

module.exports = mongoose.model("Service", serviceSchema);

