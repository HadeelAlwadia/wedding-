import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// ==================================================
// PUBLIC PAGES
// ==================================================

import Home from "../pages/Home";
import ServicePage from "../pages/ServicePage";

import Bussnise from "../pages/Bussnise/Bussnise";
import BussniseDetails from "../pages/Bussnise/BussniseDetails";

import StoreDetails from "../pages/Store/StoreDetailes";

// ==================================================
// AUTH
// ==================================================

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import PendingApproval from "../pages/PendingApproval";
import NotFound from "../pages/NotFound";

// ==================================================
// PROVIDER DASHBOARD
// ==================================================

import DashboardLayout from "../layouts/DashboardLayout ";
import Dashboard from "../pages/Provider/Dashboard";
import BusinessProfile from "../pages/Provider/BusinessProfile";
import Gallery from "../pages/Provider/gallery";
import Settings from "../pages/Provider/Settings";
import Reviews from "../pages/Provider/Reviews";
import Catalog from "../pages/Provider/Catalog";
import BeautyServices from "../pages/Provider/Business/Beauty";
import PackageManager from "../pages/Provider/Package";
import Reels from "../pages/Provider/Reels";

// ==================================================
// ADMIN
// ==================================================

import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminRequests from "../pages/Admin/Requests";
import AdminProviders from "../pages/Admin/Providers";
import AdminSettings from "../pages/Admin/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================================================
            PUBLIC WEBSITE
        ================================================== */}

        <Route element={<MainLayout />}>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Services */}
          <Route
            path="/services"
            element={<ServicePage />}
          />

          {/* ==================================================
              HALLS
          ================================================== */}

          <Route
            path="/halls"
            element={
              <Bussnise
                serytye="hall"
                title="صالات الأفراح"
                englishTitle="WEDDING VENUES"
                description="اكتشفي المكان الذي يشبه حلمك ويكمل يومك."
                searchPlaceholder="ابحثي عن قاعة أو مكان..."
                itemLabel="صالات"
                defaultName="قاعة أفراح"
                defaultLocation="غزة"
              />
            }
          />

          <Route
            path="/halls/:id"
            element={
              <BussniseDetails
                nameofbassnse="قاعة الأفراح"
              />
            }
          />

          {/* ==================================================
              BEAUTY
          ================================================== */}

          <Route
            path="/beauty"
            element={
              <Bussnise
                serytye="beauty"
                title="الكوافيرات والتجميل"
                englishTitle="BEAUTY & SALON"
                description="اختاري خبيرة التجميل التي تناسب إطلالتك."
                searchPlaceholder="ابحثي عن كوافير أو صالون..."
                itemLabel="كوافيرات"
                defaultName="صالون تجميل"
                defaultLocation="غزة"
              />
            }
          />

          <Route
            path="/beauty/:id"
            element={
              <BussniseDetails
                nameofbassnse="صالون التجميل"
              />
            }
          />

          {/* ==================================================
              BRIDAL DRESSES
          ================================================== */}

          <Route
            path="/bridal-dresses"
            element={
              <Bussnise
                serytye="bridal-dresses"
                title="فساتين الزفاف"
                englishTitle="BRIDAL DRESSES"
                description="اكتشفي فستانك بين أجمل الخيارات."
                searchPlaceholder="ابحثي عن متجر أو فستان..."
                itemLabel="متاجر"
                defaultName="متجر فساتين"
                defaultLocation="غزة"
              />
            }
          />

          <Route
            path="/bridal-dresses/:id"
            element={
              <BussniseDetails
                nameofbassnse="متجر فساتين الزفاف"
              />
            }
          />

          {/* ==================================================
              GROOM SUITS
          ================================================== */}

          <Route
            path="/groom-suits"
            element={
              <Bussnise
                serytye="groom-suits"
                title="بدلات العرسان"
                englishTitle="GROOM SUITS"
                description="اختار بدلتك من بين خيارات تناسب يومك."
                searchPlaceholder="ابحث عن متجر أو بدلة..."
                itemLabel="متاجر"
                defaultName="متجر بدلات"
                defaultLocation="غزة"
              />
            }
          />

          <Route
            path="/groom-suits/:id"
            element={
              <BussniseDetails
                nameofbassnse="متجر بدلات العرسان"
              />
            }
          />

          {/* ==================================================
              PHOTOGRAPHERS
          ================================================== */}

          <Route
            path="/photographers"
            element={
              <Bussnise
                serytye="photographers"
                title="المصورون"
                englishTitle="PHOTOGRAPHERS"
                description="اختاري المصور الذي يوثق أجمل لحظات يومك."
                searchPlaceholder="ابحثي عن مصور أو استوديو..."
                itemLabel="مصورين"
                defaultName="استوديو تصوير"
                defaultLocation="غزة"
              />
            }
          />

          <Route
            path="/photographers/:id"
            element={
              <BussniseDetails
                nameofbassnse="استوديو التصوير"
              />
            }
          />

          {/* ==================================================
              WEDDING CARS
          ================================================== */}

          <Route
            path="/wedding-cars"
            element={
              <Bussnise
                serytye="wedding-cars"
                title="سيارات الزفاف"
                englishTitle="WEDDING CARS"
                description="اختاري سيارة تليق بيومك المميز."
                searchPlaceholder="ابحثي عن سيارة أو مكتب تأجير..."
                itemLabel="مكاتب"
                defaultName="مكتب تأجير سيارات"
                defaultLocation="غزة"
              />
            }
          />

          <Route
            path="/wedding-cars/:id"
            element={
              <BussniseDetails
                nameofbassnse="سيارة الزفاف"
              />
            }
          />

          {/* ==================================================
              STORE
              للكتالوجات الخاصة بالفساتين والبدلات والسيارات
          ================================================== */}

          <Route
            path="/store/:serviceType/:id"
            element={<StoreDetails />}
          />

          {/* ==================================================
              PUBLIC NOT FOUND
          ================================================== */}

          <Route
            path="*"
            element={<NotFound />}
          />

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

        {/* ==================================================
            PROVIDER DASHBOARD
        ================================================== */}

        <Route
          path="/dashboard"
          element={<DashboardLayout />}
        >

          {/* Dashboard Home */}
          <Route
            index
            element={<Dashboard />}
          />

          {/* Business Profile */}
          <Route
            path="business"
            element={<BusinessProfile />}
          />

          {/* ==================================================
              CATALOG
              bridal-dresses
              groom-suits
              wedding-cars
          ================================================== */}

          <Route
            path="catalog"
            element={<Catalog />}
          />

          {/* ==================================================
              BEAUTY SERVICES
          ================================================== */}

          <Route
            path="services"
            element={<BeautyServices />}
          />

          {/* ==================================================
              PACKAGES
              halls
              photographers
          ================================================== */}

          <Route
            path="packages"
            element={<PackageManager />}
          />

          {/* ==================================================
              MEDIA
          ================================================== */}

          <Route
            path="gallery"
            element={<Gallery />}
          />

          <Route
            path="reels"
            element={<Reels />}
          />

          {/* ==================================================
              REVIEWS
          ================================================== */}

          <Route
            path="reviews"
            element={<Reviews />}
          />

          {/* ==================================================
              SETTINGS
          ================================================== */}

          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>

        {/* ==================================================
            ADMIN DASHBOARD
        ================================================== */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="requests"
            element={<AdminRequests />}
          />

          <Route
            path="providers"
            element={<AdminProviders />}
          />

          <Route
            path="settings"
            element={<AdminSettings />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;