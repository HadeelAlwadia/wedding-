const express = require("express");

const {
  getBusinessesByServiceType,
  getBusinessById,
  getCatalogByServiceType,
  getSpecificCatalogItem,
} = require("../controllers/businessController");

const router = express.Router();

// =========================================================
// Get all businesses by service type
// =========================================================

router.get("/", getBusinessesByServiceType);

// =========================================================
// Get ALL catalog items from ALL businesses by service type
// IMPORTANT: must be before /:id
// =========================================================

router.get("/catalog", getCatalogByServiceType);

// =========================================================
// Get one business
// =========================================================

router.get("/:id", getBusinessById);
router.get("/catalog/:id", getSpecificCatalogItem);

module.exports = router;