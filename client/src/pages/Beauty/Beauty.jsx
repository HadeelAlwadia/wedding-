import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Heart,
  MapPin,
  Star,
  X,
} from "lucide-react";

const Beauty = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const beautySalons = [
    {
      id: 1,
      name: "لَمسَة بيوتي",
      username: "@lamset_beauty",
      location: "غزة - الرمال",
      rating: 4.9,
      reviews: 156,
      type: "مكياج وعناية",

      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85",

      services: [
        "مكياج عروس",
        "تسريحات",
        "عناية بالبشرة",
      ],

      featured: true,
    },

    {
      id: 2,
      name: "روز بيوتي",
      username: "@rose_beauty",
      location: "غزة - النصر",
      rating: 4.8,
      reviews: 98,
      type: "مكياج وتسريحات",

      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",

      services: [
        "مكياج عروس",
        "تسريحات",
        "رموش",
      ],

      featured: true,
    },

    {
      id: 3,
      name: "دار الجمال",
      username: "@dar_aljamal",
      location: "خانيونس",
      rating: 4.7,
      reviews: 74,
      type: "تجميل",

      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85",

      services: [
        "مكياج",
        "عناية بالبشرة",
        "أظافر",
      ],

      featured: false,
    },

    {
      id: 4,
      name: "ليالي بيوتي",
      username: "@layali_beauty",
      location: "غزة - تل الهوى",
      rating: 4.6,
      reviews: 63,
      type: "تسريحات ومكياج",

      image:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=85",

      services: [
        "تسريحات",
        "مكياج",
        "إكسسوارات",
      ],

      featured: false,
    },

    {
      id: 5,
      name: "لمار للتجميل",
      username: "@lamar_beauty",
      location: "دير البلح",
      rating: 4.8,
      reviews: 81,
      type: "مكياج وعناية",

      image:
        "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=85",

      services: [
        "مكياج عروس",
        "تسريحات",
        "عناية",
      ],

      featured: false,
    },

    {
      id: 6,
      name: "Bella Beauty",
      username: "@bella_beauty",
      location: "رفح",
      rating: 4.5,
      reviews: 45,
      type: "تجميل",

      image:
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=85",

      services: [
        "مكياج",
        "أظافر",
        "عناية بالبشرة",
      ],

      featured: false,
    },
  ];

  const filteredSalons = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return beautySalons;
    }

    return beautySalons.filter(
      (salon) =>
        salon.name.toLowerCase().includes(value) ||
        salon.username.toLowerCase().includes(value) ||
        salon.location.toLowerCase().includes(value) ||
        salon.type.toLowerCase().includes(value)
    );
  }, [search]);

  const toggleFavorite = (event, id) => {
    event.preventDefault();
    event.stopPropagation();

    setFavorites((current) =>
      current.includes(id)
        ? current.filter(
            (favoriteId) => favoriteId !== id
          )
        : [...current, id]
    );
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fffaf5]"
    >
{/* =====================================================
    Header
===================================================== */}
<section className="px-5 pb-8 pt-10 md:px-8 md:pt-14">
  <div className="mx-auto max-w-7xl">

    <div className="flex items-end justify-between gap-5">

      <div>
        <span className="text-xs font-semibold tracking-[2px] text-[#a27643]">
          BEAUTY &amp; BRIDAL
        </span>

        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          الكوافيرات
        </h1>

        <p className="mt-2 text-sm leading-7 text-gray-400">
          اكتشفي إطلالتك القادمة مع أفضل الكوافيرات.
        </p>
      </div>

      <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-[#f8eee7] text-xl text-[#6B3038] sm:flex">
        ♡
      </div>

    </div>

  </div>
</section>
      {/* =====================================================
          Search
      ====================================================== */}
      <section className="mx-auto max-w-5xl px-5 pt-7">
        <div className="flex items-center rounded-full border border-[#eadfd7] bg-white px-5 py-3.5">
          <Search
            size={18}
            strokeWidth={1.7}
            className="ml-3 text-[#6B3038]"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="ابحثي عن كوافير أو منطقة..."
            className="w-full bg-transparent text-sm text-[#2d2424] outline-none placeholder:text-gray-400"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-gray-400"
            >
              <X size={17} />
            </button>
          )}
        </div>
      </section>

      {/* =====================================================
          Salons
      ====================================================== */}
      <main className="mx-auto max-w-5xl px-5 pb-24 pt-10">
        {filteredSalons.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12">
            {filteredSalons.map((salon) => {
              const isFavorite = favorites.includes(
                salon.id
              );

              return (
                <Link
                  key={salon.id}
                  to={`/beauty/${salon.id}`}
                  className="group block"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-[1.4rem] bg-[#f8eee7]">
                    <div className="aspect-square">
                      <img
                        src={salon.image}
                        alt={salon.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Favorite */}
                    <button
                      type="button"
                      onClick={(event) =>
                        toggleFavorite(event, salon.id)
                      }
                      className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#6B3038] shadow-sm backdrop-blur"
                    >
                      <Heart
                        size={17}
                        strokeWidth={1.7}
                        fill={
                          isFavorite
                            ? "#6B3038"
                            : "none"
                        }
                      />
                    </button>
                  </div>

                  {/* Profile Info */}
                  <div className="px-1 pt-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold text-[#2d2424] md:text-lg">
                          {salon.name}
                        </h2>

                        <p className="mt-1 truncate text-xs text-gray-400">
                          {salon.username}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1 text-xs text-[#6B3038]">
                        <Star
                          size={13}
                          fill="#e5c28d"
                          color="#e5c28d"
                        />

                        {salon.rating}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                      <MapPin size={13} />

                      {salon.location}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
                      {salon.services
                        .slice(0, 2)
                        .map((service) => (
                          <span
                            key={service}
                            className="text-[11px] text-[#8b7770]"
                          >
                            {service}
                          </span>
                        ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8eee7]">
              <Search
                size={21}
                className="text-[#6B3038]"
              />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-[#2d2424]">
              ما لقينا نتيجة
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              جربي اسم كوافير أو منطقة ثانية.
            </p>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-5 text-sm font-medium text-[#6B3038]"
            >
              عرض الكل
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Beauty;