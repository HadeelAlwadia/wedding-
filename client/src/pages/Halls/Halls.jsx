import { Link } from "react-router-dom";

const Halls = () => {
  const halls = [
    {
      id: 1,
      name: "قصر الياسمين",
      location: "غزة - الرمال",
      price: "يبدأ من 2500 ₪",
      capacity: "300 شخص",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80",
      rating: 4.8,
    },
    {
      id: 2,
      name: "قاعة ليالي",
      location: "غزة - النصر",
      price: "يبدأ من 2000 ₪",
      capacity: "250 شخص",
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80",
      rating: 4.7,
    },
    {
      id: 3,
      name: "قصر الأميرات",
      location: "خانيونس",
      price: "يبدأ من 3000 ₪",
      capacity: "400 شخص",
      image:
        "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1000&q=80",
      rating: 4.9,
    },
    {
      id: 4,
      name: "قاعة النخبة",
      location: "غزة - تل الهوى",
      price: "يبدأ من 2200 ₪",
      capacity: "280 شخص",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80",
      rating: 4.6,
    },
    {
      id: 5,
      name: "قاعة روز",
      location: "دير البلح",
      price: "يبدأ من 1800 ₪",
      capacity: "200 شخص",
      image:
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1000&q=80",
      rating: 4.8,
    },
    {
      id: 6,
      name: "ليالي القمر",
      location: "رفح",
      price: "يبدأ من 1700 ₪",
      capacity: "180 شخص",
      image:
        "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1000&q=80",
      rating: 4.5,
    },
  ];

  return (
    <div className="bg-[#fffaf5]">

      {/* Hero */}
      <section className="bg-[#f5ebe3] px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">
            <span className="text-sm font-semibold tracking-wide text-[#a27643]">
              صالات الأفراح
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-[#2d2424] md:text-6xl">
              اختاري المكان الذي
              <br />
              يبدأ فيه أجمل يوم
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-500 md:text-lg">
              اكتشفي مجموعة من صالات الأفراح، وتعرّفي على
              الأسعار والمواقع والسعة والتقييمات قبل اختيارك.
            </p>
          </div>

        </div>
      </section>

      {/* Search & Filters */}
      <section className="border-b border-[#eadfd7] bg-white px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row">

          {/* Search */}
          <div className="flex flex-1 items-center rounded-xl border border-[#eadfd7] bg-[#fffaf5] px-4">
            <span className="ml-3 text-lg">🔎</span>

            <input
              type="text"
              placeholder="ابحثي عن اسم الصالة..."
              className="w-full bg-transparent py-3.5 text-sm text-gray-700 outline-none"
            />
          </div>

          {/* Location */}
          <select className="rounded-xl border border-[#eadfd7] bg-[#fffaf5] px-5 py-3.5 text-sm text-gray-600 outline-none">
            <option>كل المناطق</option>
            <option>غزة</option>
            <option>خانيونس</option>
            <option>دير البلح</option>
            <option>رفح</option>
          </select>

          {/* Price */}
          <select className="rounded-xl border border-[#eadfd7] bg-[#fffaf5] px-5 py-3.5 text-sm text-gray-600 outline-none">
            <option>كل الأسعار</option>
            <option>أقل من 2000 ₪</option>
            <option>2000 - 3000 ₪</option>
            <option>أكثر من 3000 ₪</option>
          </select>

          <button className="rounded-xl bg-[#6B3038] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#57262D]">
            بحث
          </button>

        </div>
      </section>

      {/* Halls */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-8 flex items-end justify-between">

            <div>
              <span className="text-sm font-semibold text-[#a27643]">
                الصالات المتاحة
              </span>

              <h2 className="mt-2 text-2xl font-bold text-[#2d2424] md:text-3xl">
                اكتشفي الصالة المناسبة لكِ
              </h2>
            </div>

            <span className="hidden text-sm text-gray-400 sm:block">
              {halls.length} صالات
            </span>

          </div>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {halls.map((hall) => (
              <Link
                key={hall.id}
                to={`/halls/${hall.id}`}
                className="group overflow-hidden rounded-3xl border border-[#eadfd7] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image */}
                <div className="relative h-64 overflow-hidden">

                  <img
                    src={hall.image}
                    alt={hall.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Favorite */}
                  <button
                    onClick={(event) => event.preventDefault()}
                    className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm backdrop-blur transition hover:bg-white"
                  >
                    ♡
                  </button>

                  {/* Rating */}
                  <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#2d2424] backdrop-blur">
                    ⭐ {hall.rating}
                  </div>

                </div>

                {/* Content */}
                <div className="p-6">

                  <h3 className="text-xl font-bold text-[#2d2424]">
                    {hall.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <span>📍</span>
                    <span>{hall.location}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <span>👥</span>
                    <span>{hall.capacity}</span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#f0e7e1] pt-5">

                    <div>
                      <span className="block text-xs text-gray-400">
                        السعر
                      </span>

                      <span className="mt-1 block text-sm font-bold text-[#6B3038]">
                        {hall.price}
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-[#6B3038] transition group-hover:text-[#a27643]">
                      التفاصيل ←
                    </span>

                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f5ebe3] px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#6B3038] px-6 py-14 text-center text-white md:px-12">

          <span className="text-3xl">✨</span>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            لم تجدي ما تبحثين عنه؟
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-white/70">
            اكتشفي باقي خدمات الزفاف في هنا واكملي تجهيز تفاصيل يومك.
          </p>

          <Link
            to="/beauty"
            className="mt-7 inline-flex rounded-xl bg-[#e5c28d] px-7 py-3.5 text-sm font-bold text-[#2d2424] transition hover:bg-[#f0d5aa]"
          >
            اكتشفي باقي الخدمات
          </Link>

        </div>
      </section>

    </div>
  );
};

export default Halls;