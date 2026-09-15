import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const cars = [
  {
    id: 1,
    name: "Mercedes S-Class",
    company: "Royal Wedding Cars",
    location: "غزة - الرمال",
    price: 900,
    rating: 4.9,
    reviews: 41,
    type: "فاخرة",
    category: "سيارة",
    seats: 4,
    driver: true,
    available: true,
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Range Rover Vogue",
    company: "Elite Cars",
    location: "غزة - النصر",
    price: 1200,
    rating: 4.8,
    reviews: 36,
    type: "SUV",
    category: "جيب",
    seats: 5,
    driver: true,
    available: true,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "BMW 7 Series",
    company: "Luxury Ride",
    location: "غزة - تل الهوى",
    price: 850,
    rating: 4.7,
    reviews: 29,
    type: "فاخرة",
    category: "سيارة",
    seats: 4,
    driver: true,
    available: true,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Mercedes G-Class",
    company: "Gaza Luxury Cars",
    location: "خانيونس",
    price: 1100,
    rating: 4.9,
    reviews: 25,
    type: "SUV",
    category: "جيب",
    seats: 5,
    driver: true,
    available: false,
    image:
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Audi A8",
    company: "Golden Ride",
    location: "دير البلح",
    price: 750,
    rating: 4.6,
    reviews: 18,
    type: "فاخرة",
    category: "سيارة",
    seats: 4,
    driver: false,
    available: true,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Toyota Land Cruiser",
    company: "Premium Cars",
    location: "رفح",
    price: 950,
    rating: 4.8,
    reviews: 22,
    type: "SUV",
    category: "جيب",
    seats: 7,
    driver: true,
    available: true,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
  },
];

const WeddingCars = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [driver, setDriver] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favoriteId) => favoriteId !== id)
        : [...prev, id]
    );
  };

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.company.toLowerCase().includes(search.toLowerCase());

      const matchesLocation = location
        ? car.location === location
        : true;

      const matchesCategory = category
        ? car.category === category
        : true;

      const matchesType = type ? car.type === type : true;

      const matchesPrice = car.price <= maxPrice;

      const matchesDriver =
        driver === ""
          ? true
          : driver === "with"
          ? car.driver
          : !car.driver;

      const matchesAvailability = availableOnly
        ? car.available
        : true;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesType &&
        matchesPrice &&
        matchesDriver &&
        matchesAvailability
      );
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    search,
    location,
    category,
    type,
    maxPrice,
    driver,
    availableOnly,
    sort,
  ]);

  const resetFilters = () => {
    setSearch("");
    setLocation("");
    setCategory("");
    setType("");
    setMaxPrice(2000);
    setDriver("");
    setAvailableOnly(false);
    setSort("recommended");
  };

  return (
    <div className="min-h-screen bg-[#FFFAF5]">
      {/* Hero */}
      <section className="bg-[#f5ebe3]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="mb-4 font-semibold text-[#a77b4f]">
              سيارات الزفاف والجيبات
            </p>

            <h1 className="text-4xl font-bold leading-tight text-[#2d2424] md:text-6xl">
              وصّلي إلى ليلة زفافك
              <span className="block text-[#6B3038]">
                بأجمل سيارة 🚘
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              اكتشفي مجموعة من سيارات الزفاف الفاخرة والجيبات المناسبة
              لليلة العمر، واختاري السيارة التي تناسب ذوقك وميزانيتك.
            </p>
          </div>

          {/* Search */}
          <div className="mt-10 rounded-3xl bg-white p-4 shadow-lg">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحثي عن سيارة أو شركة..."
                  className="w-full rounded-2xl bg-[#FFFAF5] px-5 py-4 outline-none focus:ring-2 focus:ring-[#6B3038]"
                />
              </div>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-2xl bg-[#FFFAF5] px-5 py-4 outline-none"
              >
                <option value="">كل المناطق</option>
                <option value="غزة - الرمال">غزة - الرمال</option>
                <option value="غزة - النصر">غزة - النصر</option>
                <option value="غزة - تل الهوى">غزة - تل الهوى</option>
                <option value="خانيونس">خانيونس</option>
                <option value="دير البلح">دير البلح</option>
                <option value="رفح">رفح</option>
              </select>

              <button
                onClick={() => {}}
                className="rounded-2xl bg-[#6B3038] px-8 py-4 font-semibold text-white"
              >
                بحث
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filters */}
          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#2d2424]">
                الفلاتر
              </h2>

              <button
                onClick={resetFilters}
                className="text-sm text-[#6B3038] underline"
              >
                مسح الكل
              </button>
            </div>

            {/* Category */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="mb-4 font-semibold">نوع المركبة</h3>

              <div className="space-y-3">
                {["", "سيارة", "جيب"].map((value) => (
                  <label
                    key={value || "all"}
                    className="flex cursor-pointer items-center gap-3 text-sm"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={category === value}
                      onChange={() => setCategory(value)}
                      className="accent-[#6B3038]"
                    />

                    <span>
                      {value === ""
                        ? "الكل"
                        : value === "سيارة"
                        ? "🚘 سيارات"
                        : "🚙 جيبات"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="border-b border-gray-100 py-6">
              <h3 className="mb-4 font-semibold">الفئة</h3>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6B3038]"
              >
                <option value="">كل الفئات</option>
                <option value="فاخرة">فاخرة</option>
                <option value="SUV">SUV</option>
              </select>
            </div>

            {/* Price */}
            <div className="border-b border-gray-100 py-6">
              <h3 className="mb-4 font-semibold">السعر</h3>

              <input
                type="range"
                min="300"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#6B3038]"
              />

              <div className="mt-3 flex justify-between text-sm text-gray-500">
                <span>300 ₪</span>
                <span>{maxPrice} ₪</span>
              </div>
            </div>

            {/* Driver */}
            <div className="border-b border-gray-100 py-6">
              <h3 className="mb-4 font-semibold">السائق</h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="radio"
                    name="driver"
                    checked={driver === ""}
                    onChange={() => setDriver("")}
                    className="accent-[#6B3038]"
                  />
                  الكل
                </label>

                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="radio"
                    name="driver"
                    checked={driver === "with"}
                    onChange={() => setDriver("with")}
                    className="accent-[#6B3038]"
                  />
                  مع سائق
                </label>

                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="radio"
                    name="driver"
                    checked={driver === "without"}
                    onChange={() => setDriver("without")}
                    className="accent-[#6B3038]"
                  />
                  بدون سائق
                </label>
              </div>
            </div>

            {/* Availability */}
            <div className="pt-6">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                  className="h-4 w-4 accent-[#6B3038]"
                />

                <span className="text-sm font-medium">
                  متاحة للحجز فقط
                </span>
              </label>
            </div>
          </aside>

          {/* Results */}
          <section>
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#2d2424]">
                  سيارات الزفاف
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {filteredCars.length} سيارة متاحة
                </p>
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="recommended">الأكثر توصية</option>
                <option value="rating">الأعلى تقييمًا</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
              </select>
            </div>

            {filteredCars.length === 0 ? (
              <div className="rounded-3xl bg-white px-6 py-20 text-center">
                <div className="text-5xl">🚘</div>

                <h3 className="mt-5 text-xl font-bold text-[#2d2424]">
                  لم نجد سيارات مطابقة
                </h3>

                <p className="mt-2 text-gray-500">
                  جربي تغيير الفلاتر أو البحث عن منطقة أخرى.
                </p>

                <button
                  onClick={resetFilters}
                  className="mt-6 rounded-xl bg-[#6B3038] px-6 py-3 font-semibold text-white"
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredCars.map((car) => (
                  <article
                    key={car.id}
                    className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <button
                        onClick={() => toggleFavorite(car.id)}
                        className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl shadow"
                      >
                        {favorites.includes(car.id) ? "♥" : "♡"}
                      </button>

                      <div className="absolute right-4 top-4 rounded-full bg-[#6B3038] px-3 py-1.5 text-xs font-semibold text-white">
                        {car.category}
                      </div>

                      {!car.available && (
                        <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1.5 text-xs text-white">
                          غير متاحة حاليًا
                        </div>
                      )}
                    </div>

                    {/* Card content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-bold text-[#2d2424]">
                            {car.name}
                          </h3>

                          <p className="mt-1 text-sm text-[#a77b4f]">
                            {car.company}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-yellow-500">★</span>
                          <span className="font-semibold">
                            {car.rating}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2 text-sm text-gray-500">
                        <p>📍 {car.location}</p>
                        <p>👥 {car.seats} مقاعد</p>
                        <p>
                          {car.driver
                            ? "👨‍✈️ مع سائق"
                            : "🚘 بدون سائق"}
                        </p>
                      </div>

                      <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-5">
                        <div>
                          <span className="text-2xl font-bold text-[#6B3038]">
                            {car.price.toLocaleString()} ₪
                          </span>

                          <span className="mr-1 text-xs text-gray-400">
                            / اليوم
                          </span>
                        </div>

                        <Link
                          to={`/wedding-cars/${car.id}`}
                          className="rounded-xl bg-[#6B3038] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#57262d]"
                        >
                          التفاصيل
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* CTA */}
      <section className="mt-10 bg-[#2d2424]">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center text-white">
          <p className="mb-3 text-sm font-semibold text-[#e5c28d]">
            لم تجدي السيارة المناسبة؟
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            ابحثي بين المزيد من سيارات الزفاف
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-8 text-white/60">
            قارني بين السيارات والأسعار والتقييمات واختاري الأنسب
            ليومك المميز.
          </p>
        </div>
      </section>
    </div>
  );
};

export default WeddingCars;