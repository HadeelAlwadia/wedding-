import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Heart,
  MapPin,
  MessageCircle,
  Share2,
  Star,
  X,
} from "lucide-react";

const GroomSuitDetails = () => {
  const { id } = useParams();

  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  const suits = {
    1: {
      id: 1,
      name: "بدلة العريس الكلاسيكية",
      store: "لؤلؤة للبدلات الرجالية",
      username: "lolo_men",
      location: "غزة - الرمال",
      price: 850,
      rating: 4.9,
      reviews: 94,
      style: "كلاسيكي",
      color: "أسود",
      sizes: ["46", "48", "50", "52", "54"],
      description:
        "بدلة عريس كلاسيكية بتصميم أنيق وراقي، مناسبة لإطلالة العريس في يوم الزفاف. تتميز بقصة مرتبة وخامة مريحة وتفاصيل بسيطة تعطي مظهرًا أنيقًا.",
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1400&q=90",
      ],
      features: [
        "قصة كلاسيكية أنيقة",
        "خامة مريحة",
        "مناسبة للزفاف والمناسبات",
        "متوفرة بعدة مقاسات",
      ],
    },

    2: {
      id: 2,
      name: "بدلة Royal Navy",
      store: "Gentleman Store",
      username: "gentleman_store",
      location: "غزة - النصر",
      price: 1100,
      rating: 4.8,
      reviews: 72,
      style: "Slim Fit",
      color: "كحلي",
      sizes: ["46", "48", "50", "52"],
      description:
        "بدلة كحلية بقصة Slim Fit تمنح العريس إطلالة عصرية ومرتبة، مناسبة لمن يبحث عن تصميم شبابي أنيق بعيدًا عن المظهر التقليدي.",
      images: [
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1400&q=90",
      ],
      features: [
        "قصة Slim Fit",
        "لون كحلي أنيق",
        "تصميم عصري",
        "متوفرة بعدة مقاسات",
      ],
    },

    3: {
      id: 3,
      name: "بدلة Black Premium",
      store: "Black Tie",
      username: "black_tie",
      location: "خانيونس",
      price: 950,
      rating: 4.7,
      reviews: 58,
      style: "كلاسيكي",
      color: "أسود",
      sizes: ["48", "50", "52", "54"],
      description:
        "تصميم أسود كلاسيكي للعريس الذي يحب الإطلالة الهادئة والفخمة، مع تفاصيل بسيطة تحافظ على أناقة البدلة.",
      images: [
        "https://images.unsplash.com/photo-1555069519-127aadedf1ee?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1400&q=90",
      ],
      features: [
        "تصميم كلاسيكي",
        "لون أسود",
        "مناسبة للزفاف",
        "خامة مريحة",
      ],
    },

    4: {
      id: 4,
      name: "بدلة Gentleman",
      store: "The Suit House",
      username: "the_suit_house",
      location: "غزة - تل الهوى",
      price: 1450,
      rating: 4.9,
      reviews: 119,
      style: "Slim Fit",
      color: "رمادي",
      sizes: ["46", "48", "50", "52"],
      description:
        "بدلة رمادية فاخرة بقصة Slim Fit تجمع بين الأناقة الكلاسيكية واللمسة العصرية، مصممة لإطلالة مميزة في يوم الزفاف.",
      images: [
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1400&q=90",
      ],
      features: [
        "قصة Slim Fit",
        "لون رمادي أنيق",
        "تصميم فاخر",
        "مناسبة لإطلالة العريس",
      ],
    },

    5: {
      id: 5,
      name: "بدلة Classic Grey",
      store: "Men Style",
      username: "men_style",
      location: "دير البلح",
      price: 750,
      rating: 4.6,
      reviews: 41,
      style: "كلاسيكي",
      color: "رمادي",
      sizes: ["48", "50", "52", "54"],
      description:
        "بدلة رمادية كلاسيكية بتصميم بسيط ومرتب، خيار مناسب للعريس الذي يبحث عن إطلالة أنيقة بسعر مناسب.",
      images: [
        "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1400&q=90",
      ],
      features: [
        "قصة كلاسيكية",
        "لون رمادي",
        "تصميم بسيط",
        "عدة مقاسات",
      ],
    },

    6: {
      id: 6,
      name: "بدلة Royal Black",
      store: "Royal Men",
      username: "royal_men",
      location: "رفح",
      price: 1800,
      rating: 4.8,
      reviews: 83,
      style: "فاخر",
      color: "أسود",
      sizes: ["46", "48", "50", "52"],
      description:
        "بدلة سوداء فاخرة بتفاصيل راقية وقصة أنيقة، مصممة للعريس الذي يبحث عن إطلالة رسمية وفخمة.",
      images: [
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1400&q=90",
      ],
      features: [
        "تصميم فاخر",
        "لون أسود",
        "قصة أنيقة",
        "مناسبة ليوم الزفاف",
      ],
    },
  };

  const suit = suits[id] || suits[1];

  const nextImage = () => {
    setActiveImage((current) =>
      current === suit.images.length - 1 ? 0 : current + 1
    );
  };

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0 ? suit.images.length - 1 : current - 1
    );
  };

  const shareSuit = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: suit.name,
          text: `شوفي ${suit.name} من ${suit.store}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("تم نسخ رابط البدلة");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fffaf5] text-[#2d2424]"
    >
      {/* =====================================================
          Breadcrumb
      ====================================================== */}
      <div className="mx-auto max-w-6xl px-5 pt-6 md:px-8">
        <Link
          to="/groom-suits"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#6B3038]"
        >
          <ArrowRight size={17} />
          العودة إلى بدلات العرسان
        </Link>
      </div>

      {/* =====================================================
          Product Details
      ====================================================== */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-6 md:px-8 md:pt-8">

        <div className="grid overflow-hidden rounded-3xl border border-[#eadfd7] bg-white shadow-sm lg:grid-cols-[1.05fr_0.95fr]">

          {/* =================================================
              Images
          ================================================= */}
          <div className="bg-[#f4ebe5] p-3 md:p-5">

            <div
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl bg-[#eee5df]"
              onClick={() => setShowImageModal(true)}
            >
              <img
                src={suit.images[activeImage]}
                alt={suit.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              />

              {/* Previous */}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  previousImage();
                }}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#2d2424] shadow-sm transition hover:bg-white"
                aria-label="الصورة السابقة"
              >
                <ChevronRight size={19} />
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  nextImage();
                }}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#2d2424] shadow-sm transition hover:bg-white"
                aria-label="الصورة التالية"
              >
                <ChevronLeft size={19} />
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 left-4 rounded-full bg-black/45 px-3 py-1.5 text-xs text-white backdrop-blur">
                {activeImage + 1} / {suit.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-3 grid grid-cols-5 gap-2">
              {suit.images.slice(0, 5).map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${
                    activeImage === index
                      ? "border-[#6B3038]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                  />

                  {activeImage !== index && (
                    <div className="absolute inset-0 bg-black/5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
              Details
          ================================================= */}
          <div className="flex flex-col p-6 md:p-8 lg:p-10">

            {/* Actions */}
            <div className="flex items-center justify-end gap-2">

              <button
                type="button"
                onClick={() => setIsFavorite((current) => !current)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8eee7] transition hover:bg-[#f1e3da]"
                aria-label="المفضلة"
              >
                <Heart
                  size={18}
                  className={
                    isFavorite
                      ? "fill-[#6B3038] text-[#6B3038]"
                      : "text-[#6B3038]"
                  }
                />
              </button>

              <button
                type="button"
                onClick={shareSuit}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038] transition hover:bg-[#f1e3da]"
                aria-label="مشاركة"
              >
                <Share2 size={17} />
              </button>

            </div>

            {/* =================================================
                Store
            ================================================= */}
            <div className="mt-5">

              <h2 className="text-lg font-bold text-[#6B3038]">
                {suit.store}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                @{suit.username}
              </p>

            </div>

            {/* Suit Name */}
            <h1 className="mt-5 text-2xl font-bold leading-9 md:text-3xl">
              {suit.name}
            </h1>

            {/* Rating + Location */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">

              <div className="flex items-center gap-1.5">

                <Star
                  size={16}
                  className="fill-[#e5c28d] text-[#e5c28d]"
                />

                <span className="text-sm font-bold">
                  {suit.rating}
                </span>

                <span className="text-xs text-gray-400">
                  ({suit.reviews} تقييم)
                </span>

              </div>

              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <MapPin size={15} />
                <span>{suit.location}</span>
              </div>

            </div>

            {/* Price */}
            <div className="mt-7 border-y border-[#f0e7e1] py-6">

              <p className="text-xs text-gray-400">
                السعر يبدأ من
              </p>

              <div className="mt-1 flex items-end gap-2">

                <span className="text-3xl font-bold text-[#6B3038]">
                  {suit.price}
                </span>

                <span className="mb-1 text-sm text-gray-400">
                  ₪
                </span>

              </div>

            </div>

            {/* Description */}
            <div className="mt-6">

              <h2 className="text-base font-bold">
                عن البدلة
              </h2>

              <p className="mt-3 text-sm leading-8 text-gray-500">
                {suit.description}
              </p>

            </div>

            {/* Style + Color */}
            <div className="mt-6 grid grid-cols-2 gap-3">

              <div className="rounded-2xl bg-[#fffaf5] p-4">

                <p className="text-xs text-gray-400">
                  القصة
                </p>

                <p className="mt-2 text-sm font-bold">
                  {suit.style}
                </p>

              </div>

              <div className="rounded-2xl bg-[#fffaf5] p-4">

                <p className="text-xs text-gray-400">
                  اللون
                </p>

                <p className="mt-2 text-sm font-bold">
                  {suit.color}
                </p>

              </div>

            </div>

            {/* Sizes */}
            <div className="mt-6">

              <h2 className="text-sm font-bold">
                المقاسات المتوفرة
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">

                {suit.sizes.map((size) => (
                  <span
                    key={size}
                    className="flex h-10 min-w-11 items-center justify-center rounded-xl border border-[#eadfd7] bg-white px-3 text-sm font-semibold text-gray-600"
                  >
                    {size}
                  </span>
                ))}

              </div>

            </div>

            {/* Features */}
            <div className="mt-7">

              <h2 className="text-sm font-bold">
                تفاصيل البدلة
              </h2>

              <div className="mt-3 space-y-3">

                {suit.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-gray-500"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038]">
                      <Check size={13} />
                    </span>

                    {feature}
                  </div>
                ))}

              </div>

            </div>

            {/* Contact */}
            <div className="mt-8">

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `مرحباً، أريد الاستفسار عن ${suit.name} من ${suit.store}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6B3038] px-4 py-4 text-sm font-bold text-white transition hover:bg-[#57262D]"
              >
                <MessageCircle size={18} />
                استفسر عن البدلة
              </a>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          Gallery
      ====================================================== */}
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8">

        <div className="mb-5">

          <h2 className="text-xl font-bold">
            صور البدلة
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            تفاصيل أكثر عن التصميم والإطلالة
          </p>

        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

          {suit.images.map((image, index) => (
            <button
              key={`${image}-gallery-${index}`}
              type="button"
              onClick={() => {
                setActiveImage(index);
                setShowImageModal(true);
              }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f3e9e2]"
            >
              <img
                src={image}
                alt={`${suit.name} ${index + 1}`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
            </button>
          ))}

        </div>
      </section>

      {/* =====================================================
          Image Modal
      ====================================================== */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setShowImageModal(false)}
        >

          {/* Close */}
          <button
            type="button"
            onClick={() => setShowImageModal(false)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            aria-label="إغلاق"
          >
            <X size={22} />
          </button>

          {/* Previous */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              previousImage();
            }}
            className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:right-8"
            aria-label="الصورة السابقة"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image */}
          <img
            src={suit.images[activeImage]}
            alt={suit.name}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[88vh] max-w-[90vw] rounded-2xl object-contain"
          />

          {/* Next */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:left-8"
            aria-label="الصورة التالية"
          >
            <ChevronLeft size={24} />
          </button>

        </div>
      )}
    </div>
  );
};

export default GroomSuitDetails;