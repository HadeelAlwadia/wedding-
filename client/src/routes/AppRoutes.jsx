import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// ================= PUBLIC PAGES =================

import Home from "../pages/Home";

import Halls from "../pages/Halls/Halls";
import HallDetails from "../pages/Halls/HallDetails";

import Beauty from "../pages/Beauty/Beauty";
import BeautyDetails from "../pages/Beauty/BeautyDetails";

import BridalDresses from "../pages/BridalDresses/BridalDresses";
import BridalDressDetails from "../pages/BridalDresses/BridalDressDetails";

import GroomSuits from "../pages/GroomSuits/GroomSuits";
import GroomSuitDetails from "../pages/GroomSuits/GroomSuitDetails";

import WeddingCars from "../pages/WeddingCars/WeddingCars";
import WeddingCarDetails from "../pages/WeddingCars/WeddingCarDetails";



// ================= AUTH =================
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import PendingApproval from "../pages/PendingApproval";
import NotFound from "../pages/NotFound";

// ================= DASHBOARD =================


import DashboardLayout from "../layouts/DashboardLayout ";
import BusinessProfile from "../pages/Provider/BusinessProfile";
import Gallery from "../pages/Provider/gallery";
import Settings from "../pages/Provider/Settings";
import Reviews from "../pages/Provider/Reviews";
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminRequests from "../pages/Admin/Requests";
import AdminLayout from "../layouts/AdminLayout";
import AdminProviders from "../pages/Admin/Providers";
import AdminSettings from "../pages/Admin/Settings";
import PhotographerDetails from "../pages/photographers/PhotographerDetails";
import WeddingAssistant from "../pages/WeddingAssistant/WeddingAssistant";
import Photographers from "../pages/photographers/Photographers";
import WeddingLook from "../pages/WeddingLook/WeddingLook";
import Dashboard from "../pages/Provider/Dashboard";
import CatalogManager from "../pages/Provider/templates/CatalogManager";
import BeautyServices from "../pages/Provider/Business/Beauty";
import PackageManager from "../pages/Provider/Package";
import  Reels  from "../pages/Provider/Reels";
import Catalog from "../pages/Provider/Catalog";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>  
        {/* ==================================================
            PUBLIC WEBSITE
        ================================================== */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          {/* Halls */}
          <Route path="/halls" element={<Halls />} />ذ
          <Route path="/halls/:id" element={<HallDetails />} />

          {/* Beauty */}
          <Route path="/beauty" element={<Beauty />} />
          <Route path="/beauty/:id" element={<BeautyDetails />} />

          {/* Bridal Dresses */}
          <Route
            path="/bridal-dresses"
            element={<BridalDresses />}
          />

          <Route
            path="/bridal-dresses/:id"
            element={<BridalDressDetails />}
          />

          {/* Groom Suits */}
          <Route
            path="/groom-suits"
            element={<GroomSuits />}
          />

          <Route
            path="/groom-suits/:id"
            element={<GroomSuitDetails />}
          />

          {/* Photographers */}
          <Route
            path="/photographers"
            element={<Photographers />}
          />

          <Route
            path="/photographers/:id"
            element={<PhotographerDetails />}
          />

          {/* Wedding Cars */}
          <Route
            path="/wedding-cars"
            element={<WeddingCars />}
          />

          <Route
            path="/wedding-cars/:id"
            element={<WeddingCarDetails />}
          />
          <Route
            path="/wedding-assistant"
            element={<WeddingAssistant />}
          ></Route>
          <Route
            path="/wedding-look"
            element={<WeddingLook />}
          ></Route>

          {/* Public Not Found */}
          <Route path="*" element={<NotFound />} />
        </Route>



        {/* ==================================================
            AUTH
        ================================================== */}

        <Route
          path="/auth/login"
          element={<Login />}
        />

        <Route
          path="/auth/register"
          element={<Register />}
        />

        <Route
          path="/auth/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/pending-approval"
          element={<PendingApproval />}
        />

        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* الرئيسية */}
          <Route index element={<Dashboard />} />

          {/* بيانات النشاط - مشتركة */}
          <Route
            path="business"
            element={<BusinessProfile />}
          />

          {/* =========================
      Catalog Providers
      bridal-dresses
      groom-suits
      wedding-cars
  ========================= */}
          <Route
            path="catalog"
            element={<Catalog />}
          />

          {/* =========================
      Beauty
  ========================= */}
          <Route
            path="services"
            element={<BeautyServices />}
          />

          {/* =========================
      Hall + Photographer
  ========================= */}
          <Route
            path="packages"
            element={<PackageManager />}
          />

          {/* =========================
      Media
  ========================= */}
        <Route path="gallery" element={<Gallery />} />
          <Route
            path="reels"
            element={<Reels />}
          />

          {/* =========================
      Hall + Photographer Rules
  ========================= */}
     

          {/* =========================
      Shared
  ========================= */}
          <Route
            path="reviews"
            element={<Reviews />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>

        
        {/* ==================================================
    ADMIN DASHBOARD
================================================== */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="requests" element={<AdminRequests />} />
          <Route path="Providers" element={<AdminProviders />} />
          <Route path="settings" element={<AdminSettings />} />

        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;