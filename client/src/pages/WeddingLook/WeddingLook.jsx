
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  RotateCcw,
} from "lucide-react";

const WeddingLook = () => {
  const [selected, setSelected] = useState({
    dress: null,
    makeup: null,
    hair: null,
  });

  const categories = [
    {
      key: "dress",
      title: "فستانك",
      subtitle: "اختاري الفستان الأقرب لذوقك",
      options: [
        {
          id: "classic",
          title: "كلاسيكي",
          description: "قصة أنيقة وناعمة",
          emoji: "👗",
        },
        {
          id: "princess",
          title: "أميرة",
          description: "إطلالة فخمة وملفتة",
          emoji: "✨",
        },
        {
          id: "modern",
          title: "عصري",
          description: "تصميم بسيط ومميز",
          emoji: "🤍",
        },
      ],
    },
    {
      key: "makeup",
      title: "مكياجك",
      subtitle: "اختاري ستايل المكياج",
      options: [
        {
          id: "soft",
          title: "ناعم",
          description: "لمسة طبيعية ومشرقة",
          emoji: "🌸",
        },
        {
          id: "glowy",
          title: "مضيء",
          description: "بشرة مشرقة وإطلالة حيوية",
          emoji: "✨",
        },
        {
          id: "bold",
          title: "فخم",
          description: "إطلالة أوضح وأكثر جرأة",
          emoji: "💄",
        },
      ],
    },
    {
      key: "hair",
      title: "تسريحة شعرك",
      subtitle: "اختاري التسريحة المناسبة",
      options: [
        {
          id: "updo",
          title: "مرفوعة",
          description: "راقية ومناسبة للفستان الفخم",
          emoji: "👰🏻",
        },
        {
          id: "waves",
          title: "ويفي",
          description: "ناعمة وأنثوية",
          emoji: "〰️",
        },
        {
          id: "simple",
          title: "منسدلة",
          description: "بسيطة وناعمة",
          emoji: "🤍",
        },
      ],
    },
  ];

  const completedCount = Object.values(selected).filter(Boolean).length;

  const summary = useMemo(() => {
    return categories
      .map((category) => {
        const option = category.options.find(
          (item) => item.id === selected[category.key]
        );

        return option
          ? {
              category: category.title,
              value: option.title,
            }
          : null;
      })
      .filter(Boolean);
  }, [selected]);

  const handleSelect = (categoryKey, optionId) => {
    setSelected((prev) => ({
      ...prev,
      [categoryKey]: optionId,
    }));
  };

  const resetLook = () => {
    setSelected({
      dress: null,
      makeup: null,
      hair: null,
    });
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#fffaf5] text-[#2d2424]"
    >
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#eadbd1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f3dfcf_0%,transparent_45%)]" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#6B3038] shadow-sm">
              <Sparkles size={16} />
              نسّقي إطلالتك مع زَفَاف
            </div>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              إطلالتك تبدأ من
              <span className="block text-[#6B3038]">
                التفاصيل التي تحبينها
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#7d6962] sm:text-base">
              اختاري الفستان، المكياج، وتسريحة الشعر التي تناسب ذوقك،
              وشوفي ملخص إطلالتك في مكان واحد.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* OPTIONS */}
          <div className="space-y-8">
            {categories.map((category, index) => (
              <section
                key={category.key}
                className="rounded-3xl border border-[#eadbd1] bg-white p-5 shadow-sm sm:p-7"
              >
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f8eee7] text-sm font-bold text-[#6B3038]">
                    {index + 1}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      {category.title}
                    </h2>

                    <p className="mt-1 text-sm text-[#8b7770]">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {category.options.map((option) => {
                    const isSelected =
                      selected[category.key] === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          handleSelect(category.key, option.id)
                        }
                        className={`group relative rounded-2xl border p-5 text-right transition duration-200 ${
                          isSelected
                            ? "border-[#6B3038] bg-[#f8eee7] shadow-md"
                            : "border-[#eee2db] bg-[#fffaf5] hover:-translate-y-1 hover:border-[#d7b8a9] hover:shadow-md"
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute left-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#6B3038] text-white">
                            <Check size={14} />
                          </span>
                        )}

                        <div className="mb-4 flex h-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">
                          {option.emoji}
                        </div>

                        <h3 className="font-bold text-[#2d2424]">
                          {option.title}
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-[#8b7770]">
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* SUMMARY */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="overflow-hidden rounded-3xl border border-[#eadbd1] bg-white shadow-sm">
              <div className="bg-[#6B3038] p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                    <Sparkles size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold">إطلالتك</h2>
                    <p className="mt-1 text-xs text-white/70">
                      {completedCount} من 3 اختيارات
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                {summary.length === 0 ? (
                  <div className="rounded-2xl bg-[#fffaf5] p-5 text-center">
                    <div className="mb-3 text-4xl">👰🏻</div>

                    <p className="text-sm font-semibold">
                      ابدئي باختيار تفاصيل إطلالتك
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#8b7770]">
                      اختاري من الأقسام حتى تظهر لك الإطلالة المقترحة.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {categories.map((category) => {
                      const option = category.options.find(
                        (item) =>
                          item.id === selected[category.key]
                      );

                      return (
                        <div
                          key={category.key}
                          className="flex items-center justify-between rounded-2xl bg-[#fffaf5] p-4"
                        >
                          <div>
                            <p className="text-xs text-[#9a8580]">
                              {category.title}
                            </p>

                            <p className="mt-1 text-sm font-bold">
                              {option?.title || "لم يتم الاختيار"}
                            </p>
                          </div>

                          <span className="text-xl">
                            {option?.emoji || "—"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {completedCount > 0 && (
                  <button
                    type="button"
                    onClick={resetLook}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#eadbd1] py-3 text-sm font-medium text-[#6B3038] transition hover:bg-[#f8eee7]"
                  >
                    <RotateCcw size={16} />
                    إعادة الاختيارات
                  </button>
                )}

                <Link
                  to="/wedding-assistant"
                  className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-[#6B3038] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#57262d]"
                >
                  كمّلي التخطيط
                  <ArrowLeft size={17} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* BOTTOM NAV */}
      <section className="border-t border-[#eadbd1] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8 lg:px-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-[#7d6962] transition hover:text-[#6B3038]"
          >
            <ArrowRight size={17} />
            العودة للرئيسية
          </Link>

          <p className="text-center text-xs text-[#9a8580]">
            اختياراتك مجرد بداية — زَفَاف يساعدك تكملي باقي التفاصيل ✨
          </p>
        </div>
      </section>
    </main>
  );
};

export default WeddingLook;
