const SERVICE_TYPES = {
  HALL: "hall",
  BEAUTY: "beauty",
  BRIDAL_DRESSES: "bridal-dresses",
  GROOM_SUITS: "groom-suits",
  PHOTOGRAPHERS: "photographers",
  WEDDING_CARS: "wedding-cars",
};

const SERVICE_TYPE_CONFIG = {
  hall: {
    label: "صالات الأفراح",
    catalogTypes: ["hall"],
    features: [
      "capacity",
      "parking",
      "bridalRoom",
      "indoor",
      "outdoor",
      "catering",
    ],
  },

  beauty: {
    label: "الكوافيرات",
    catalogTypes: ["beauty-service"],
    features: [
      "bridal",
      "hair",
      "makeup",
      "nails",
      "homeService",
    ],
  },

  "bridal-dresses": {
    label: "فساتين العرائس",
    catalogTypes: ["dress"],
    features: [
      "sizes",
      "colors",
      "rental",
      "sale",
      "customDesign",
      "alterations",
    ],
  },

  "groom-suits": {
    label: "بدلات العرسان",
    catalogTypes: ["suit"],
    features: [
      "sizes",
      "colors",
      "rental",
      "sale",
      "customDesign",
      "alterations",
    ],
  },

  photographers: {
    label: "المصورين",
    catalogTypes: ["photography-service"],
    features: [
      "photography",
      "videography",
      "drone",
      "album",
      "cinematic",
    ],
  },

  "wedding-cars": {
    label: "سيارات الزفاف",
    catalogTypes: ["car"],
    features: [
      "model",
      "year",
      "withDriver",
      "decoration",
      "hourlyRental",
    ],
  },
};

module.exports = {
  SERVICE_TYPES,
  SERVICE_TYPE_CONFIG,
};