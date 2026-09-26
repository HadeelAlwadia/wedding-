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

const WeddingCarDetails = () => {
  const { id } = useParams();

  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  const cars = {
    1: {
      id: 1,
      name: "مرسيدس S-Class",
      store: "Royal Wedding Cars",
      username: "royal_wedding",
      location: "غزة - الرمال",
      price: 900,
      rating: 4.9,
      reviews: 86,
      type: "سيارة زفاف",
      model: "S-Class",
      year: "2023",
      color: "أسود",
      seats: "5 مقاعد",
      description:
        "مرسيدس S-Class بإطلالة فاخرة وأنيقة، مناسبة للعروسين في يوم الزفاف والمناسبات الخاصة. تصميم راقٍ ومساحة داخلية مريحة تمنحك تجربة مميزة.",
      images: [
        "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90",
      ],
      features: [
        "سيارة فاخرة ومجهزة للزفاف",
        "سائق محترف",
        "تصوير السيارة قبل المناسبة",
        "تزيين السيارة حسب الطلب",
      ],
    },

    2: {
      id: 2,
      name: "Mercedes E-Class",
      store: "Wedding Drive",
      username: "wedding_drive",
      location: "غزة - النصر",
      price: 700,
      rating: 4.8,
      reviews: 64,
      type: "سيارة زفاف",
      model: "E-Class",
      year: "2022",
      color: "أبيض",
      seats: "5 مقاعد",
      description:
        "مرسيدس E-Class بتصميم أنيق وهادئ، خيار مناسب للعروسين الذين يبحثون عن سيارة مرتبة وفخمة لمرافقتهم في يوم الزفاف.",
      images: [
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=90",
      ],
      features: [
        "سيارة نظيفة ومجهزة",
        "سائق محترف",
        "تزيين حسب الطلب",
        "مناسبة للزفاف والتصوير",
      ],
    },

    3: {
      id: 3,
      name: "BMW 7 Series",
      store: "Luxury Ride",
      username: "luxury_ride",
      location: "خانيونس",
      price: 1000,
      rating: 4.9,
      reviews: 51,
      type: "سيارة فاخرة",
      model: "BMW 7 Series",
      year: "2023",
      color: "أسود",
      seats: "5 مقاعد",
      description:
        "BMW 7 Series بتصميم فاخر وحضور مميز، مناسبة للعروسين ومحبي السيارات الفخمة في جلسات التصوير ويوم الزفاف.",
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=90",
      ],
      features: [
        "تصميم فاخر",
        "مناسبة لجلسات التصوير",
        "سائق محترف",
        "تزيين السيارة حسب الطلب",
      ],
    },

    4: {
      id: 4,
      name: "Range Rover",
      store: "Elite Wedding",
      username: "elite_wedding",
      location: "غزة - تل الهوى",
      price: 1200,
      rating: 4.7,
      reviews: 43,
      type: "جيب فاخر",
      model: "Range Rover",
      year: "2023",
      color: "أبيض",
      seats: "5 مقاعد",
      description:
        "Range Rover فاخرة بحضور قوي وتصميم أنيق، مناسبة للعروسين الذين يفضلون سيارات الجيب والإطلالة المميزة في يوم الزفاف.",
      images: [
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1400&q=90",
      ],
      features: [
        "جيب فاخر",
        "مساحة داخلية واسعة",
        "سائق محترف",
        "مناسبة للتصوير والزفاف",
      ],
    },

    5: {
      id: 5,
      name: "Mercedes C-Class",
      store: "White Car",
      username: "white_car",
      location: "دير البلح",
      price: 650,
      rating: 4.6,
      reviews: 38,
      type: "سيارة زفاف",
      model: "C-Class",
      year: "2022",
      color: "أبيض",
      seats: "5 مقاعد",
      description:
        "مرسيدس C-Class بتصميم بسيط وأنيق، مناسبة للعروسين الذين يبحثون عن سيارة جميلة ومرتبة بسعر مناسب.",
      images: [
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=90",
      ],
      features: [
        "تصميم أنيق",
        "سائق محترف",
        "تزيين حسب الطلب",
        "مناسبة ليوم الزفاف",
      ],
    },

    6: {
      id: 6,
      name: "Lexus ES",
      store: "Golden Ride",
      username: "golden_ride",
      location: "رفح",
      price: 850,
      rating: 4.8,
      reviews: 57,
      type: "سيارة فاخرة",
      model: "Lexus ES",
      year: "2023",
      color: "ذهبي",
      seats: "5 مقاعد",
      description:
        "Lexus ES بإطلالة راقية ومميزة، تجمع بين الراحة والفخامة لتكون جزءًا جميلًا من تفاصيل يوم الزفاف.",
      images: [
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=90",
      ],
      features: [
        "تصميم فاخر",
        "مقاعد مريحة",
        "سائق محترف",
        "مناسبة للتصوير والزفاف",
      ],
    },
  };

  const car = cars[id] || cars[1];

  const nextImage = () => {
    setActiveImage((current) =>
      current === car.images.length - 1 ? 0 : current + 1
    );
  };

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0 ? car.images.length - 1 : current - 1
    );
  };

  const shareCar = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: car.name,
          text: `شوفي ${car.name} من ${car.store}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("تم نسخ رابط السيارة");
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
          to="/wedding-cars"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#6B3038]"
        >
          <ArrowRight size={17} />
          العودة إلى سيارات الزفاف
        </Link>
      </div>

      {/* =====================================================
          Main Details
      ====================================================== */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-6 md:px-8 md:pt-8">
        <div className="grid overflow-hidden rounded-3xl border border-[#eadfd7] bg-white shadow-sm lg:grid-cols-[1.05fr_0.95fr]">

          {/* =================================================
              Images
          ================================================== */}
          <div className="bg-[#f4ebe5] p-3 md:p-5">

            <div
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-[#eee5df]"
              onClick={() => setShowImageModal(true)}
            >
              <img
                src={car.images[activeImage]}
                alt={car.name}
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
                {activeImage + 1} / {car.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-3 grid grid-cols-4 gap-2">
              {car.images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition ${
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
          ================================================== */}
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
                onClick={shareCar}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038] transition hover:bg-[#f1e3da]"
                aria-label="مشاركة"
              >
                <Share2 size={17} />
              </button>

            </div>

            {/* =================================================
                Store / Company
            ================================================== */}
            <div className="mt-5">

              <h2 className="text-lg font-bold text-[#6B3038]">
                {car.store}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                @{car.username}
              </p>

            </div>

            {/* Car Name */}
            <h1 className="mt-5 text-2xl font-bold leading-9 md:text-3xl">
              {car.name}
            </h1>

            {/* Rating + Location */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">

              <div className="flex items-center gap-1.5">

                <Star
                  size={16}
                  className="fill-[#e5c28d] text-[#e5c28d]"
                />

                <span className="text-sm font-bold">
                  {car.rating}
                </span>

                <span className="text-xs text-gray-400">
                  ({car.reviews} تقييم)
                </span>

              </div>

              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <MapPin size={15} />
                <span>{car.location}</span>
              </div>

            </div>

            {/* Price */}
            <div className="mt-7 border-y border-[#f0e7e1] py-6">

              <p className="text-xs text-gray-400">
                السعر يبدأ من
              </p>

              <div className="mt-1 flex items-end gap-2">

                <span className="text-3xl font-bold text-[#6B3038]">
                  {car.price}
                </span>

                <span className="mb-1 text-sm text-gray-400">
                  ₪
                </span>

              </div>

            </div>

            {/* Description */}
            <div className="mt-6">

              <h2 className="text-base font-bold">
                عن السيارة
              </h2>

              <p className="mt-3 text-sm leading-8 text-gray-500">
                {car.description}
              </p>

            </div>

            {/* Car Info */}
            <div className="mt-6 grid grid-cols-2 gap-3">

              <div className="rounded-2xl bg-[#fffaf5] p-4">
                <p className="text-xs text-gray-400">
                  النوع
                </p>

                <p className="mt-2 text-sm font-bold">
                  {car.type}
                </p>
              </div>

              <div className="rounded-2xl bg-[#fffaf5] p-4">
                <p className="text-xs text-gray-400">
                  الموديل
                </p>

                <p className="mt-2 text-sm font-bold">
                  {car.model}
                </p>
              </div>

              <div className="rounded-2xl bg-[#fffaf5] p-4">
                <p className="text-xs text-gray-400">
                  السنة
                </p>

                <p className="mt-2 text-sm font-bold">
                  {car.year}
                </p>
              </div>

              <div className="rounded-2xl bg-[#fffaf5] p-4">
                <p className="text-xs text-gray-400">
                  اللون
                </p>

                <p className="mt-2 text-sm font-bold">
                  {car.color}
                </p>
              </div>

            </div>

            {/* Seats */}
            <div className="mt-6 rounded-2xl border border-[#eadfd7] bg-white p-4">

              <p className="text-xs text-gray-400">
                عدد المقاعد
              </p>

              <p className="mt-2 text-sm font-bold">
                {car.seats}
              </p>

            </div>

            {/* Features */}
            <div className="mt-7">

              <h2 className="text-sm font-bold">
                تفاصيل الخدمة
              </h2>

              <div className="mt-3 space-y-3">

                {car.features.map((feature) => (
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
                  `مرحباً، أريد الاستفسار عن ${car.name} من ${car.store}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6B3038] px-4 py-4 text-sm font-bold text-white transition hover:bg-[#57262D]"
              >
                <MessageCircle size={18} />
                استفسر عن السيارة
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
            صور السيارة
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            شوفي السيارة من أكثر من زاوية
          </p>

        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

          {car.images.map((image, index) => (
            <button
              key={`${image}-gallery-${index}`}
              type="button"
              onClick={() => {
                setActiveImage(index);
                setShowImageModal(true);
              }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f3e9e2]"
            >
              <img
                src={image}
                alt={`${car.name} ${index + 1}`}
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
            src={car.images[activeImage]}
            alt={car.name}
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

export default WeddingCarDetails;