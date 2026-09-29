import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Search, Star, Loader2 } from "lucide-react";
import api from "../../api/api";

const BridalDresses = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
console.log(dresses)
  // =========================================================
  // Get all bridal dresses from all businesses
  // =========================================================

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/businesses/catalog?serviceType=bridal-dresses"
        );

        const catalog = response.data?.catalog || [];

        const mappedDresses = catalog.map((item) => ({
          id: item._id,

          name: item.name || "فستان زفاف",

          store: item.businessName || "دار أزياء",

          location: item.businessAddress || "غزة",

          price: item.price || 0,

          rating: item.businessRating || 0,

          reviews: item.businessRatingCount || 0,

          style:
            item.data?.style ||
            item.data?.type ||
            item.type ||
            "فستان زفاف",

          image:
            item.images?.[0] ||
            item.businessLogo ||
            "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1200&q=90",

          businessId: item.businessId,
        }));

        setDresses(mappedDresses);
      } catch (error) {
        console.error("Error fetching bridal dresses:", error);

        setError(
          error?.response?.data?.message ||
            "حدث خطأ أثناء تحميل الفساتين"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDresses();
  }, []);

  // =========================================================
  // Search
  // =========================================================

  const filteredDresses = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return dresses;

    return dresses.filter((dress) => {
      return (
        dress.name.toLowerCase().includes(value) ||
        dress.store.toLowerCase().includes(value) ||
        dress.location.toLowerCase().includes(value) ||
        dress.style.toLowerCase().includes(value)
      );
    });
  }, [search, dresses]);

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
                BRIDAL COLLECTION
              </span>

              <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                فساتين العرائس
              </h1>

              <p className="mt-2 text-sm leading-7 text-gray-400">
                اكتشفي الفستان الذي يشبهك ويكمل إطلالتك.
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
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحثي عن فستان أو دار أزياء..."
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
                أحدث التصاميم
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {loading
                  ? "جاري التحميل..."
                  : `${filteredDresses.length} فساتين`}
              </p>
            </div>

            <span className="text-xs text-gray-400">
              اكتشفي المزيد
            </span>

          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-[#eadfd7] bg-white">
              <div className="flex flex-col items-center gap-3 text-[#6B3038]">

                <Loader2
                  size={28}
                  className="animate-spin"
                />

                <span className="text-sm text-gray-400">
                  جاري تحميل الفساتين...
                </span>

              </div>
            </div>
          ) : error ? (
            /* Error */
            <div className="rounded-3xl border border-[#eadfd7] bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8eee7] text-2xl">
                👰
              </div>

              <h3 className="mt-5 text-lg font-bold">
                تعذر تحميل الفساتين
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 text-sm font-semibold text-[#6B3038]"
              >
                المحاولة مرة أخرى
              </button>

            </div>
          ) : filteredDresses.length > 0 ? (
            /* Dresses Grid */
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:gap-6">

              {filteredDresses.map((dress) => {
                const isFavorite = favorites.includes(dress.id);

                return (
                  <Link
                    key={dress.id}
                    to={`/bridal-dresses/${dress.id}`}
                    className="group block"
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f3e9e2] sm:rounded-3xl">

                      <img
                        src={dress.image}
                        alt={dress.name}
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
                          toggleFavorite(dress.id);
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
                          {dress.rating > 0
                            ? dress.rating
                            : "جديد"}
                        </span>

                      </div>

                    </div>

                    {/* Info */}
                    <div className="px-1 pt-3">

                      <div className="flex items-start justify-between gap-2">

                        <div className="min-w-0">

                          <h3 className="truncate text-sm font-bold text-[#2d2424] sm:text-base">
                            {dress.name}
                          </h3>

                          <p className="mt-1 truncate text-xs text-gray-400">
                            {dress.store}
                          </p>

                        </div>

                        <span className="shrink-0 text-sm font-bold text-[#6B3038]">
                          {dress.price > 0
                            ? `${dress.price} ₪`
                            : "السعر عند التواصل"}
                        </span>

                      </div>

                      <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-400">
                        <MapPin size={12} />
                        <span>{dress.location}</span>
                      </div>

                    </div>
                  </Link>
                );
              })}

            </div>
          ) : (
            /* Empty */
            <div className="rounded-3xl border border-[#eadfd7] bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8eee7] text-2xl">
                👰
              </div>

              <h3 className="mt-5 text-lg font-bold">
                ما لقينا فساتين مطابقة
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                جربي البحث باسم آخر.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 text-sm font-semibold text-[#6B3038]"
              >
                عرض كل الفساتين
              </button>

            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default BridalDresses;