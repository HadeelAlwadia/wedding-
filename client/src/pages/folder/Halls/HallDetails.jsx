import { useEffect, useState } from "react";
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
  Loader2,
} from "lucide-react";
import api from '../../../api/api'
const HallDetails = () => {
  const { id } = useParams();

  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("photos");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedReel, setSelectedReel] = useState(null);

  const [hall, setHall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // Get Hall From Backend
  // =========================================================

  useEffect(() => {
    const fetchHall = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/businesses/${id}`
        );

        const business = response.data?.business;

        if (!business) {
          setError("لم يتم العثور على بيانات الصالة");
          return;
        }

        setHall(business);
      } catch (err) {
        console.error("Error fetching hall:", err);

        setError(
          err.response?.data?.message ||
            "حدث خطأ أثناء تحميل بيانات الصالة"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHall();
    }
  }, [id]);

  // =========================================================
  // Loading
  // =========================================================

  if (loading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#fffaf5] text-[#2d2424]"
      >
        <main className="mx-auto max-w-5xl px-4 pb-16">
          <div className="pt-6">
            <div className="h-5 w-72 animate-pulse rounded bg-[#eee3dc]" />
          </div>

          <section className="mt-6 overflow-hidden rounded-3xl border border-[#eadfd7] bg-white shadow-sm">
            <div className="h-48 animate-pulse bg-[#f3e9e2] md:h-64" />

            <div className="px-5 pb-7 md:px-8">
              <div className="-mt-14">
                <div className="h-28 w-28 animate-pulse rounded-full border-4 border-white bg-[#eee3dc] shadow-lg" />
              </div>

              <div className="mt-6">
                <div className="h-8 w-64 animate-pulse rounded bg-[#eee3dc]" />

                <div className="mt-3 h-4 w-32 animate-pulse rounded bg-[#f1e8e3]" />

                <div className="mt-5 h-4 w-80 animate-pulse rounded bg-[#f1e8e3]" />

                <div className="mt-3 h-4 w-full max-w-2xl animate-pulse rounded bg-[#f1e8e3]" />
              </div>
            </div>
          </section>

          <div className="mt-6 flex items-center justify-center py-10">
            <Loader2
              size={28}
              className="animate-spin text-[#6B3038]"
            />
          </div>
        </main>
      </div>
    );
  }

  // =========================================================
  // Error
  // =========================================================

  if (error || !hall) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#fffaf5] text-[#2d2424]"
      >
        <main className="mx-auto max-w-5xl px-4 pb-16">
          <div className="pt-6">
            <Link
              to="/halls"
              className="text-sm text-gray-400 transition hover:text-[#6B3038]"
            >
              العودة إلى الصالات
            </Link>
          </div>

          <div className="mt-8 rounded-3xl border border-[#eadfd7] bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8eee7] text-2xl">
              🏛️
            </div>

            <h3 className="mt-5 text-lg font-bold">
              تعذر تحميل الصالة
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              {error || "الصالة غير موجودة"}
            </p>

            <Link
              to="/halls"
              className="mt-6 inline-block text-sm font-semibold text-[#6B3038]"
            >
              العودة إلى الصالات
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================
  // Backend Data
  // =========================================================

  const profile = hall.businessProfile || {};

  const images = (hall.gallery || [])
    .filter((item) => item.isActive !== false)
    .map((item) => item.imageUrl)
    .filter(Boolean);

  const reels = (hall.reels || [])
    .filter((item) => item.isActive !== false)
    .map((reel) => ({
      id: reel._id,
      title: reel.title || "ريلز",
      thumbnail: reel.thumbnail || "",
      video: reel.videoUrl,
      description: reel.description || "",
    }))
    .filter((reel) => reel.video);

  const catalog = (hall.catalog || [])
    .filter((item) => item.isActive !== false)
    .map((item) => ({
      id: item._id,
      icon: item.data?.icon || "🏛️",
      title: item.name,
      description: item.description || "",
      price:
        item.priceType === "contact"
          ? "حسب الطلب"
          : item.priceType === "starting"
          ? `يبدأ من ${item.price} ₪`
          : `${item.price} ₪`,
      image: item.images?.[0] || "",
    }));

  const packages = (hall.packages || [])
    .filter((item) => item.isActive !== false)
    .map((pkg) => ({
      id: pkg._id,
      name: pkg.name,
      price: pkg.price || 0,
      description: pkg.description || "",
      services: pkg.services || [],
      popular: pkg.data?.popular || false,
    }));

  const reviews = (hall.reviews || [])
    .filter((review) => review.isApproved !== false)
    .map((review) => ({
      id: review._id,
      name: review.user?.name || "مستخدم زفاف",
      rating: review.rating || 0,
      comment: review.comment || "",
      date: review.createdAt
        ? new Date(
            review.createdAt
          ).toLocaleDateString("ar-PS", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "",
    }));

  const profileImage =
    profile.logo ||
    images[0] ||
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=500&q=85";

  const coverImage =
    images[0] ||
    profile.logo ||
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=90";

  const startingPrice =
    packages.length > 0
      ? Math.min(
          ...packages.map((pkg) => pkg.price || 0).filter(
            (price) => price > 0
          )
        )
      : catalog.length > 0
      ? Math.min(
          ...catalog
            .map((item) => {
              const number = Number(
                String(item.price).replace(/[^\d.]/g, "")
              );

              return number || 0;
            })
            .filter((price) => price > 0)
        )
      : 0;

  const rating =
    Number(profile.ratingAverage || 0);

  const reviewsCount =
    Number(profile.ratingCount || reviews.length || 0);

  const location =
    profile.address ||
    profile.governorate ||
    "الموقع غير محدد";

  const username =
    profile.username ||
    "";

  // =========================================================
  // Tabs
  // =========================================================

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

  // =========================================================
  // JSX
  // =========================================================

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
            to="/halls"
            className="transition hover:text-[#6B3038]"
          >
            صالات الأفراح
          </Link>

          <ChevronLeft size={15} />

          <span className="truncate text-[#6B3038]">
            {profile.name}
          </span>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 pb-16">
        {/* Profile */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-[#eadfd7] bg-white shadow-sm">
          {/* Cover */}
          <div className="relative h-48 overflow-hidden md:h-64">
            <img
              src={coverImage}
              alt={profile.name}
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
                    src={profileImage}
                    alt={profile.name}
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
                  {profile.name}
                </h1>

                <CheckCircle
                  size={19}
                  className="fill-[#6B3038] text-white"
                />
              </div>

              {username && (
                <p className="mt-1 text-sm text-gray-400">
                  @{username}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} />

                  {location}
                </span>

                <span className="flex items-center gap-1.5">
                  <Star
                    size={16}
                    className="fill-[#e5c28d] text-[#e5c28d]"
                  />

                  <strong className="text-[#2d2424]">
                    {rating > 0
                      ? rating.toFixed(1)
                      : "جديد"}
                  </strong>

                  ({reviewsCount} تقييم)
                </span>
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-8 text-gray-500">
                {profile.description ||
                  "لا يوجد وصف مضاف لهذه الصالة حتى الآن."}
              </p>

              {startingPrice > 0 && (
                <p className="mt-3 text-sm font-semibold text-[#6B3038]">
                  تبدأ الأسعار من {startingPrice} ₪
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="mt-7 grid grid-cols-3 border-y border-[#f0e7e1] py-5 text-center">
              <div>
                <p className="text-xl font-bold">
                  {images.length}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  صورة
                </p>
              </div>

              <div className="border-x border-[#f0e7e1]">
                <p className="text-xl font-bold">
                  {reels.length}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  ريلز
                </p>
              </div>

              <div>
                <p className="text-xl font-bold">
                  {reviewsCount}
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
            {/* ================================================= */}
            {/* Photos */}
            {/* ================================================= */}

            {activeTab === "photos" && (
              <>
                {images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3">
                    {images.map(
                      (image, index) => (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() =>
                            setSelectedImage(index)
                          }
                          className="group relative aspect-square overflow-hidden rounded-xl bg-[#f8eee7]"
                        >
                          <img
                            src={image}
                            alt={`${profile.name} ${
                              index + 1
                            }`}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                        </button>
                      )
                    )}
                  </div>
                ) : (
                  <EmptyState text="لا توجد صور مضافة حتى الآن" />
                )}
              </>
            )}

            {/* ================================================= */}
            {/* Reels */}
            {/* ================================================= */}

            {activeTab === "reels" && (
              <>
                {reels.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                    {reels.map((reel) => (
                      <button
                        key={reel.id}
                        type="button"
                        onClick={() =>
                          setSelectedReel(reel)
                        }
                        className="group relative aspect-[9/14] overflow-hidden rounded-2xl bg-[#f8eee7]"
                      >
                        {reel.thumbnail ? (
                          <img
                            src={reel.thumbnail}
                            alt={reel.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#6B3038]">
                            <Play
                              size={32}
                              className="text-white"
                            />
                          </div>
                        )}

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
                ) : (
                  <EmptyState text="لا توجد ريلز مضافة حتى الآن" />
                )}
              </>
            )}

            {/* ================================================= */}
            {/* Catalog */}
            {/* ================================================= */}

            {activeTab === "catalog" && (
              <>
                {catalog.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {catalog.map((item) => (
                      <div
                        key={item.id}
                        className="group overflow-hidden rounded-2xl border border-[#eadfd7] bg-white transition hover:border-[#e5c28d] hover:shadow-sm"
                      >
                        {item.image ? (
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
                        ) : (
                          <div className="flex h-44 items-center justify-center bg-[#f8eee7]">
                            <span className="text-4xl">
                              {item.icon}
                            </span>
                          </div>
                        )}

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
                    ))}
                  </div>
                ) : (
                  <EmptyState text="لا توجد خدمات مضافة حتى الآن" />
                )}
              </>
            )}

            {/* ================================================= */}
            {/* Packages */}
            {/* ================================================= */}

            {activeTab === "packages" && (
              <>
                {packages.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
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

                        {pkg.services.length > 0 && (
                          <div className="mt-4 space-y-1">
                            {pkg.services.map(
                              (service, index) => (
                                <p
                                  key={`${service}-${index}`}
                                  className="text-xs text-gray-500"
                                >
                                  ✓ {service}
                                </p>
                              )
                            )}
                          </div>
                        )}

                        <button
                          type="button"
                          className="mt-5 w-full rounded-xl bg-[#6B3038] py-3 text-sm font-bold text-white transition hover:bg-[#57262D]"
                        >
                          استفسار عن الباقة
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState text="لا توجد باقات مضافة حتى الآن" />
                )}
              </>
            )}

            {/* ================================================= */}
            {/* Reviews */}
            {/* ================================================= */}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="mb-6 flex items-center gap-4 rounded-2xl bg-[#fffaf5] p-5">
                  <div className="text-center">
                    <p className="text-3xl font-bold">
                      {rating > 0
                        ? rating.toFixed(1)
                        : "جديد"}
                    </p>

                    {rating > 0 && (
                      <div className="mt-1 flex justify-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(
                          (star) => (
                            <Star
                              key={star}
                              size={14}
                              className={
                                star <= rating
                                  ? "fill-[#e5c28d] text-[#e5c28d]"
                                  : "text-gray-300"
                              }
                            />
                          )
                        )}
                      </div>
                    )}

                    <p className="mt-1 text-xs text-gray-400">
                      {reviewsCount} تقييم
                    </p>
                  </div>
                </div>

                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div
                      key={review.id}
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

                        <span className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(
                            (star) => (
                              <Star
                                key={star}
                                size={14}
                                className={
                                  star <=
                                  review.rating
                                    ? "fill-[#e5c28d] text-[#e5c28d]"
                                    : "text-gray-300"
                                }
                              />
                            )
                          )}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-gray-500">
                        {review.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <EmptyState text="لا توجد تقييمات حتى الآن" />
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ===================================================== */}
      {/* Image Modal */}
      {/* ===================================================== */}

      {selectedImage !== null &&
        images.length > 0 && (
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
                    ? images.length - 1
                    : current - 1
                );
              }}
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:right-8"
            >
              <ChevronRight size={24} />
            </button>

            <img
              src={images[selectedImage]}
              alt={profile.name}
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
                  current === images.length - 1
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
              {images.length}
            </div>
          </div>
        )}

      {/* ===================================================== */}
      {/* Reel Modal */}
      {/* ===================================================== */}

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

              {selectedReel.description && (
                <p className="mt-1 text-sm text-white/70">
                  {selectedReel.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================
// Empty State
// =========================================================

const EmptyState = ({ text }) => {
  return (
    <div className="rounded-2xl bg-[#fffaf5] px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8eee7] text-xl">
        🏛️
      </div>

      <p className="mt-4 text-sm text-gray-400">
        {text}
      </p>
    </div>
  );
};

export default HallDetails;