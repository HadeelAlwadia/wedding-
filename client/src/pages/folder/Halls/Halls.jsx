import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MapPin,
  Search,
  Star,
  Loader2,
} from "lucide-react";
import api from "../../../api/api"

const Halls = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
console.log(halls)
  // =========================================================
  // Get halls from backend
  // =========================================================

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/businesses?serviceType=hall"
        );

        const businesses = response.data?.businesses || [];

        setHalls(businesses);
      } catch (err) {
        console.error("Error fetching halls:", err);

        setError(
          err.response?.data?.message ||
            "حدث خطأ أثناء تحميل الصالات"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, []);

  // =========================================================
  // Search
  // =========================================================

  const filteredHalls = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return halls;

    return halls.filter((hall) => {
      const profile = hall.businessProfile || {};

      const name = profile.name || "";
      const username = profile.username || "";
      const address = profile.address || "";
      const governorate = profile.governorate || "";

      return (
        name.toLowerCase().includes(value) ||
        username.toLowerCase().includes(value) ||
        address.toLowerCase().includes(value) ||
        governorate.toLowerCase().includes(value)
      );
    });
  }, [search, halls]);

  // =========================================================
  // Favorites
  // =========================================================

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  // =========================================================
  // Loading
  // =========================================================

  if (loading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#fffaf5] text-[#2d2424]"
      >
        <section className="px-5 pb-8 pt-10 md:px-8 md:pt-14">
          <div className="mx-auto max-w-7xl">
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

            <div className="mt-7 flex h-[54px] items-center rounded-2xl border border-[#eadfd7] bg-white px-4 shadow-sm">
              <Loader2
                size={19}
                className="animate-spin text-[#6B3038]"
              />

              <span className="mr-3 text-sm text-gray-400">
                جاري تحميل الصالات...
              </span>
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item}>
                  <div className="aspect-[3/4] animate-pulse rounded-2xl bg-[#f3e9e2] sm:rounded-3xl" />

                  <div className="px-1 pt-3">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-[#eee3dc]" />
                    <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-[#f1e8e3]" />
                    <div className="mt-3 h-3 w-2/3 animate-pulse rounded bg-[#f1e8e3]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // =========================================================
  // Error
  // =========================================================

  if (error) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#fffaf5] text-[#2d2424]"
      >
        <section className="px-5 pb-16 pt-10 md:px-8 md:pt-14">
          <div className="mx-auto max-w-7xl">
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

            <div className="mt-8 rounded-3xl border border-[#eadfd7] bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8eee7] text-2xl">
                🏛️
              </div>

              <h3 className="mt-5 text-lg font-bold">
                تعذر تحميل الصالات
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 text-sm font-semibold text-[#6B3038]"
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // =========================================================
  // Main
  // =========================================================

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
                const profile = hall.businessProfile || {};

                const hallId = hall._id;

                const name =
                  profile.name || "قاعة أفراح";

                const username =
                  profile.username || "";

                const location =
                  profile.address ||
                  profile.governorate ||
                  "غزة";

                const price =
                  hall.packages?.[0]?.price ||
                  hall.catalog?.[0]?.price ||
                  0;

                const rating =
                  profile.ratingAverage || 0;

                const reviews =
                  profile.ratingCount || 0;

                const image =
                  profile.logo ||
                  hall.gallery?.[0]?.imageUrl ||
                  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=90";

                const type =
                  hall.catalog?.[0]?.type ||
                  "قاعة أفراح";

                const isFavorite =
                  favorites.includes(hallId);

                return (
                  <Link
                    key={hallId}
                    to={`/halls/${hallId}`}
                    className="group block"
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f3e9e2] sm:rounded-3xl">
                      <img
                        src={image}
                        alt={name}
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
                          toggleFavorite(hallId);
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
                          {rating > 0
                            ? rating.toFixed(1)
                            : "جديد"}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="px-1 pt-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-bold text-[#2d2424] sm:text-base">
                            {name}
                          </h3>

                          {username && (
                            <p className="mt-1 truncate text-xs text-gray-400">
                              {username}
                            </p>
                          )}
                        </div>

                        {price > 0 && (
                          <span className="shrink-0 text-sm font-bold text-[#6B3038]">
                            {price} ₪
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-400">
                        <MapPin size={12} />

                        <span>
                          {location}
                        </span>
                      </div>

                      {reviews > 0 && (
                        <p className="mt-1 text-[10px] text-gray-300">
                          {reviews} تقييم
                        </p>
                      )}
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