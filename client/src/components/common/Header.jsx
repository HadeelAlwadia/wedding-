
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Eye,
  Store,
  Settings,
  LogOut,
  X,
  Menu,
  Heart,
  ChevronDown,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.ico";

const Header = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const isVisitor = user?.role === "visitor";
  const isProvider = user?.role === "provider";
  const isAdmin = user?.role === "admin";

  // ===============================
  // Logout
  // ===============================
  const handleLogout = () => {
    setAccountOpen(false);
    setMobileOpen(false);

    logout();
    navigate("/");
  };

  // ===============================
  // Close mobile menu
  // ===============================
  const closeMobileMenu = () => {
    setMobileOpen(false);
    setAccountOpen(false);
  };

  // ===============================
  // Close account dropdown
  // ===============================
  const closeAccountMenu = () => {
    setAccountOpen(false);
  };

  // ===============================
  // Prevent body scroll
  // ===============================
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 w-full border-b border-[#eee5df] bg-white/95 backdrop-blur"
    >
      {/* =====================================================
          MAIN HEADER
      ====================================================== */}
      <div className="mx-auto flex min-h-[68px] w-full max-w-[1500px] items-center px-3 sm:min-h-[72px] sm:px-5 lg:min-h-[76px] lg:px-8">

        {/* ===============================
            LOGO
        ================================ */}
        <div className="flex min-w-0 flex-1 items-center">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex shrink-0 items-center gap-1.5 sm:gap-2"
          >
            <img
              src={logo}
              alt="زفاف"
              className="h-8 w-8 object-contain sm:h-9 sm:w-9 lg:h-10 lg:w-10"
            />

            <span className="whitespace-nowrap text-lg font-bold text-[#6B3038] sm:text-xl lg:text-2xl">
              زَفَاف
            </span>
          </Link>
        </div>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 xl:flex 2xl:gap-5">
          <Link
            to="/"
            className="whitespace-nowrap text-sm font-medium text-[#2d2424] transition hover:text-[#6B3038]"
          >
            الرئيسية
          </Link>

          <Link
            to="/halls"
            className="whitespace-nowrap text-sm font-medium text-[#2d2424] transition hover:text-[#6B3038]"
          >
            صالات الأفراح
          </Link>

          <Link
            to="/beauty"
            className="whitespace-nowrap text-sm font-medium text-[#2d2424] transition hover:text-[#6B3038]"
          >
            الكوافيرات
          </Link>

          <Link
            to="/bridal-dresses"
            className="whitespace-nowrap text-sm font-medium text-[#2d2424] transition hover:text-[#6B3038]"
          >
            فساتين العرائس
          </Link>

          <Link
            to="/photographers"
            className="whitespace-nowrap text-sm font-medium text-[#2d2424] transition hover:text-[#6B3038]"
          >
            المصورين
          </Link>

          <Link
            to="/groom-suits"
            className="whitespace-nowrap text-sm font-medium text-[#2d2424] transition hover:text-[#6B3038]"
          >
            بدلات العرسان
          </Link>

          <Link
            to="/wedding-cars"
            className="whitespace-nowrap text-sm font-medium text-[#2d2424] transition hover:text-[#6B3038]"
          >
            سيارات الزفاف
          </Link>
        </nav>

        {/* =====================================================
            DESKTOP SEARCH
        ====================================================== */}
        <div className="hidden w-[180px] shrink-0 lg:block xl:w-[220px] 2xl:w-[290px]">
          <div className="flex h-10 overflow-hidden rounded-full border border-[#eadbd1] bg-[#fffaf5] sm:h-11">
            <div className="relative min-w-0 flex-1">
              <Search
                size={17}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 sm:right-4"
              />

              <input
                type="text"
                placeholder="ابحثي..."
                className="h-full w-full bg-transparent px-9 text-xs text-[#2d2424] outline-none placeholder:text-gray-400 sm:text-sm"
              />
            </div>

            <button
              type="button"
              className="m-1 shrink-0 rounded-full bg-[#6B3038] px-3 text-xs font-semibold text-white transition hover:bg-[#57262D] sm:px-4 sm:text-sm"
            >
              بحث
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE / DESKTOP ACTIONS
        ====================================================== */}
        <div className="mr-2 flex shrink-0 items-center gap-2 sm:mr-3 sm:gap-2.5">
          {/* ===============================
              ACCOUNT BUTTON
          ================================ */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setAccountOpen((prev) => !prev);
                setMobileOpen(false);
              }}
              aria-label="الحساب"
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition sm:h-10 sm:w-10 lg:h-11 lg:w-11 ${
                accountOpen
                  ? "border-[#6B3038] bg-[#f8eee7] text-[#6B3038]"
                  : "border-[#eadbd1] bg-white text-[#6B3038] hover:bg-[#f8eee7]"
              }`}
            >
              <User size={18} strokeWidth={1.7} />
            </button>

            {/* ===============================
                DESKTOP ACCOUNT DROPDOWN
            ================================ */}
            {accountOpen && (
              <>
                <button
                  type="button"
                  aria-label="إغلاق"
                  onClick={closeAccountMenu}
                  className="fixed inset-0 z-40 cursor-default bg-black/5"
                />

                <div className="absolute left-0 top-[52px] z-50 hidden w-[310px] overflow-hidden rounded-3xl border border-[#eadbd1] bg-white shadow-xl lg:block">
                  {user ? (
                    <>
                      {/* User Info */}
                      <div className="border-b border-[#eee5df] bg-[#fffaf5] p-5">
                        <p className="truncate font-bold text-[#2d2424]">
                          {user.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {user.email}
                        </p>

                        {isVisitor && (
                          <span className="mt-3 inline-flex rounded-full bg-[#f8eee7] px-3 py-1 text-xs font-medium text-[#6B3038]">
                            زائرة
                          </span>
                        )}

                        {isProvider && (
                          <span className="mt-3 inline-flex rounded-full bg-[#f8eee7] px-3 py-1 text-xs font-medium text-[#6B3038]">
                            مقدم خدمة
                          </span>
                        )}

                        {isAdmin && (
                          <span className="mt-3 inline-flex rounded-full bg-[#f8eee7] px-3 py-1 text-xs font-medium text-[#6B3038]">
                            عضو إدارة
                          </span>
                        )}
                      </div>

                      {/* ===============================
                          VISITOR
                      ================================ */}
                      {isVisitor && (
                        <div className="p-2">
                          <Link
                            to="/favorites"
                            onClick={closeAccountMenu}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f8eee7]"
                          >
                            <Heart size={19} className="text-[#6B3038]" />

                            <div>
                              <p className="font-semibold text-[#2d2424]">
                                المفضلة
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                الخدمات التي حفظتيها
                              </p>
                            </div>
                          </Link>

                          <Link
                            to="/profile"
                            onClick={closeAccountMenu}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f8eee7]"
                          >
                            <User size={19} className="text-[#6B3038]" />

                            <div>
                              <p className="font-semibold text-[#2d2424]">
                                حسابي
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                تعديل بيانات حسابك
                              </p>
                            </div>
                          </Link>
                        </div>
                      )}

                      {/* ===============================
                          PROVIDER
                      ================================ */}
                      {isProvider && (
                        <div className="p-2">
                          <Link
                            to="/business/preview"
                            onClick={closeAccountMenu}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f8eee7]"
                          >
                            <Eye size={19} className="text-[#6B3038]" />

                            <div>
                              <p className="font-semibold text-[#2d2424]">
                                معاينة صفحتك
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                شوفي كيف تظهر صفحتك للزوار
                              </p>
                            </div>
                          </Link>

                          <Link
                            to="/business/services"
                            onClick={closeAccountMenu}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f8eee7]"
                          >
                            <Store size={19} className="text-[#6B3038]" />

                            <div>
                              <p className="font-semibold text-[#2d2424]">
                                خدماتك
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                إدارة الخدمات والأسعار
                              </p>
                            </div>
                          </Link>

                          <Link
                            to="/business/settings"
                            onClick={closeAccountMenu}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f8eee7]"
                          >
                            <Settings
                              size={19}
                              className="text-[#6B3038]"
                            />

                            <div>
                              <p className="font-semibold text-[#2d2424]">
                                الإعدادات
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                إعدادات حسابك ونشاطك
                              </p>
                            </div>
                          </Link>
                        </div>
                      )}

                      {/* ===============================
                          ADMIN
                      ================================ */}
                      {isAdmin && (
                        <div className="p-2">
                          <Link
                            to="/admin"
                            onClick={closeAccountMenu}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f8eee7]"
                          >
                            <Store size={19} className="text-[#6B3038]" />

                            <div>
                              <p className="font-semibold text-[#2d2424]">
                                لوحة الإدارة
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                إدارة منصة زفاف
                              </p>
                            </div>
                          </Link>

                          <Link
                            to="/admin/requests"
                            onClick={closeAccountMenu}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f8eee7]"
                          >
                            <User size={19} className="text-[#6B3038]" />

                            <div>
                              <p className="font-semibold text-[#2d2424]">
                                طلبات مقدمي الخدمات
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                مراجعة وقبول طلبات التسجيل
                              </p>
                            </div>
                          </Link>

                          <Link
                            to="/admin/providers"
                            onClick={closeAccountMenu}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f8eee7]"
                          >
                            <Store size={19} className="text-[#6B3038]" />

                            <div>
                              <p className="font-semibold text-[#2d2424]">
                                مقدمو الخدمات
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                إدارة مقدمي الخدمات
                              </p>
                            </div>
                          </Link>

                          <Link
                            to="/admin/stats"
                            onClick={closeAccountMenu}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f8eee7]"
                          >
                            <Eye size={19} className="text-[#6B3038]" />

                            <div>
                              <p className="font-semibold text-[#2d2424]">
                                الإحصائيات
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                نظرة عامة على المنصة
                              </p>
                            </div>
                          </Link>

                          <Link
                            to="/admin/settings"
                            onClick={closeAccountMenu}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f8eee7]"
                          >
                            <Settings
                              size={19}
                              className="text-[#6B3038]"
                            />

                            <div>
                              <p className="font-semibold text-[#2d2424]">
                                إعدادات الإدارة
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                إعدادات لوحة الإدارة
                              </p>
                            </div>
                          </Link>
                        </div>
                      )}

                      {/* Logout */}
                      <div className="border-t border-[#eee5df] p-2">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <LogOut size={19} />
                          تسجيل الخروج
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="border-b border-[#eee5df] bg-[#fffaf5] p-5">
                        <p className="font-bold text-[#2d2424]">
                          أهلًا بكِ في زَفَاف
                        </p>

                        <p className="mt-1 text-xs leading-6 text-gray-500">
                          تصفحي خدمات الزفاف بحرية، وأنشئي حسابًا إذا أردتِ
                          الاستفادة من مميزات الحساب.
                        </p>
                      </div>

                      <div className="p-3">
                        <Link
                          to="/auth/login"
                          onClick={closeAccountMenu}
                          className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-[#6B3038] transition hover:bg-[#f8eee7]"
                        >
                          <User size={18} />
                          تسجيل الدخول
                        </Link>

                        <Link
                          to="/auth/register"
                          onClick={closeAccountMenu}
                          className="mt-1 flex items-center justify-center rounded-2xl bg-[#6B3038] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#57262D]"
                        >
                          إنشاء حساب
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* ===============================
              MOBILE MENU BUTTON
          ================================ */}
          <button
            type="button"
            onClick={() => {
              setMobileOpen((prev) => !prev);
              setAccountOpen(false);
            }}
            aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#eadbd1] text-[#6B3038] transition hover:bg-[#f8eee7] sm:h-10 sm:w-10 xl:hidden"
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE / TABLET DRAWER
      ====================================================== */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={closeMobileMenu}
            className="fixed inset-0 top-[68px] z-40 bg-black/20 sm:top-[72px] lg:top-[76px] xl:hidden"
          />

          {/* Drawer */}
          <aside className="fixed right-0 top-[68px] z-50 flex h-[calc(100vh-68px)] w-[min(390px,92vw)] flex-col overflow-y-auto border-l border-[#eee5df] bg-white px-4 py-5 shadow-2xl sm:top-[72px] sm:h-[calc(100vh-72px)] sm:px-5 sm:py-6 lg:top-[76px] lg:h-[calc(100vh-76px)] xl:hidden">

            {/* ===============================
                MOBILE SEARCH
            ================================ */}
            <div className="mb-6">
              <div className="flex h-11 overflow-hidden rounded-full border border-[#eadbd1] bg-[#fffaf5]">
                <div className="relative min-w-0 flex-1">
                  <Search
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="ابحثي عن خدمة..."
                    className="h-full w-full bg-transparent px-10 text-sm outline-none"
                  />
                </div>

                <button
                  type="button"
                  className="m-1 shrink-0 rounded-full bg-[#6B3038] px-4 text-sm font-semibold text-white"
                >
                  بحث
                </button>
              </div>
            </div>

            {/* ===============================
                NAVIGATION
            ================================ */}
            <p className="mb-2 px-3 text-xs font-semibold text-gray-400">
              تصفح الخدمات
            </p>

            <nav className="space-y-1">
              {[
                ["/", "الرئيسية"],
                ["/halls", "صالات الأفراح"],
                ["/beauty", "الكوافيرات"],
                ["/bridal-dresses", "فساتين العرائس"],
                ["/photographers", "المصورين"],
                ["/groom-suits", "بدلات العرسان"],
                ["/wedding-cars", "سيارات الزفاف"],
              ].map(([link, label]) => (
                <Link
                  key={link}
                  to={link}
                  onClick={closeMobileMenu}
                  className="block rounded-2xl px-4 py-3.5 text-sm font-medium text-[#2d2424] transition hover:bg-[#f8eee7] hover:text-[#6B3038]"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* =================================================
                ACCOUNT SECTION
            ================================================== */}
            <div className="mt-6 border-t border-[#eee5df] pt-5">

              {/* ===============================
                  ACCOUNT BUTTON
              ================================ */}
              <button
                type="button"
                onClick={() => setAccountOpen((prev) => !prev)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-4 text-right transition ${
                  accountOpen
                    ? "bg-[#f8eee7] text-[#6B3038]"
                    : "text-[#2d2424] hover:bg-[#f8eee7]"
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6B3038] text-white">
                    <User size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold">
                      {user ? "حسابي" : "الحساب"}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-gray-400">
                      {user
                        ? user.name
                        : "تسجيل الدخول أو إنشاء حساب"}
                    </p>
                  </div>
                </div>

                <ChevronDown
                  size={19}
                  className={`shrink-0 transition-transform ${
                    accountOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* =================================================
                  ACCOUNT CONTENT
              ================================================== */}
              {accountOpen && (
                <div className="mt-2 rounded-2xl bg-[#fffaf5] p-2">

                  {user ? (
                    <>
                      {/* User Info */}
                      <div className="mb-2 rounded-xl bg-white p-3">
                        <p className="truncate font-bold text-[#2d2424]">
                          {user.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {user.email}
                        </p>

                        <div className="mt-2">
                          {isVisitor && (
                            <span className="rounded-full bg-[#f8eee7] px-3 py-1 text-xs font-medium text-[#6B3038]">
                              زائرة
                            </span>
                          )}

                          {isProvider && (
                            <span className="rounded-full bg-[#f8eee7] px-3 py-1 text-xs font-medium text-[#6B3038]">
                              مقدم خدمة
                            </span>
                          )}

                          {isAdmin && (
                            <span className="rounded-full bg-[#f8eee7] px-3 py-1 text-xs font-medium text-[#6B3038]">
                              عضو إدارة
                            </span>
                          )}
                        </div>
                      </div>

                      {/* ===============================
                          VISITOR ACCOUNT
                      ================================ */}
                      {isVisitor && (
                        <div className="space-y-1">
                          <Link
                            to="/profile"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#2d2424] transition hover:bg-white"
                          >
                            <User size={18} className="text-[#6B3038]" />
                            حسابي
                          </Link>

                          <Link
                            to="/favorites"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#2d2424] transition hover:bg-white"
                          >
                            <Heart size={18} className="text-[#6B3038]" />
                            المفضلة
                          </Link>
                        </div>
                      )}

                      {/* ===============================
                          PROVIDER ACCOUNT
                      ================================ */}
                      {isProvider && (
                        <div className="space-y-1">
                          <Link
                            to="/business/preview"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#2d2424] transition hover:bg-white"
                          >
                            <Eye size={18} className="text-[#6B3038]" />
                            معاينة صفحتك
                          </Link>

                          <Link
                            to="/business/services"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#2d2424] transition hover:bg-white"
                          >
                            <Store size={18} className="text-[#6B3038]" />
                            خدماتك
                          </Link>

                          <Link
                            to="/business/settings"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#2d2424] transition hover:bg-white"
                          >
                            <Settings
                              size={18}
                              className="text-[#6B3038]"
                            />
                            الإعدادات
                          </Link>
                        </div>
                      )}

                      {/* ===============================
                          ADMIN ACCOUNT
                      ================================ */}
                      {isAdmin && (
                        <div className="space-y-1">
                          <Link
                            to="/admin"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#2d2424] transition hover:bg-white"
                          >
                            <Store size={18} className="text-[#6B3038]" />
                            لوحة الإدارة
                          </Link>

                          <Link
                            to="/admin/requests"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#2d2424] transition hover:bg-white"
                          >
                            <User size={18} className="text-[#6B3038]" />
                            طلبات مقدمي الخدمات
                          </Link>

                          <Link
                            to="/admin/providers"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#2d2424] transition hover:bg-white"
                          >
                            <Store size={18} className="text-[#6B3038]" />
                            مقدمو الخدمات
                          </Link>

                          <Link
                            to="/admin/stats"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#2d2424] transition hover:bg-white"
                          >
                            <Eye size={18} className="text-[#6B3038]" />
                            الإحصائيات
                          </Link>

                          <Link
                            to="/admin/settings"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#2d2424] transition hover:bg-white"
                          >
                            <Settings
                              size={18}
                              className="text-[#6B3038]"
                            />
                            إعدادات الإدارة
                          </Link>
                        </div>
                      )}

                      {/* Logout */}
                      <div className="mt-2 border-t border-[#eadbd1] pt-2">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <LogOut size={18} />
                          تسجيل الخروج
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-2 rounded-xl bg-white p-3">
                        <p className="font-semibold text-[#2d2424]">
                          أهلًا بكِ في زَفَاف 🤍
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-400">
                          يمكنكِ تصفح الخدمات بدون تسجيل دخول.
                        </p>
                      </div>

                      <Link
                        to="/auth/login"
                        onClick={closeMobileMenu}
                        className="mb-1 flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-[#6B3038] transition hover:bg-white"
                      >
                        <User size={18} />
                        تسجيل الدخول
                      </Link>

                      <Link
                        to="/auth/register"
                        onClick={closeMobileMenu}
                        className="flex items-center justify-center rounded-xl bg-[#6B3038] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#57262D]"
                      >
                        إنشاء حساب
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </aside>
        </>
      )}
    </header>
  );
};

export default Header;

