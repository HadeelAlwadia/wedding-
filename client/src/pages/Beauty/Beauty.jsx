import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Beauty = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("الكل");
  const [serviceType, setServiceType] = useState("الكل");
  const [rating, setRating] = useState("الكل");
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState("recommended");
  const [favorites, setFavorites] = useState([]);

  const beautySalons = [
    {
      id: 1,
      name: "لَمسَة بيوتي",
      location: "غزة - الرمال",
      rating: 4.9,
      reviews: 156,
      price: 250,
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85",
      type: "مكياج",
      services: ["مكياج عروس", "تسريحات", "عناية بالبشرة"],
      featured: true,
      available: true,
    },
    {
      id: 2,
      name: "روز بيوتي",
      location: "غزة - النصر",
      rating: 4.8,
      reviews: 98,
      price: 200,
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
      type: "مكياج وتسريحات",
      services: ["مكياج عروس", "تسريحات", "رموش"],
      featured: true,
      available: true,
    },
    {
      id: 3,
      name: "دار الجمال",
      location: "خانيونس",
      rating: 4.7,
      reviews: 74,
      price: 180,
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85",
      type: "تجميل",
      services: ["مكياج", "عناية بالبشرة", "أظافر"],
      featured: false,
      available: true,
    },
    {
      id: 4,
      name: "ليالي بيوتي",
      location: "غزة - تل الهوى",
      rating: 4.6,
      reviews: 63,
      price: 150,
      image:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=85",
      type: "تسريحات",
      services: ["تسريحات", "مكياج", "إكسسوارات"],
      featured: false,
      available: true,
    },
    {
      id: 5,
      name: "لمار للتجميل",
      location: "دير البلح",
      rating: 4.8,
      reviews: 81,
      price: 220,
      image:
        "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=85",
      type: "مكياج",
      services: ["مكياج عروس", "تسريحات", "عناية"],
      featured: false,
      available: false,
    },
    {
      id: 6,
      name: "Bella Beauty",
      location: "رفح",
      rating: 4.5,
      reviews: 45,
      price: 130,
      image:
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=85",
      type: "تجميل",
      services: ["مكياج", "أظافر", "عناية بالبشرة"],
      featured: false,
      available: true,
    },
  ];

  const filteredSalons = useMemo(() => {
    let result = beautySalons.filter((salon) => {
      const matchesSearch =
        salon.name.toLowerCase().includes(search.toLowerCase()) ||
        salon.location.toLowerCase().includes(search.toLowerCase());

      const matchesLocation =
        location === "الكل" || salon.location.includes(location);

      const matchesType =
        serviceType === "الكل" || salon.type === serviceType;

      const matchesRating =
        rating === "الكل" || salon.rating >= Number(rating);

      const matchesPrice = salon.price <= maxPrice;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesRating &&
        matchesPrice
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, location, serviceType, rating, maxPrice, sortBy]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setLocation("الكل");
    setServiceType("الكل");
    setRating("الكل");
    setMaxPrice(500);
    setSortBy("recommended");
  };

  return (
    <div className="bg-[#fffaf5]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#2d2424] px-6 py-24 text-white">

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#e5c28d]/10" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-[#e5c28d]/10" />

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <span className="text-sm font-semibold tracking-[3px] text-[#e5c28d]">
              الجمال والإطلالة
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              إطلالتك تبدأ
              <br />
              من هنا
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              اكتشفي أفضل الكوافيرات وخبيرات التجميل لإطلالة
              تليق بأجمل لحظاتك.
            </p>

          </div>

        </div>
      </section>

      {/* Search */}
      <section className="relative z-20 px-6">
        <div className="mx-auto -mt-8 max-w-7xl">

          <div className="rounded-3xl border border-[#eadfd7] bg-white p-4 shadow-xl">

            <div className="flex flex-col gap-3 lg:flex-row">

              <div className="flex flex-1 items-center rounded-2xl bg-[#fffaf5] px-5">

                <span className="ml-3 text-lg">
                  🔎
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="ابحثي عن كوافير أو منطقة..."
                  className="w-full bg-transparent py-4 text-sm text-[#2d2424] outline-none"
                />

              </div>

              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="rounded-2xl bg-[#fffaf5] px-5 py-4 text-sm text-gray-600 outline-none"
              >
                <option value="الكل">كل المناطق</option>
                <option value="غزة">غزة</option>
                <option value="خانيونس">خانيونس</option>
                <option value="دير البلح">دير البلح</option>
                <option value="رفح">رفح</option>
              </select>

              <select
                value={serviceType}
                onChange={(event) => setServiceType(event.target.value)}
                className="rounded-2xl bg-[#fffaf5] px-5 py-4 text-sm text-gray-600 outline-none"
              >
                <option value="الكل">كل الخدمات</option>
                <option value="مكياج">مكياج</option>
                <option value="مكياج وتسريحات">
                  مكياج وتسريحات
                </option>
                <option value="تسريحات">تسريحات</option>
                <option value="تجميل">تجميل</option>
              </select>

              <button
                onClick={() => {}}
                className="rounded-2xl bg-[#6B3038] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#57262D]"
              >
                بحث
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* Content */}
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
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#6B3038] hover:text-[#a27643]"
                >
                  إعادة ضبط
                </button>

              </div>

              <div className="mt-7 border-t border-[#f0e7e1] pt-6">

                <h3 className="text-sm font-bold text-[#2d2424]">
                  المنطقة
                </h3>

                <div className="mt-4 space-y-3">

                  {["الكل", "غزة", "خانيونس", "دير البلح", "رفح"].map(
                    (item) => (
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
                    )
                  )}

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
                    min="50"
                    max="500"
                    step="10"
                    value={maxPrice}
                    onChange={(event) =>
                      setMaxPrice(Number(event.target.value))
                    }
                    className="w-full accent-[#6B3038]"
                  />

                  <div className="mt-3 flex justify-between text-xs text-gray-400">
                    <span>50 ₪</span>
                    <span>{maxPrice} ₪</span>
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
                    { value: "الكل", label: "كل التقييمات" },
                    { value: "4.5", label: "4.5 فأعلى" },
                    { value: "4", label: "4 فأعلى" },
                    { value: "3", label: "3 فأعلى" },
                  ].map((item) => (
                    <label
                      key={item.value}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-500"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={rating === item.value}
                        onChange={() => setRating(item.value)}
                        className="accent-[#6B3038]"
                      />

                      <span>{item.label}</span>
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
                    "مكياج عروس",
                    "تسريحات",
                    "عناية بالبشرة",
                    "أظافر",
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
                    اكتشفي واختاري
                  </span>

                  <h2 className="mt-2 text-2xl font-bold text-[#2d2424] md:text-3xl">
                    الكوافيرات وخبيرات التجميل
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    {filteredSalons.length} نتيجة متاحة
                  </p>

                </div>

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
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
              {filteredSalons.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                  {filteredSalons.map((salon) => {

                    const isFavorite = favorites.includes(salon.id);

                    return (
                      <Link
                        key={salon.id}
                        to={`/beauty/${salon.id}`}
                        className="group overflow-hidden rounded-3xl border border-[#eadfd7] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >

                        {/* Image */}
                        <div className="relative h-72 overflow-hidden">

                          <img
                            src={salon.image}
                            alt={salon.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />

                          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

                          {salon.featured && (
                            <span className="absolute right-4 top-4 rounded-full bg-[#e5c28d] px-3 py-1.5 text-xs font-bold text-[#2d2424]">
                              مميزة
                            </span>
                          )}

                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              toggleFavorite(salon.id);
                            }}
                            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm backdrop-blur transition hover:bg-white"
                          >
                            {isFavorite ? "♥" : "♡"}
                          </button>

                          <div className="absolute bottom-4 right-4 text-white">

                            <div className="flex items-center gap-2">

                              <span className="text-sm">
                                ⭐
                              </span>

                              <span className="text-sm font-bold">
                                {salon.rating}
                              </span>

                              <span className="text-xs text-white/70">
                                ({salon.reviews})
                              </span>

                            </div>

                          </div>

                        </div>

                        {/* Card Content */}
                        <div className="p-6">

                          <div className="flex items-start justify-between gap-3">

                            <div>

                              <h3 className="text-lg font-bold text-[#2d2424]">
                                {salon.name}
                              </h3>

                              <p className="mt-2 text-sm text-gray-400">
                                📍 {salon.location}
                              </p>

                            </div>

                            {salon.available && (
                              <span className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-green-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                متاح
                              </span>
                            )}

                          </div>

                          <div className="mt-5 flex flex-wrap gap-2">

                            {salon.services.map((service) => (
                              <span
                                key={service}
                                className="rounded-full bg-[#f8eee7] px-3 py-1.5 text-[11px] text-[#6B3038]"
                              >
                                {service}
                              </span>
                            ))}

                          </div>

                          <div className="mt-6 flex items-end justify-between border-t border-[#f0e7e1] pt-5">

                            <div>

                              <span className="block text-xs text-gray-400">
                                يبدأ السعر من
                              </span>

                              <span className="mt-1 block text-lg font-bold text-[#6B3038]">
                                {salon.price} ₪
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
                <div className="rounded-3xl border border-[#eadfd7] bg-white px-6 py-20 text-center">

                  <div className="text-5xl">
                    🔍
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#2d2424]">
                    لم نجد نتائج مناسبة
                  </h3>

                  <p className="mt-3 text-sm text-gray-400">
                    جربي تغيير خيارات البحث أو إعادة ضبط الفلاتر.
                  </p>

                  <button
                    onClick={resetFilters}
                    className="mt-6 rounded-xl bg-[#6B3038] px-6 py-3 text-sm font-semibold text-white"
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
            ✨
          </span>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            إطلالتك تستحق الأفضل
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-white/70">
            اكتشفي باقي خدمات الزفاف في هنا واختاري كل تفاصيل
            يومك من مكان واحد.
          </p>

          <Link
            to="/bridal-dresses"
            className="mt-7 inline-flex rounded-xl bg-[#e5c28d] px-7 py-3.5 text-sm font-bold text-[#2d2424] transition hover:bg-[#f0d5aa]"
          >
            اكتشفي فساتين العرائس
            <span className="mr-2">←</span>
          </Link>

        </div>

      </section>

    </div>
  );
};

export default Beauty;