const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema(
  {
    // ==========================================
    // Provider
    // ==========================================
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ==========================================
    // Basic Information
    // ==========================================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "hall",
      enum: ["hall"],
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // Contact
    // ==========================================
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    whatsapp: {
      type: String,
      trim: true,
    },

    instagram: {
      type: String,
      trim: true,
    },

    facebook: {
      type: String,
      trim: true,
    },

    // ==========================================
    // Hall Information
    // ==========================================
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    startingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // ==========================================
    // Media
    // ==========================================
    images: [
      {
        type: String,
      },
    ],

reels: [
  {
    title: {
      type: String,
      trim: true,
    },

    video: {
      type: String,
      trim: true,
      required: true,
    },

    thumbnail: {
      type: String,
      trim: true,
    },
  },
],
    // ==========================================
    // Services
    // ==========================================
    services: [
      {
        type: String,
        trim: true,
      },
    ],

    // ==========================================
    // Packages
    // ==========================================
    packages: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },

        description: {
          type: String,
          trim: true,
        },

        services: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],

    // ==========================================
    // Conditions
    // ==========================================
    conditions: [
      {
        type: String,
        trim: true,
      },
    ],

    // ==========================================
    // Publishing
    // ==========================================
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hall", hallSchema);