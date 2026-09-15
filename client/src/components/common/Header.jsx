import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.ico";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // مؤقتًا إلى أن نربطه بـ AuthContext
  const user = null;

  const isServiceProvider = user?.role === "provider";

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: "الرئيسية", to: "/" },
    { label: "صالات الأفراح", to: "/halls" },
    { label: "الكوافيرات", to: "/beauty" },
    { label: "فساتين العرائس", to: "/bridal-dresses" },
    { label: "المصورين", to: "/photographers" },
    { label: "بدلات العرسان", to: "/groom-suits" },
    { label: "سيارات الزفاف", to: "/wedding-cars" },
  ];

  return (
    <>
      <header
        dir="rtl"
        className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md"
      >
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2"
          >
            <img
              src={logo}
              alt="شعار هنا"
              className="h-10 w-10 object-contain"
            />

            <span className="text-2xl font-bold text-[#6B3038]">
              هنا
            </span>
          </Link>

          {/* ================= NAV ================= */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-gray-700 transition hover:text-[#6B3038]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className="hidden items-center gap-3 lg:flex">

            {/* Search */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-[#F8EEE7] hover:text-[#6B3038]"
              aria-label="بحث"
            >
              🔍
            </button>

            {/* Divider */}
            <div className="h-7 w-px bg-gray-200" />

            {/* ================= USER ================= */}
            {isServiceProvider ? (
              <Link
                to="/dashboard"
                className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-[#F8EEE7]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6B3038] text-sm text-white">
                  م
                </div>

                <div className="hidden xl:block">
                  <p className="text-xs text-gray-400">
                    حسابك
                  </p>

                  <p className="text-sm font-semibold text-[#2d2424]">
                    لوحة التحكم
                  </p>
                </div>
              </Link>
            ) : (
              /* المستخدم العادي */
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-[#F8EEE7] hover:text-[#6B3038]"
                aria-label="حسابي"
              >
                ♡
              </button>
            )}

          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#eadfd9] bg-[#FFFAF5] text-[#6B3038] lg:hidden"
            aria-label="فتح القائمة"
          >
            <div className="flex w-5 flex-col gap-1.5">
              <span className="h-[2px] w-full rounded-full bg-current" />
              <span className="h-[2px] w-4 rounded-full bg-current" />
              <span className="h-[2px] w-full rounded-full bg-current" />
            </div>
          </button>

        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* ================= MOBILE DRAWER ================= */}
      <aside
        dir="rtl"
        className={`fixed right-0 top-0 z-[60] flex h-screen w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 lg:hidden ${
          isMenuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <img
              src={logo}
              alt="شعار هنا"
              className="h-10 w-10"
            />

            <span className="text-2xl font-bold text-[#6B3038]">
              هنا
            </span>
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8EEE7] text-xl text-[#6B3038]"
            aria-label="إغلاق القائمة"
          >
            ×
          </button>

        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-5 py-6">

          <nav className="space-y-2">

            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 transition hover:bg-[#F8EEE7] hover:text-[#6B3038]"
              >
                <span className="flex items-center gap-3">

                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFFAF5] text-xs text-[#b18456]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {link.label}

                </span>

                <span className="text-[#b18456]">
                  ←
                </span>
              </Link>
            ))}

          </nav>

          {/* Search */}
          <div className="mt-6">

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl bg-[#FFFAF5] px-4 py-3.5 text-sm text-gray-500"
            >
              <span>🔍</span>
              <span>ابحثي عن خدمة...</span>
            </button>

          </div>

          {/* Provider */}
          {isServiceProvider && (
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="mt-4 flex items-center gap-3 rounded-xl bg-[#6B3038] px-4 py-3.5 text-sm font-semibold text-white"
            >
              <span>◉</span>
              لوحة التحكم
            </Link>
          )}

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 p-5">

          {!isServiceProvider && (
            <p className="text-center text-xs leading-6 text-gray-400">
              تصفحي خدمات الزفاف واكتشفي كل ما تحتاجينه
              ليومك المميز 🤍
            </p>
          )}

        </div>

      </aside>
    </>
  );
};

export default Header;