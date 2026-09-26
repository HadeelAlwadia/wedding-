const express = require("express");

const router = express.Router();

const  protect = require("../middleware/authMiddleware");

const {
  getBusinessProfile,
  updateBusinessProfile,
  getProdviderDashboard,
  getPackages,
  createPackage,
  editPackage,
  deletePackage,
  deleteReel,
  editReel,
  createReel,
  getReels, 
   getProviderGallery,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getCatalog,
  getCatalogItem,
  createCatalog,
  updateCatalog,
  deleteCatalog,
  toggleCatalogStatus,
  getProviderDashboard,
} = require("../controllers/providerController");
const Business = require("../models/Business");

router.get(
  "/business-profile",
  protect,
  getBusinessProfile
);
router.put(
  "/business-profile",
  protect,
  updateBusinessProfile
);


router.get(
  "/dashboard",
  protect,
  async (req, res) => {
    try {
      const userId = req.user._id;
  
      // =======================================================
      // Get Business
      // =======================================================
  
      const business = await Business.findOne({
        owner: userId,
      });
  
      if (!business) {
        return res.status(404).json({
          success: false,
          message: "لم يتم العثور على النشاط التجاري",
        });
      }
  
      // =======================================================
      // Business Profile
      // =======================================================
  
      const profile = business.businessProfile || {};
  
      // =======================================================
      // Statistics
      // =======================================================
  
      const packagesCount =
        business.packages?.length || 0;
  
      const galleryCount =
        business.gallery?.length || 0;
  
      const reelsCount =
        business.reels?.length || 0;
  
      // =======================================================
      // Recent Packages
      // آخر 4 باقات
      // =======================================================
  
      const recentPackages = (business.packages || [])
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
        .slice(0, 4);
  
      // =======================================================
      // Dashboard Response
      // =======================================================
  
      return res.status(200).json({
        success: true,
  
        data: {
          // =====================================================
          // Business Profile
          // =====================================================
  
          businessProfile: {
            name: profile.name || "",
  
            description:
              profile.description || "",
  
            address:
              profile.address || "",
  
            phone:
              profile.phone || "",
  
            whatsapp:
              profile.whatsapp || "",
  
            governorate:
              profile.governorate || "",
  
            logo:
              profile.logo || "",
  
            serviceType:
              profile.serviceType || "",
  
            ratingAverage:
              profile.ratingAverage || 0,
  
            ratingCount:
              profile.ratingCount || 0,
          },
  
          // =====================================================
          // Statistics
          // =====================================================
  
          stats: {
            packages: packagesCount,
  
            gallery: galleryCount,
  
            reels: reelsCount,
  
            rating:
              profile.ratingAverage || 0,
  
            reviews:
              profile.ratingCount || 0,
          },
  
          // =====================================================
          // Recent Packages
          // =====================================================
  
          recentPackages,
  
          // =====================================================
          // Approval
          // =====================================================
  
          isApproved:
            req.user.isApproved || false,
        },
      });
    } catch (error) {
      console.error(
        "Get provider dashboard error:",
        error
      );
  
      return res.status(500).json({
        success: false,
        message: "حدث خطأ أثناء تحميل لوحة التحكم",
      });
    }
  } 
);

router.get(
  "/packages",
  protect,
  getPackages
);

router.post(
  "/packages",
  protect,
  createPackage
);

router.put(
  "/packages/:packageId",
  protect,
  editPackage
);

router.delete(
  "/packages/:packageId",
  protect,
  deletePackage
);


router.get(
  "/reels",
  protect,
  getReels

);

router.post(
  "/reels",
  protect,
  createReel
);

router.put(
  "/reels/:reelId",
  protect,
  editReel

);

router.delete(
  "/reels/:reelId",
  protect,
  deleteReel
);



// =========================================================
// Provider Gallery Routes
// =========================================================

router.get(
  "/gallery",
  protect,
  getProviderGallery
);

router.post(
  "/gallery",
  protect,
  addGalleryImage
);

router.put(
  "/gallery/:imageId",
  protect,
  updateGalleryImage
);

router.delete(
  "/gallery/:imageId",
  protect,
  deleteGalleryImage
);


// Get all catalog items
router.get("/catalog", protect, getCatalog);

// Get single catalog item
router.get('/catalog/:id', protect, getCatalogItem);

// Create catalog item
router.post("/catalog", protect, createCatalog);

// Update catalog item
router.put("/catalog/:id", protect, updateCatalog);

// Delete catalog item
router.delete("/catalog/:id", protect, deleteCatalog);

// Toggle active/inactive
router.patch("/catalog/:id/toggle", protect, toggleCatalogStatus);


router.get(
  "/dashboard",
  protect,
  getProviderDashboard
);


module.exports = router;