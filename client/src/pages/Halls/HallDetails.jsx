import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const HallDetails = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Temporary data
  // لاحقًا هذه البيانات ستأتي من الـ API
  const hall = {
    id,
    name: "قصر الياسمين",
    location: "غزة - الرمال",
    rating: 4.9,
    reviewsCount: 128,
    price: 2500,
    priceLabel: "يبدأ من 2500 ₪",
    capacity: "حتى 300 شخص",

    description:
      "قصر الياسمين من الصالات المميزة التي توفر أجواء أنيقة ومريحة للاحتفال بيومك الخاص، مع مساحة واسعة وتجهيزات متكاملة تناسب حفلات الزفاف والمناسبات الكبيرة.",

    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85",
    ],

    features: [
      "تكييف مركزي",
      "موقف سيارات",
      "ديكور",
      "ضيافة",
      "إضاءة احترافية",
      "نظام صوت",
      "غرفة للعروس",
      "كوشة زفاف",
    ],

    packages: [
      {
        name: "الباقة الأساسية",
        price: "2500 ₪",
        description: "مناسبة للحفلات الصغيرة والمتوسطة.",
        features: [
          "استخدام الصالة",
          "الطاولات والكراسي",
          "الإضاءة الأساسية",
          "نظام الصوت",
        ],
      },
      {
        name: "الباقة المميزة",
        price: "3500 ₪",
        description: "كل ما تحتاجينه لحفل أكثر أناقة.",
        features: [
          "استخدام الصالة",
          "ديكور كامل",
          "كوشة زفاف",
          "إضاءة احترافية",
          "ضيافة",
        ],
      },
      {
        name: "الباقة الملكية",
        price: "5000 ₪",
        description: "تجربة متكاملة ليوم لا يُنسى.",
        features: [
          "ديكور فاخر",
          "كوشة مميزة",
          "إضاءة كاملة",
          "ضيافة",
          "غرفة للعروس",
          "تنسيق كامل للقاعة",
        ],
      },
    ],

    reviews: [
      {
        name: "سارة أحمد",
        rating: 5,
        comment:
          "الصالة جميلة جدًا والتنظيم كان رائع، والموظفين متعاونين جدًا.",
        date: "منذ أسبوعين",
      },
      {
        name: "نور محمد",
        rating: 5,
        comment:
          "المكان واسع ومرتب والتجهيزات ممتازة. تجربة جميلة جدًا.",
        date: "منذ شهر",
      },
      {
        name: "ريم علي",
        rating: 4,
        comment:
          "قاعة جميلة جدًا والخدمة ممتازة، أنصح بها.",
        date: "منذ شهرين",
      },
    ],
  };

  return (
    <div className="bg-[#fffaf5]">

      {/* Breadcrumb */}
      <div className="border-b border-[#eadfd7] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link
              to="/"
              className="transition hover:text-[#6B3038]"
            >
              الرئيسية
            </Link>

            <span>←</span>

            <Link
              to="/halls"
              className="transition hover:text-[#6B3038]"
            >
              صالات الأفراح
            </Link>

            <span>←</span>

            <span className="text-[#2d2424]">
              {hall.name}
            </span>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <section className="bg-white px-6 pb-8 pt-8">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-3 lg:grid-cols-4">

            {/* Main Image */}
            <div className="relative h-[420px] overflow-hidden rounded-3xl lg:col-span-2 lg:h-[540px]">

              <img
                src={hall.images[activeImage]}
                alt={hall.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#2d2424]">
                  صالة مميزة
                </span>
              </div>

            </div>

            {/* Side Images */}
            <div className="grid gap-3 lg:col-span-2 lg:grid-cols-2">

              {hall.images.slice(1, 4).map((image, index) => (
                <button
                  key={image}
                  onClick={() => setActiveImage(index + 1)}
                  className="group relative h-[200px] overflow-hidden rounded-3xl lg:h-auto"
                >
                  <img
                    src={image}
                    alt={`${hall.name} ${index + 2}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {index === 2 && (
                    <span className="absolute bottom-4 left-4 rounded-xl bg-black/60 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                      عرض جميع الصور
                    </span>
                  )}
                </button>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

            {/* Content */}
            <div>

              {/* Title */}
              <div className="flex flex-col gap-5 border-b border-[#eadfd7] pb-8 sm:flex-row sm:items-start sm:justify-between">

                <div>
                  <div className="flex flex-wrap items-center gap-3">

                    <h1 className="text-3xl font-bold text-[#2d2424] md:text-4xl">
                      {hall.name}
                    </h1>

                    <span className="rounded-full bg-[#f8eee7] px-3 py-1 text-xs font-semibold text-[#6B3038]">
                      موصى بها
                    </span>

                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">

                    <span>
                      📍 {hall.location}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-gray-300" />

                    <span>
                      👥 {hall.capacity}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-gray-300" />

                    <span className="font-semibold text-[#2d2424]">
                      ⭐ {hall.rating}
                    </span>

                    <span>
                      ({hall.reviewsCount} تقييم)
                    </span>

                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">

                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${
                      isFavorite
                        ? "border-[#6B3038] bg-[#f8eee7] text-[#6B3038]"
                        : "border-[#eadfd7] bg-white text-gray-500 hover:border-[#6B3038]"
                    }`}
                  >
                    {isFavorite ? "♥" : "♡"}
                  </button>

                  <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[#eadfd7] bg-white text-gray-500 transition hover:border-[#6B3038]">
                    ↗
                  </button>

                </div>

              </div>

              {/* Description */}
              <div className="border-b border-[#eadfd7] py-10">

                <h2 className="text-2xl font-bold text-[#2d2424]">
                  عن الصالة
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-8 text-gray-500 md:text-base">
                  {hall.description}
                </p>

              </div>

              {/* Features */}
              <div className="border-b border-[#eadfd7] py-10">

                <h2 className="text-2xl font-bold text-[#2d2424]">
                  المميزات والخدمات
                </h2>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

                  {hall.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 rounded-2xl bg-white p-4"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f8eee7] text-sm">
                        ✓
                      </span>

                      <span className="text-sm font-medium text-[#2d2424]">
                        {feature}
                      </span>
                    </div>
                  ))}

                </div>

              </div>

              {/* Packages */}
              <div className="border-b border-[#eadfd7] py-10">

                <div className="flex items-end justify-between">

                  <div>
                    <span className="text-sm font-semibold text-[#a27643]">
                      الباقات
                    </span>

                    <h2 className="mt-2 text-2xl font-bold text-[#2d2424]">
                      اختاري الباقة المناسبة
                    </h2>
                  </div>

                </div>

                <div className="mt-7 grid gap-5 md:grid-cols-3">

                  {hall.packages.map((pkg, index) => (
                    <div
                      key={pkg.name}
                      className={`rounded-3xl border p-6 ${
                        index === 1
                          ? "border-[#6B3038] bg-[#6B3038] text-white shadow-lg"
                          : "border-[#eadfd7] bg-white"
                      }`}
                    >

                      {index === 1 && (
                        <span className="inline-block rounded-full bg-[#e5c28d] px-3 py-1 text-xs font-bold text-[#2d2424]">
                          الأكثر طلبًا
                        </span>
                      )}

                      <h3
                        className={`mt-3 text-lg font-bold ${
                          index === 1
                            ? "text-white"
                            : "text-[#2d2424]"
                        }`}
                      >
                        {pkg.name}
                      </h3>

                      <div
                        className={`mt-4 text-2xl font-bold ${
                          index === 1
                            ? "text-[#e5c28d]"
                            : "text-[#6B3038]"
                        }`}
                      >
                        {pkg.price}
                      </div>

                      <p
                        className={`mt-3 text-sm leading-7 ${
                          index === 1
                            ? "text-white/70"
                            : "text-gray-500"
                        }`}
                      >
                        {pkg.description}
                      </p>

                      <div className="mt-5 space-y-3">

                        {pkg.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className="text-[#e5c28d]">
                              ✓
                            </span>

                            <span
                              className={
                                index === 1
                                  ? "text-white/80"
                                  : "text-gray-600"
                              }
                            >
                              {feature}
                            </span>
                          </div>
                        ))}

                      </div>

                    </div>
                  ))}

                </div>

              </div>

              {/* Location */}
              <div className="border-b border-[#eadfd7] py-10">

                <h2 className="text-2xl font-bold text-[#2d2424]">
                  موقع الصالة
                </h2>

                <div className="mt-6 overflow-hidden rounded-3xl border border-[#eadfd7] bg-white">

                  <div className="flex h-64 items-center justify-center bg-[#eee8e2]">
                    <div className="text-center">
                      <div className="text-4xl">📍</div>

                      <p className="mt-3 font-semibold text-[#2d2424]">
                        {hall.location}
                      </p>

                      <button className="mt-4 rounded-xl bg-[#6B3038] px-5 py-2.5 text-sm font-semibold text-white">
                        فتح الموقع
                      </button>
                    </div>
                  </div>

                </div>

              </div>

              {/* Reviews */}
              <div className="py-10">

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                  <div>
                    <span className="text-sm font-semibold text-[#a27643]">
                      آراء العملاء
                    </span>

                    <h2 className="mt-2 text-2xl font-bold text-[#2d2424]">
                      ماذا قالت العرائس؟
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-[#2d2424]">
                      {hall.rating}
                    </span>

                    <div>
                      <div className="text-sm">
                        ⭐⭐⭐⭐⭐
                      </div>

                      <span className="text-xs text-gray-400">
                        {hall.reviewsCount} تقييم
                      </span>
                    </div>
                  </div>

                </div>

                <div className="mt-7 space-y-4">

                  {hall.reviews.map((review) => (
                    <div
                      key={review.name}
                      className="rounded-3xl border border-[#eadfd7] bg-white p-6"
                    >

                      <div className="flex items-start justify-between">

                        <div>
                          <h3 className="font-bold text-[#2d2424]">
                            {review.name}
                          </h3>

                          <div className="mt-1 text-sm">
                            {"⭐".repeat(review.rating)}
                          </div>
                        </div>

                        <span className="text-xs text-gray-400">
                          {review.date}
                        </span>

                      </div>

                      <p className="mt-4 text-sm leading-7 text-gray-500">
                        {review.comment}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

            {/* Booking Card */}
            <aside className="lg:relative">

              <div className="sticky top-6 rounded-3xl border border-[#eadfd7] bg-white p-6 shadow-lg">

                <span className="text-sm text-gray-400">
                  سعر الباقة يبدأ من
                </span>

                <div className="mt-2 flex items-end gap-2">

                  <span className="text-3xl font-bold text-[#6B3038]">
                    {hall.price} ₪
                  </span>

                  <span className="pb-1 text-sm text-gray-400">
                    للحفل
                  </span>

                </div>

                <div className="mt-6 border-t border-[#eadfd7] pt-6">

                  <label className="mb-2 block text-sm font-semibold text-[#2d2424]">
                    تاريخ الحفل
                  </label>

                  <input
                    type="date"
                    className="w-full rounded-xl border border-[#eadfd7] bg-[#fffaf5] px-4 py-3 text-sm outline-none focus:border-[#6B3038]"
                  />

                </div>

                <button className="mt-5 w-full rounded-xl bg-[#6B3038] py-4 text-sm font-bold text-white transition hover:bg-[#57262D]">
                  احجزي موعدًا
                </button>

                <button className="mt-3 w-full rounded-xl border border-[#6B3038] py-4 text-sm font-bold text-[#6B3038] transition hover:bg-[#f8eee7]">
                  أرسلي استفسارًا
                </button>

                <p className="mt-5 text-center text-xs leading-6 text-gray-400">
                  لا يتم تأكيد الحجز إلا بعد التواصل مع صاحب الصالة.
                </p>

                <div className="mt-6 rounded-2xl bg-[#f8f4f0] p-4">

                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                      💬
                    </span>

                    <div>
                      <p className="text-sm font-bold text-[#2d2424]">
                        تحتاجين مساعدة؟
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        تواصلي معنا وسنساعدك.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </aside>

          </div>

        </div>
      </section>

    </div>
  );
};

export default HallDetails;