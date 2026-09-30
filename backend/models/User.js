const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

role: {
  type: String,
  enum: ["visitor", "provider", "admin"],
  default: "visitor",
},
    phone: {
      type: String,
      required: false,
      trim: true,
    },

    whatsapp: {
      type: String,
      trim: true,
    },

serviceType: {
  type: String,
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
        // اسم النشاط التجاري
    businessName: {
      type: String,
      trim: true,
      default: "",
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);