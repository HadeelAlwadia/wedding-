import { Link } from "react-router-dom";

const Home = () => {
  const services = [
    {
      icon: "🏛️",
      title: "صالات الأفراح",
      link: "/halls",
    },
    {
      icon: "💄",
      title: "الكوافيرات",
      link: "/beauty",
    },
    {
      icon: "👰",
      title: "فساتين العرائس",
      link: "/bridal-dresses",
    },
    {
      icon: "🤵",
      title: "بدلات العرسان",
      link: "/groom-suits",
    },
    {
      icon: "📸",
      title: "المصورين",
      link: "/photographers",
    },
    {
      icon: "🚘",
      title: "سيارات الزفاف",
      link: "/wedding-cars",
    },
  ];

  const offers = [
    {
      icon: "🏛️",
      title: "عروض صالات الأفراح",
      description: "اكتشفي عروض وأسعار مميزة تناسب ميزانيتك.",
      link: "/halls",
    },
    {
      icon: "💄",
      title: "باقات العروس",
      description: "إطلالة متكاملة للعروس في يومها المميز.",
      link: "/beauty",
    },
    {
      icon: "🚘",
      title: "سيارات الزفاف",
      description: "اختاري السيارة التي تكمل تفاصيل يومك.",
      link: "/wedding-cars",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[650px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80"
          alt="حفل زفاف"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-center px-6">
          <div className="max-w-3xl text-white">
            <span className="mb-5 block text-sm font-semibold tracking-[4px] text-[#e5c28d]">
              هُنـا للزفاف
            </span>

            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
              كل تفاصيل فرحك
              <br />
              في مكان واحد
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-8 text-white/85">
              اكتشفي صالات الأفراح، الفساتين، الكوافيرات، المصورين
              وكل ما تحتاجينه لتجهيز يومك المميز.
            </p>

            {/* Search */}
            <div className="flex max-w-2xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl sm:flex-row">
              <input
                type="text"
                placeholder="ابحثي عن صالة، كوافير، فستان، مصور..."
                className="flex-1 rounded-xl px-5 py-4 text-gray-800 outline-none"
              />

              <button className="rounded-xl bg-[#6B3038] px-8 py-4 font-semibold text-white transition hover:bg-[#57262D]">
                بحث
              </button>
            </div>
          </div>
        </div>
      </section>

{/* Services */}
<section className="relative overflow-hidden bg-gradient-to-b from-[#fffaf5] to-[#fcf6ef] px-6 py-24">
  <div className="mx-auto max-w-7xl">
    
    {/* Header */}
    <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-end md:flex-row md:items-end">
      <div>
        <span className="inline-block rounded-full bg-[#f4e6dc] px-4 py-1.5 text-xs font-bold tracking-wider text-[#a27643] uppercase">
          خدماتنا الحصرية
        </span>
        <h2 className="mt-4 text-3xl font-extrabold text-[#2d2424] md:text-4xl tracking-tight">
          كل تفصيلة تصنع أجمل ذكريات فرحك ✨
        </h2>
        <p className="mt-2 text-sm text-[#7a6b66] max-w-lg">
          نضع بين يديكِ باقة متكاملة من الخدمات المصممة بعناية فائقة لتليق بيومك الأستر والخاص.
        </p>
      </div>

      <Link
        to="/services"
        className="hidden items-center gap-2 text-sm font-bold text-[#6B3038] transition-all duration-300 hover:translate-x-1 hover:text-[#a27643] sm:flex"
      >
        <span>عرض جميع الخدمات</span>
        <span className="text-lg">←</span>
      </Link>
    </div>

    {/* Services Grid */}
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
      {services.map((service) => (
        <Link
          key={service.title}
          to={service.link}
          className="group relative rounded-3xl border border-[#eadfd7] bg-white/80 p-6 text-center backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#d7b98d] hover:bg-white hover:shadow-xl hover:shadow-[#eadfd7]/40"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#d7b98d]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

          <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8eee7] text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#f2dccc]">
            {service.icon}
          </div>

          <h3 className="relative text-sm font-bold text-[#2d2424] transition-colors duration-300 group-hover:text-[#6B3038]">
            {service.title}
          </h3>

          <span className="relative mt-2 inline-block text-xs font-medium text-[#a27643] opacity-0 transition-all duration-300 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0">
            اكتشفي المزيد
          </span>
        </Link>
      ))}
    </div>

    {/* Mobile Link */}
    <div className="mt-8 text-center sm:hidden">
      <Link
        to="/services"
        className="inline-flex items-center gap-2 text-sm font-bold text-[#6B3038]"
      >
        <span>عرض جميع الخدمات</span>
        <span>←</span>
      </Link>
    </div>

  </div>
</section>

      {/* Offers */}
      <section className="bg-[#f5ebe3] px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <span className="text-sm font-semibold text-[#a27643]">
              عروض مميزة
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#2d2424] md:text-4xl">
              اختيارات مميزة لكِ
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-500">
              اكتشفي بعض الخدمات والعروض التي قد تساعدك في تجهيز يومك
              بسهولة أكبر.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {offers.map((offer) => (
              <Link
                key={offer.title}
                to={offer.link}
                className="group rounded-3xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8eee7] text-2xl">
                  {offer.icon}
                </div>

                <h3 className="text-xl font-bold text-[#2d2424]">
                  {offer.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {offer.description}
                </p>

                <span className="mt-5 block text-sm font-semibold text-[#6B3038]">
                  اكتشفي الآن ←
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Here */}
      <section className="bg-[#f8f4f0] px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Text */}
            <div>
              <span className="text-sm font-semibold text-[#a27643]">
                لماذا هنا؟
              </span>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-[#2d2424] md:text-5xl">
                لأن يومك المميز
                <br />
                يستحق كل الاهتمام
              </h2>

              <p className="mt-6 max-w-xl leading-8 text-gray-500">
                "هنا" تجمع لكِ خدمات الزفاف التي تحتاجينها في مكان واحد،
                لتوفري وقتك وتحصلين على صورة أوضح قبل اتخاذ قرارك.
              </p>

              <Link
                to="/services"
                className="mt-8 inline-flex items-center rounded-xl bg-[#6B3038] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#57262D]"
              >
                اكتشفي خدماتنا
                <span className="mr-2">←</span>
              </Link>
            </div>

            {/* Features */}
            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8eee7] text-xl">
                  🔎
                </div>

                <h3 className="text-lg font-bold text-[#2d2424]">
                  اكتشفي بسهولة
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  وصلي للخدمة التي تبحثين عنها بدون البحث في عشرات الصفحات.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8eee7] text-xl">
                  ⚖️
                </div>

                <h3 className="text-lg font-bold text-[#2d2424]">
                  قارني قبل الاختيار
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  قارني بين الخيارات والأسعار والتقييمات لتختاري بثقة.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8eee7] text-xl">
                  ❤️
                </div>

                <h3 className="text-lg font-bold text-[#2d2424]">
                  اختاري ما يناسبك
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  احفظي خياراتك وارجعي لها وقت ما تحبي.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8eee7] text-xl">
                  ✨
                </div>

                <h3 className="text-lg font-bold text-[#2d2424]">
                  تجربة أبسط
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  كل التفاصيل التي تحتاجينها لتجهيز يومك في مكان واحد.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

{/* Final CTA */}
<section className="bg-[#f5ebe3] px-6 py-20">
  <div className="mx-auto max-w-5xl">
    <div className="relative overflow-hidden rounded-[2rem] bg-[#6B3038] px-6 py-16 text-center text-white shadow-xl md:px-12">

      {/* Decorative elements */}
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-[#e5c28d]/20" />
      <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full border border-[#e5c28d]/20" />

      <div className="relative z-10 mx-auto max-w-2xl">

        <span className="mb-5 inline-block text-3xl">
          ✨
        </span>

        <span className="block text-sm font-semibold tracking-[3px] text-[#e5c28d]">
          هُنـا للزفاف
        </span>

        <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
          ابدئي أولى خطوات
          <br />
          يومك المميز
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/75 md:text-base">
          اكتشفي أفضل الخدمات، قارني خياراتك، واختاري كل تفاصيل
          فرحك من مكان واحد.
        </p>

        <Link
          to="/halls"
          className="mt-8 inline-flex items-center rounded-xl bg-[#e5c28d] px-8 py-4 text-sm font-bold text-[#2d2424] transition duration-300 hover:bg-[#f0d5aa] hover:-translate-y-0.5"
        >
          اكتشفي الخدمات
          <span className="mr-2 text-lg">←</span>
        </Link>

      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;