import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  CarFront,
  Gem,
  Scissors,
  Shirt,
  Building2,
  Search,
  X,
  ChevronDown,
} from "lucide-react";

// =========================================================
// Services
// =========================================================

const services = [
  {
    title: "صالات الأفراح",
    description: "اختاري المكان المناسب ليومك.",
    path: "/halls",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85",
    keywords: "قاعة صالة حفلات افراح مكان",
  },
  {
    title: "الكوافيرات والتجميل",
    description: "كل تفاصيل إطلالتك في مكان واحد.",
    path: "/beauty",
    icon: Scissors,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWT8sw4_nVdo379MN94_fRS6IzBPV9lcl9MA997cgn5g&s=10",
    keywords: "كوافير كوافيرات شعر مكياج تجميل عروس",
  },
  {
    title: "فساتين الزفاف",
    description: "تصفحي واختاري فستانك.",
    path: "/bridal-dresses",
    icon: Gem,
    image:
      "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1200&q=85",
    keywords: "فستان فساتين زفاف عروس",
  },
  {
    title: "بدلات العرسان",
    description: "إطلالة العريس تبدأ من هنا.",
    path: "/groom-suits",
    icon: Shirt,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85",
    keywords: "بدلة بدلات عريس رجل",
  },
  {
    title: "التصوير",
    description: "خلي أجمل لحظاتك تبقى.",
    path: "/photographers",
    icon: Camera,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    keywords: "تصوير مصور فوتوغرافي فيديو صور",
  },
  {
    title: "سيارات الزفاف",
    description: "اختاري السيارة التي تناسب يومك.",
    path: "/wedding-cars",
    icon: CarFront,
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85",
    keywords: "سيارة سيارات زفاف تأجير جيب نقل",
  },
];

// =========================================================
// Service Card
// =========================================================

const ServiceCard = ({ service }) => {
  const Icon = service.icon;

  return (
    <Link
      to={service.path}
      className="group overflow-hidden rounded-3xl bg-white shadow-[0_6px_25px_rgba(70,35,30,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(70,35,30,0.09)]"
    >
      <div className="relative aspect-[1.25] overflow-hidden bg-[#f3e9e2]">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#6B3038]">
            <Icon size={17} strokeWidth={1.8} />
          </div>

          <span className="text-sm font-semibold">
            {service.title}
          </span>
        </div>
      </div>

      <div className="flex min-h-[70px] items-center justify-between gap-3 px-4 py-4">
        <p className="text-xs leading-5 text-gray-400">
          {service.description}
        </p>

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038] transition-all duration-300 group-hover:bg-[#6B3038] group-hover:text-white">
          <ArrowLeft size={15} />
        </div>
      </div>
    </Link>
  );
};

// =========================================================
// Service Page
// =========================================================

const ServicePage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // =======================================================
  // Filter Services
  // =======================================================

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return services;
    }

    return services.filter((service) => {
      const searchableText = `
        ${service.title}
        ${service.description}
        ${service.keywords}
      `.toLowerCase();

      return searchableText.includes(query);
    });
  }, [search]);

  // =======================================================
  // Select Service
  // =======================================================

  const handleServiceChange = (event) => {
    const path = event.target.value;

    if (path) {
      navigate(path);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fffaf5] text-[#2d2424]"
    >
      {/* =====================================================
          Top Section
      ====================================================== */}

      <section className="px-5 pb-5 pt-7 md:px-8 md:pb-7 md:pt-9">
        <div className="mx-auto max-w-5xl">

          {/* Title */}

          <div className="text-center">
            <p className="mb-2 text-[11px] font-medium tracking-wide text-[#6B3038]">
              زَفَاف
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-[#2d2424] sm:text-3xl">
              كل اللي تحتاجيه لزفافك، هنا.
            </h1>

            <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-gray-400">
              ابحثي عن الخدمة اللي بدك إياها وابدئي.
            </p>
          </div>

          {/* Search + Services */}

          <div className="mx-auto mt-5 flex w-full max-w-2xl gap-2">

            {/* Search */}

            <div className="flex h-13 min-w-0 flex-1 items-center rounded-2xl border border-[#eaded7] bg-white px-4 shadow-sm transition-all duration-200 focus-within:border-[#6B3038]/30 focus-within:shadow-md">
              <Search
                size={18}
                strokeWidth={1.8}
                className="shrink-0 text-[#6B3038]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="شو بتدوري عليه؟"
                aria-label="البحث عن خدمة"
                className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-[#2d2424] outline-none placeholder:text-gray-400"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="مسح البحث"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038] transition hover:bg-[#ead9cf]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Services Select */}

            <div className="relative shrink-0">
              <Building2
                size={17}
                strokeWidth={1.8}
                className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2 text-[#6B3038]"
              />

              <select
                defaultValue=""
                onChange={handleServiceChange}
                aria-label="اختيار الخدمة"
                className="h-13 w-[105px] cursor-pointer appearance-none rounded-2xl border border-[#eaded7] bg-white pl-8 pr-9 text-xs font-semibold text-[#2d2424] shadow-sm outline-none transition-all duration-200 hover:border-[#6B3038]/30 focus:border-[#6B3038]/30 focus:ring-2 focus:ring-[#6B3038]/10 sm:w-[125px] sm:text-sm"
              >
                <option value="" disabled>
                  الخدمات
                </option>

                {services.map((service) => (
                  <option
                    key={service.path}
                    value={service.path}
                  >
                    {service.title}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={14}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          Services Section
      ====================================================== */}

      <section className="px-5 pb-16 md:px-8 md:pb-20">
        <div className="mx-auto max-w-5xl">

          {/* Section Title */}

          <div className="mb-5">
            <h2 className="text-lg font-bold text-[#2d2424]">
              {search ? "نتائج البحث" : "الخدمات"}
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              {search
                ? filteredServices.length > 0
                  ? `وجدنا ${filteredServices.length} خدمات تناسب بحثك.`
                  : "جربي البحث بكلمة ثانية."
                : "اختاري الخدمة وابدئي التصفح."}
            </p>
          </div>

          {/* Services */}

          {filteredServices.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.path}
                  service={service}
                />
              ))}
            </div>
          ) : (
            /* Empty State */

            <div className="rounded-3xl bg-white px-6 py-12 text-center shadow-[0_6px_25px_rgba(70,35,30,0.04)]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038]">
                <Search size={21} />
              </div>

              <h3 className="mt-4 font-bold text-[#2d2424]">
                ما لقينا اللي بتدوري عليه
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                جربي البحث بكلمة أبسط مثل فستان أو تصوير.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 rounded-full bg-[#6B3038] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#57262D]"
              >
                عرض كل الخدمات
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServicePage;