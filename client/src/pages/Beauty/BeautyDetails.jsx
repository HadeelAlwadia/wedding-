import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const BeautyDetails = () => {
  const { id } = useParams();

  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // بيانات تجريبية مؤقتة
  // لاحقًا ستأتي من الـ API
  const salon = {
    id,
    name: "لَمسَة بيوتي",
    location: "غزة - الرمال",
    rating: 4.9,
    reviewsCount: 156,
    price: 250,
    priceLabel: "يبدأ من 250 ₪",

    description:
      "لَمسَة بيوتي هي مساحة متخصصة في جمال العروس وإطلالتها، نقدم خدمات المكياج والتسريحات والعناية بالجمال بأيدي متخصصات، مع الاهتمام بكل تفصيلة لتظهري بإطلالة تليق بيومك المميز.",

    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1600&q=85",
    ],

    services: [
      {
        icon: "💄",
        title: "مكياج العروس",
        description: "إطلالة متكاملة تناسب ملامحك وتفاصيل فستانك.",
      },
      {
        icon: "💇‍♀️",
        title: "تسريحات العروس",
        description: "تسريحات متنوعة تناسب مختلف أنواع الشعر.",
      },
      {
        icon: "✨",
        title: "مكياج مناسبات",
        description: "إطلالات أنيقة للمناسبات والحفلات.",
      },
      {
        icon: "💅",
        title: "العناية بالأظافر",
        description: "خدمات عناية وتجميل للأظافر.",
      },
      {
        icon: "🧖‍♀️",
        title: "العناية بالبشرة",
        description: "جلسات تحضير البشرة قبل المناسبة.",
      },
      {
        icon: "👁️",
        title: "رموش وحواجب",
        description: "تفاصيل بسيطة تكمل إطلالتك.",
      },
    ],

    packages: [
      {
        name: "الباقة الأساسية",
        price: 250,
        description: "اختيار مناسب لإطلالة بسيطة وأنيقة.",
        features: [
          "مكياج عروس",
          "تسريحة شعر",
          "تركيب رموش",
        ],
      },
      {
        name: "باقة العروس",
        price: 400,
        description: "الإطلالة المتكاملة ليوم الزفاف.",
        features: [
          "مكياج عروس فاخر",
          "تسريحة شعر",
          "رموش وحواجب",
          "تحضير البشرة",
          "تعديل الإطلالة",
        ],
        popular: true,
      },
      {
        name: "الباقة الملكية",
        price: 550,
        description: "تجربة جمال متكاملة من البداية للنهاية.",
        features: [
          "جلسة تحضير البشرة",
          "مكياج فاخر",
          "تسريحة متقدمة",
          "رموش وحواجب",
          "عناية بالأظافر",
          "جلسة تعديل",
        ],
      },
    ],

    workingHours: [
      { day: "السبت", hours: "10:00 ص - 8:00 م" },
      { day: "الأحد", hours: "10:00 ص - 8:00 م" },
      { day: "الإثنين", hours: "10:00 ص - 8:00 م" },
      { day: "الثلاثاء", hours: "10:00 ص - 8:00 م" },
      { day: "الأربعاء", hours: "10:00 ص - 8:00 م" },
      { day: "الخميس", hours: "10:00 ص - 9:00 م" },
      { day: "الجمعة", hours: "مغلق" },
    ],

    reviews: [
      {
        name: "سارة أحمد",
        rating: 5,
        comment:
          "المكياج كان جميل جدًا وناسب ملامحي، والتعامل كان راقيًا جدًا.",
        date: "منذ أسبوع",
      },
      {
        name: "نور محمد",
        rating: 5,
        comment:
          "التسريحة والمكياج طلعوا أحلى مما توقعت. تجربة ممتازة.",
        date: "منذ 3 أسابيع",
      },
      {
        name: "ريم علي",
        rating: 4,
        comment:
          "مكان مرتب والخدمة ممتازة والنتيجة كانت جميلة.",
        date: "منذ شهر",
      },
    ],
  };

  return (
    <div className="bg-[#fffaf5]">

      {/* Breadcrumb */}
      <div className="border-b border-[#eadfd7] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">

            <Link
              to="/"
              className="transition hover:text-[#6B3038]"
            >
              الرئيسية
            </Link>

            <span>←</span>

            <Link
              to="/beauty"
              className="transition hover:text-[#6B3038]"
            >
              الكوافيرات والتجميل
            </Link>

            <span>←</span>

            <span className="text-[#2d2424]">
              {salon.name}
            </span>

          </div>

        </div>
      </div>

      {/* Gallery */}
      <section className="bg-white px-6 pb-8 pt-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-3 lg:grid-cols-4">

            {/* Main Image */}
            <div className="relative h-[420px] overflow-hidden rounded-[2rem] lg:col-span-2 lg:h-[540px]">

              <img
                src={salon.images[activeImage]}
                alt={salon.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-7">

                <span className="rounded-full bg-[#e5c28d] px-4 py-2 text-xs font-bold text-[#2d2424]">
                  كوافير مميزة
                </span>

              </div>

            </div>

            {/* Gallery Images */}
            <div className="grid gap-3 lg:col-span-2 lg:grid-cols-2">

              {salon.images.slice(1, 4).map((image, index) => (
                <button
                  key={image}
                  onClick={() => setActiveImage(index + 1)}
                  className="group relative h-[200px] overflow-hidden rounded-[2rem] lg:h-auto"
                >
                  <img
                    src={image}
                    alt={`${salon.name} ${index + 2}`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {index === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25">

                      <span className="rounded-xl bg-black/60 px-5 py-3 text-xs font-bold text-white backdrop-blur">
                        عرض جميع الصور
                      </span>

                    </div>
                  )}

                </button>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* Main */}
      <section className="px-6 py-10">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

            {/* Main Content */}
            <div>

              {/* Header */}
              <div className="flex flex-col gap-5 border-b border-[#eadfd7] pb-8 sm:flex-row sm:items-start sm:justify-between">

                <div>

                  <div className="flex flex-wrap items-center gap-3">

                    <h1 className="text-3xl font-bold text-[#2d2424] md:text-4xl">
                      {salon.name}
                    </h1>

                    <span className="rounded-full bg-[#f8eee7] px-3 py-1 text-xs font-semibold text-[#6B3038]">
                      موصى بها
                    </span>

                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">

                    <span>
                      📍 {salon.location}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-gray-300" />

                    <span className="font-semibold text-[#2d2424]">
                      ⭐ {salon.rating}
                    </span>

                    <span>
                      ({salon.reviewsCount} تقييم)
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

              {/* About */}
              <div className="border-b border-[#eadfd7] py-10">

                <h2 className="text-2xl font-bold text-[#2d2424]">
                  عن {salon.name}
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-8 text-gray-500 md:text-base">
                  {salon.description}
                </p>

              </div>

              {/* Services */}
              <div className="border-b border-[#eadfd7] py-10">

                <span className="text-sm font-semibold text-[#a27643]">
                  خدماتنا
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#2d2424]">
                  كل ما تحتاجينه لإطلالتك
                </h2>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">

                  {salon.services.map((service) => (
                    <div
                      key={service.title}
                      className="rounded-3xl border border-[#eadfd7] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                    >

                      <div className="flex items-start gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f8eee7] text-xl">
                          {service.icon}
                        </div>

                        <div>

                          <h3 className="font-bold text-[#2d2424]">
                            {service.title}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-gray-400">
                            {service.description}
                          </p>

                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

              {/* Packages */}
              <div className="border-b border-[#eadfd7] py-10">

                <span className="text-sm font-semibold text-[#a27643]">
                  الباقات والأسعار
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#2d2424]">
                  اختاري الإطلالة التي تناسبك
                </h2>

                <div className="mt-7 grid gap-5 md:grid-cols-3">

                  {salon.packages.map((pkg) => (

                    <div
                      key={pkg.name}
                      className={`relative rounded-3xl border p-6 transition ${
                        pkg.popular
                          ? "border-[#6B3038] bg-[#6B3038] text-white shadow-xl"
                          : "border-[#eadfd7] bg-white"
                      }`}
                    >

                      {pkg.popular && (
                        <span className="absolute right-5 top-5 rounded-full bg-[#e5c28d] px-3 py-1 text-[10px] font-bold text-[#2d2424]">
                          الأكثر طلبًا
                        </span>
                      )}

                      <h3
                        className={`text-lg font-bold ${
                          pkg.popular
                            ? "text-white"
                            : "text-[#2d2424]"
                        }`}
                      >
                        {pkg.name}
                      </h3>

                      <div
                        className={`mt-5 text-3xl font-bold ${
                          pkg.popular
                            ? "text-[#e5c28d]"
                            : "text-[#6B3038]"
                        }`}
                      >
                        {pkg.price} ₪
                      </div>

                      <p
                        className={`mt-3 text-sm leading-7 ${
                          pkg.popular
                            ? "text-white/65"
                            : "text-gray-400"
                        }`}
                      >
                        {pkg.description}
                      </p>

                      <div className="mt-6 space-y-3">

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
                                pkg.popular
                                  ? "text-white/80"
                                  : "text-gray-600"
                              }
                            >
                              {feature}
                            </span>
                          </div>
                        ))}

                      </div>

                      <button
                        onClick={() => setSelectedPackage(pkg)}
                        className={`mt-7 w-full rounded-xl py-3 text-sm font-bold transition ${
                          pkg.popular
                            ? "bg-[#e5c28d] text-[#2d2424] hover:bg-[#f0d5aa]"
                            : "border border-[#6B3038] text-[#6B3038] hover:bg-[#f8eee7]"
                        }`}
                      >
                        اختيار الباقة
                      </button>

                    </div>

                  ))}

                </div>

              </div>

              {/* Working Hours */}
              <div className="border-b border-[#eadfd7] py-10">

                <h2 className="text-2xl font-bold text-[#2d2424]">
                  أوقات العمل
                </h2>

                <div className="mt-6 max-w-xl overflow-hidden rounded-3xl border border-[#eadfd7] bg-white">

                  {salon.workingHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex items-center justify-between border-b border-[#f0e7e1] px-5 py-4 last:border-b-0"
                    >

                      <span className="text-sm font-semibold text-[#2d2424]">
                        {item.day}
                      </span>

                      <span
                        className={`text-sm ${
                          item.hours === "مغلق"
                            ? "text-red-400"
                            : "text-gray-500"
                        }`}
                      >
                        {item.hours}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

              {/* Location */}
              <div className="border-b border-[#eadfd7] py-10">

                <h2 className="text-2xl font-bold text-[#2d2424]">
                  الموقع
                </h2>

                <div className="mt-6 overflow-hidden rounded-3xl border border-[#eadfd7] bg-white">

                  <div className="flex h-64 items-center justify-center bg-[#eee8e2]">

                    <div className="text-center">

                      <div className="text-4xl">
                        📍
                      </div>

                      <p className="mt-3 font-semibold text-[#2d2424]">
                        {salon.location}
                      </p>

                      <button className="mt-4 rounded-xl bg-[#6B3038] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#57262D]">
                        فتح الموقع
                      </button>

                    </div>

                  </div>

                </div>

              </div>

              {/* Reviews */}
              <div className="py-10">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                  <div>

                    <span className="text-sm font-semibold text-[#a27643]">
                      آراء العميلات
                    </span>

                    <h2 className="mt-2 text-2xl font-bold text-[#2d2424]">
                      تجارب من اختاروا {salon.name}
                    </h2>

                  </div>

                  <div className="flex items-center gap-3">

                    <span className="text-3xl font-bold text-[#2d2424]">
                      {salon.rating}
                    </span>

                    <div>

                      <div className="text-sm">
                        ⭐⭐⭐⭐⭐
                      </div>

                      <span className="text-xs text-gray-400">
                        {salon.reviewsCount} تقييم
                      </span>

                    </div>

                  </div>

                </div>

                <div className="mt-7 space-y-4">

                  {salon.reviews.map((review) => (
                    <div
                      key={review.name}
                      className="rounded-3xl border border-[#eadfd7] bg-white p-6"
                    >

                      <div className="flex items-start justify-between gap-4">

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

            {/* Booking Sidebar */}
            <aside>

              <div className="sticky top-6 rounded-3xl border border-[#eadfd7] bg-white p-6 shadow-lg">

                <div>

                  <span className="text-sm text-gray-400">
                    الخدمات تبدأ من
                  </span>

                  <div className="mt-2">

                    <span className="text-3xl font-bold text-[#6B3038]">
                      {salon.price} ₪
                    </span>

                  </div>

                </div>

                <div className="mt-6 border-t border-[#eadfd7] pt-6">

                  <label className="mb-2 block text-sm font-bold text-[#2d2424]">
                    تاريخ الموعد
                  </label>

                  <input
                    type="date"
                    className="w-full rounded-xl border border-[#eadfd7] bg-[#fffaf5] px-4 py-3 text-sm outline-none focus:border-[#6B3038]"
                  />

                </div>

                <div className="mt-4">

                  <label className="mb-2 block text-sm font-bold text-[#2d2424]">
                    الخدمة
                  </label>

                  <select className="w-full rounded-xl border border-[#eadfd7] bg-[#fffaf5] px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#6B3038]">

                    <option>
                      اختاري الخدمة
                    </option>

                    {salon.services.map((service) => (
                      <option key={service.title}>
                        {service.title}
                      </option>
                    ))}

                  </select>

                </div>

                <button className="mt-5 w-full rounded-xl bg-[#6B3038] py-4 text-sm font-bold text-white transition hover:bg-[#57262D]">
                  احجزي موعدًا
                </button>

                <button className="mt-3 w-full rounded-xl border border-[#6B3038] py-4 text-sm font-bold text-[#6B3038] transition hover:bg-[#f8eee7]">
                  أرسلي استفسارًا
                </button>

                <p className="mt-5 text-center text-xs leading-6 text-gray-400">
                  لا يتم تأكيد الموعد إلا بعد التواصل مع الكوافير.
                </p>

                <div className="mt-6 rounded-2xl bg-[#f8f4f0] p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                      💬
                    </div>

                    <div>

                      <p className="text-sm font-bold text-[#2d2424]">
                        لديكِ سؤال؟
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        تواصلي مع الكوافير مباشرة.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </section>

      {/* Package Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">

          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

            <div className="flex items-start justify-between">

              <div>

                <span className="text-sm text-[#a27643]">
                  الباقة المختارة
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#2d2424]">
                  {selectedPackage.name}
                </h2>

              </div>

              <button
                onClick={() => setSelectedPackage(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f8f4f0] text-gray-500"
              >
                ✕
              </button>

            </div>

            <div className="mt-6 rounded-2xl bg-[#f8eee7] p-5">

              <span className="text-sm text-gray-500">
                السعر
              </span>

              <div className="mt-1 text-2xl font-bold text-[#6B3038]">
                {selectedPackage.price} ₪
              </div>

            </div>

            <p className="mt-5 text-sm leading-7 text-gray-500">
              {selectedPackage.description}
            </p>

            <div className="mt-5 space-y-3">

              {selectedPackage.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-gray-600"
                >
                  <span className="text-[#6B3038]">
                    ✓
                  </span>

                  {feature}
                </div>
              ))}

            </div>

            <button
              onClick={() => setSelectedPackage(null)}
              className="mt-7 w-full rounded-xl bg-[#6B3038] py-4 text-sm font-bold text-white transition hover:bg-[#57262D]"
            >
              متابعة الحجز
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default BeautyDetails;