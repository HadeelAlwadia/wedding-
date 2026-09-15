import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const BridalDresses = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("الكل");
  const [style, setStyle] = useState("الكل");
  const [size, setSize] = useState("الكل");
  const [color, setColor] = useState("الكل");
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sortBy, setSortBy] = useState("recommended");
  const [favorites, setFavorites] = useState([]);

  const dresses = [
    {
      id: 1,
      name: "فستان لؤلؤة",
      store: "دار ليان للفساتين",
      location: "غزة - الرمال",
      price: 1800,
      rating: 4.9,
      reviews: 87,
      size: ["36", "38", "40", "42"],
      color: "أبيض",
      style: "ملكي",
      available: true,
      featured: true,
      image:
        "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 2,
      name: "فستان روز",
      store: "White Bride",
      location: "غزة - النصر",
      price: 1500,
      rating: 4.8,
      reviews: 64,
      size: ["36", "38", "40"],
      color: "أوف وايت",
      style: "ناعم",
      available: true,
      featured: true,
      image:
        "https://images.unsplash.com/photo-1519657337289-077653f724ed?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 3,
      name: "فستان سيلين",
      store: "لمسة عروس",
      location: "خانيونس",
      price: 1200,
      rating: 4.7,
      reviews: 51,
      size: ["38", "40", "42", "44"],
      color: "أبيض",
      style: "كلاسيكي",
      available: true,
      featured: false,
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 4,
      name: "فستان إيلا",
      store: "Queen Dress",
      location: "غزة - تل الهوى",
      price: 2200,
      rating: 4.9,
      reviews: 103,
      size: ["36", "38", "40"],
      color: "أوف وايت",
      style: "ملكي",
      available: true,
      featured: true,
      image:
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 5,
      name: "فستان جوري",
      store: "جوري لفساتين الزفاف",
      location: "دير البلح",
      price: 950,
      rating: 4.6,
      reviews: 38,
      size: ["36", "38", "40", "42"],
      color: "أبيض",
      style: "ناعم",
      available: false,
      featured: false,
      image:
        "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 6,
      name: "فستان فيكتوريا",
      store: "Victoria Bridal",
      location: "رفح",
      price: 2000,
      rating: 4.8,
      reviews: 71,
      size: ["38", "40", "42"],
      color: "أبيض",
      style: "كلاسيكي",
      available: true,
      featured: false,
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=90",
    },
  ];

  const filteredDresses = useMemo(() => {
    let result = dresses.filter((dress) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        dress.name.toLowerCase().includes(searchValue) ||
        dress.store.toLowerCase().includes(searchValue) ||
        dress.location.toLowerCase().includes(searchValue);

      const matchesLocation =
        location === "الكل" ||
        dress.location.includes(location);

      const matchesStyle =
        style === "الكل" ||
        dress.style === style;

      const matchesSize =
        size === "الكل" ||
        dress.size.includes(size);

      const matchesColor =
        color === "الكل" ||
        dress.color === color;

      const matchesPrice =
        dress.price <= maxPrice;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesStyle &&
        matchesSize &&
        matchesColor &&
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
    style,
    size,
    color,
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
    setStyle("الكل");
    setSize("الكل");
    setColor("الكل");
    setMaxPrice(2500);
    setSortBy("recommended");
  };

  return (
    <div className="bg-[#fffaf5]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#2d2424] px-6 py-24 text-white">

        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full border border-[#e5c28d]/10" />
        <div className="absolute -bottom-48 -left-40 h-[450px] w-[450px] rounded-full border border-[#e5c28d]/10" />

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <span className="text-sm font-semibold tracking-[3px] text-[#e5c28d]">
              فستانك يبدأ من هنا
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              فستان أحلامك
              <br />
              في انتظارك
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              اكتشفي مجموعة من أجمل فساتين الزفاف،
              واختاري التصميم الذي يشبهك ويليق بيومك المميز.
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
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="ابحثي عن فستان أو متجر أو منطقة..."
                  className="w-full bg-transparent py-4 text-sm text-[#2d2424] outline-none"
                />

              </div>

              <select
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                className="rounded-2xl bg-[#fffaf5] px-5 py-4 text-sm text-gray-600 outline-none"
              >
                <option value="الكل">كل المناطق</option>
                <option value="غزة">غزة</option>
                <option value="خانيونس">خانيونس</option>
                <option value="دير البلح">دير البلح</option>
                <option value="رفح">رفح</option>
              </select>

              <select
                value={style}
                onChange={(event) =>
                  setStyle(event.target.value)
                }
                className="rounded-2xl bg-[#fffaf5] px-5 py-4 text-sm text-gray-600 outline-none"
              >
                <option value="الكل">كل التصاميم</option>
                <option value="ملكي">ملكي</option>
                <option value="ناعم">ناعم</option>
                <option value="كلاسيكي">كلاسيكي</option>
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
                  تصفية الفساتين
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
                        onChange={() =>
                          setLocation(item)
                        }
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

                <input
                  type="range"
                  min="500"
                  max="2500"
                  step="100"
                  value={maxPrice}
                  onChange={(event) =>
                    setMaxPrice(Number(event.target.value))
                  }
                  className="mt-5 w-full accent-[#6B3038]"
                />

                <div className="mt-3 flex justify-between text-xs text-gray-400">

                  <span>
                    500 ₪
                  </span>

                  <span>
                    حتى {maxPrice} ₪
                  </span>

                </div>

              </div>

              {/* Style */}
              <div className="mt-7 border-t border-[#f0e7e1] pt-6">

                <h3 className="text-sm font-bold text-[#2d2424]">
                  التصميم
                </h3>

                <div className="mt-4 space-y-3">

                  {[
                    "الكل",
                    "ملكي",
                    "ناعم",
                    "كلاسيكي",
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-500"
                    >

                      <input
                        type="radio"
                        name="style"
                        checked={style === item}
                        onChange={() =>
                          setStyle(item)
                        }
                        className="accent-[#6B3038]"
                      />

                      {item}

                    </label>
                  ))}

                </div>

              </div>

              {/* Size */}
              <div className="mt-7 border-t border-[#f0e7e1] pt-6">

                <h3 className="text-sm font-bold text-[#2d2424]">
                  المقاس
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">

                  {[
                    "الكل",
                    "36",
                    "38",
                    "40",
                    "42",
                    "44",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSize(item)}
                      className={`h-10 min-w-10 rounded-xl border px-3 text-xs font-semibold transition ${
                        size === item
                          ? "border-[#6B3038] bg-[#6B3038] text-white"
                          : "border-[#eadfd7] bg-white text-gray-500 hover:border-[#6B3038]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}

                </div>

              </div>

              {/* Color */}
              <div className="mt-7 border-t border-[#f0e7e1] pt-6">

                <h3 className="text-sm font-bold text-[#2d2424]">
                  اللون
                </h3>

                <div className="mt-4 space-y-3">

                  {[
                    "الكل",
                    "أبيض",
                    "أوف وايت",
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-500"
                    >

                      <input
                        type="radio"
                        name="color"
                        checked={color === item}
                        onChange={() =>
                          setColor(item)
                        }
                        className="accent-[#6B3038]"
                      />

                      {item}

                    </label>
                  ))}

                </div>

              </div>

              {/* Availability */}
              <div className="mt-7 border-t border-[#f0e7e1] pt-6">

                <label className="flex cursor-pointer items-center justify-between">

                  <span className="text-sm font-bold text-[#2d2424]">
                    متاح حاليًا
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

              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <span className="text-sm font-semibold text-[#a27643]">
                    اختاري فستانك
                  </span>

                  <h2 className="mt-2 text-2xl font-bold text-[#2d2424] md:text-3xl">
                    فساتين الزفاف
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    {filteredDresses.length} فستان متاح
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
              {filteredDresses.length > 0 ? (

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                  {filteredDresses.map((dress) => {

                    const isFavorite =
                      favorites.includes(dress.id);

                    return (
                      <Link
                        key={dress.id}
                        to={`/bridal-dresses/${dress.id}`}
                        className="group overflow-hidden rounded-3xl border border-[#eadfd7] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >

                        {/* Image */}
                        <div className="relative h-[390px] overflow-hidden">

                          <img
                            src={dress.image}
                            alt={dress.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />

                          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

                          {dress.featured && (
                            <span className="absolute right-4 top-4 rounded-full bg-[#e5c28d] px-3 py-1.5 text-xs font-bold text-[#2d2424]">
                              فستان مميز
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              toggleFavorite(dress.id);
                            }}
                            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm backdrop-blur transition hover:bg-white"
                          >
                            {isFavorite ? "♥" : "♡"}
                          </button>

                          <div className="absolute bottom-5 right-5 flex items-center gap-2 text-white">

                            <span>
                              ⭐
                            </span>

                            <span className="text-sm font-bold">
                              {dress.rating}
                            </span>

                            <span className="text-xs text-white/65">
                              ({dress.reviews})
                            </span>

                          </div>

                        </div>

                        {/* Content */}
                        <div className="p-6">

                          <h3 className="text-lg font-bold text-[#2d2424]">
                            {dress.name}
                          </h3>

                          <p className="mt-2 text-sm text-gray-400">
                            {dress.store}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            📍 {dress.location}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">

                            <span className="rounded-full bg-[#f8eee7] px-3 py-1.5 text-[11px] text-[#6B3038]">
                              {dress.style}
                            </span>

                            <span className="rounded-full bg-[#f8eee7] px-3 py-1.5 text-[11px] text-[#6B3038]">
                              {dress.color}
                            </span>

                            <span className="rounded-full bg-[#f8eee7] px-3 py-1.5 text-[11px] text-[#6B3038]">
                              مقاسات متعددة
                            </span>

                          </div>

                          <div className="mt-6 flex items-end justify-between border-t border-[#f0e7e1] pt-5">

                            <div>

                              <span className="block text-xs text-gray-400">
                                سعر الإيجار
                              </span>

                              <span className="mt-1 block text-lg font-bold text-[#6B3038]">
                                {dress.price} ₪
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
                    👰
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#2d2424]">
                    لم نجد فساتين بهذه المواصفات
                  </h3>

                  <p className="mt-3 text-sm text-gray-400">
                    جربي تغيير الفلاتر أو إعادة ضبط البحث.
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
            👰
          </span>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            فستانك المثالي أقرب مما تتخيلين
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-white/70">
            اكتشفي التصاميم المتاحة، قارني الأسعار،
            واختاري الفستان الذي يجعلك تشعرين أنكِ الأجمل.
          </p>

          <Link
            to="/beauty"
            className="mt-7 inline-flex items-center rounded-xl bg-[#e5c28d] px-7 py-3.5 text-sm font-bold text-[#2d2424] transition hover:bg-[#f0d5aa]"
          >
            اكتشفي خدمات التجميل
            <span className="mr-2">
              ←
            </span>
          </Link>

        </div>

      </section>

    </div>
  );
};

export default BridalDresses;