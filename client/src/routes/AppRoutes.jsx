 import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// ================= PUBLIC PAGES =================

import Home from "../pages/Home";



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
import Gallery from "../pages/Provider/Gallery";
import Settings from "../pages/Provider/Settings";
import Reviews from "../pages/Provider/Reviews";
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminRequests from "../pages/Admin/Requests";
import AdminLayout from "../layouts/AdminLayout";
import AdminProviders from "../pages/Admin/Providers";
import AdminSettings from "../pages/Admin/Settings";
import WeddingAssistant from "../pages/WeddingAssistant/WeddingAssistant";
import WeddingLook from "../pages/WeddingLook/WeddingLook";
import Dashboard from "../pages/Provider/Dashboard";
import CatalogManager from "../pages/Provider/templates/CatalogManager";
import BeautyServices from "../pages/Provider/Business/Beauty";
import PackageManager from "../pages/Provider/Package";
import Reels from "../pages/Provider/Reels";
import Catalog from "../pages/Provider/Catalog";
import StoreDetails from "../pages/Store/StoreDetailes";
import ServicePage from "../pages/ServicePage";
import BussniseDetails from "../pages/Bussnise/BussniseDetails";
import Bussnise from "../pages/Bussnise/Bussnise";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==================================================
            PUBLIC WEBSITE
        ================================================== */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicePage />} />

          {/* Halls */}
          <Route path="/halls" element={<Bussnise
            serytye="hall"
            title="صالات الأفراح"
            englishTitle="WEDDING VENUES"
            description="اكتشفي المكان الذي يشبه حلمك ويكمل يومك."
            searchPlaceholder="ابحثي عن قاعة أو مكان..."
            itemLabel="صالات"
            defaultName="قاعة أفراح"
          />} />
          <Route path="/halls/:id" element={<BussniseDetails nameofbassnse="hall" />} />
              


          {/* Beauty */}
          <Route path="/beautys" element={<Bussnise
            serytye="beauty"
            title="الكوافيرات والتجميل"
            englishTitle="BEAUTY & SALON"
            description="اختاري خبيرة التجميل التي تناسب إطلالتك."
            searchPlaceholder="ابحثي عن كوافير أو صالون..."
            itemLabel="كوافيرات"
            defaultName="صالون تجميل"
          />} />

          <Route path="/beautys/:id" element={<BussniseDetails nameofbassnse='beauty' />} />


          {/* Bridal Dresses */}
          <Route
            path="/bridal-dresses"
            element={<Bussnise
              serytye="bridal-dresses"
              title="فساتين الزفاف"
              englishTitle="BRIDAL DRESSES"
              description="اكتشفي فستانك بين أجمل الخيارات."
              searchPlaceholder="ابحثي عن متجر أو فستان..."
              itemLabel="متاجر"
              defaultName="متجر فساتين"
            />}
          />

          <Route
            path="/bridal-dresses/:id"
            element={<BussniseDetails nameofbassnse='bridal-dresses  ' />}
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

   

          <Route
            path="/photographers/:id"
            element={<BussniseDetails nameofbassnse="photographer" />}
          />
          {/* store page /car/suit */}
          <Route
            path="/store/:serviceType/:id"
            element={<StoreDetails />}
          />
          {/* Wedding Cars */}
          <Route
            path="/wedding-cars"
            element={<WeddingCars />}
          />

          <Route
            path="/wedding-cars/:id"
            element={<BussniseDetails nameofbassnse="wedding-car" />}
          />
          {/*   <Route
            path="/wedding-assistant"
            element={<WeddingAssistant />}
          ></Route>
          <Route
            path="/wedding-look"
            element={<WeddingLook />}
          ></Route>*/
          }

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