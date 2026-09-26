import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Search, Star } from "lucide-react";

const Halls = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const halls = [
    {
      id: 1,
      name: "قاعة ليالي العمر",
      username: "@layali_alomr",
      location: "غزة - الرمال",
      price: 1800,
      rating: 4.9,
      reviews: 184,
      type: "قاعة أفراح",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 2,
      name: "قاعة الياسمين",
      username: "@alyasmeen_hall",
      location: "غزة - النصر",
      price: 1500,
      rating: 4.8,
      reviews: 126,
      type: "قاعة أفراح",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 3,
      name: "قصر النخبة",
      username: "@elite_palace",
      location: "خانيونس",
      price: 2200,
      rating: 4.9,
      reviews: 98,
      type: "قصر مناسبات",
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 4,
      name: "قاعة روز",
      username: "@rose_hall",
      location: "غزة - تل الهوى",
      price: 1300,
      rating: 4.7,
      reviews: 84,
      type: "قاعة أفراح",
      image:
        "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 5,
      name: "قاعة اللؤلؤة",
      username: "@al_loloa_hall",
      location: "دير البلح",
      price: 1100,
      rating: 4.6,
      reviews: 61,
      type: "قاعة مناسبات",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 6,
      name: "قصر السلطانة",
      username: "@sultana_palace",
      location: "رفح",
      price: 2000,
      rating: 4.8,
      reviews: 73,
      type: "قصر أفراح",
      image:
        "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=90",
    },
  ];

  const filteredHalls = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return halls;

    return halls.filter((hall) => {
      return (
        hall.name.toLowerCase().includes(value) ||
        hall.username.toLowerCase().includes(value) ||
        hall.location.toLowerCase().includes(value) ||
        hall.type.toLowerCase().includes(value)
      );
    });
  }, [search]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fffaf5] text-[#2d2424]"
    >
      {/* Header */}
      <section className="px-5 pb-8 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto max-w-7xl">

          <div className="flex items-end justify-between gap-5">

            <div>
              <span className="text-xs font-semibold tracking-[2px] text-[#a27643]">
                WEDDING VENUES
              </span>

              <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                صالات الأفراح
              </h1>

              <p className="mt-2 text-sm leading-7 text-gray-400">
                اكتشفي المكان الذي يشبه حلمك ويكمل يومك.
              </p>
            </div>

            <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-[#f8eee7] text-xl text-[#6B3038] sm:flex">
              ♡
            </div>

          </div>

          {/* Search */}
          <div className="mt-7 flex items-center rounded-2xl border border-[#eadfd7] bg-white px-4 shadow-sm">

            <Search
              size={19}
              className="shrink-0 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="ابحثي عن قاعة أو مكان..."
              className="w-full bg-transparent px-3 py-4 text-sm outline-none placeholder:text-gray-400"
            />

          </div>

        </div>
      </section>

      {/* Content */}
      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Results Header */}
          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-bold">
                أماكن مميزة
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {filteredHalls.length} صالات
              </p>
            </div>

            <span className="text-xs text-gray-400">
              اكتشفي المزيد
            </span>

          </div>

          {/* Halls Grid */}
          {filteredHalls.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:gap-6">

              {filteredHalls.map((hall) => {
                const isFavorite =
                  favorites.includes(hall.id);

                return (
                  <Link
                    key={hall.id}
                    to={`/halls/${hall.id}`}
                    className="group block"
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f3e9e2] sm:rounded-3xl">

                      <img
                        src={hall.image}
                        alt={hall.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      {/* Soft Gradient */}
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                      {/* Favorite */}
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          toggleFavorite(hall.id);
                        }}
                        className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:bg-white sm:h-10 sm:w-10"
                        aria-label="المفضلة"
                      >
                        <Heart
                          size={17}
                          strokeWidth={1.8}
                          className={
                            isFavorite
                              ? "fill-[#6B3038] text-[#6B3038]"
                              : "text-[#6B3038]"
                          }
                        />
                      </button>

                      {/* Rating */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white">

                        <Star
                          size={13}
                          className="fill-[#e5c28d] text-[#e5c28d]"
                        />

                        <span className="text-xs font-semibold">
                          {hall.rating}
                        </span>

                      </div>

                    </div>

                    {/* Info */}
                    <div className="px-1 pt-3">

                      <div className="flex items-start justify-between gap-2">

                        <div className="min-w-0">

                          <h3 className="truncate text-sm font-bold text-[#2d2424] sm:text-base">
                            {hall.name}
                          </h3>

                          <p className="mt-1 truncate text-xs text-gray-400">
                            {hall.username}
                          </p>

                        </div>

                        <span className="shrink-0 text-sm font-bold text-[#6B3038]">
                          {hall.price} ₪
                        </span>

                      </div>

                      <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-400">

                        <MapPin size={12} />

                        <span>
                          {hall.location}
                        </span>

                      </div>

                    </div>
                  </Link>
                );
              })}

            </div>
          ) : (
            <div className="rounded-3xl border border-[#eadfd7] bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8eee7] text-2xl">
                🏛️
              </div>

              <h3 className="mt-5 text-lg font-bold">
                ما لقينا صالات مطابقة
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                جربي البحث باسم آخر.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 text-sm font-semibold text-[#6B3038]"
              >
                عرض كل الصالات
              </button>

            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Halls;