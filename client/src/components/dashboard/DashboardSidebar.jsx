import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from '../../assets/logo.ico'
import {
  LayoutDashboard,
  Building2,
  Package,
  PlaySquare,
  Images,
  Settings,
  Shirt,
  Scissors,
  Camera,
  CarFront,
  ChevronLeft,
  Sparkles,
  ArrowUpLeft,
  X,
} from "lucide-react";

/* =========================================================
   SERVICE NAVIGATION
========================================================= */

const getServiceNavigation = (type) => {
  if (
    type === "groom-suits" ||
    type === "wedding-cars" ||
    type === "bridal-dresses"||
    type==='beauty'
  ) {
    return [
      {
        title: "الكتالوج",
        href: "/dashboard/catalog",
        icon: type === "wedding-cars" ? CarFront : Shirt,
      },
    ];
  }
  return [];
};


/* =========================================================
   SERVICE LABEL
========================================================= */

const getServiceLabel = (type) => {
  const labels = {
    hall: "صالات الأفراح",
    beauty: "الكوافيرات",
    "bridal-dresses": "فساتين العرائس",
    "groom-suits": "بدلات العرسان",
    photographers: "المصورين",
    "wedding-cars": "سيارات الزفاف",
  };

  return labels[type] || "مقدم خدمة";
};

/* =========================================================
   SIDEBAR
========================================================= */

const DashboardSidebar = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);

  const navItems = [
    {
      title: "نظرة عامة",
      href: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      title: "ملف النشاط",
      href: "/dashboard/business",
      icon: Building2,
    },

    ...getServiceNavigation(user?.serviceType),

    {
      title: "الباقات",
      href: "/dashboard/packages",
      icon: Package,
    },

    {
      title: "الريلز",
      href: "/dashboard/reels",
      icon: PlaySquare,
    },

    {
      title: "معرض الصور",
      href: "/dashboard/gallery",
      icon: Images,
    },

    {
      title: "الإعدادات",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-40
          bg-[#2d2424]/40
          backdrop-blur-[2px]
          transition-opacity
          duration-300
          lg:hidden

          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        dir="rtl"
        className={`
          fixed
          right-0
          top-0
          z-50
          flex
          h-screen
          w-[285px]
          flex-col
          overflow-hidden
          border-l
          border-[#eadfd8]
          bg-[#fcf8f3]

          transition-transform
          duration-300
          ease-[cubic-bezier(0.4,0,0.2,1)]

          lg:translate-x-0

          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >

        {/* =====================================================
            TOP DECORATION
        ====================================================== */}

        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#e5c28d]/10 blur-3xl" />

        <div className="pointer-events-none absolute -left-20 top-[40%] h-40 w-40 rounded-full bg-[#6B3038]/5 blur-3xl" />

        {/* =====================================================
            MOBILE CLOSE BUTTON
        ====================================================== */}

        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق القائمة"
          className="
            absolute
            left-5
            top-5
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-[#eadfd8]
            bg-white
            text-[#6B3038]
            shadow-sm
            transition
            hover:bg-[#f8eee7]
            lg:hidden
          "
        >
          <X
            size={17}
            strokeWidth={1.7}
          />
        </button>

        {/* =====================================================
            BRAND
        ====================================================== */}

        <div className="relative px-7 pb-6 pt-7">

          <Link
            to="/"
            onClick={onClose}
            className="group flex items-center gap-3"
          >

            <div
              className="
                relative
                flex
                h-[50px]
                w-[50px]
                shrink-0
                items-center
                justify-center
                rounded-[17px]
                bg-[#6B3038]
                shadow-[0_10px_30px_rgba(107,48,56,0.20)]
              "
            >

              <div className="absolute inset-[5px] rounded-[13px] border border-[#e5c28d]/25" />

            <img src={logo} alt="زَفَاف" className="relative z-10 h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105" />

            </div>

            <div>
              <h1 className="font-serif text-[22px] font-semibold tracking-wide text-[#2d2424]">
                زَفَاف
              </h1>

              <div className="mt-0.5 flex items-center gap-2">

                <span className="h-px w-5 bg-[#e5c28d]" />

                <span className="text-[9px] font-medium tracking-[0.2em] text-[#9b8580]">
                  BUSINESS
                </span>

              </div>
            </div>

          </Link>

        </div>

        {/* =====================================================
            PROVIDER PROFILE
        ====================================================== */}

        <div className="relative px-5">

          <div
            className="
              overflow-hidden
              rounded-[24px]
              border
              border-[#e8ddd5]
              bg-white
              shadow-[0_8px_35px_rgba(45,36,36,0.035)]
            "
          >

            <div className="relative px-5 py-5">

              <div className="absolute inset-x-5 top-0 h-[2px] bg-gradient-to-l from-transparent via-[#e5c28d] to-transparent" />

              <div className="flex items-center gap-3">

                <div
                  className="
                    relative
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[15px]
                    bg-[#f8eee7]
                    text-[#6B3038]
                  "
                >
                  {user?.businessLogo ? (
                    <img
                      src={user.businessLogo}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Building2
                      size={20}
                      strokeWidth={1.4}
                    />
                  )}
                </div>

                <div className="min-w-0">

                  <p className="mb-1 text-[9px] font-medium tracking-wide text-[#aa9690]">
                    نشاطك التجاري
                  </p>

                  <h2 className="truncate text-[13px] font-semibold text-[#2d2424]">
                    {user?.businessName ||
                      user?.name ||
                      "نشاطك"}
                  </h2>

                </div>

              </div>

              <div className="mt-4 flex items-center justify-between">

                <span className="text-[10px] text-[#9b8580]">
                  نوع النشاط
                </span>

                <span
                  className="
                    rounded-full
                    border
                    border-[#ead6b7]
                    bg-[#fcf7ef]
                    px-3
                    py-1.5
                    text-[9px]
                    font-semibold
                    text-[#6B3038]
                  "
                >
                  {getServiceLabel(user?.serviceType)}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            NAVIGATION TITLE
        ====================================================== */}

        <div className="px-6 pb-2 pt-8">

          <div className="flex items-center gap-3">

            <span className="text-[9px] font-bold tracking-[0.18em] text-[#aa9690]">
              إدارة النشاط
            </span>

            <div className="h-px flex-1 bg-[#e9ded7]" />

          </div>

        </div>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}

        <nav className="flex-1 overflow-y-auto px-4 py-3">

          <div className="space-y-1">

            {navItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === "/dashboard"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    rounded-[16px]
                    px-3
                    py-2.5
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "bg-[#6B3038] text-white shadow-[0_8px_24px_rgba(107,48,56,0.16)]"
                        : "text-[#66534e] hover:bg-white hover:text-[#6B3038] hover:shadow-[0_5px_18px_rgba(45,36,36,0.035)]"
                    }
                  `
                  }
                >
                  {({ isActive }) => (
                    <>

                      {/* Active indicator */}

                      <span
                        className={`
                          absolute
                          right-0
                          top-1/2
                          h-6
                          w-[3px]
                          -translate-y-1/2
                          rounded-l-full
                          bg-[#e5c28d]
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? "opacity-100"
                              : "opacity-0"
                          }
                        `}
                      />

                      {/* Icon */}

                      <span
                        className={`
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-[12px]
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? "bg-white/10 text-[#e5c28d]"
                              : "bg-[#f8eee7] text-[#927b74] group-hover:bg-[#f4e9e2] group-hover:text-[#6B3038]"
                          }
                        `}
                      >
                        <Icon
                          size={17}
                          strokeWidth={1.6}
                        />
                      </span>

                      {/* Text */}

                      <span className="flex-1 text-[12px] font-medium">
                        {item.title}
                      </span>

                      {/* Arrow */}

                      <ChevronLeft
                        size={14}
                        strokeWidth={1.5}
                        className={`
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? "translate-x-0 text-[#e5c28d] opacity-100"
                              : "-translate-x-1 text-[#aa9690] opacity-0 group-hover:translate-x-0 group-hover:opacity-70"
                          }
                        `}
                      />

                    </>
                  )}
                </NavLink>
              );
            })}

          </div>

        </nav>

        {/* =====================================================
            PREMIUM FOOTER
        ====================================================== */}

        <div className="px-5 pb-5 pt-2">

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[22px]
              bg-[#2d2424]
              px-4
              py-4
            "
          >

            <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-[#e5c28d]/10 blur-2xl" />

            <div className="relative flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#e5c28d]/10">

                  <Sparkles
                    size={15}
                    strokeWidth={1.4}
                    className="text-[#e5c28d]"
                  />

                </div>

                <div>

                  <p className="text-[9px] text-[#bba9a3]">
                    حضورك على زَفَاف
                  </p>

                  <p className="mt-0.5 text-[10px] font-medium text-white">
                    اصنع تجربة لا تُنسى
                  </p>

                </div>

              </div>

              <ArrowUpLeft
                size={15}
                className="text-[#e5c28d]/60"
                strokeWidth={1.4}
              />

            </div>

          </div>

        </div>

      </aside>
    </>
  );
};

export default DashboardSidebar;