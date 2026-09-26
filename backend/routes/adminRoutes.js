const express = require("express");

const {
  getPendingRequests,
  approveProvider,
  rejectProvider,
  getAdminStats,
  getProviders,
  createAdminStaff,
  getAdminStaff,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/stats", getAdminStats);

router.get("/requests", getPendingRequests);

router.patch("/requests/:id/approve", approveProvider);

router.patch("/requests/:id/reject", rejectProvider);

router.get("/providers", getProviders);

router.post("/staff", createAdminStaff);
router.get("/staff", getAdminStaff);


module.exports = router;



