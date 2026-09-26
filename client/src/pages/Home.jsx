
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  WandSparkles,
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
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={
          light
            ? "inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#6B3038] transition hover:bg-[#f8eee7]"
            : "inline-flex items-center gap-3 rounded-full bg-[#6B3038] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#57262d]"
        }
      >
        ابدئي التخطيط

        <ArrowLeft
          size={17}
          strokeWidth={1.8}
        />
      </button>

      {/* Menu */}
      {open && (
        <>
          {/* Outside click */}
          <button
            type="button"
            aria-label="إغلاق"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute right-0 top-full z-50 mt-3 w-[290px] overflow-hidden rounded-3xl border border-[#eadbd1] bg-white p-2 text-right shadow-2xl">

            {/* ===============================
                WEDDING ASSISTANT
            ================================ */}
            <Link
              to="/wedding-assistant"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-4 rounded-2xl p-4 transition hover:bg-[#f8eee7]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#6B3038] transition group-hover:bg-[#6B3038] group-hover:text-white">
                <Sparkles
                  size={21}
                  strokeWidth={1.7}
                />
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

            {/* ===============================
                WEDDING LOOK
            ================================ */}
            <Link
              to="/wedding-look"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-4 rounded-2xl p-4 transition hover:bg-[#f8eee7]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#6B3038] transition group-hover:bg-[#6B3038] group-hover:text-white">
                <WandSparkles
                  size={21}
                  strokeWidth={1.7}
                />
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

const Home = () => {
  return (
    <main
      dir="rtl"
      className="bg-[#fffaf5] text-[#2d2424]"
    >
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[650px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80"
          alt="حفل زفاف"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-20 lg:px-10">
          <div className="max-w-2xl text-white">

            <span className="mb-6 inline-block text-sm font-medium tracking-wide text-[#e5c28d]">
              زَفَاف — لتخطيط أسهل
            </span>

            <h1 className="text-4xl font-bold leading-[1.3] tracking-tight sm:text-5xl lg:text-6xl">
              فرحك يبدأ
              <br />

              <span className="text-[#e5c28d]">
                بخطوة بسيطة.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
              اكتشفي الخدمات المناسبة لفرحك، قارني خياراتك،
              وتواصلي مباشرة مع أصحاب الخدمات بدون زيارات عشوائية.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">

              {/* الزر الأول مستقل */}
              <PlanningButton />

              <Link
                to="/halls"
                className="rounded-full border border-white/60 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                استكشفي الخدمات
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute -left-32 top-1/2 hidden h-[430px] w-[430px] -translate-y-1/2 rounded-full border border-[#e5c28d]/20 lg:block" />

        <div className="absolute -left-10 top-1/2 hidden h-[300px] w-[300px] -translate-y-1/2 rounded-full border border-[#e5c28d]/30 lg:block" />
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}
      <section className="border-t border-[#eadfd8]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">

          <div className="mb-12">
            <p className="mb-3 text-sm font-medium text-[#6B3038]">
              خدمات زَفَاف
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              اكتشفي خدمات فرحك
            </h2>

            <p className="mt-4 max-w-xl leading-8 text-[#746666]">
              كل ما تحتاجينه في مكان واحد، بطريقة بسيطة تساعدك
              توصلي للخيار المناسب أسرع.
            </p>
          </div>

          <div className="grid grid-cols-2 border-t border-[#eadfd8] sm:grid-cols-3">
            {services.map((service, index) => (
              <Link
                key={service.path}
                to={service.path}
                className={`
                  group flex min-h-[150px] items-center justify-between
                  border-b border-[#eadfd8] p-6 transition
                  hover:bg-[#f8eee7]
                  ${index % 2 !== 0 ? "border-r sm:border-r-0" : ""}
                  ${index % 3 !== 0 ? "sm:border-r" : ""}
                `}
              >
                <div>
                  <span className="mb-3 block text-xs text-[#a18d86]">
                    0{index + 1}
                  </span>

                  <h3 className="text-base font-semibold sm:text-lg">
                    {service.title}
                  </h3>
                </div>

                <ArrowLeft
                  size={18}
                  strokeWidth={1.5}
                  className="text-[#6B3038] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>



{/* =====================================================
    FEATURES — WHY ZAFaf?
===================================================== */}
<section dir="rtl" className="bg-white">
  <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">

    {/* HEADER */}
    <div className="mx-auto mb-16 max-w-2xl text-center">
      <p className="mb-3 text-sm font-medium tracking-wide text-[#6B3038]">
        زَفَاف ليه؟
      </p>

      <h2 className="text-3xl font-bold leading-tight text-[#2d2424] sm:text-4xl">
        لأن تجهيز فرحك
        <span className="text-[#6B3038]">
          {" "}ما لازم يكون رحلة متعبة
        </span>
      </h2>

      <p className="mt-5 text-sm leading-7 text-[#746666] sm:text-base">
        بدل التنقل بين إنستغرام وفيسبوك والأسواق،
        زَفَاف يجمع لك خيارات فرحك في مكان واحد.
      </p>
    </div>

    {/* FEATURES */}
    <div className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-4">

      {/* FEATURE 01 */}
      <div className="group text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038] transition duration-300 group-hover:bg-[#6B3038] group-hover:text-white">
          <span className="text-sm font-semibold">
            01
          </span>
        </div>

        <h3 className="mt-6 text-lg font-bold text-[#2d2424]">
          كل شيء في مكان واحد
        </h3>

        <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-[#746666]">
          بدل التنقل بين إنستغرام وفيسبوك والسوق،
          اكتشفي خدمات فرحك من منصة واحدة.
        </p>
      </div>

      {/* FEATURE 02 */}
      <div className="group text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038] transition duration-300 group-hover:bg-[#6B3038] group-hover:text-white">
          <span className="text-sm font-semibold">
            02
          </span>
        </div>

        <h3 className="mt-6 text-lg font-bold text-[#2d2424]">
          اكتشفي قبل ما تروحي
        </h3>

        <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-[#746666]">
          شوفي الصور والتفاصيل والموقع والأسعار أو الباقات
          قبل ما تقرري زيارة المكان.
        </p>
      </div>

      {/* FEATURE 03 */}
      <div className="group text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038] transition duration-300 group-hover:bg-[#6B3038] group-hover:text-white">
          <span className="text-sm font-semibold">
            03
          </span>
        </div>

        <h3 className="mt-6 text-lg font-bold text-[#2d2424]">
          قللي المشاوير
        </h3>

        <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-[#746666]">
          قارني بين الخيارات أولًا، وروحي فقط للأماكن
          اللي فعلًا تناسبك.
        </p>
      </div>

      {/* FEATURE 04 */}
      <div className="group text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038] transition duration-300 group-hover:bg-[#6B3038] group-hover:text-white">
          <span className="text-sm font-semibold">
            04
          </span>
        </div>

        <h3 className="mt-6 text-lg font-bold text-[#2d2424]">
          تواصلي قبل الزيارة
        </h3>

        <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-[#746666]">
          اسألي عن التفاصيل والتوفر والأسعار عبر الهاتف أو الواتساب،
          قبل ما تتعبي حالك بالمشوار.
        </p>
      </div>

    </div>

    {/* BOTTOM STATEMENT */}
    <div className="mx-auto mt-20 max-w-3xl border-t border-[#eadbd1] pt-10 text-center">
      <p className="text-lg font-medium leading-8 text-[#6B3038] sm:text-xl">
        زَفَاف يختصر عليكِ رحلة البحث،
        <br className="hidden sm:block" />
        حتى تركزي على فرحتك نفسها. 🤍
      </p>
    </div>

  </div>
</section>




      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-[#6B3038] px-6 py-16 text-center text-white sm:px-12">

          <p className="text-sm text-[#e5c28d]">
            زَفَاف
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-relaxed sm:text-4xl">
            خيارات أقل،
            <br />
            قرار أسهل.
          </h2>

          <p className="mx-auto mt-5 max-w-lg leading-8 text-white/75">
            ابدئي بتحديد احتياجاتك ودعي زَفَاف يساعدك
            توصلي لما يناسب فرحك.
          </p>

          {/* الزر الثاني مستقل */}
          <div className="mt-8 inline-block z-6">
            <PlanningButton light />
          </div>

        </div>
      </section>
    </main>
  );
};

export default Home;

