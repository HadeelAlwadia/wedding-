import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Heart,
  MapPin,
  Star,
  MessageCircle,
  Share2,
  CheckCircle,
  X,
  ChevronRight,
  ChevronLeft,
  Play,
} from "lucide-react";

const BeautyDetails = () => {
  const { id } = useParams();

  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("photos");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedReel, setSelectedReel] = useState(null);

  const beauty = {
    id,

    name: "لَمسَة بيوتي",
    username: "lamset_beauty",
    location: "غزة - الرمال",
    rating: 4.9,
    reviewsCount: 156,
    startingPrice: 250,

    profileImage:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=85",

    coverImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1800&q=90",

    description:
      "نهتم بإطلالة العروس بكل تفاصيلها، من المكياج وتسريحات الشعر إلى اللمسات النهائية. نقدم لكِ إطلالة أنيقة وناعمة تناسبك وتبقى جميلة في صور يومك المميز.",

    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90",
    ],

    reels: [
      {
        id: 1,
        title: "إطلالة عروس ناعمة",
        thumbnail:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=85",
        video:
          "https://cdn.coverr.co/videos/coverr-woman-getting-ready-1576/1080p.mp4",
      },
      {
        id: 2,
        title: "مكياج العروس",
        thumbnail:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=85",
        video:
          "https://cdn.coverr.co/videos/coverr-woman-putting-on-makeup-1578/1080p.mp4",
      },
      {
        id: 3,
        title: "تسريحة زفاف",
        thumbnail:
          "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=700&q=85",
        video:
          "https://cdn.coverr.co/videos/coverr-woman-hair-1577/1080p.mp4",
      },
      {
        id: 4,
        title: "من داخل الاستوديو",
        thumbnail:
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=700&q=85",
        video:
          "https://cdn.coverr.co/videos/coverr-beauty-salon-1579/1080p.mp4",
      },
      {
        id: 5,
        title: "لمسات ما قبل الزفاف",
        thumbnail:
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85",
        video:
          "https://cdn.coverr.co/videos/coverr-woman-beauty-1580/1080p.mp4",
      },
      {
        id: 6,
        title: "تجهيز العروس",
        thumbnail:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85",
        video:
          "https://cdn.coverr.co/videos/coverr-woman-getting-ready-1581/1080p.mp4",
      },
    ],

    catalog: [
      {
        icon: "💄",
        title: "مكياج العروس",
        description:
          "إطلالة عروس متكاملة بمكياج ناعم وأنيق يناسب ملامحك.",
        price: "يبدأ من 250 ₪",
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85",
      },
      {
        icon: "💇‍♀️",
        title: "تسريحة العروس",
        description:
          "تسريحات زفاف متنوعة تناسب الفستان وشكل الوجه.",
        price: "يبدأ من 200 ₪",
        image:
          "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=85",
      },
      {
        icon: "✨",
        title: "رموش ومكياج ناعم",
        description:
          "لمسات بسيطة وأنيقة للمناسبات والإطلالات الخاصة.",
        price: "يبدأ من 120 ₪",
        image:
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=85",
      },
      {
        icon: "💆‍♀️",
        title: "العناية بالبشرة",
        description:
          "جلسة عناية وتحضير للبشرة قبل المناسبة.",
        price: "يبدأ من 150 ₪",
        image:
          "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=85",
      },
    ],

    packages: [
      {
        name: "الباقة الأساسية",
        price: 250,
        description:
          "مكياج ناعم وتسريحة بسيطة للمناسبة.",
      },
      {
        name: "باقة العروس",
        price: 400,
        description:
          "مكياج وتسريحة عروس مع اللمسات النهائية.",
        popular: true,
      },
      {
        name: "الباقة الملكية",
        price: 550,
        description:
          "إطلالة متكاملة مع عناية وتجهيز شامل للعروس.",
      },
    ],

    reviews: [
      {
        name: "سارة أحمد",
        rating: 5,
        comment:
          "المكياج كان رائع جدًا وطلع ناعم مثل ما كنت أتمنى.",
        date: "منذ أسبوع",
      },
      {
        name: "نور محمد",
        rating: 5,
        comment:
          "التعامل جميل جدًا والتسريحة والمكياج كانوا ممتازين.",
        date: "منذ أسبوعين",
      },
      {
        name: "ريم علي",
        rating: 4,
        comment:
          "شغل مرتب والنتيجة كانت جميلة جدًا.",
        date: "منذ شهر",
      },
    ],
  };

  const tabs = [
    {
      id: "photos",
      label: "الصور",
    },
    {
      id: "reels",
      label: "الريلز",
    },
    {
      id: "catalog",
      label: "الكتالوج",
    },
    {
      id: "packages",
      label: "الباقات",
    },
    {
      id: "reviews",
      label: "التقييمات",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fffaf5] text-[#2d2424]"
    >
      {/* Breadcrumb */}
      <div className="mx-auto max-w-5xl px-4 pt-6">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link
            to="/"
            className="transition hover:text-[#6B3038]"
          >
            الرئيسية
          </Link>

          <ChevronLeft size={15} />

          <Link
            to="/beauty"
            className="transition hover:text-[#6B3038]"
          >
            الكوافيرات
          </Link>

          <ChevronLeft size={15} />

          <span className="text-[#6B3038]">
            {beauty.name}
          </span>
        </div>
      </div>

      {/* Profile */}
      <main className="mx-auto max-w-5xl px-4 pb-16">
        <section className="mt-6 overflow-hidden rounded-3xl border border-[#eadfd7] bg-white shadow-sm">
          {/* Cover */}
          <div className="relative h-48 overflow-hidden md:h-64">
            <img
              src={beauty.coverImage}
              alt={beauty.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            <button
              type="button"
              onClick={() =>
                setIsFavorite((prev) => !prev)
              }
              className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#6B3038] shadow-lg backdrop-blur transition hover:bg-white"
            >
              <Heart
                size={20}
                fill={
                  isFavorite
                    ? "currentColor"
                    : "none"
                }
              />
            </button>
          </div>

          {/* Profile Info */}
          <div className="px-5 pb-7 md:px-8">
            <div className="relative flex flex-col items-center md:flex-row md:items-end md:justify-between">
              {/* Profile Image */}
              <div className="-mt-14">
                <div className="h-28 w-28 rounded-full border-4 border-white bg-[#f8eee7] p-1 shadow-lg">
                  <img
                    src={beauty.profileImage}
                    alt={beauty.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-5 flex w-full gap-3 md:w-auto">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6B3038] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#57262D] md:flex-none"
                >
                  <MessageCircle size={18} />
                  تواصل
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setIsFavorite((prev) => !prev)
                  }
                  className="flex items-center justify-center rounded-xl border border-[#eadfd7] px-4 py-3 text-[#6B3038] transition hover:bg-[#fff8f3]"
                >
                  <Heart
                    size={19}
                    fill={
                      isFavorite
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>

                <button
                  type="button"
                  className="hidden items-center justify-center rounded-xl border border-[#eadfd7] px-4 py-3 text-gray-500 transition hover:bg-[#fff8f3] sm:flex"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Name */}
            <div className="mt-5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold md:text-3xl">
                  {beauty.name}
                </h1>

                <CheckCircle
                  size={19}
                  className="fill-[#6B3038] text-white"
                />
              </div>

              <p className="mt-1 text-sm text-gray-400">
                @{beauty.username}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {beauty.location}
                </span>

                <span className="flex items-center gap-1.5">
                  <Star
                    size={16}
                    className="fill-[#e5c28d] text-[#e5c28d]"
                  />

                  <strong className="text-[#2d2424]">
                    {beauty.rating}
                  </strong>

                  ({beauty.reviewsCount} تقييم)
                </span>
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-8 text-gray-500">
                {beauty.description}
              </p>

              <p className="mt-3 text-sm font-semibold text-[#6B3038]">
                تبدأ الأسعار من {beauty.startingPrice} ₪
              </p>
            </div>

            {/* Stats */}
            <div className="mt-7 grid grid-cols-3 border-y border-[#f0e7e1] py-5 text-center">
              <div>
                <p className="text-xl font-bold">
                  {beauty.images.length}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  صورة
                </p>
              </div>

              <div className="border-x border-[#f0e7e1]">
                <p className="text-xl font-bold">
                  {beauty.reels.length}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  ريلز
                </p>
              </div>

              <div>
                <p className="text-xl font-bold">
                  {beauty.reviewsCount}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  تقييم
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-[#eadfd7] bg-white shadow-sm">
          <div className="grid grid-cols-5 overflow-x-auto border-b border-[#f0e7e1]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveTab(tab.id)
                }
                className={`relative whitespace-nowrap py-4 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? "text-[#6B3038]"
                    : "text-gray-400 hover:text-[#6B3038]"
                }`}
              >
                {tab.label}

                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 bg-[#6B3038]" />
                )}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-7">
            {/* Photos */}
            {activeTab === "photos" && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3">
                {beauty.images.map(
                  (image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() =>
                        setSelectedImage(index)
                      }
                      className="group relative aspect-square overflow-hidden rounded-xl bg-[#f8eee7]"
                    >
                      <img
                        src={image}
                        alt={`${beauty.name} ${
                          index + 1
                        }`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                    </button>
                  )
                )}
              </div>
            )}

            {/* Reels */}
            {activeTab === "reels" && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                {beauty.reels.map((reel) => (
                  <button
                    key={reel.id}
                    type="button"
                    onClick={() =>
                      setSelectedReel(reel)
                    }
                    className="group relative aspect-[9/14] overflow-hidden rounded-2xl bg-[#f8eee7]"
                  >
                    <img
                      src={reel.thumbnail}
                      alt={reel.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#6B3038] shadow-lg transition group-hover:scale-110">
                        <Play
                          size={22}
                          fill="currentColor"
                        />
                      </span>
                    </div>

                    <div className="absolute bottom-0 right-0 left-0 p-4 text-right text-white">
                      <p className="text-sm font-bold">
                        {reel.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Catalog */}
            {activeTab === "catalog" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {beauty.catalog.map(
                  (item) => (
                    <div
                      key={item.title}
                      className="group overflow-hidden rounded-2xl border border-[#eadfd7] bg-white transition hover:border-[#e5c28d] hover:shadow-sm"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                        <div className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-2xl shadow-sm">
                          {item.icon}
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-400">
                          {item.description}
                        </p>

                        <div className="mt-4 flex items-center justify-between border-t border-[#f0e7e1] pt-4">
                          <span className="text-sm font-bold text-[#6B3038]">
                            {item.price}
                          </span>

                          <button
                            type="button"
                            className="rounded-xl border border-[#eadfd7] px-4 py-2 text-xs font-bold text-[#6B3038] transition hover:bg-[#fffaf5]"
                          >
                            استفسار
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Packages */}
            {activeTab === "packages" && (
              <div className="grid gap-4 md:grid-cols-3">
                {beauty.packages.map(
                  (pkg) => (
                    <div
                      key={pkg.name}
                      className={`relative rounded-2xl border p-5 ${
                        pkg.popular
                          ? "border-[#6B3038] bg-[#fffaf5]"
                          : "border-[#eadfd7]"
                      }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-3 right-5 rounded-full bg-[#6B3038] px-3 py-1 text-[11px] font-bold text-white">
                          الأكثر طلبًا
                        </span>
                      )}

                      <h3 className="font-bold">
                        {pkg.name}
                      </h3>

                      <div className="mt-4">
                        <span className="text-2xl font-bold text-[#6B3038]">
                          {pkg.price}
                        </span>

                        <span className="mr-1 text-sm text-gray-400">
                          ₪
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-gray-400">
                        {pkg.description}
                      </p>

                      <button
                        type="button"
                        className="mt-5 w-full rounded-xl bg-[#6B3038] py-3 text-sm font-bold text-white transition hover:bg-[#57262D]"
                      >
                        استفسار عن الباقة
                      </button>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="mb-6 flex items-center gap-4 rounded-2xl bg-[#fffaf5] p-5">
                  <div className="text-center">
                    <p className="text-3xl font-bold">
                      {beauty.rating}
                    </p>

                    <div className="mt-1 text-sm">
                      ⭐⭐⭐⭐⭐
                    </div>

                    <p className="mt-1 text-xs text-gray-400">
                      {beauty.reviewsCount} تقييم
                    </p>
                  </div>
                </div>

                {beauty.reviews.map(
                  (review) => (
                    <div
                      key={review.name}
                      className="rounded-2xl border border-[#eadfd7] p-5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold">
                            {review.name}
                          </h3>

                          <p className="mt-1 text-xs text-gray-400">
                            {review.date}
                          </p>
                        </div>

                        <span className="text-sm">
                          {"⭐".repeat(
                            review.rating
                          )}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-gray-500">
                        {review.comment}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              setSelectedImage((current) =>
                current === 0
                  ? beauty.images.length - 1
                  : current - 1
              );
            }}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:right-8"
          >
            <ChevronRight size={24} />
          </button>

          <img
            src={beauty.images[selectedImage]}
            alt={beauty.name}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
          />

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              setSelectedImage((current) =>
                current === beauty.images.length - 1
                  ? 0
                  : current + 1
              );
            }}
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:left-8"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
            {selectedImage + 1} /{" "}
            {beauty.images.length}
          </div>
        </div>
      )}

      {/* Reel Modal */}
      {selectedReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setSelectedReel(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedReel(null)}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          <div
            className="relative h-[80vh] w-full max-w-md overflow-hidden rounded-2xl bg-black"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <video
              src={selectedReel.video}
              poster={selectedReel.thumbnail}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />

            <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-12">
              <h3 className="font-bold text-white">
                {selectedReel.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeautyDetails;