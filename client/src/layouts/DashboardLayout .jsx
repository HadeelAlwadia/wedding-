import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    user,
    token,
    loading,
    isProvider,
  } = useAuth();

  // =====================================================
  // Loading
  // =====================================================

  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#fbf8f5]"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-[3px] border-[#eadfd8] border-t-[#6B3038]" />

          <p className="text-sm text-[#2d2424]/50">
            جاري تحميل لوحة التحكم...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // Protect Provider Dashboard
  // =====================================================

  if (!token || !user || !isProvider) {
    return (
      <Navigate
        to="/auth/login"
        replace
      />
    );
  }

  
  // =====================================================
  // Layout
  // =====================================================

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fbf8f5] text-[#2d2424]"
    >
      {/* =================================================
          Sidebar
      ================================================= */}

   <DashboardSidebar
  isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
/>

      {/* =================================================
          Main Content
      ================================================= */}

      <div className="lg:mr-[260px]">

        {/* =================================================
            Header
        ================================================= */}

        <DashboardHeader
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* =================================================
            Page
        ================================================= */}

        <main className="min-h-[calc(100vh-68px)]">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;