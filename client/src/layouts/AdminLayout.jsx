import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  StickyNote,
  Settings,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    {
      label: "الرئيسية",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "طلبات التسجيل",
      path: "/admin/requests",
      icon: ClipboardList,
    },
    {
      label: "مقدمو الخدمات",
      path: "/admin/providers",
      icon: Users,
    },
        {
      label: "الاعدادات ",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fffaf5] text-[#2d2424]"
    >
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-72 flex-col border-l border-[#eadfd7] bg-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-[#eadfd7] px-6">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6B3038] text-lg font-bold text-[#e5c28d]">
              ز
            </div>

            <div className="text-right">
              <h1 className="text-xl font-bold text-[#6B3038]">
                زَفَاف
              </h1>

              <p className="text-xs text-gray-400">
                لوحة الإدارة
              </p>
            </div>
          </button>

          {/* Close mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-[#f8eee7] lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold text-gray-400">
            الإدارة
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#6B3038] text-white shadow-sm"
                      : "text-[#5b4a4a] hover:bg-[#f8eee7] hover:text-[#6B3038]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={20}
                      className={
                        isActive
                          ? "text-[#e5c28d]"
                          : "text-gray-400 group-hover:text-[#6B3038]"
                      }
                    />

                    <span>{item.label}</span>

                    {isActive && (
                      <ChevronLeft
                        size={17}
                        className="mr-auto text-[#e5c28d]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-[#eadfd7] p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={20} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:mr-72">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#eadfd7] bg-white/95 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile menu */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-xl border border-[#eadfd7] p-2.5 text-[#6B3038] hover:bg-[#f8eee7] lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-xs text-gray-400">
                لوحة التحكم
              </p>

              <h2 className="text-lg font-bold text-[#2d2424]">
                إدارة منصة زَفَاف
              </h2>
            </div>
          </div>

          {/* Back to website */}
          <button
            onClick={() => navigate("/")}
            className="hidden items-center gap-2 rounded-xl border border-[#eadfd7] px-4 py-2.5 text-sm font-medium text-[#6B3038] transition hover:bg-[#f8eee7] sm:flex"
          >
            <span>العودة للموقع</span>
            <ChevronLeft size={17} />
          </button>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;