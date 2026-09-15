import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const GroomSuits = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("الكل");
  const [style, setStyle] = useState("الكل");
  const [color, setColor] = useState("الكل");
  const [size, setSize] = useState("الكل");
  const [occasion, setOccasion] = useState("الكل");
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sortBy, setSortBy] = useState("recommended");
  const [favorites, setFavorites] = useState([]);

  const suits = [
    {
      id: 1,
      name: "بدلة العريس الكلاسيكية",
      store: "Elegance Men",
      location: "غزة - الرمال",
      price: 850,
      rating: 4.9,
      reviews: 94,
      style: "كلاسيكي",
      color: "أسود",
      sizes: ["46", "48", "50", "52", "54"],
      occasions: ["زفاف", "مناسبات"],
      available: true,
      featured: true,
      image:
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 2,
      name: "بدلة Royal Navy",
      store: "Gentleman Store",
      location: "غزة - النصر",
      price: 1100,
      rating: 4.8,
      reviews: 72,
      style: "Slim Fit",
      color: "كحلي",
      sizes: ["46", "48", "50", "52"],
      occasions: ["زفاف", "مناسبات"],
      available: true,
      featured: true,
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 3,
      name: "بدلة Black Premium",
      store: "Black Tie",
      location: "خانيونس",
      price: 950,
      rating: 4.7,
      reviews: 58,
      style: "كلاسيكي",
      color: "أسود",
      sizes: ["48", "50", "52", "54"],
      occasions: ["زفاف"],
      available: true,
      featured: false,
      image:
        "https://images.unsplash.com/photo-1555069519-127aadedf1ee?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 4,
      name: "بدلة Gentleman",
      store: "The Suit House",
      location: "غزة - تل الهوى",
      price: 1450,
      rating: 4.9,
      reviews: 119,
      style: "Slim Fit",
      color: "رمادي",
      sizes: ["46", "48", "50", "52"],
      occasions: ["زفاف", "مناسبات"],
      available: true,
      featured: true,
      image:
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 5,
      name: "بدلة Classic Grey",
      store: "Men Style",
      location: "دير البلح",
      price: 750,
      rating: 4.6,
      reviews: 41,
      style: "كلاسيكي",
      color: "رمادي",
      sizes: ["48", "50", "52", "54"],
      occasions: ["مناسبات"],
      available: false,
      featured: false,
      image:
        "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 6,
      name: "بدلة Royal Black",
      store: "Royal Men",
      location: "رفح",
      price: 1800,
      rating: 4.8,
      reviews: 83,
      style: "فاخر",
      color: "أسود",
      sizes: ["46", "48", "50", "52"],
      occasions: ["زفاف"],
      available: true,
      featured: false,
      image:
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=90",
    },
  ];

  const filteredSuits = useMemo(() => {
    let result = suits.filter((suit) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        suit.name.toLowerCase().includes(searchValue) ||
        suit.store.toLowerCase().includes(searchValue) ||
        suit.location.toLowerCase().includes(searchValue);

      const matchesLocation =
        location === "الكل" ||
        suit.location.includes(location);

      const matchesStyle =
        style === "الكل" ||
        suit.style === style;

      const matchesColor =
        color === "الكل" ||
        suit.color === color;

      const matchesSize =
        size === "الكل" ||
        suit.sizes.includes(size);

      const matchesOccasion =
        occasion === "الكل" ||
        suit.occasions.includes(occasion);

      const matchesPrice =
        suit.price <= maxPrice;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesStyle &&
        matchesColor &&
        matchesSize &&
        matchesOccasion &&
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
    color,
    size,
    occasion,
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
    setColor("الكل");
    setSize("الكل");
    setOccasion("الكل");
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
              إطلالة العريس تبدأ من هنا
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              بدلتك ليوم
              <br />
              لا يُنسى
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              اكتشف مجموعة من بدلات العرسان، واختر التصميم
              والمقاس والإطلالة التي تناسب يومك الكبير.
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
                  placeholder="ابحث عن بدلة أو متجر أو منطقة..."
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

              {/* Style */}
              <select
                value={style}
                onChange={(event) =>
                  setStyle(event.target.value)
                }
                className="rounded-2xl bg-[#fffaf5] px-5 py-4 text-sm text-gray-600 outline-none"
              >

                <option value="الكل">
                  كل القصات
                </option>

                <option value="كلاسيكي">
                  كلاسيكي
                </option>

                <option value="Slim Fit">
                  Slim Fit
                </option>

                <option value="فاخر">
                  فاخر
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
                  تصفية البدلات
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
                  القصة
                </h3>

                <div className="mt-4 space-y-3">

                  {[
                    "الكل",
                    "كلاسيكي",
                    "Slim Fit",
                    "فاخر",
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

              {/* Color */}
              <div className="mt-7 border-t border-[#f0e7e1] pt-6">

                <h3 className="text-sm font-bold text-[#2d2424]">
                  اللون
                </h3>

                <div className="mt-4 space-y-3">

                  {[
                    "الكل",
                    "أسود",
                    "كحلي",
                    "رمادي",
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

              {/* Size */}
              <div className="mt-7 border-t border-[#f0e7e1] pt-6">

                <h3 className="text-sm font-bold text-[#2d2424]">
                  المقاس
                </h3>

                <div className="mt-4 grid grid-cols-4 gap-2">

                  {[
                    "الكل",
                    "46",
                    "48",
                    "50",
                    "52",
                    "54",
                    "56",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setSize(item)
                      }
                      className={`rounded-xl border py-2.5 text-xs font-semibold transition ${
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

              {/* Occasion */}
              <div className="mt-7 border-t border-[#f0e7e1] pt-6">

                <h3 className="text-sm font-bold text-[#2d2424]">
                  المناسبة
                </h3>

                <div className="mt-4 space-y-3">

                  {[
                    "الكل",
                    "زفاف",
                    "مناسبات",
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-3 text-sm text-gray-500"
                    >

                      <input
                        type="radio"
                        name="occasion"
                        checked={occasion === item}
                        onChange={() =>
                          setOccasion(item)
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
                    اختار إطلالتك
                  </span>

                  <h2 className="mt-2 text-2xl font-bold text-[#2d2424] md:text-3xl">
                    بدلات العرسان
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    {filteredSuits.length} بدلة متاحة
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
              {filteredSuits.length > 0 ? (

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                  {filteredSuits.map((suit) => {

                    const isFavorite =
                      favorites.includes(suit.id);

                    return (
                      <Link
                        key={suit.id}
                        to={`/groom-suits/${suit.id}`}
                        className="group overflow-hidden rounded-3xl border border-[#eadfd7] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >

                        {/* Image */}
                        <div className="relative h-[390px] overflow-hidden bg-[#eee8e2]">

                          <img
                            src={suit.image}
                            alt={suit.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />

                          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

                          {suit.featured && (
                            <span className="absolute right-4 top-4 rounded-full bg-[#e5c28d] px-3 py-1.5 text-xs font-bold text-[#2d2424]">
                              بدلة مميزة
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              toggleFavorite(suit.id);
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
                              {suit.rating}
                            </span>

                            <span className="text-xs text-white/65">
                              ({suit.reviews})
                            </span>

                          </div>

                        </div>

                        {/* Content */}
                        <div className="p-6">

                          <h3 className="text-lg font-bold text-[#2d2424]">
                            {suit.name}
                          </h3>

                          <p className="mt-2 text-sm text-gray-400">
                            {suit.store}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            📍 {suit.location}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">

                            <span className="rounded-full bg-[#f8eee7] px-3 py-1.5 text-[11px] text-[#6B3038]">
                              {suit.style}
                            </span>

                            <span className="rounded-full bg-[#f8eee7] px-3 py-1.5 text-[11px] text-[#6B3038]">
                              {suit.color}
                            </span>

                          </div>

                          <div className="mt-6 flex items-end justify-between border-t border-[#f0e7e1] pt-5">

                            <div>

                              <span className="block text-xs text-gray-400">
                                السعر يبدأ من
                              </span>

                              <span className="mt-1 block text-lg font-bold text-[#6B3038]">
                                {suit.price} ₪
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
                    🤵
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#2d2424]">
                    لم نجد بدلات بهذه المواصفات
                  </h3>

                  <p className="mt-3 text-sm text-gray-400">
                    جرب تغيير الفلاتر أو إعادة ضبط البحث.
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
            🤵
          </span>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            جاهز تختار إطلالتك؟
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-white/70">
            اكتشف البدلات، قارن الأسعار والتصاميم،
            واختار الإطلالة التي تناسب يومك الكبير.
          </p>

          <Link
            to="/photographers"
            className="mt-7 inline-flex items-center rounded-xl bg-[#e5c28d] px-7 py-3.5 text-sm font-bold text-[#2d2424] transition hover:bg-[#f0d5aa]"
          >
            اكتشف المصورين
            <span className="mr-2">
              ←
            </span>
          </Link>

        </div>

      </section>

    </div>
  );
};

export default GroomSuits;