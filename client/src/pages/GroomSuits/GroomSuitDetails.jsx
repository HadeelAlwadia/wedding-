import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const GroomSuitDetails = () => {
  const { id } = useParams();

  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const suit = {
    id,
    name: "بدلة العريس الكلاسيكية",
    store: "Elegance Men",
    location: "غزة - الرمال",

    rating: 4.9,
    reviewsCount: 94,

    price: 850,

    description:
      "بدلة أنيقة بتصميم كلاسيكي عصري، مناسبة للعريس الذي يبحث عن إطلالة راقية ومميزة في يوم زفافه. يمكن تنسيقها مع مجموعة من القمصان وربطات العنق والإكسسوارات حسب ذوقك.",

    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1555069519-127aadedf1ee?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1600&q=90",
    ],

    colors: [
      "أسود",
      "كحلي",
      "رمادي",
    ],

    sizes: [
      "46",
      "48",
      "50",
      "52",
      "54",
      "56",
    ],

    details: [
      {
        label: "نوع البدلة",
        value: "كلاسيكية",
      },
      {
        label: "الخامة",
        value: "قماش فاخر",
      },
      {
        label: "القصة",
        value: "Slim Fit",
      },
      {
        label: "الاستخدام",
        value: "زفاف ومناسبات",
      },
    ],

    accessories: [
      {
        icon: "👔",
        title: "قميص",
        description: "قميص أبيض أو حسب اختيارك.",
      },
      {
        icon: "🎀",
        title: "ربطة عنق",
        description: "مجموعة ربطات بألوان مختلفة.",
      },
      {
        icon: "👞",
        title: "حذاء",
        description: "أحذية رسمية لتكمل الإطلالة.",
      },
      {
        icon: "⌚",
        title: "إكسسوارات",
        description: "تفاصيل أنيقة لإطلالة متكاملة.",
      },
    ],

    packages: [
      {
        name: "البدلة فقط",
        price: 850,
        description: "اختيار مناسب لمن يمتلك باقي تفاصيل الإطلالة.",
        features: [
          "البدلة",
          "البنطلون",
          "التفصيل حسب المقاس",
        ],
      },
      {
        name: "إطلالة العريس",
        price: 1200,
        description: "إطلالة متكاملة ليوم الزفاف.",
        features: [
          "البدلة",
          "قميص",
          "ربطة عنق",
          "منديل جيب",
          "تعديل المقاس",
        ],
        popular: true,
      },
      {
        name: "الباقة الملكية",
        price: 1600,
        description: "كل ما يحتاجه العريس لإطلالة متكاملة.",
        features: [
          "البدلة",
          "قميص فاخر",
          "ربطة عنق",
          "حذاء رسمي",
          "منديل جيب",
          "إكسسوارات",
          "تعديل المقاس",
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
        hours: "مغلق",
      },
    ],

    reviews: [
      {
        name: "محمد أحمد",
        rating: 5,
        comment:
          "البدلة ممتازة والخامة جميلة جدًا، والتعديل على المقاس كان دقيق.",
        date: "منذ أسبوع",
      },
      {
        name: "عمر خالد",
        rating: 5,
        comment:
          "تعامل راقي جدًا والبدلة طلعت أجمل مما توقعت.",
        date: "منذ أسبوعين",
      },
      {
        name: "أحمد علي",
        rating: 4,
        comment:
          "خيارات كثيرة والأسعار جيدة، والتجربة كانت ممتازة.",
        date: "منذ شهر",
      },
    ],
  };

  return (
    <div className="bg-[#fffaf5]">

      {/* Breadcrumb */}
      <section className="px-6 pt-8">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">

            <Link
              to="/"
              className="transition hover:text-[#6B3038]"
            >
              الرئيسية
            </Link>

            <span>←</span>

            <Link
              to="/groom-suits"
              className="transition hover:text-[#6B3038]"
            >
              بدلات العرسان
            </Link>

            <span>←</span>

            <span className="text-[#6B3038]">
              {suit.name}
            </span>

          </div>

        </div>
      </section>

      {/* Main Product */}
      <section className="px-6 py-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* Gallery */}
            <div>

              <div className="relative overflow-hidden rounded-[2rem] bg-[#2d2424]">

                <img
                  src={suit.images[activeImage]}
                  alt={suit.name}
                  className="h-[520px] w-full object-cover md:h-[650px]"
                />

                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-6 right-6 rounded-full bg-black/40 px-4 py-2 text-sm text-white backdrop-blur">
                  {activeImage + 1} / {suit.images.length}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setIsFavorite(!isFavorite)
                  }
                  className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-xl shadow-lg transition hover:bg-white"
                >
                  {isFavorite ? "♥" : "♡"}
                </button>

              </div>

              {/* Thumbnails */}
              <div className="mt-4 grid grid-cols-5 gap-3">

                {suit.images.map((image, index) => (
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
                      className="h-24 w-full object-cover transition hover:scale-105"
                    />

                  </button>
                ))}

              </div>

            </div>

            {/* Product Info */}
            <aside className="h-fit rounded-[2rem] border border-[#eadfd7] bg-white p-7 shadow-sm">

              <span className="text-xs font-semibold tracking-[2px] text-[#a27643]">
                بدلة عريس
              </span>

              <div className="mt-3 flex items-start justify-between gap-4">

                <h1 className="text-3xl font-bold leading-tight text-[#2d2424]">
                  {suit.name}
                </h1>

                <span className="rounded-full bg-[#f8eee7] px-3 py-2 text-xs font-bold text-[#6B3038]">
                  ✓ موثوق
                </span>

              </div>

              <p className="mt-3 text-sm text-gray-400">
                {suit.store}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">

                <span>
                  📍 {suit.location}
                </span>

                <span>
                  ⭐{" "}
                  <strong className="text-[#2d2424]">
                    {suit.rating}
                  </strong>{" "}
                  ({suit.reviewsCount})
                </span>

              </div>

              <div className="my-7 border-t border-[#f0e7e1]" />

              {/* Price */}
              <div>

                <span className="text-xs text-gray-400">
                  السعر يبدأ من
                </span>

                <div className="mt-1">

                  <span className="text-3xl font-bold text-[#6B3038]">
                    {suit.price} ₪
                  </span>

                </div>

              </div>

              {/* Color */}
              <div className="mt-7">

                <h3 className="text-sm font-bold text-[#2d2424]">
                  اللون
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">

                  {suit.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="rounded-xl border border-[#eadfd7] px-4 py-2.5 text-xs text-gray-600 transition hover:border-[#6B3038] hover:text-[#6B3038]"
                    >
                      {color}
                    </button>
                  ))}

                </div>

              </div>

              {/* Size */}
              <div className="mt-7">

                <div className="flex items-center justify-between">

                  <h3 className="text-sm font-bold text-[#2d2424]">
                    المقاس
                  </h3>

                  <button
                    type="button"
                    className="text-xs font-semibold text-[#6B3038]"
                  >
                    دليل المقاسات
                  </button>

                </div>

                <div className="mt-3 grid grid-cols-4 gap-2">

                  {suit.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setSelectedSize(size)
                      }
                      className={`rounded-xl border py-3 text-sm font-semibold transition ${
                        selectedSize === size
                          ? "border-[#6B3038] bg-[#6B3038] text-white"
                          : "border-[#eadfd7] text-gray-600 hover:border-[#6B3038]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedPackage(
                    suit.packages[1]
                  )
                }
                className="mt-7 w-full rounded-xl bg-[#6B3038] py-4 text-sm font-bold text-white transition hover:bg-[#57262D]"
              >
                احجز موعد تجربة
              </button>

              <button
                type="button"
                className="mt-3 w-full rounded-xl border border-[#6B3038] py-4 text-sm font-bold text-[#6B3038] transition hover:bg-[#fff8f3]"
              >
                أرسل استفسارًا
              </button>

              <p className="mt-5 text-center text-xs leading-6 text-gray-400">
                احجز موعدًا لقياس البدلة وتجربتها قبل تأكيد الطلب.
              </p>

            </aside>

          </div>

        </div>

      </section>

      {/* About */}
      <section className="px-6 py-14">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-4xl">

            <span className="text-sm font-semibold text-[#a27643]">
              عن البدلة
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#2d2424]">
              إطلالة تليق بيومك الكبير
            </h2>

            <p className="mt-5 text-base leading-9 text-gray-500">
              {suit.description}
            </p>

          </div>

        </div>

      </section>

      {/* Details */}
      <section className="bg-[#f8f4f0] px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <span className="text-sm font-semibold text-[#a27643]">
              التفاصيل
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#2d2424]">
              كل التفاصيل التي تهمك
            </h2>

          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {suit.details.map((detail) => (
              <div
                key={detail.label}
                className="rounded-3xl border border-[#eadfd7] bg-white p-6 text-center"
              >

                <span className="text-sm text-gray-400">
                  {detail.label}
                </span>

                <p className="mt-3 text-lg font-bold text-[#2d2424]">
                  {detail.value}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Accessories */}
      <section className="px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div>

            <span className="text-sm font-semibold text-[#a27643]">
              أكمل إطلالتك
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#2d2424]">
              إكسسوارات العريس
            </h2>

          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {suit.accessories.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[#eadfd7] bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8eee7] text-2xl">
                  {item.icon}
                </div>

                <h3 className="mt-5 font-bold text-[#2d2424]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Packages */}
      <section className="bg-[#f5ebe3] px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <span className="text-sm font-semibold text-[#a27643]">
              باقات العريس
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#2d2424]">
              اختار الباقة المناسبة لك
            </h2>

          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">

            {suit.packages.map((pkg) => (
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

                <p className="mt-3 min-h-12 text-sm leading-7 text-gray-400">
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

                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >

                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f8eee7] text-xs text-[#6B3038]">
                        ✓
                      </span>

                      {feature}

                    </li>
                  ))}

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
                  اختار هذه الباقة
                </button>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Hours + Location */}
      <section className="px-6 py-16">

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">

          {/* Hours */}
          <div className="rounded-[2rem] border border-[#eadfd7] bg-white p-7">

            <span className="text-sm font-semibold text-[#a27643]">
              أوقات العمل
            </span>

            <h2 className="mt-3 text-2xl font-bold text-[#2d2424]">
              مواعيد التجربة
            </h2>

            <div className="mt-7 space-y-3">

              {suit.workingHours.map((item) => (
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
              ))}

            </div>

          </div>

          {/* Location */}
          <div className="rounded-[2rem] border border-[#eadfd7] bg-white p-7">

            <span className="text-sm font-semibold text-[#a27643]">
              الموقع
            </span>

            <h2 className="mt-3 text-2xl font-bold text-[#2d2424]">
              موقع المتجر
            </h2>

            <div className="mt-7 flex h-72 items-center justify-center rounded-2xl bg-[#f8f4f0]">

              <div className="text-center">

                <div className="text-5xl">
                  📍
                </div>

                <p className="mt-4 font-bold text-[#2d2424]">
                  {suit.location}
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  الموقع على الخريطة سيظهر هنا
                </p>

                <button
                  type="button"
                  className="mt-5 rounded-xl bg-[#6B3038] px-5 py-3 text-sm font-semibold text-white"
                >
                  فتح الموقع
                </button>

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
                تجارب العرسان
              </h2>

            </div>

            <div className="rounded-2xl bg-white px-6 py-4">

              <div className="text-center">

                <div className="text-2xl font-bold text-[#2d2424]">
                  ⭐ {suit.rating}
                </div>

                <p className="mt-1 text-xs text-gray-400">
                  {suit.reviewsCount} تقييم
                </p>

              </div>

            </div>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {suit.reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-3xl border border-[#eadfd7] bg-white p-7"
              >

                <div className="flex items-start justify-between gap-4">

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
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-[#f5ebe3] px-6 py-16">

        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#6B3038] px-6 py-14 text-center text-white md:px-12">

          <span className="text-3xl">
            🤵
          </span>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            جاهز تختار إطلالتك؟
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-white/70">
            اختار البدلة والمقاس المناسب واحجز موعدًا
            لتجربتها قبل يومك الكبير.
          </p>

          <button
            type="button"
            onClick={() =>
              setSelectedPackage(suit.packages[1])
            }
            className="mt-7 rounded-xl bg-[#e5c28d] px-8 py-4 text-sm font-bold text-[#2d2424] transition hover:bg-[#f0d5aa]"
          >
            احجز موعد التجربة
          </button>

        </div>

      </section>

      {/* Booking Modal */}
      {selectedPackage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm"
          onClick={() =>
            setSelectedPackage(null)
          }
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

            {/* Selected Size */}
            <div className="mt-6">

              <label className="text-sm font-bold text-[#2d2424]">
                المقاس
              </label>

              <select
                value={selectedSize}
                onChange={(event) =>
                  setSelectedSize(event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-[#eadfd7] bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#6B3038]"
              >

                <option value="">
                  اختر المقاس
                </option>

                {suit.sizes.map((size) => (
                  <option key={size} value={size}>
                    مقاس {size}
                  </option>
                ))}

              </select>

            </div>

            {/* Date */}
            <div className="mt-5">

              <label className="text-sm font-bold text-[#2d2424]">
                تاريخ المناسبة
              </label>

              <input
                type="date"
                className="mt-2 w-full rounded-xl border border-[#eadfd7] bg-white px-4 py-3 text-sm outline-none focus:border-[#6B3038]"
              />

            </div>

            {/* Notes */}
            <div className="mt-5">

              <label className="text-sm font-bold text-[#2d2424]">
                ملاحظات
              </label>

              <textarea
                rows="3"
                placeholder="اكتب أي ملاحظات..."
                className="mt-2 w-full resize-none rounded-xl border border-[#eadfd7] px-4 py-3 text-sm outline-none focus:border-[#6B3038]"
              />

            </div>

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

export default GroomSuitDetails;