
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MapPin,
  Search,
  Star,
  Loader2,
} from "lucide-react";
import api from "../../api/api";

const GroomSuits = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [suits, setSuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 console.log(suits)
  // =========================================================
  // Get all groom suits from all businesses
  // =========================================================

  useEffect(() => {
    const fetchSuits = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/businesses/catalog?serviceType=groom-suit"
        );

        const catalog = response.data?.catalog || [];

        const mappedSuits = catalog.map((item) => ({
          id: item._id,

          name: item.name || "بدلة عريس",

          store: item.businessName || "متجر بدلات",

          location: item.businessAddress || "غزة",

          price: item.price || 0,

          rating: item.businessRating || 0,

          reviews: item.businessRatingCount || 0,

          style:
            item.data?.style ||
            item.data?.type ||
            item.type ||
            "بدلة عريس",

          image:
            item.images?.[0] ||
            item.businessLogo ||
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=90",

          businessId: item.businessId,
        }));

        setSuits(mappedSuits);
      } catch (error) {
        console.error("Error fetching groom suits:", error);

        setError(
          error?.response?.data?.message ||
            "حدث خطأ أثناء تحميل بدلات العرسان"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSuits();
  }, []);

  // =========================================================
  // Search
  // =========================================================

  const filteredSuits = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return suits;

    return suits.filter((suit) => {
      return (
        suit.name.toLowerCase().includes(value) ||
        suit.store.toLowerCase().includes(value) ||
        suit.location.toLowerCase().includes(value) ||
        suit.style.toLowerCase().includes(value)
      );
    });
  }, [search, suits]);

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
      {/* =====================================================
          Header
      ====================================================== */}

      <section className="px-5 pb-8 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto max-w-7xl">

          <div className="flex items-end justify-between gap-5">
            <div>
              <span className="text-xs font-semibold tracking-[2px] text-[#a27643]">
                GROOM COLLECTION
              </span>

              <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                بدلات العرسان
              </h1>

              <p className="mt-2 text-sm leading-7 text-gray-400">
                اكتشف البدلة التي تكمل إطلالتك في يومك الكبير.
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
              placeholder="ابحث عن بدلة أو متجر أو منطقة..."
              className="w-full bg-transparent px-3 py-4 text-sm outline-none placeholder:text-gray-400"
            />
          </div>

        </div>
      </section>

      {/* =====================================================
          Content
      ====================================================== */}

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Results Header */}

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">
                أحدث البدلات
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {loading
                  ? "جاري التحميل..."
                  : `${filteredSuits.length} بدلات`}
              </p>
            </div>

            <span className="text-xs text-gray-400">
              اكتشف إطلالتك
            </span>
          </div>

          {/* =====================================================
              Loading
          ====================================================== */}

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-[#eadfd7] bg-white">
              <div className="flex flex-col items-center gap-3 text-[#6B3038]">

                <Loader2
                  size={28}
                  className="animate-spin"
                />

                <span className="text-sm text-gray-400">
                  جاري تحميل البدلات...
                </span>

              </div>
            </div>
          ) : error ? (

            /* =====================================================
                Error
            ====================================================== */

            <div className="rounded-3xl border border-[#eadfd7] bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8eee7] text-2xl">
                🤵
              </div>

              <h3 className="mt-5 text-lg font-bold">
                تعذر تحميل البدلات
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

          ) : filteredSuits.length > 0 ? (

            /* =====================================================
                Suits Grid
            ====================================================== */

            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:gap-6">

              {filteredSuits.map((suit) => {
                const isFavorite = favorites.includes(suit.id);

                return (
                  <Link
                    key={suit.id}
                    to={`/groom-suits/${suit.id}`}
                    className="group block"
                  >

                    {/* Image */}

                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f3e9e2] sm:rounded-3xl">

                      <img
                        src={suit.image}
                        alt={suit.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      {/* Bottom Gradient */}

                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                      {/* Favorite */}

                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          toggleFavorite(suit.id);
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
                          {suit.rating > 0
                            ? suit.rating
                            : "جديد"}
                        </span>

                      </div>

                    </div>

                    {/* Card Info */}

                    <div className="px-1 pt-3">

                      <div className="flex items-start justify-between gap-2">

                        <div className="min-w-0">

                          <h3 className="truncate text-sm font-bold text-[#2d2424] sm:text-base">
                            {suit.name}
                          </h3>

                          <p className="mt-1 truncate text-xs text-gray-400">
                            {suit.store}
                          </p>

                        </div>

                        <span className="shrink-0 text-sm font-bold text-[#6B3038]">
                          {suit.price > 0
                            ? `${suit.price} ₪`
                            : "السعر عند التواصل"}
                        </span>

                      </div>

                      <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-400">
                        <MapPin size={12} />

                        <span>
                          {suit.location}
                        </span>
                      </div>

                      <div className="mt-2">
                        <span className="text-[11px] text-gray-400">
                          {suit.style}
                        </span>
                      </div>

                    </div>

                  </Link>
                );
              })}

            </div>

          ) : (

            /* =====================================================
                Empty State
            ====================================================== */

            <div className="rounded-3xl border border-[#eadfd7] bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8eee7] text-2xl">
                🤵
              </div>

              <h3 className="mt-5 text-lg font-bold">
                ما لقينا بدلات مطابقة
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                جرب البحث باسم آخر.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 text-sm font-semibold text-[#6B3038]"
              >
                عرض كل البدلات
              </button>

            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default GroomSuits;

