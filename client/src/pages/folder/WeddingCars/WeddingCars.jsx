import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MapPin,
  Search,
  Star,
  Loader2,
  CarFront,
} from "lucide-react";
import api from "../../api/api";

const WeddingCars = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // Get all wedding cars from all businesses
  // =========================================================

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/businesses/catalog?serviceType=wedding-cars"
        );

        const catalog = response.data?.catalog || [];

        const mappedCars = catalog.map((item) => ({
          id: item._id,

          name:
            item.name ||
            item.data?.name ||
            item.data?.carName ||
            "سيارة زفاف",

          store:
            item.businessName ||
            item.data?.businessName ||
            "مقدم خدمة سيارات",

          location:
            item.businessAddress ||
            item.data?.location ||
            item.data?.address ||
            "غزة",

          price:
            item.price ||
            item.data?.price ||
            0,

          rating:
            item.businessRating ||
            item.rating ||
            0,

          reviews:
            item.businessRatingCount ||
            item.reviews ||
            0,

          type:
            item.data?.type ||
            item.data?.carType ||
            item.type ||
            "سيارة زفاف",

          model:
            item.data?.model ||
            item.data?.year ||
            item.model ||
            "",

          seats:
            item.data?.seats ||
            item.data?.capacity ||
            item.seats ||
            "",

          description:
            item.description ||
            item.data?.description ||
            "",

          image:
            item.images?.[0] ||
            item.data?.image ||
            item.businessLogo ||
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=90",

          images: item.images || [],

          businessId: item.businessId,
        }));

        setCars(mappedCars);
      } catch (error) {
        console.error("Error fetching wedding cars:", error);

        setError(
          error?.response?.data?.message ||
            "حدث خطأ أثناء تحميل سيارات الزفاف"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // =========================================================
  // Search
  // =========================================================

  const filteredCars = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return cars;

    return cars.filter((car) => {
      return (
        car.name?.toLowerCase().includes(value) ||
        car.store?.toLowerCase().includes(value) ||
        car.location?.toLowerCase().includes(value) ||
        car.type?.toLowerCase().includes(value) ||
        car.model?.toLowerCase().includes(value)
      );
    });
  }, [search, cars]);

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
                WEDDING CARS
              </span>

              <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                سيارات الزفاف
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-7 text-gray-400">
                اختاروا السيارة التي تكمل لحظات وصولكم في يومكم الكبير.
              </p>
            </div>

            <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038] sm:flex">
              <CarFront size={22} strokeWidth={1.7} />
            </div>

          </div>

          {/* =================================================
              Search
          ================================================== */}

          <div className="mt-7 flex items-center rounded-2xl border border-[#eadfd7] bg-white px-4 shadow-sm">

            <Search
              size={19}
              className="shrink-0 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحث عن سيارة أو مكتب أو منطقة..."
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

          {/* =================================================
              Results Header
          ================================================== */}

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-bold">
                سيارات الزفاف
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {loading
                  ? "جاري التحميل..."
                  : `${filteredCars.length} سيارات`}
              </p>
            </div>

            <span className="text-xs text-gray-400">
              اختاروا وصولكم بطريقتكم
            </span>

          </div>

          {/* =================================================
              Loading
          ================================================== */}

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-[#eadfd7] bg-white">

              <div className="flex flex-col items-center gap-3 text-[#6B3038]">

                <Loader2
                  size={28}
                  className="animate-spin"
                />

                <span className="text-sm text-gray-400">
                  جاري تحميل سيارات الزفاف...
                </span>

              </div>

            </div>
          ) : error ? (

            /* =================================================
                Error
            ================================================== */

            <div className="rounded-3xl border border-[#eadfd7] bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038]">
                <CarFront size={27} strokeWidth={1.7} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                تعذر تحميل سيارات الزفاف
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

          ) : filteredCars.length > 0 ? (

            /* =================================================
                Cars Grid
            ================================================== */

            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:gap-6">

              {filteredCars.map((car) => {

                const isFavorite = favorites.includes(car.id);

                return (
                  <Link
                    key={car.id}
                    to={`/wedding-cars/${car.id}`}
                    className="group block"
                  >

                    {/* =================================================
                        Image
                    ================================================== */}

                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f3e9e2] sm:rounded-3xl">

                      <img
                        src={car.image}
                        alt={car.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      {/* Dark Gradient */}

                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                      {/* =================================================
                          Favorite
                      ================================================== */}

                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();

                          toggleFavorite(car.id);
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

                      {/* =================================================
                          Rating
                      ================================================== */}

                      {car.rating > 0 && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white">

                          <Star
                            size={13}
                            className="fill-[#e5c28d] text-[#e5c28d]"
                          />

                          <span className="text-xs font-semibold">
                            {car.rating}
                          </span>

                        </div>
                      )}

                    </div>

                    {/* =================================================
                        Card Info
                    ================================================== */}

                    <div className="px-1 pt-3">

                      <div className="flex items-start justify-between gap-2">

                        <div className="min-w-0">

                          <h3 className="truncate text-sm font-bold text-[#2d2424] sm:text-base">
                            {car.name}
                          </h3>

                          <p className="mt-1 truncate text-xs text-gray-400">
                            {car.store}
                          </p>

                        </div>

                        <span className="shrink-0 text-sm font-bold text-[#6B3038]">

                          {car.price > 0
                            ? `من ${car.price} ₪`
                            : "السعر عند التواصل"}

                        </span>

                      </div>

                      {/* Location */}

                      <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-400">

                        <MapPin size={12} />

                        <span className="truncate">
                          {car.location}
                        </span>

                      </div>

                      {/* Car Details */}

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">

                        {car.type && (
                          <span className="text-[11px] text-gray-400">
                            {car.type}
                          </span>
                        )}

                        {car.model && (
                          <span className="text-[11px] text-gray-400">
                            {car.model}
                          </span>
                        )}

                        {car.seats && (
                          <span className="text-[11px] text-gray-400">
                            {car.seats} مقاعد
                          </span>
                        )}

                      </div>

                    </div>

                  </Link>
                );
              })}

            </div>

          ) : (

            /* =================================================
                Empty State
            ================================================== */

            <div className="rounded-3xl border border-[#eadfd7] bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038]">
                <CarFront size={27} strokeWidth={1.7} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                ما لقينا سيارات مطابقة
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                جرب البحث باسم سيارة أو منطقة أخرى.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 text-sm font-semibold text-[#6B3038]"
              >
                عرض كل السيارات
              </button>

            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default WeddingCars;