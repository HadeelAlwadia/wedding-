const express = require("express");

const {
  createBusiness,
  getMyBusiness,
  updateMyBusiness,
} = require("../controllers/businessController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBusiness);

router.get("/my-business", protect, getMyBusiness);

router.put("/my-business", protect, updateMyBusiness);

module.exports = router;