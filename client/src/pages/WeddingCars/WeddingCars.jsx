import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Search, Star } from "lucide-react";

const WeddingCars = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const cars = [
    {
      id: 1,
      name: "مرسيدس S-Class",
      store: "Royal Wedding Cars",
      username: "royal_wedding",
      location: "غزة - الرمال",
      price: 900,
      rating: 4.9,
      reviews: 86,
      type: "سيارة زفاف",
      image:
        "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 2,
      name: "Mercedes E-Class",
      store: "Wedding Drive",
      username: "wedding_drive",
      location: "غزة - النصر",
      price: 700,
      rating: 4.8,
      reviews: 64,
      type: "سيارة زفاف",
      image:
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 3,
      name: "BMW 7 Series",
      store: "Luxury Ride",
      username: "luxury_ride",
      location: "خانيونس",
      price: 1000,
      rating: 4.9,
      reviews: 51,
      type: "سيارة فاخرة",
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 4,
      name: "Range Rover",
      store: "Elite Wedding",
      username: "elite_wedding",
      location: "غزة - تل الهوى",
      price: 1200,
      rating: 4.7,
      reviews: 43,
      type: "جيب فاخر",
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 5,
      name: "Mercedes C-Class",
      store: "White Car",
      username: "white_car",
      location: "دير البلح",
      price: 650,
      rating: 4.6,
      reviews: 38,
      type: "سيارة زفاف",
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=90",
    },
    {
      id: 6,
      name: "Lexus ES",
      store: "Golden Ride",
      username: "golden_ride",
      location: "رفح",
      price: 850,
      rating: 4.8,
      reviews: 57,
      type: "سيارة فاخرة",
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=90",
    },
  ];

  const filteredCars = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return cars;

    return cars.filter((car) =>
      [
        car.name,
        car.store,
        car.username,
        car.location,
        car.type,
      ].some((item) => item.toLowerCase().includes(value))
    );
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

              <p className="mt-2 text-sm leading-7 text-gray-400">
                اختاري السيارة التي تكمل تفاصيل يومك الكبير.
              </p>
            </div>

            <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-[#f8eee7] text-xl text-[#6B3038] sm:flex">
              ♡
            </div>

          </div>

          {/* Search */}
          <div className="relative mt-7 max-w-xl">
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحثي عن سيارة أو محل..."
              className="w-full rounded-2xl border border-[#eadfd7] bg-white py-3.5 pr-11 pl-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#d8b18a]"
            />
          </div>

        </div>
      </section>

      {/* =====================================================
          Results
      ====================================================== */}
      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">
                أحدث السيارات
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {filteredCars.length} سيارة
              </p>
            </div>
          </div>

          {/* =================================================
              Cars Grid
          ================================================== */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">

              {filteredCars.map((car) => {
                const isFavorite = favorites.includes(car.id);

                return (
                  <Link
                    key={car.id}
                    to={`/wedding-cars/${car.id}`}
                    className="group block"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f1e7e0]">

                      <img
                        src={car.image}
                        alt={car.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      {/* Gradient */}
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />

                      {/* Favorite */}
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          toggleFavorite(car.id);
                        }}
                        className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:bg-white"
                        aria-label="المفضلة"
                      >
                        <Heart
                          size={17}
                          className={
                            isFavorite
                              ? "fill-[#6B3038] text-[#6B3038]"
                              : "text-[#6B3038]"
                          }
                        />
                      </button>

                      {/* Rating */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1.5 text-xs backdrop-blur">
                        <Star
                          size={12}
                          className="fill-[#e5c28d] text-[#e5c28d]"
                        />

                        <span className="font-semibold">
                          {car.rating}
                        </span>
                      </div>

                    </div>

                    {/* Info */}
                    <div className="px-1 pt-3">

                      {/* Store */}
                      <p className="truncate text-xs text-[#6B3038]">
                        {car.store}
                      </p>

                      {/* Car name */}
                      <h3 className="mt-1 truncate text-sm font-bold sm:text-base">
                        {car.name}
                      </h3>

                      {/* Location */}
                      <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                        <MapPin size={13} />
                        <span>{car.location}</span>
                      </div>

                      {/* Price */}
                      <div className="mt-2 flex items-center justify-between gap-2">

                        <span className="text-xs text-gray-400">
                          يبدأ من
                        </span>

                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-bold text-[#6B3038]">
                            {car.price}
                          </span>

                          <span className="text-[11px] text-gray-400">
                            ₪
                          </span>
                        </div>

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
            <div className="rounded-3xl border border-[#eadfd7] bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8eee7] text-2xl text-[#6B3038]">
                🚗
              </div>

              <h3 className="mt-5 text-lg font-bold">
                ما لقينا سيارات مطابقة
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                جربي البحث باسم السيارة أو المحل أو المنطقة.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 text-sm font-semibold text-[#6B3038]"
              >
                عرض جميع السيارات
              </button>

            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default WeddingCars;