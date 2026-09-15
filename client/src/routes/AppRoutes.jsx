import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Public Pages
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

import Photographers from "../pages/photographers/Photographers";
import PhotographerDetails from "../pages/photographers/PhotographerDetails";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC WEBSITE ================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/halls" element={<Halls />} />
          <Route path="/halls/:id" element={<HallDetails />} />

          <Route path="/beauty" element={<Beauty />} />
          <Route path="/beauty/:id" element={<BeautyDetails />} />

          <Route path="/bridal-dresses" element={<BridalDresses />} />
          <Route
            path="/bridal-dresses/:id"
            element={<BridalDressDetails />}
          />

          <Route path="/groom-suits" element={<GroomSuits />} />
          <Route
            path="/groom-suits/:id"
            element={<GroomSuitDetails />}
          />

          <Route path="/photographers" element={<Photographers />} />
          <Route
            path="/photographers/:id"
            element={<PhotographerDetails />}
          />

          <Route path="/wedding-cars" element={<WeddingCars />} />
          <Route
            path="/wedding-cars/:id"
            element={<WeddingCarDetails />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;