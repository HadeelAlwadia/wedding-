
import {
  Menu,
  Store,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardHeader = ({ onMenuClick }) => {
  const { user, serviceType, logout } = useAuth();
  const nav = useNavigate();

  const getBusinessTypeName = () => {
    switch (serviceType) {
      case "hall":
        return "صالات الأفراح";

      case "beauty":
        return "الكوافيرات والتجميل";

      case "bridal-dresses":
        return "فساتين العرائس";

      case "groom-suits":
        return "بدلات العرسان";

      case "photographers":
        return "التصوير";

      case "wedding-cars":
        return "سيارات الزفاف";

      default:
        return "نشاط تجاري";
    }
  };

  const businessName =
    user?.businessName ||
    user?.name ||
    "نشاطك التجاري";

  const firstLetter =
    businessName.charAt(0)?.toUpperCase() || "ز";

  const handleLogout = () => {
    logout();
    nav("/");
  };

  return (
    <header className="sticky top-0 z-30 h-[72px] border-b border-[#eadfd7] bg-[#fffaf5]/95 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-5 md:px-8">

        {/* الجانب الأيمن */}
        <div className="flex items-center gap-4">

          {/* زر القائمة */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="فتح القائمة"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#6B3038] shadow-sm ring-1 ring-[#eadfd7] transition hover:bg-[#f8eee7] lg:hidden"
          >
            <Menu size={20} strokeWidth={1.8} />
          </button>

          {/* العنوان */}
          <div>
            <p className="text-[11px] font-medium text-[#9b8580]">
              لوحة مقدم الخدمة
            </p>

            <h1 className="mt-0.5 text-base font-bold text-[#2d2424] md:text-lg">
              إدارة نشاطك على زَفَاف
            </h1>
          </div>
        </div>

        {/* الجانب الأيسر */}
        <div className="flex items-center gap-3">

          {/* نوع النشاط */}
          <div className="hidden items-center gap-2 rounded-full border border-[#e8d8cd] bg-white px-3.5 py-2 sm:flex">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038]">
              <Store size={14} strokeWidth={1.8} />
            </span>

            <span className="text-xs font-medium text-[#6b5a55]">
              {getBusinessTypeName()}
            </span>
          </div>

          {/* اسم النشاط */}
          <div className="hidden max-w-[150px] text-left md:block">
            <p className="truncate text-sm font-semibold text-[#2d2424]">
              {businessName}
            </p>

            <p className="mt-0.5 text-[10px] text-[#9b8580]">
              مقدم خدمة معتمد
            </p>
          </div>

          {/* الحساب */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6B3038] text-sm font-bold text-white shadow-sm ring-4 ring-[#f8eee7]">
            {firstLetter}
          </div>

          {/* تسجيل الخروج */}
          <button
            type="button"
            onClick={handleLogout}
            title="تسجيل الخروج"
            aria-label="تسجيل الخروج"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#eadfd7] bg-white text-[#6B3038] transition hover:bg-[#f8eee7]"
          >
            <LogOut size={18} strokeWidth={1.8} />
          </button>

        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

