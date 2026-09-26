const express = require("express");

const router = express.Router();

const {
  getCatalog,
  createCatalog,
  updateCatalog,
  deleteCatalog,
} = require("../controllers/catalogController");

const protect  = require("../middleware/authMiddleware");

// =========================================================
// Catalog
// =========================================================

router.get("/", protect, getCatalog);

router.post("/", protect, createCatalog);

router.put("/:id", protect, updateCatalog);

router.delete("/:id", protect, deleteCatalog);

module.exports = router;