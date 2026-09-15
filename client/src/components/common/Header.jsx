import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.ico";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

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

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    console.log("Search:", search);
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        dir="rtl"
        className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md"
      >
        <div className="mx-auto flex h-[76px] max-w-7xl items-center px-5 sm:px-6">

          {/* ================= LOGO ================= */}
          <div className="flex w-[22%] shrink-0 justify-start">
            <Link
              to="/"
              className="flex items-center gap-2"
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
          </div>

          {/* ================= NAVIGATION ================= */}
          <div className="flex flex-1 justify-center">
            <nav className="hidden items-center gap-4 xl:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="whitespace-nowrap text-xs font-medium text-gray-600 transition hover:text-[#6B3038]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ================= SEARCH ================= */}
          <div className="flex w-[28%] shrink-0 justify-end">
            <form
              onSubmit={handleSearch}
              className="hidden w-full max-w-xs xl:block"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحثي عن خدمة..."
                className="h-10 w-full rounded-full border border-[#eadfd9] bg-[#FFFAF5] px-5 text-sm text-[#2d2424] outline-none transition placeholder:text-gray-400 focus:border-[#6B3038] focus:bg-white focus:ring-2 focus:ring-[#6B3038]/10"
              />
            </form>

            {/* Mobile Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#eadfd9] bg-[#FFFAF5] text-[#6B3038] xl:hidden"
              aria-label="فتح القائمة"
            >
              <div className="flex w-5 flex-col gap-1.5">
                <span className="h-[2px] w-full rounded-full bg-current" />
                <span className="h-[2px] w-4 rounded-full bg-current" />
                <span className="h-[2px] w-full rounded-full bg-current" />
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* ================= MOBILE DRAWER ================= */}
      <aside
        dir="rtl"
        className={`fixed right-0 top-0 z-[60] flex h-screen w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 xl:hidden ${
          isMenuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
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

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8EEE7] text-xl text-[#6B3038]"
            aria-label="إغلاق القائمة"
          >
            ×
          </button>

        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6">

          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="mb-6"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحثي عن خدمة..."
              className="h-12 w-full rounded-xl border border-[#eadfd9] bg-[#FFFAF5] px-5 text-sm text-[#2d2424] outline-none transition placeholder:text-gray-400 focus:border-[#6B3038] focus:bg-white focus:ring-2 focus:ring-[#6B3038]/10"
            />
          </form>

          {/* Navigation */}
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

          {/* Provider Dashboard */}
          {isServiceProvider && (
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="mt-4 flex items-center gap-3 rounded-xl bg-[#6B3038] px-4 py-3.5 text-sm font-semibold text-white"
            >
              لوحة التحكم
            </Link>
          )}

        </div>

        {/* Drawer Bottom */}
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