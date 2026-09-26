const express = require("express");

const {
  getHalls,
  getHallById,
  createHall,
  updateHall,
  deleteHall,getMyHalls
} = require("../controllers/hallController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// Public Routes
// =====================================================

// Get all published halls
router.get("/", getHalls);

// Get single published hall
router.get("/:id", getHallById);

// =====================================================
// Provider Routes
// =====================================================

// Create hall
router.post("/", protect, createHall);
router.post("/", protect, createHall);
// Get logged-in provider halls
router.get("/my-halls", protect, getMyHalls);



// Update hall
router.put("/:id", protect, updateHall);

// Delete hall
router.delete("/:id", protect, deleteHall);

module.exports = router;