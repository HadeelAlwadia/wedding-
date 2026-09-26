import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MapPin,
  Search,
  Star,
} from "lucide-react";

const Photographers = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const photographers = [
    {
      id: 1,
      name: "عدسة ليان",
      username: "@lens_layan",
      location: "غزة - الرمال",
      rating: 4.9,
      reviews: 142,
      price: 1200,
      type: "تصوير فوتوغرافي",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
      services: [
        "تصوير فوتوغرافي",
        "فيديو",
        "جلسة خارجية",
      ],
    },
    {
      id: 2,
      name: "Lens Studio",
      username: "@lens_studio",
      location: "غزة - النصر",
      rating: 4.8,
      reviews: 97,
      price: 1500,
      type: "تصوير وفيديو",
      image:
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&q=85",
      services: [
        "تصوير فوتوغرافي",
        "فيديو سينمائي",
        "مونتاج",
      ],
    },
    {
      id: 3,
      name: "لحظة للتصوير",
      username: "@lahza_studio",
      location: "خانيونس",
      rating: 4.7,
      reviews: 81,
      price: 900,
      type: "تصوير فوتوغرافي",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
      services: [
        "تصوير فوتوغرافي",
        "جلسة عروس",
        "ألبوم",
      ],
    },
    {
      id: 4,
      name: "Frame Wedding",
      username: "@frame_wedding",
      location: "غزة - تل الهوى",
      rating: 4.6,
      reviews: 63,
      price: 1100,
      type: "فيديو",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
      services: [
        "فيديو زفاف",
        "تصوير سينمائي",
        "مونتاج",
      ],
    },
    {
      id: 5,
      name: "ذكرى ستوديو",
      username: "@zekra_studio",
      location: "دير البلح",
      rating: 4.8,
      reviews: 72,
      price: 1000,
      type: "تصوير فوتوغرافي",
      image:
        "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85",
      services: [
        "تصوير فوتوغرافي",
        "جلسة خارجية",
        "ألبوم",
      ],
    },
    {
      id: 6,
      name: "White Lens",
      username: "@white_lens",
      location: "رفح",
      rating: 4.5,
      reviews: 41,
      price: 750,
      type: "تصوير وفيديو",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
      services: [
        "تصوير",
        "فيديو",
        "مونتاج",
      ],
    },
  ];

  const filteredPhotographers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return photographers;
    }

    return photographers.filter((photographer) => {
      return (
        photographer.name.toLowerCase().includes(value) ||
        photographer.username.toLowerCase().includes(value) ||
        photographer.location.toLowerCase().includes(value) ||
        photographer.type.toLowerCase().includes(value) ||
        photographer.services.some((service) =>
          service.toLowerCase().includes(value)
        )
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
                WEDDING PHOTOGRAPHY
              </span>

              <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                المصورين
              </h1>

              <p className="mt-2 max-w-lg text-sm leading-7 text-gray-400">
                اكتشفي المصور الذي يوثّق يومك بالطريقة التي تشبهك.
              </p>

            </div>

            <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-[#f8eee7] text-xl text-[#6B3038] sm:flex">
              📷
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
              placeholder="ابحثي عن مصور أو استوديو أو منطقة..."
              className="w-full bg-transparent px-3 py-4 text-sm outline-none placeholder:text-gray-400"
            />

          </div>

        </div>
      </section>

      {/* Content */}
      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Results header */}
          <div className="mb-5 flex items-center justify-between">

            <div>

              <h2 className="text-lg font-bold">
                مصورو حفلات الزفاف
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {filteredPhotographers.length} مصور
              </p>

            </div>

            <span className="text-xs text-gray-400">
              اكتشفي أعمالهم
            </span>

          </div>

          {/* Grid */}
          {filteredPhotographers.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:gap-6">

              {filteredPhotographers.map((photographer) => {

                const isFavorite =
                  favorites.includes(photographer.id);

                return (
                  <Link
                    key={photographer.id}
                    to={`/photographers/${photographer.id}`}
                    className="group block"
                  >

                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f3e9e2] sm:rounded-3xl">

                      <img
                        src={photographer.image}
                        alt={photographer.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      {/* Gradient */}
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      {/* Favorite */}
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          toggleFavorite(photographer.id);
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
                          {photographer.rating}
                        </span>

                      </div>

                    </div>

                    {/* Info */}
                    <div className="px-1 pt-3">

                      <div className="flex items-start justify-between gap-2">

                        <div className="min-w-0">

                          <h3 className="truncate text-sm font-bold text-[#2d2424] sm:text-base">
                            {photographer.name}
                          </h3>

                          <p className="mt-1 truncate text-xs text-gray-400">
                            {photographer.username}
                          </p>

                        </div>

                        <span className="shrink-0 text-sm font-bold text-[#6B3038]">
                          {photographer.price} ₪
                        </span>

                      </div>

                      {/* Location */}
                      <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-400">

                        <MapPin size={12} />

                        <span>
                          {photographer.location}
                        </span>

                      </div>

                      {/* Type */}
                      <div className="mt-2">

                        <span className="inline-flex rounded-full bg-[#f8eee7] px-3 py-1.5 text-[10px] text-[#6B3038]">
                          {photographer.type}
                        </span>

                      </div>

                    </div>

                  </Link>
                );
              })}

            </div>
          ) : (

            /* Empty State */
            <div className="rounded-3xl border border-[#eadfd7] bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8eee7] text-2xl">
                📷
              </div>

              <h3 className="mt-5 text-lg font-bold">
                ما لقينا مصورين
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                جربي البحث باسم مختلف.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 text-sm font-semibold text-[#6B3038]"
              >
                عرض كل المصورين
              </button>

            </div>

          )}

        </div>
      </section>
    </div>
  );
};

export default Photographers;