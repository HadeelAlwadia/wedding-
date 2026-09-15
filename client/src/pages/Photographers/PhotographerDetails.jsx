import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const PhotographerDetails = () => {
  const { id } = useParams();

  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // بيانات تجريبية مؤقتة
  const photographer = {
    id,
    name: "عدسة ليان",
    location: "غزة - الرمال",
    rating: 4.9,
    reviewsCount: 142,
    startingPrice: 1200,

    description:
      "متخصصون في تصوير حفلات الزفاف وتوثيق أجمل التفاصيل بأسلوب أنيق وطبيعي. نهتم بالمشاعر واللحظات العفوية لنقدم لكِ صورًا تبقى ذكرى جميلة لسنوات طويلة.",

    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",

    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=90",
    ],

    services: [
      {
        icon: "📸",
        title: "تصوير فوتوغرافي",
        description:
          "توثيق كامل للحفل وأجمل اللحظات والتفاصيل.",
      },
      {
        icon: "🎥",
        title: "تصوير فيديو",
        description:
          "فيديو احترافي يوثق قصة يومك بطريقة سينمائية.",
      },
      {
        icon: "💍",
        title: "جلسة تصوير العروسين",
        description:
          "جلسة خاصة قبل أو بعد الحفل في المكان الذي تختارينه.",
      },
      {
        icon: "📖",
        title: "ألبوم زفاف",
        description:
          "تصميم وطباعة ألبوم أنيق لأجمل صور يومك.",
      },
      {
        icon: "🎞️",
        title: "مونتاج",
        description:
          "مونتاج احترافي لأجمل لحظات الحفل.",
      },
      {
        icon: "✨",
        title: "تصوير التفاصيل",
        description:
          "تصوير الفستان والخاتم والديكور وكل التفاصيل الصغيرة.",
      },
    ],

    packages: [
      {
        name: "الباقة الأساسية",
        price: 1200,
        description: "اختيار مناسب لمن تريد توثيقًا أنيقًا ومميزًا.",
        features: [
          "مصور واحد",
          "تصوير الحفل",
          "تسليم الصور الرقمية",
          "تعديل احترافي للصور",
        ],
      },
      {
        name: "باقة العروسين",
        price: 1800,
        description:
          "باقة متكاملة لتوثيق يوم الزفاف من البداية للنهاية.",
        features: [
          "مصوران",
          "تصوير التحضيرات",
          "تصوير الحفل",
          "جلسة تصوير للعروسين",
          "تعديل احترافي",
          "تسليم الصور الرقمية",
        ],
        popular: true,
      },
      {
        name: "الباقة الملكية",
        price: 2800,
        description:
          "تجربة تصوير متكاملة مع الصور والفيديو والألبوم.",
        features: [
          "مصوران",
          "تصوير فيديو سينمائي",
          "جلسة تصوير خارجية",
          "تصوير كامل للحفل",
          "مونتاج فيديو",
          "ألبوم زفاف",
          "تسليم جميع الصور الرقمية",
        ],
      },
    ],

    workingHours: [
      {
        day: "السبت",
        hours: "10:00 ص - 9:00 م",
      },
      {
        day: "الأحد",
        hours: "10:00 ص - 9:00 م",
      },
      {
        day: "الإثنين",
        hours: "10:00 ص - 9:00 م",
      },
      {
        day: "الثلاثاء",
        hours: "10:00 ص - 9:00 م",
      },
      {
        day: "الأربعاء",
        hours: "10:00 ص - 9:00 م",
      },
      {
        day: "الخميس",
        hours: "10:00 ص - 10:00 م",
      },
      {
        day: "الجمعة",
        hours: "حسب الحجز",
      },
    ],

    reviews: [
      {
        name: "سارة أحمد",
        rating: 5,
        comment:
          "الصور طلعت أجمل مما توقعنا! المصور كان محترفًا جدًا ويعرف كيف يلتقط اللحظات الحلوة بدون ما نحس.",
        date: "منذ أسبوع",
      },
      {
        name: "نور محمد",
        rating: 5,
        comment:
          "التعامل ممتاز والصور رائعة جدًا، خصوصًا صور جلسة العروسين.",
        date: "منذ أسبوعين",
      },
      {
        name: "ريم علي",
        rating: 4,
        comment:
          "التصوير كان مرتب والنتيجة جميلة جدًا والتسليم كان ممتاز.",
        date: "منذ شهر",
      },
    ],
  };

  return (
    <div className="bg-[#fffaf5]">

      {/* Breadcrumb */}
      <section className="px-6 pt-8">
        <div className="mx-auto max-w-7xl">

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link
              to="/"
              className="transition hover:text-[#6B3038]"
            >
              الرئيسية
            </Link>

            <span>←</span>

            <Link
              to="/photographers"
              className="transition hover:text-[#6B3038]"
            >
              المصورون
            </Link>

            <span>←</span>

            <span className="text-[#6B3038]">
              {photographer.name}
            </span>
          </div>

        </div>
      </section>

      {/* Photographer Header */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

            {/* Gallery */}
            <div>

              <div className="relative overflow-hidden rounded-[2rem] bg-[#2d2424]">

                <img
                  src={photographer.images[activeImage]}
                  alt={photographer.name}
                  className="h-[500px] w-full object-cover md:h-[620px]"
                />

                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Image counter */}
                <div className="absolute bottom-6 right-6 rounded-full bg-black/40 px-4 py-2 text-sm text-white backdrop-blur">
                  {activeImage + 1} / {photographer.images.length}
                </div>

                {/* Favorite */}
                <button
                  type="button"
                  onClick={() =>
                    setIsFavorite(!isFavorite)
                  }
                  className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-xl shadow-lg backdrop-blur transition hover:bg-white"
                >
                  {isFavorite ? "♥" : "♡"}
                </button>

              </div>

              {/* Thumbnails */}
              <div className="mt-4 grid grid-cols-6 gap-2">

                {photographer.images.map(
                  (image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() =>
                        setActiveImage(index)
                      }
                      className={`overflow-hidden rounded-xl ${
                        activeImage === index
                          ? "ring-2 ring-[#6B3038] ring-offset-2"
                          : ""
                      }`}
                    >
                      <img
                        src={image}
                        alt=""
                        className="h-20 w-full object-cover transition hover:scale-105"
                      />
                    </button>
                  )
                )}

              </div>

            </div>

            {/* Info Card */}
            <div className="h-fit rounded-[2rem] border border-[#eadfd7] bg-white p-7 shadow-sm">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <span className="text-xs font-semibold tracking-[2px] text-[#a27643]">
                    مصور زفاف
                  </span>

                  <h1 className="mt-3 text-3xl font-bold text-[#2d2424]">
                    {photographer.name}
                  </h1>

                </div>

                <span className="rounded-full bg-[#f8eee7] px-3 py-2 text-sm font-bold text-[#6B3038]">
                  ✓ موثوق
                </span>

              </div>

              <div className="mt-5 space-y-3 text-sm text-gray-500">

                <p>
                  📍 {photographer.location}
                </p>

                <p>
                  ⭐{" "}
                  <span className="font-bold text-[#2d2424]">
                    {photographer.rating}
                  </span>{" "}
                  <span>
                    ({photographer.reviewsCount} تقييم)
                  </span>
                </p>

                <p>
                  📸 تصوير فوتوغرافي + فيديو
                </p>

              </div>

              <div className="my-7 border-t border-[#f0e7e1]" />

              <div>

                <span className="text-xs text-gray-400">
                  تبدأ الباقات من
                </span>

                <div className="mt-1 flex items-end gap-2">

                  <span className="text-3xl font-bold text-[#6B3038]">
                    {photographer.startingPrice} ₪
                  </span>

                </div>

              </div>

              <button
                type="button"
                className="mt-7 w-full rounded-xl bg-[#6B3038] py-4 text-sm font-bold text-white transition hover:bg-[#57262D]"
              >
                احجزي موعدًا
              </button>

              <button
                type="button"
                className="mt-3 w-full rounded-xl border border-[#6B3038] py-4 text-sm font-bold text-[#6B3038] transition hover:bg-[#fff8f3]"
              >
                أرسلي استفسارًا
              </button>

              <p className="mt-5 text-center text-xs leading-6 text-gray-400">
                لا يتم تأكيد الحجز إلا بعد التواصل مع المصور.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* About */}
      <section className="px-6 py-14">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-4xl">

            <span className="text-sm font-semibold text-[#a27643]">
              عن المصور
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#2d2424]">
              نحفظ اللحظة قبل أن تصبح ذكرى
            </h2>

            <p className="mt-5 text-base leading-9 text-gray-500">
              {photographer.description}
            </p>

          </div>

        </div>

      </section>

      {/* Services */}
      <section className="bg-[#f8f4f0] px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <span className="text-sm font-semibold text-[#a27643]">
              ماذا نقدم؟
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#2d2424]">
              خدمات التصوير
            </h2>

          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {photographer.services.map(
              (service) => (
                <div
                  key={service.title}
                  className="rounded-3xl border border-[#eadfd7] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8eee7] text-2xl">
                    {service.icon}
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#2d2424]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    {service.description}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* Portfolio */}
      <section className="px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>

              <span className="text-sm font-semibold text-[#a27643]">
                أعمالنا
              </span>

              <h2 className="mt-3 text-3xl font-bold text-[#2d2424]">
                من ألبوم الذكريات
              </h2>

            </div>

            <p className="max-w-md text-sm leading-7 text-gray-400">
              مجموعة من اللحظات التي تم توثيقها في حفلات
              زفاف ومناسبات مختلفة.
            </p>

          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">

            {photographer.images.map(
              (image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() =>
                    setActiveImage(index)
                  }
                  className={`group overflow-hidden rounded-3xl ${
                    index === 0
                      ? "md:row-span-2"
                      : ""
                  }`}
                >

                  <img
                    src={image}
                    alt=""
                    className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                      index === 0
                        ? "h-[500px]"
                        : "h-60"
                    }`}
                  />

                </button>
              )
            )}

          </div>

        </div>

      </section>

      {/* Packages */}
      <section className="bg-[#f5ebe3] px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <span className="text-sm font-semibold text-[#a27643]">
              اختاري ما يناسبك
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#2d2424]">
              باقات التصوير
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">
              باقات مختلفة لتختاري منها ما يناسب تفاصيل
              وميزانية يومك.
            </p>

          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">

            {photographer.packages.map(
              (pkg) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-[2rem] border bg-white p-7 ${
                    pkg.popular
                      ? "border-[#6B3038] shadow-xl"
                      : "border-[#eadfd7]"
                  }`}
                >

                  {pkg.popular && (
                    <span className="absolute -top-3 right-7 rounded-full bg-[#6B3038] px-4 py-1.5 text-xs font-bold text-white">
                      الأكثر طلبًا
                    </span>
                  )}

                  <h3 className="text-xl font-bold text-[#2d2424]">
                    {pkg.name}
                  </h3>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-gray-400">
                    {pkg.description}
                  </p>

                  <div className="mt-6">

                    <span className="text-3xl font-bold text-[#6B3038]">
                      {pkg.price}
                    </span>

                    <span className="mr-1 text-sm text-gray-400">
                      ₪
                    </span>

                  </div>

                  <div className="my-6 border-t border-[#f0e7e1]" />

                  <ul className="space-y-4">

                    {pkg.features.map(
                      (feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-sm text-gray-600"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f8eee7] text-xs text-[#6B3038]">
                            ✓
                          </span>

                          {feature}
                        </li>
                      )
                    )}

                  </ul>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPackage(pkg)
                    }
                    className={`mt-8 w-full rounded-xl py-3.5 text-sm font-bold transition ${
                      pkg.popular
                        ? "bg-[#6B3038] text-white hover:bg-[#57262D]"
                        : "border border-[#6B3038] text-[#6B3038] hover:bg-[#fff8f3]"
                    }`}
                  >
                    اختاري هذه الباقة
                  </button>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* Working Hours + Location */}
      <section className="px-6 py-16">

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">

          {/* Hours */}
          <div className="rounded-[2rem] border border-[#eadfd7] bg-white p-7">

            <span className="text-sm font-semibold text-[#a27643]">
              أوقات العمل
            </span>

            <h2 className="mt-3 text-2xl font-bold text-[#2d2424]">
              متى يمكن التواصل؟
            </h2>

            <div className="mt-7 space-y-3">

              {photographer.workingHours.map(
                (item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between rounded-xl bg-[#fffaf5] px-5 py-4"
                  >

                    <span className="text-sm font-semibold text-[#2d2424]">
                      {item.day}
                    </span>

                    <span className="text-sm text-gray-400">
                      {item.hours}
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

          {/* Location */}
          <div className="rounded-[2rem] border border-[#eadfd7] bg-white p-7">

            <span className="text-sm font-semibold text-[#a27643]">
              الموقع
            </span>

            <h2 className="mt-3 text-2xl font-bold text-[#2d2424]">
              أين نجدك؟
            </h2>

            <div className="mt-7 flex h-72 items-center justify-center overflow-hidden rounded-2xl bg-[#f8f4f0]">

              <div className="text-center">

                <div className="text-5xl">
                  📍
                </div>

                <p className="mt-4 font-bold text-[#2d2424]">
                  {photographer.location}
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  الموقع على الخريطة سيظهر هنا
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Reviews */}
      <section className="bg-[#f8f4f0] px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>

              <span className="text-sm font-semibold text-[#a27643]">
                آراء العملاء
              </span>

              <h2 className="mt-3 text-3xl font-bold text-[#2d2424]">
                ماذا قالوا عن تجربتهم؟
              </h2>

            </div>

            <div className="rounded-2xl bg-white px-6 py-4">

              <div className="text-center">

                <div className="text-2xl font-bold text-[#2d2424]">
                  ⭐ {photographer.rating}
                </div>

                <p className="mt-1 text-xs text-gray-400">
                  {photographer.reviewsCount} تقييم
                </p>

              </div>

            </div>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {photographer.reviews.map(
              (review) => (
                <div
                  key={review.name}
                  className="rounded-3xl border border-[#eadfd7] bg-white p-7"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="font-bold text-[#2d2424]">
                        {review.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">
                        {review.date}
                      </p>

                    </div>

                    <span className="text-sm">
                      {"⭐".repeat(review.rating)}
                    </span>

                  </div>

                  <p className="mt-5 text-sm leading-8 text-gray-500">
                    “{review.comment}”
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* Bottom CTA */}
      <section className="bg-[#f5ebe3] px-6 py-16">

        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#6B3038] px-6 py-14 text-center text-white md:px-12">

          <span className="text-3xl">
            📸
          </span>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            جاهزة توثقي أجمل يوم؟
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-white/70">
            اختاري الباقة المناسبة وتواصلي مع المصور
            لمعرفة التفاصيل وتأكيد الموعد.
          </p>

          <button
            type="button"
            className="mt-7 rounded-xl bg-[#e5c28d] px-8 py-4 text-sm font-bold text-[#2d2424] transition hover:bg-[#f0d5aa]"
          >
            ابدئي الحجز الآن
          </button>

        </div>

      </section>

      {/* Package Modal */}
      {selectedPackage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm"
          onClick={() => setSelectedPackage(null)}
        >

          <div
            className="w-full max-w-lg rounded-[2rem] bg-white p-7 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="flex items-start justify-between">

              <div>

                <span className="text-xs font-semibold text-[#a27643]">
                  الباقة المختارة
                </span>

                <h3 className="mt-2 text-2xl font-bold text-[#2d2424]">
                  {selectedPackage.name}
                </h3>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedPackage(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f8f4f0] text-gray-500"
              >
                ×
              </button>

            </div>

            <div className="mt-6 rounded-2xl bg-[#fffaf5] p-5">

              <span className="text-sm text-gray-400">
                السعر
              </span>

              <div className="mt-1 text-3xl font-bold text-[#6B3038]">
                {selectedPackage.price} ₪
              </div>

            </div>

            <label className="mt-6 block">

              <span className="text-sm font-bold text-[#2d2424]">
                تاريخ المناسبة
              </span>

              <input
                type="date"
                className="mt-2 w-full rounded-xl border border-[#eadfd7] px-4 py-3 text-sm outline-none focus:border-[#6B3038]"
              />

            </label>

            <label className="mt-4 block">

              <span className="text-sm font-bold text-[#2d2424]">
                ملاحظات
              </span>

              <textarea
                rows="4"
                placeholder="اكتبي أي تفاصيل تريدين إخبار المصور بها..."
                className="mt-2 w-full resize-none rounded-xl border border-[#eadfd7] px-4 py-3 text-sm outline-none focus:border-[#6B3038]"
              />

            </label>

            <button
              type="button"
              onClick={() =>
                setSelectedPackage(null)
              }
              className="mt-6 w-full rounded-xl bg-[#6B3038] py-4 text-sm font-bold text-white transition hover:bg-[#57262D]"
            >
              إرسال طلب الحجز
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default PhotographerDetails;