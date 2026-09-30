const mongoose = require("mongoose");

// =========================================================
// Reviews / Ratings
// =========================================================

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
      default: "",
    },

    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// =========================================================
// Business Profile
// =========================================================

const businessProfileSchema = new mongoose.Schema(
  {
    // =====================================================
    // Basic Information
    // =====================================================

    name: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    whatsapp: {
      type: String,
      trim: true,
      default: "",
    },

    governorate: {
      type: String,
      trim: true,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    // =====================================================
    // Service Type
    // =====================================================

    serviceType: {
      type: String,
      required: true,
      enum: [
        "hall",
        "beauty",
        "bridal-dress",
        "groom-suit",
        "photographer",
        "wedding-car",
      ],
      trim: true,
      
    },

    // =====================================================
    // Rating Summary
    // =====================================================

    ratingAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

// =========================================================
// Catalog Item
// =========================================================

const catalogItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
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

    price: {
      type: Number,
      default: 0,
    },

    priceType: {
      type: String,
      enum: [
        "fixed",
        "starting",
        "hourly",
        "daily",
        "contact",
      ],
      default: "fixed",
    },

    images: {
      type: [String],
      default: [],
    },

    // =====================================================
    // Service-specific Data
    // =====================================================
    // Examples:
    //
    // Bridal Dress:
    // {
    //   size: "M",
    //   color: "white",
    //   rental: true
    // }
    //
    // Car:
    // {
    //   model: "Mercedes",
    //   year: 2024,
    //   withDriver: true
    // }
    //
    // Hall:
    // {
    //   capacity: 500,
    //   indoor: true,
    //   outdoor: true
    // }
    // =====================================================

    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
features: {
  type: [String],
  default: [],
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

// =========================================================
// Package
// =========================================================

const packageSchema = new mongoose.Schema(
  {
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

    price: {
      type: Number,
      default: 0,
    },

    images: {
      type: [String],
      default: [],
    },

    // =====================================================
    // Services included in package
    // =====================================================

    services: {
      type: [String],
      default: [],
    },

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

// =========================================================
// Reel
// =========================================================

const reelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },

    videoUrl: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      trim: true,
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

// =========================================================
// Gallery Image
// =========================================================

const galleryImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },

    imageUrl: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      trim: true,
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

// =========================================================
// Business Schema
// =========================================================

const businessSchema = new mongoose.Schema(
  {
    // =====================================================
    // Owner
    // =====================================================

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // =====================================================
    // Business Profile
    // =====================================================

    businessProfile: {
      type: businessProfileSchema,
      default: () => ({}),
    },

    // =====================================================
    // Reviews
    // =====================================================

    reviews: {
      type: [reviewSchema],
      default: [],
    },

    // =====================================================
    // Catalog
    // =====================================================
    //
    // Products / items offered by the business.
    //
    // Examples:
    // - Bridal dresses
    // - Groom suits
    // - Wedding cars
    // - Wedding halls
    // =====================================================

    catalog: {
      type: [catalogItemSchema],
      default: [],
    },

    // =====================================================
    // Packages
    // =====================================================

    packages: {
      type: [packageSchema],
      default: [],
    },

    // =====================================================
    // Gallery
    // =====================================================

    gallery: {
      type: [galleryImageSchema],
      default: [],
    },

    // =====================================================
    // Reels
    // =====================================================

    reels: {
      type: [reelSchema],
      default: [],
    },
  },

  {
    timestamps: true,
  }
);

// =========================================================
// Export
// =========================================================

module.exports = mongoose.model(
  "Business",
  businessSchema
);