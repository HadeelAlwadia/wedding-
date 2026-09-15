import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Photographers = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("الكل");
  const [photographyType, setPhotographyType] = useState("الكل");
  const [rating, setRating] = useState("الكل");
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sortBy, setSortBy] = useState("recommended");
  const [favorites, setFavorites] = useState([]);

  const photographers = [
    {
      id: 1,
      name: "عدسة ليان",
      location: "غزة - الرمال",
      rating: 4.9,
      reviews: 142,
      price: 1200,
      type: "تصوير فوتوغرافي",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
      services: [
        "تصوير فوتوغرافي",
        "فيديو",
        "جلسة خارجية",
      ],
      featured: true,
      available: true,
    },
    {
      id: 2,
      name: "Lens Studio",
      location: "غزة - النصر",
      rating: 4.8,
      reviews: 97,
      price: 1500,
      type: "تصوير وفيديو",
      image:
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&q=85",
      services: [
        "تصوير فوتوغرافي",
        "فيديو سينمائي",
        "مونتاج",
      ],
      featured: true,
      available: true,
    },
    {
      id: 3,
      name: "لحظة للتصوير",
      location: "خانيونس",
      rating: 4.7,
      reviews: 81,
      price: 900,
      type: "تصوير فوتوغرافي",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
      services: [
        "تصوير فوتوغرافي",
        "جلسة عروس",
        "ألبوم",
      ],
      featured: false,
      available: true,
    },
    {
      id: 4,
      name: "Frame Wedding",
      location: "غزة - تل الهوى",
      rating: 4.6,
      reviews: 63,
      price: 1100,
      type: "فيديو",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
      services: [
        "فيديو زفاف",
        "تصوير سينمائي",
        "مونتاج",
      ],
      featured: false,
      available: true,
    },
    {
      id: 5,
      name: "ذكرى ستوديو",
      location: "دير البلح",
      rating: 4.8,
      reviews: 72,
      price: 1000,
      type: "تصوير فوتوغرافي",
      image:
        "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85",
      services: [
        "تصوير فوتوغرافي",
        "جلسة خارجية",
        "ألبوم",
      ],
      featured: false,
      available: false,
    },
    {
      id: 6,
      name: "White Lens",
      location: "رفح",
      rating: 4.5,
      reviews: 41,
      price: 750,
      type: "تصوير وفيديو",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
      services: [
        "تصوير",
        "فيديو",
        "مونتاج",
      ],
      featured: false,
      available: true,
    },
  ];

  const filteredPhotographers = useMemo(() => {
    let result = photographers.filter((photographer) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        photographer.name.toLowerCase().includes(searchValue) ||
        photographer.location.toLowerCase().includes(searchValue);

      const matchesLocation =
        location === "الكل" ||
        photographer.location.includes(location);

      const matchesType =
        photographyType === "الكل" ||
        photographer.type === photographyType;

      const matchesRating =
        rating === "الكل" ||
        photographer.rating >= Number(rating);

      const matchesPrice =
        photographer.price <= maxPrice;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesRating &&
        matchesPrice
      );
    });

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    search,
    location,
    photographyType,
    rating,
    maxPrice,
    sortBy,
  ]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setLocation("الكل");
    setPhotographyType("الكل");
    setRating("الكل");
    setMaxPrice(3000);
    setSortBy("recommended");
  };

  return (
    <div className="bg-[#fffaf5]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#2d2424] px-6 py-24 text-white">

        {/* Decorative circles */}
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#e5c28d]/10" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-[#e5c28d]/10" />

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <span className="text-sm font-semibold tracking-[3px] text-[#e5c28d]">
              لحظات لا تُنسى
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              خلي أجمل لحظاتك
              <br />
              تبقى للأبد
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              اكتشفي مصورين محترفين لتوثيق تفاصيل يومك،
              من لحظة الاستعداد وحتى آخر صورة في حفلك.
            </p>

          </div>

        </div>
      </section>

      {/* Search */}
      <section className="relative z-20 px-6">

        <div className="mx-auto -mt-8 max-w-7xl">

          <div className="rounded-3xl border border-[#eadfd7] bg-white p-4 shadow-xl">

            <div className="flex flex-col gap-3 lg:flex-row">

              {/* Search */}
              <div className="flex flex-1 items-center rounded-2xl bg-[#fffaf5] px-5">

                <span className="ml-3 text-lg">
                  🔎
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="ابحثي عن مصور أو منطقة..."
                  className="w-full bg-transparent py-4 text-sm text-[#2d2424] outline-none"
                />

              </div>

              {/* Location */}
              <select
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                className="rounded-2xl bg-[#fffaf5] px-5 py-4 text-sm text-gray-600 outline-none"
              >
                <option value="الكل">
                  كل المناطق
                </option>

                <option value="غزة">
                  غزة
                </option>

                <option value="خانيونس">
                  خانيونس
                </option>

                <option value="دير البلح">
                  دير البلح
                </option>

                <option value="رفح">
                  رفح
                </option>
              </select>

              {/* Type */}
              <select
                value={photographyType}
                onChange={(event) =>
                  setPhotographyType(event.target.value)
                }
                className="rounded-2xl bg-[#fffaf5] px-5 py-4 text-sm text-gray-600 outline-none"
              >
                <option value="الكل">
                  كل أنواع التصوير
                </option>

                <option value="تصوير فوتوغرافي">
                  تصوير فوتوغرافي
                </option>

                <option value="فيديو">
                  فيديو
                </option>

                <option value="تصوير وفيديو">
                  تصوير وفيديو
                </option>
              </select>

              <button
                type="button"
                className="rounded-2xl bg-[#6B3038] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#57262D]"
              >
                بحث
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* Main */}
      <section className="px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[270px_1fr]">

            {/* Filters */}
            <aside className="h-fit rounded-3xl border border-[#eadfd7] bg-white p-6">

              <div className="flex items-center justify-between">

                <h2 className="text-lg font-bold text-[#2d2424]">
                  تصفية النتائج
                </h2>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#6B3038] transition hover:text-[#a27643]"
                >
                  إعادة ضبط
                </button>

              </div>

              {/* Location */}
              <div className="mt-7 border-t border-[#f0e7e1] pt-6">

                <h3 className="text-sm font-bold text-[#2d2424]">
                  المنطقة
                </h3>

                <div className="mt-4 space-y-3">

                  {[
                    "الكل",
                    "غزة",
                    "خانيونس",
                    "دير البلح",
                    "رفح",
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-500"
                    >
                      <input
                        type="radio"
                        name="location"
                        checked={location === item}
                        onChange={() => setLocation(item)}
                        className="accent-[#6B3038]"
                      />

                      {item}
                    </label>
                  ))}

                </div>

              </div>

              {/* Price */}
              <div className="mt-7 border-t border-[#f0e7e1] pt-6">

                <h3 className="text-sm font-bold text-[#2d2424]">
                  السعر
                </h3>

                <div className="mt-5">

                  <input
                    type="range"
                    min="300"
                    max="3000"
                    step="100"
                    value={maxPrice}
                    onChange={(event) =>
                      setMaxPrice(Number(event.target.value))
                    }
                    className="w-full accent-[#6B3038]"
                  />

                  <div className="mt-3 flex justify-between text-xs text-gray-400">

                    <span>
                      300 ₪
                    </span>

                    <span>
                      حتى {maxPrice} ₪
                    </span>

                  </div>

                </div>

              </div>

              {/* Rating */}
              <div className="mt-7 border-t border-[#f0e7e1] pt-6">

                <h3 className="text-sm font-bold text-[#2d2424]">
                  التقييم
                </h3>

                <div className="mt-4 space-y-3">

                  {[
                    {
                      value: "الكل",
                      label: "كل التقييمات",
                    },
                    {
                      value: "4.5",
                      label: "4.5 فأعلى",
                    },
                    {
                      value: "4",
                      label: "4 فأعلى",
                    },
                    {
                      value: "3",
                      label: "3 فأعلى",
                    },
                  ].map((item) => (
                    <label
                      key={item.value}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-500"
                    >

                      <input
                        type="radio"
                        name="rating"
                        checked={rating === item.value}
                        onChange={() =>
                          setRating(item.value)
                        }
                        className="accent-[#6B3038]"
                      />

                      <span>
                        {item.label}
                      </span>

                    </label>
                  ))}

                </div>

              </div>

              {/* Photography Type */}
              <div className="mt-7 border-t border-[#f0e7e1] pt-6">

                <h3 className="text-sm font-bold text-[#2d2424]">
                  نوع التصوير
                </h3>

                <div className="mt-4 space-y-3">

                  {[
                    "الكل",
                    "تصوير فوتوغرافي",
                    "فيديو",
                    "تصوير وفيديو",
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-500"
                    >

                      <input
                        type="radio"
                        name="photographyType"
                        checked={
                          photographyType === item
                        }
                        onChange={() =>
                          setPhotographyType(item)
                        }
                        className="accent-[#6B3038]"
                      />

                      {item}

                    </label>
                  ))}

                </div>

              </div>

              {/* Services */}
              <div className="mt-7 border-t border-[#f0e7e1] pt-6">

                <h3 className="text-sm font-bold text-[#2d2424]">
                  الخدمات
                </h3>

                <div className="mt-4 space-y-3">

                  {[
                    "تصوير فوتوغرافي",
                    "فيديو سينمائي",
                    "جلسة خارجية",
                    "ألبوم صور",
                    "مونتاج",
                  ].map((service) => (
                    <label
                      key={service}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-500"
                    >

                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded accent-[#6B3038]"
                      />

                      {service}

                    </label>
                  ))}

                </div>

              </div>

              {/* Availability */}
              <div className="mt-7 border-t border-[#f0e7e1] pt-6">

                <label className="flex cursor-pointer items-center justify-between">

                  <span className="text-sm font-bold text-[#2d2424]">
                    متاح للحجز
                  </span>

                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#6B3038]"
                  />

                </label>

              </div>

            </aside>

            {/* Results */}
            <div>

              {/* Results Header */}
              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <span className="text-sm font-semibold text-[#a27643]">
                    اختاري من بين الأفضل
                  </span>

                  <h2 className="mt-2 text-2xl font-bold text-[#2d2424] md:text-3xl">
                    مصورو حفلات الزفاف
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    {filteredPhotographers.length} نتيجة متاحة
                  </p>

                </div>

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  className="rounded-xl border border-[#eadfd7] bg-white px-4 py-3 text-sm text-gray-600 outline-none"
                >

                  <option value="recommended">
                    ترتيب: المقترحة
                  </option>

                  <option value="rating">
                    الأعلى تقييمًا
                  </option>

                  <option value="price-low">
                    السعر: الأقل أولًا
                  </option>

                  <option value="price-high">
                    السعر: الأعلى أولًا
                  </option>

                </select>

              </div>

              {/* Cards */}
              {filteredPhotographers.length > 0 ? (

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                  {filteredPhotographers.map((photographer) => {

                    const isFavorite =
                      favorites.includes(photographer.id);

                    return (
                      <Link
                        key={photographer.id}
                        to={`/photographers/${photographer.id}`}
                        className="group overflow-hidden rounded-3xl border border-[#eadfd7] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >

                        {/* Image */}
                        <div className="relative h-80 overflow-hidden">

                          <img
                            src={photographer.image}
                            alt={photographer.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />

                          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 to-transparent" />

                          {/* Featured */}
                          {photographer.featured && (
                            <span className="absolute right-4 top-4 rounded-full bg-[#e5c28d] px-3 py-1.5 text-xs font-bold text-[#2d2424]">
                              مصور مميز
                            </span>
                          )}

                          {/* Favorite */}
                          <button
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              toggleFavorite(photographer.id);
                            }}
                            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm backdrop-blur transition hover:bg-white"
                          >
                            {isFavorite ? "♥" : "♡"}
                          </button>

                          {/* Rating */}
                          <div className="absolute bottom-5 right-5 flex items-center gap-2 text-white">

                            <span>
                              ⭐
                            </span>

                            <span className="text-sm font-bold">
                              {photographer.rating}
                            </span>

                            <span className="text-xs text-white/65">
                              ({photographer.reviews})
                            </span>

                          </div>

                        </div>

                        {/* Content */}
                        <div className="p-6">

                          <div className="flex items-start justify-between gap-3">

                            <div>

                              <h3 className="text-lg font-bold text-[#2d2424]">
                                {photographer.name}
                              </h3>

                              <p className="mt-2 text-sm text-gray-400">
                                📍 {photographer.location}
                              </p>

                            </div>

                            {photographer.available && (
                              <span className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-green-600">

                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                                متاح

                              </span>
                            )}

                          </div>

                          {/* Tags */}
                          <div className="mt-5 flex flex-wrap gap-2">

                            {photographer.services.map(
                              (service) => (
                                <span
                                  key={service}
                                  className="rounded-full bg-[#f8eee7] px-3 py-1.5 text-[11px] text-[#6B3038]"
                                >
                                  {service}
                                </span>
                              )
                            )}

                          </div>

                          {/* Bottom */}
                          <div className="mt-6 flex items-end justify-between border-t border-[#f0e7e1] pt-5">

                            <div>

                              <span className="block text-xs text-gray-400">
                                تبدأ الباقات من
                              </span>

                              <span className="mt-1 block text-lg font-bold text-[#6B3038]">
                                {photographer.price} ₪
                              </span>

                            </div>

                            <span className="text-sm font-bold text-[#6B3038] transition group-hover:text-[#a27643]">
                              التفاصيل ←
                            </span>

                          </div>

                        </div>

                      </Link>
                    );
                  })}

                </div>

              ) : (

                /* Empty State */
                <div className="rounded-3xl border border-[#eadfd7] bg-white px-6 py-20 text-center">

                  <div className="text-5xl">
                    📷
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#2d2424]">
                    لم نجد مصورين بهذه المواصفات
                  </h3>

                  <p className="mt-3 text-sm text-gray-400">
                    جربي تغيير خيارات البحث أو إعادة ضبط الفلاتر.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-6 rounded-xl bg-[#6B3038] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#57262D]"
                  >
                    إعادة ضبط الفلاتر
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-[#f5ebe3] px-6 py-16">

        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#6B3038] px-6 py-14 text-center text-white md:px-12">

          <span className="text-3xl">
            📸
          </span>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            لأن اللحظة تستحق أن تُحفظ
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-white/70">
            اختاري المصور المناسب لكِ، ودعي أجمل تفاصيل
            يومك تبقى معكِ لسنوات.
          </p>

          <Link
            to="/halls"
            className="mt-7 inline-flex items-center rounded-xl bg-[#e5c28d] px-7 py-3.5 text-sm font-bold text-[#2d2424] transition hover:bg-[#f0d5aa]"
          >
            اكتشفي صالات الأفراح
            <span className="mr-2">
              ←
            </span>
          </Link>

        </div>

      </section>

    </div>
  );
};

export default Photographers;