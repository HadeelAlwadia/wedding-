import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  WandSparkles,
  ArrowDown,
  Check,
} from "lucide-react";

const services = [
  { title: "صالات الأفراح", path: "/halls" },
  { title: "فساتين العرائس", path: "/bridal-dresses" },
  { title: "الكوافيرات", path: "/beauty" },
  { title: "المصورين", path: "/photographers" },
  { title: "بدلات العرسان", path: "/groom-suits" },
  { title: "سيارات الزفاف", path: "/wedding-cars" },
];

/* =====================================================
   PLANNING BUTTON
===================================================== */

const PlanningButton = ({ light = false }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={
          light
            ? "inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#6B3038] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f8eee7]"
            : "inline-flex items-center gap-3 rounded-full bg-[#6B3038] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6B3038]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#57262d]"
        }
      >
        ابدئي التخطيط

        <ArrowLeft size={17} strokeWidth={1.8} />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="إغلاق"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute right-0 top-full z-50 mt-3 w-[290px] overflow-hidden rounded-[1.75rem] border border-[#eadbd1] bg-white p-2 text-right shadow-[0_20px_60px_rgba(45,36,36,0.15)]">
            <Link
              to="/wedding-assistant"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-4 rounded-2xl p-4 transition hover:bg-[#f8eee7]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#6B3038] transition group-hover:bg-[#6B3038] group-hover:text-white">
                <Sparkles size={21} strokeWidth={1.7} />
              </div>

              <div>
                <h3 className="font-bold text-[#2d2424]">
                  مساعد زفاف
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#8b7770]">
                  ساعدينا في التخطيط لفرحك
                </p>
              </div>
            </Link>

            <Link
              to="/wedding-look"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-4 rounded-2xl p-4 transition hover:bg-[#f8eee7]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#6B3038] transition group-hover:bg-[#6B3038] group-hover:text-white">
                <WandSparkles size={21} strokeWidth={1.7} />
              </div>

              <div>
                <h3 className="font-bold text-[#2d2424]">
                  نسّقي إطلالتك
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#8b7770]">
                  اختاري إطلالتك ليومك المميز
                </p>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

/* =====================================================
   SERVICE CARD
===================================================== */

const ServiceCard = ({ service, index }) => {
  return (
    <Link
      to={service.path}
      className="group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-[#eadbd1] bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#d9c0a9] hover:shadow-[0_25px_60px_rgba(107,48,56,0.10)]"
    >
      {/* Number */}
      <div className="absolute left-6 top-6 text-xs font-medium tracking-[0.2em] text-[#b5a29a]">
        0{index + 1}
      </div>

      {/* Decorative circle */}
      <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[#f8eee7] transition-all duration-500 group-hover:scale-150" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="pt-12">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038] transition-all duration-300 group-hover:bg-[#6B3038] group-hover:text-white">
            <span className="text-sm font-semibold">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="text-xl font-bold text-[#2d2424]">
            {service.title}
          </h3>
        </div>

        <div className="flex items-center justify-between border-t border-[#eee4df] pt-5">
          <span className="text-xs text-[#a18d86]">
            اكتشفي الخيارات
          </span>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6B3038] text-white transition-all duration-300 group-hover:translate-x-1">
            <ArrowLeft size={16} strokeWidth={1.7} />
          </div>
        </div>
      </div>
    </Link>
  );
};

/* =====================================================
   FEATURE
===================================================== */

const Feature = ({ number, title, children }) => {
  return (
    <div className="group border-t border-[#eadbd1] pt-7">
      <div className="mb-7 flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8eee7] text-xs font-semibold text-[#6B3038] transition-all duration-300 group-hover:bg-[#6B3038] group-hover:text-white">
          {number}
        </span>

        <span className="h-px w-12 bg-[#eadbd1]" />
      </div>

      <h3 className="text-lg font-bold text-[#2d2424]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#746666]">
        {children}
      </p>
    </div>
  );
};

/* =====================================================
   HOME
===================================================== */

const Home = () => {
  return (
    <main
      dir="rtl"
      className="overflow-hidden bg-[#fffaf5] text-[#2d2424]"
    >
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto min-h-[700px] max-w-[1500px] overflow-hidden rounded-[2.5rem] bg-[#6B3038]">
          {/* Background Image */}

          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80"
            alt="حفل زفاف"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}

          <div className="absolute inset-0 bg-gradient-to-l from-[#2d2424]/85 via-[#2d2424]/45 to-[#6B3038]/30" />

          {/* Decorative Shapes */}

          <div className="absolute -left-24 -top-24 h-[400px] w-[400px] rounded-full border border-[#e5c28d]/20" />

          <div className="absolute -left-10 -top-10 h-[270px] w-[270px] rounded-full border border-[#e5c28d]/20" />

          <div className="absolute bottom-[-100px] right-[-80px] h-[350px] w-[350px] rounded-full border border-white/10" />

          {/* Content */}

          <div className="relative z-10 flex min-h-[700px] items-end px-7 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
            <div className="grid w-full items-end gap-12 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl text-white">
                <div className="mb-7 flex items-center gap-4">
                  <span className="h-px w-12 bg-[#e5c28d]" />

                  <span className="text-sm font-medium tracking-wide text-[#e5c28d]">
                    زَفَاف — لتخطيط أسهل
                  </span>
                </div>

                <h1 className="text-4xl font-bold leading-[1.25] tracking-tight sm:text-6xl lg:text-7xl">
                  فرحك يبدأ
                  <br />

                  <span className="text-[#e5c28d]">
                    بخطوة بسيطة.
                  </span>
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                  اكتشفي الخدمات المناسبة لفرحك، قارني خياراتك،
                  وتواصلي مباشرة مع أصحاب الخدمات بدون زيارات عشوائية.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <PlanningButton />

                  <Link
                    to="/halls"
                    className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                  >
                    استكشفي الخدمات
                  </Link>
                </div>
              </div>

              {/* Side Badge */}

              <div className="hidden lg:block">
                <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-[#e5c28d]/50 bg-black/10 text-center backdrop-blur-sm">
                  <Sparkles
                    size={22}
                    className="mb-3 text-[#e5c28d]"
                    strokeWidth={1.5}
                  />

                  <span className="text-xs leading-5 text-white/80">
                    خطوتك الأولى
                    <br />
                    تبدأ من هنا
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Label */}

          <div className="absolute bottom-7 left-7 hidden items-center gap-3 text-xs text-white/60 sm:flex lg:left-12">
            <ArrowDown size={15} />
            اكتشفي أكثر
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}

      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}

          <div className="mb-14 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="mb-4 flex items-center gap-3 text-sm font-medium text-[#6B3038]">
                <span className="h-px w-8 bg-[#6B3038]" />
                خدمات زَفَاف
              </p>

              <h2 className="text-3xl font-bold leading-tight sm:text-5xl">
                اكتشفي
                <br />
                خدمات فرحك
              </h2>
            </div>

            <div className="lg:pb-2">
              <p className="max-w-xl text-base leading-8 text-[#746666]">
                كل ما تحتاجينه في مكان واحد، بطريقة بسيطة تساعدك
                توصلي للخيار المناسب أسرع.
              </p>
            </div>
          </div>

          {/* Services Grid */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={service.path}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}

      <section className="relative bg-white">
        {/* Decorative */}

        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#f8eee7]/60 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left */}

            <div className="relative">
              <div className="sticky top-24">
                <p className="mb-4 flex items-center gap-3 text-sm font-medium tracking-wide text-[#6B3038]">
                  <span className="h-px w-8 bg-[#6B3038]" />
                  زَفَاف ليه؟
                </p>

                <h2 className="max-w-xl text-4xl font-bold leading-[1.25] text-[#2d2424] sm:text-5xl">
                  لأن تجهيز فرحك
                  <span className="text-[#6B3038]">
                    {" "}
                    ما لازم يكون رحلة متعبة
                  </span>
                </h2>

                <p className="mt-6 max-w-md text-sm leading-8 text-[#746666] sm:text-base">
                  بدل التنقل بين إنستغرام وفيسبوك والأسواق،
                  زَفَاف يجمع لك خيارات فرحك في مكان واحد.
                </p>

                <div className="mt-10 hidden h-36 w-36 items-center justify-center rounded-full border border-[#eadbd1] lg:flex">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038]">
                    <Sparkles
                      size={27}
                      strokeWidth={1.4}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}

            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              <Feature number="01" title="كل شيء في مكان واحد">
                بدل التنقل بين إنستغرام وفيسبوك والسوق،
                اكتشفي خدمات فرحك من منصة واحدة.
              </Feature>

              <Feature number="02" title="اكتشفي قبل ما تروحي">
                شوفي الصور والتفاصيل والموقع والأسعار أو الباقات
                قبل ما تقرري زيارة المكان.
              </Feature>

              <Feature number="03" title="قللي المشاوير">
                قارني بين الخيارات أولًا، وروحي فقط للأماكن
                اللي فعلًا تناسبك.
              </Feature>

              <Feature number="04" title="تواصلي قبل الزيارة">
                اسألي عن التفاصيل والتوفر والأسعار عبر الهاتف أو الواتساب،
                قبل ما تتعبي حالك بالمشوار.
              </Feature>

              {/* Statement */}

              <div className="relative mt-2 overflow-hidden rounded-[2rem] bg-[#f8eee7] p-8 sm:col-span-2 sm:p-10">
                <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full border border-[#6B3038]/10" />

                <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xl text-lg font-medium leading-8 text-[#6B3038] sm:text-xl">
                    زَفَاف يختصر عليكِ رحلة البحث،
                    <br className="hidden sm:block" />
                    حتى تركزي على فرحتك نفسها. 🤍
                  </p>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#6B3038]">
                    <Check size={20} strokeWidth={1.7} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="px-6 py-24 lg:px-10">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[#6B3038]">
          {/* Decorative */}

          <div className="absolute -left-32 -top-32 h-[350px] w-[350px] rounded-full border border-[#e5c28d]/15" />

          <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full border border-white/10" />

          <div className="relative z-10 px-7 py-20 text-center sm:px-12 sm:py-24">
            <p className="text-sm tracking-wide text-[#e5c28d]">
              زَفَاف
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-[1.3] text-white sm:text-6xl">
              خيارات أقل،
              <br />
              <span className="text-[#e5c28d]">
                قرار أسهل.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-lg leading-8 text-white/70">
              ابدئي بتحديد احتياجاتك ودعي زَفَاف يساعدك
              توصلي لما يناسب فرحك.
            </p>

            <div className="mt-9 flex justify-center">
              <PlanningButton light />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;