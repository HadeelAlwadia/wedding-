
import { useContext, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Clock3,
  Image as ImageIcon,
  Loader2,
  Package,
  PlaySquare,
  Plus,
  Star,
  Store,
} from "lucide-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";

// =========================================================
// Service Config
// =========================================================

const SERVICE_CONFIG = {
  hall: {
    label: "قاعة أفراح",
    icon: Store,
  },

  beauty: {
    label: "كوافير / صالون",
    icon: Store,
  },

  "bridal-dress": {
    label: "فساتين عرائس",
    icon: Store,
  },

  "groom-suit": {
    label: "بدلات عرسان",
    icon: Store,
  },

  photographer: {
    label: "تصوير أفراح",
    icon: Camera,
  },

  "wedding-car": {
    label: "سيارات زفاف",
    icon: Store,
  },
};

// =========================================================
// Dashboard
// =========================================================

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =======================================================
  // Fetch Dashboard
  // =======================================================
console.log(dashboard)
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/provider/dashboard");

        console.log("Provider Dashboard:", response.data);

        if (response.data?.success) {
          setDashboard(response.data.data);
        } else {
          setError(
            response.data?.message || "تعذر تحميل لوحة التحكم"
          );
        }
      } catch (err) {
        console.error("Dashboard Error:", err);

        setError(
          err?.response?.data?.message ||
            "حدث خطأ أثناء تحميل لوحة التحكم"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // =======================================================
  // Business Profile
  // =======================================================

  const profile = dashboard?.businessProfile || {};

  const serviceType =
    profile?.serviceType ||
    user?.serviceType ||
    "";

  const serviceConfig =
    SERVICE_CONFIG[serviceType] ||
    SERVICE_CONFIG.hall;

  const ServiceIcon = serviceConfig.icon;

  // =======================================================
  // Stats
  // =======================================================

  const stats = {
    packages: dashboard?.stats?.packages ?? 0,
    gallery: dashboard?.stats?.gallery ?? 0,
    reels: dashboard?.stats?.reels ?? 0,
    rating: dashboard?.stats?.rating ?? 0,
    reviews: dashboard?.stats?.reviews ?? 0,
  };

  // =======================================================
  // IMPORTANT:
  // Backend returns "recentPackages"
  // NOT "packages"
  // =======================================================

  const packages = useMemo(() => {
    if (!Array.isArray(dashboard?.recentPackages)) {
      return [];
    }

    return dashboard.recentPackages
      .slice()
      .sort(
        (a, b) =>
          new Date(b?.createdAt || 0) -
          new Date(a?.createdAt || 0)
      )
      .slice(0, 4);
  }, [dashboard]);

  // =======================================================
  // Business Name
  // =======================================================

  const businessName =
    profile?.name ||
    user?.name ||
    "نشاطك التجاري";

  // =======================================================
  // Approval
  // =======================================================

  const isApproved =
    dashboard?.isApproved ??
    user?.isApproved ??
    false;

  // =======================================================
  // Loading
  // =======================================================

  if (loading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#f8f3ef] flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#6B3038] flex items-center justify-center text-white">
            <Loader2
              size={22}
              className="animate-spin"
            />
          </div>

          <p className="text-sm text-[#6b5b5b]">
            جاري تحميل لوحة التحكم...
          </p>
        </div>
      </div>
    );
  }

  // =======================================================
  // Error
  // =======================================================

  if (error) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#f8f3ef] flex items-center justify-center p-6"
      >
        <div className="bg-white rounded-[28px] p-8 text-center max-w-md w-full border border-[#eaded5] shadow-sm">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
            <Clock3 size={24} />
          </div>

          <h2 className="text-xl font-bold text-[#2d2424] mt-5">
            حدث خطأ
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 rounded-xl bg-[#6B3038] text-white text-sm font-semibold hover:bg-[#57272e] transition"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // =======================================================
  // UI
  // =======================================================

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f8f3ef]"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-7">

        {/* =================================================
            Header
        ================================================= */}

        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-[#8b7777]">
                لوحة مقدم الخدمة
              </span>

              <span className="w-1 h-1 rounded-full bg-[#c8a978]" />

              <span className="text-xs text-[#6B3038] font-medium">
                {serviceConfig.label}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#2d2424] tracking-tight">
              أهلًا بك، {businessName}
            </h1>

            <p className="text-sm text-[#8b7777] mt-2">
              من هنا يمكنك إدارة نشاطك ومتابعة ظهوره على زَفَاف.
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold ${
                isApproved
                  ? "bg-[#edf7f0] text-[#287342]"
                  : "bg-[#fff7e6] text-[#a46c16]"
              }`}
            >
              {isApproved ? (
                <CheckCircle2 size={15} />
              ) : (
                <Clock3 size={15} />
              )}

              {isApproved
                ? "النشاط معتمد"
                : "قيد المراجعة"}
            </div>

            <Link
              to="/dashboard/business"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#6B3038] text-white text-xs font-semibold hover:bg-[#57272e] transition"
            >
              تعديل النشاط
              <ArrowLeft size={15} />
            </Link>

          </div>
        </header>

        {/* =================================================
            Highlight
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5 mb-5">

          {/* Rating */}

          <div className="relative overflow-hidden rounded-[30px] bg-[#6B3038] min-h-[220px] p-7 sm:p-9 text-white">

            <div className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full border border-[#e5c28d]/10" />

            <div className="absolute -left-12 -bottom-16 w-52 h-52 rounded-full border border-[#e5c28d]/10" />

            <div className="relative h-full flex flex-col justify-between">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs text-white/60">
                    تقييم نشاطك
                  </p>

                  <h2 className="text-lg font-semibold mt-1">
                    الانطباع الذي يتركه نشاطك
                  </h2>
                </div>

                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Star
                    size={21}
                    className="text-[#e5c28d]"
                    fill="currentColor"
                  />
                </div>

              </div>

              <div className="mt-8 flex items-end gap-5">

                <div>
                  <div className="flex items-center gap-2">

                    <span className="text-5xl font-bold tracking-tight">
                      {Number(stats.rating).toFixed(1)}
                    </span>

                    <Star
                      size={25}
                      className="text-[#e5c28d]"
                      fill="currentColor"
                    />

                  </div>

                  <p className="text-xs text-white/60 mt-2">
                    {stats.reviews} تقييم من العملاء
                  </p>
                </div>

                <div className="hidden sm:block h-12 w-px bg-white/15" />

                <p className="hidden sm:block text-xs leading-6 text-white/65 max-w-[220px]">
                  ستظهر تقييمات العملاء هنا عند بدء استقبال
                  التقييمات على نشاطك.
                </p>

              </div>

            </div>
          </div>

          {/* Business Summary */}

          <div className="rounded-[30px] bg-white border border-[#eadfd5] p-7 shadow-[0_8px_30px_rgba(45,36,36,0.03)]">

            <div className="flex items-center justify-between mb-6">

              <div>
                <p className="text-xs text-[#9b8989]">
                  معلومات النشاط
                </p>

                <h2 className="text-lg font-bold text-[#2d2424] mt-1">
                  حضورك على زَفَاف
                </h2>
              </div>

              <div className="w-11 h-11 rounded-2xl bg-[#f8eee7] text-[#6B3038] flex items-center justify-center">
                <ServiceIcon size={21} />
              </div>

            </div>

            <div className="space-y-4">

              <div>
                <p className="text-[11px] text-[#9b8989] mb-1">
                  اسم النشاط
                </p>

                <p className="text-sm font-semibold text-[#2d2424]">
                  {businessName}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-[#9b8989] mb-1">
                  الموقع
                </p>

                <p className="text-sm font-semibold text-[#2d2424]">
                  {profile?.address ||
                    profile?.governorate ||
                    "لم تتم إضافة الموقع"}
                </p>
              </div>

              <div className="pt-3 border-t border-[#f0e7e1]">

                <Link
                  to="/dashboard/business"
                  className="flex items-center justify-between text-sm font-semibold text-[#6B3038] group"
                >
                  <span>
                    عرض وتعديل البيانات
                  </span>

                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition"
                  />
                </Link>

              </div>

            </div>
          </div>

        </section>

        {/* =================================================
            Stats
        ================================================= */}

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">

          <StatCard
            icon={Package}
            title="الباقات"
            value={stats.packages}
            description="باقة متاحة"
          />

          <StatCard
            icon={ImageIcon}
            title="معرض الصور"
            value={stats.gallery}
            description="صورة في المعرض"
          />

          <StatCard
            icon={PlaySquare}
            title="الريلز"
            value={stats.reels}
            description="فيديو منشور"
          />

        </section>

        {/* =================================================
            Content
        ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5">

          {/* =================================================
              Packages
          ================================================= */}

          <div className="bg-white rounded-[30px] border border-[#eadfd5] overflow-hidden">

            <div className="p-6 sm:p-7 border-b border-[#f0e7e1] flex items-center justify-between">

              <div>
                <p className="text-xs text-[#9b8989]">
                  عروضك
                </p>

                <h2 className="text-lg font-bold text-[#2d2424] mt-1">
                  أحدث الباقات
                </h2>
              </div>

              <Link
                to="/dashboard/packages"
                className="text-xs font-semibold text-[#6B3038] flex items-center gap-1 hover:text-[#4f2027] transition"
              >
                عرض الكل
                <ArrowLeft size={14} />
              </Link>

            </div>

            <div className="p-5 sm:p-6">

              {packages.length === 0 ? (

                <div className="py-12 text-center">

                  <div className="w-14 h-14 mx-auto rounded-2xl bg-[#f8eee7] text-[#6B3038] flex items-center justify-center">
                    <Package size={24} />
                  </div>

                  <h3 className="font-bold text-[#2d2424] mt-4">
                    لم تتم إضافة باقات بعد
                  </h3>

                  <p className="text-xs text-[#9b8989] mt-2">
                    أضف باقاتك ليتمكن العملاء من التعرف على عروضك.
                  </p>

                  <Link
                    to="/dashboard/packages"
                    className="inline-flex items-center gap-2 mt-5 px-5 py-3 rounded-xl bg-[#6B3038] text-white text-xs font-semibold hover:bg-[#57272e] transition"
                  >
                    <Plus size={16} />
                    إضافة باقة
                  </Link>

                </div>

              ) : (

                <div className="space-y-3">

                  {packages.map((item) => (

                    <div
                      key={item?._id}
                      className="group flex items-center gap-4 p-4 rounded-2xl border border-[#f0e7e1] hover:border-[#dfc49e] hover:bg-[#fffaf7] transition"
                    >

                      {/* Image */}

                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#f8eee7] shrink-0">

                        {item?.images?.[0] ? (

                          <img
                            src={item.images[0]}
                            alt={item?.name || "باقة"}
                            className="w-full h-full object-cover"
                          />

                        ) : (

                          <div className="w-full h-full flex items-center justify-center text-[#6B3038]">
                            <Package size={21} />
                          </div>

                        )}

                      </div>

                      {/* Info */}

                      <div className="flex-1 min-w-0">

                        <div className="flex items-center gap-2">

                          <h3 className="text-sm font-bold text-[#2d2424] truncate">
                            {item?.name || "باقة بدون اسم"}
                          </h3>

                          {item?.isActive && (
                            <span className="shrink-0 text-[9px] px-2 py-1 rounded-full bg-[#edf7f0] text-[#287342]">
                              نشطة
                            </span>
                          )}

                        </div>

                        <p className="text-xs text-[#9b8989] mt-1 truncate">
                          {item?.description ||
                            "باقة مميزة من خدمات النشاط"}
                        </p>

                      </div>

                      {/* Price */}

                      <div className="text-left shrink-0">

                        <p className="text-sm font-bold text-[#6B3038]">
                          {Number(item?.price || 0).toLocaleString()} ₪
                        </p>

                        <p className="text-[10px] text-[#b09f99] mt-1">
                          {Array.isArray(item?.services)
                            ? `${item.services.length} خدمات`
                            : "0 خدمات"}
                        </p>

                      </div>

                      <ArrowLeft
                        size={16}
                        className="text-[#b9a9a3] group-hover:text-[#6B3038] transition"
                      />

                    </div>

                  ))}

                </div>

              )}

            </div>
          </div>

          {/* =================================================
              Quick Management
          ================================================= */}

          <div className="bg-[#2d2424] rounded-[30px] p-6 sm:p-7 text-white">

            <div className="mb-7">

              <p className="text-xs text-white/45">
                إدارة النشاط
              </p>

              <h2 className="text-lg font-bold mt-1">
                الوصول السريع
              </h2>

              <p className="text-xs text-white/45 mt-2 leading-6">
                كل ما تحتاجه لإدارة حضور نشاطك في مكان واحد.
              </p>

            </div>

            <div className="space-y-2.5">

              <DashboardLink
                to="/dashboard/packages"
                icon={Package}
                title="الباقات"
                description="إدارة الباقات والأسعار"
              />

              <DashboardLink
                to="/dashboard/gallery"
                icon={ImageIcon}
                title="معرض الصور"
                description="إدارة صور نشاطك"
              />

              <DashboardLink
                to="/dashboard/reels"
                icon={PlaySquare}
                title="الريلز"
                description="إدارة فيديوهات النشاط"
              />

              <DashboardLink
                to="/dashboard/business"
                icon={Store}
                title="بيانات النشاط"
                description="المعلومات الأساسية"
              />

            </div>
          </div>

        </section>

      </div>
    </div>
  );
};

// =========================================================
// Stat Card
// =========================================================

const StatCard = ({
  icon: Icon,
  title,
  value,
  description,
}) => {
  return (
    <div className="bg-white rounded-[24px] border border-[#eadfd5] p-5 shadow-[0_8px_25px_rgba(45,36,36,0.025)]">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs text-[#9b8989]">
            {title}
          </p>

          <p className="text-3xl font-bold text-[#2d2424] mt-2">
            {value}
          </p>

          <p className="text-[11px] text-[#b09f99] mt-1">
            {description}
          </p>

        </div>

        <div className="w-12 h-12 rounded-2xl bg-[#f8eee7] text-[#6B3038] flex items-center justify-center">
          <Icon size={22} />
        </div>

      </div>
    </div>
  );
};

// =========================================================
// Dashboard Link
// =========================================================

const DashboardLink = ({
  to,
  icon: Icon,
  title,
  description,
}) => {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] transition"
    >

      <div className="w-10 h-10 rounded-xl bg-[#e5c28d]/10 text-[#e5c28d] flex items-center justify-center">
        <Icon size={18} />
      </div>

      <div className="flex-1 min-w-0">

        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="text-[11px] text-white/40 mt-0.5">
          {description}
        </p>

      </div>

      <ArrowLeft
        size={16}
        className="text-white/30 group-hover:text-[#e5c28d] transition"
      />

    </Link>
  );
};

export default Dashboard;
