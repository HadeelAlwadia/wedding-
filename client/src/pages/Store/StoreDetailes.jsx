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
} from "lucide-react";

import api from "../../api/api";

// =========================================================
// Component
// =========================================================

const StoreDetails = () => {
  const { serviceType, id } = useParams();

  const [store, setStore] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [isFavorite, setIsFavorite] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("photos");

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [selectedReel, setSelectedReel] =
    useState(null);

  // =========================================================
  // Fetch Business
  // =========================================================

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/businesses/${id}`
        );

        const business =
          response.data?.business;

        if (!business) {
          throw new Error(
            "مقدم الخدمة غير موجود"
          );
        }

        const profile =
          business.businessProfile || {};

        // =====================================================
        // Gallery
        // =====================================================

        const images = (
          business.gallery || []
        )
          .filter(
            (image) =>
              image?.isActive !== false &&
              image?.imageUrl
          )
          .map((image) => ({
            id: image._id,
            title: image.title || "",
            url: image.imageUrl,
            description:
              image.description || "",
          }));

        // =====================================================
        // Reels
        // =====================================================

        const reels = (
          business.reels || []
        )
          .filter(
            (reel) =>
              reel?.isActive !== false &&
              reel?.videoUrl
          )
          .map((reel) => ({
            id: reel._id,
            title: reel.title || "ريلز",
            thumbnail:
              reel.thumbnail || "",
            video: reel.videoUrl,
            description:
              reel.description || "",
          }));

        // =====================================================
        // Catalog
        // =====================================================

        const catalog = (
          business.catalog || []
        )
          .filter(
            (item) =>
              item?.isActive !== false
          )
          .map((item) => {
            const data =
              item.data || {};

            return {
              id: item._id,

              icon:
                data.icon ||
                (profile.serviceType ===
                "groom-suits"
                  ? "🤵"
                  : profile.serviceType ===
                    "bridal-dresses"
                  ? "👗"
                  : "✨"),

              title:
                item.name ||
                "خدمة",

              description:
                item.description || "",

              price:
                item.price > 0
                  ? `${Number(
                      item.price
                    ).toLocaleString(
                      "en-US"
                    )} ₪`
                  : "السعر عند التواصل",

              image:
                item.images?.[0] ||
                "",

              features:
                Array.isArray(
                  item.features
                )
                  ? item.features
                  : [],
            };
          });

        // =====================================================
        // Packages
        // =====================================================

        const packages = (
          business.packages || []
        )
          .filter(
            (pkg) =>
              pkg?.isActive !== false
          )
          .map((pkg, index) => ({
            id: pkg._id,

            name:
              pkg.name ||
              "باقة",

            price:
              Number(pkg.price) || 0,

            description:
              pkg.description || "",

            services:
              Array.isArray(
                pkg.services
              )
                ? pkg.services
                : [],

            popular:
              index === 1,
          }));

        // =====================================================
        // Reviews
        // =====================================================

        const reviews = (
          business.reviews || []
        )
          .filter(
            (review) =>
              review?.isApproved !== false
          )
          .map((review) => ({
            id: review._id,

            name:
              review.user?.name ||
              "مستخدم",

            rating:
              Number(
                review.rating
              ) || 0,

            comment:
              review.comment || "",

            date:
              review.createdAt
                ? new Date(
                    review.createdAt
                  ).toLocaleDateString(
                    "ar-EG"
                  )
                : "",
          }));

        // =====================================================
        // Store
        // =====================================================

        const mappedStore = {
          id: business._id,

          name:
            profile.name ||
            "مقدم خدمة",

          username:
            profile.username ||
            "",

          location:
            profile.address ||
            profile.governorate ||
            "غزة",

          rating:
            Number(
              profile.ratingAverage
            ) || 0,

          reviewsCount:
            Number(
              profile.ratingCount
            ) || reviews.length,

          startingPrice:
            catalog.length > 0
              ? Math.min(
                  ...catalog
                    .map(
                      (item) =>
                        Number(
                          String(
                            item.price
                          ).replace(
                            /[^\d.]/g,
                            ""
                          )
                        ) || 0
                    )
                    .filter(
                      (price) =>
                        price > 0
                    )
                )
              : 0,

          profileImage:
            profile.logo || "",

          coverImage:
            images[0]?.url ||
            profile.logo ||
            "",

          description:
            profile.description || "",

          images,

          reels,

          catalog,

          packages,

          reviews,

          phone:
            profile.phone || "",

          whatsapp:
            profile.whatsapp || "",
        };

        setStore(mappedStore);
      } catch (err) {
        console.error(
          "fetchStore:",
          err
        );

        setError(
          err.response?.data?.message ||
            "حدث خطأ أثناء جلب بيانات مقدم الخدمة"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStore();
    }
  }, [id]);

  // =========================================================
  // Dynamic Content
  // =========================================================

  const isGroomSuit =
    serviceType ===
    "groom-suits";

  const categoryName =
    isGroomSuit
      ? "بدلات العرسان"
      : "فساتين العرائس";

  const catalogLabel =
    isGroomSuit
      ? "البدلات"
      : "الفساتين";

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
      label: catalogLabel,
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
  // Loading
  // =========================================================

  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#fffaf5]"
      >
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#eadfd7] border-t-[#6B3038]" />

          <p className="mt-4 text-sm text-gray-500">
            جاري تحميل الصفحة...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // Error
  // =========================================================

  if (error || !store) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#fffaf5] px-4"
      >
        <div className="w-full max-w-md rounded-3xl border border-[#eadfd7] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038]">
            <X size={24} />
          </div>

          <h2 className="mt-4 text-xl font-bold">
            لم نتمكن من تحميل الصفحة
          </h2>

          <p className="mt-2 text-sm leading-7 text-gray-500">
            {error ||
              "مقدم الخدمة غير موجود"}
          </p>

          <Link
            to={
              isGroomSuit
                ? "/groom-suits"
                : "/bridal-dresses"
            }
            className="mt-6 inline-flex rounded-xl bg-[#6B3038] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#57262D]"
          >
            العودة للخدمات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fffaf5] text-[#2d2424]"
    >
      {/* =====================================================
          Breadcrumb
      ===================================================== */}

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
            to={
              isGroomSuit
                ? "/groom-suits"
                : "/bridal-dresses"
            }
            className="transition hover:text-[#6B3038]"
          >
            {categoryName}
          </Link>

          <ChevronLeft size={15} />

          <span className="text-[#6B3038]">
            {store.name}
          </span>
        </div>
      </div>

      {/* =====================================================
          Main
      ===================================================== */}

      <main className="mx-auto max-w-5xl px-4 pb-16">
        {/* ===================================================
            Profile
        =================================================== */}

        <section className="mt-6 overflow-hidden rounded-3xl border border-[#eadfd7] bg-white shadow-sm">
          {/* Cover */}

          <div className="relative h-48 overflow-hidden md:h-64">
            {store.coverImage ? (
              <img
                src={store.coverImage}
                alt={store.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[#f8eee7]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            <button
              type="button"
              onClick={() =>
                setIsFavorite(
                  (prev) => !prev
                )
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
                  {store.profileImage ? (
                    <img
                      src={
                        store.profileImage
                      }
                      alt={
                        store.name
                      }
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f8eee7] text-3xl font-bold text-[#6B3038]">
                      {store.name?.charAt(
                        0
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}

              <div className="mt-5 flex w-full gap-3 md:w-auto">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6B3038] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#57262D] md:flex-none"
                >
                  <MessageCircle
                    size={18}
                  />

                  تواصل
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setIsFavorite(
                      (prev) => !prev
                    )
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
                  <Share2
                    size={18}
                  />
                </button>
              </div>
            </div>

            {/* Name */}

            <div className="mt-5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold md:text-3xl">
                  {store.name}
                </h1>

                <CheckCircle
                  size={19}
                  className="fill-[#6B3038] text-white"
                />
              </div>

              {store.username && (
                <p className="mt-1 text-sm text-gray-400">
                  @{store.username}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} />

                  {store.location}
                </span>

                <span className="flex items-center gap-1.5">
                  <Star
                    size={16}
                    className="fill-[#e5c28d] text-[#e5c28d]"
                  />

                  <strong className="text-[#2d2424]">
                    {store.rating}
                  </strong>

                  (
                  {
                    store.reviewsCount
                  }{" "}
                  تقييم)
                </span>
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-8 text-gray-500">
                {store.description}
              </p>

              {store.startingPrice >
                0 && (
                <p className="mt-3 text-sm font-semibold text-[#6B3038]">
                  تبدأ الأسعار من{" "}
                  {store.startingPrice.toLocaleString(
                    "en-US"
                  )}{" "}
                  ₪
                </p>
              )}
            </div>

            {/* Stats */}

            <div className="mt-7 grid grid-cols-3 border-y border-[#f0e7e1] py-5 text-center">
              <div>
                <p className="text-xl font-bold">
                  {
                    store
                      .images
                      .length
                  }
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  صورة
                </p>
              </div>

              <div className="border-x border-[#f0e7e1]">
                <p className="text-xl font-bold">
                  {
                    store
                      .reels
                      .length
                  }
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  ريلز
                </p>
              </div>

              <div>
                <p className="text-xl font-bold">
                  {
                    store
                      .catalog
                      .length
                  }
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {isGroomSuit
                    ? "بدلة"
                    : "فستان"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            Tabs
        =================================================== */}

        <section className="mt-6 overflow-hidden rounded-3xl border border-[#eadfd7] bg-white shadow-sm">
          <div className="grid grid-cols-5 overflow-x-auto border-b border-[#f0e7e1]">
            {tabs.map(
              (tab) => (
                <button
                  key={
                    tab.id
                  }
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      tab.id
                    )
                  }
                  className={`relative whitespace-nowrap py-4 text-sm font-semibold transition ${
                    activeTab ===
                    tab.id
                      ? "text-[#6B3038]"
                      : "text-gray-400 hover:text-[#6B3038]"
                  }`}
                >
                  {
                    tab.label
                  }

                  {activeTab ===
                    tab.id && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 bg-[#6B3038]" />
                  )}
                </button>
              )
            )}
          </div>

          <div className="p-4 md:p-7">
            {/* =================================================
                Photos
            ================================================= */}

            {activeTab ===
              "photos" && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3">
                {store.images
                  .map(
                    (
                      image,
                      index
                    ) => (
                      <button
                        key={
                          image.id ||
                          image.url +
                            index
                        }
                        type="button"
                        onClick={() =>
                          setSelectedImage(
                            index
                          )
                        }
                        className="group relative aspect-square overflow-hidden rounded-xl bg-[#f8eee7]"
                      >
                        <img
                          src={
                            image.url
                          }
                          alt={`${store.name} ${
                            index +
                            1
                          }`}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                      </button>
                    )
                  )}

                {store.images
                  .length ===
                  0 && (
                  <div className="col-span-full py-12 text-center text-sm text-gray-400">
                    لا توجد صور مضافة حاليًا
                  </div>
                )}
              </div>
            )}

            {/* =================================================
                Reels
            ================================================= */}

            {activeTab ===
              "reels" && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                {store.reels.map(
                  (reel) => (
                    <button
                      key={
                        reel.id
                      }
                      type="button"
                      onClick={() =>
                        setSelectedReel(
                          reel
                        )
                      }
                      className="group relative aspect-[9/14] overflow-hidden rounded-2xl bg-[#f8eee7]"
                    >
                      {reel.thumbnail ? (
                        <img
                          src={
                            reel.thumbnail
                          }
                          alt={
                            reel.title
                          }
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#6B3038]">
                          <Play
                            size={
                              38
                            }
                            className="text-white"
                            fill="white"
                          />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#6B3038] shadow-lg transition group-hover:scale-110">
                          <Play
                            size={
                              22
                            }
                            fill="currentColor"
                          />
                        </span>
                      </div>

                      <div className="absolute bottom-0 right-0 left-0 p-4 text-right text-white">
                        <p className="text-sm font-bold">
                          {
                            reel.title
                          }
                        </p>
                      </div>
                    </button>
                  )
                )}

                {store.reels
                  .length ===
                  0 && (
                  <div className="col-span-full py-12 text-center text-sm text-gray-400">
                    لا توجد ريلز مضافة حاليًا
                  </div>
                )}
              </div>
            )}

            {/* =================================================
                Catalog
            ================================================= */}

            {activeTab ===
              "catalog" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {store.catalog.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={
                        item.id ||
                        item.title +
                          index
                      }
                      className="group overflow-hidden rounded-2xl border border-[#eadfd7] bg-white transition hover:border-[#e5c28d] hover:shadow-sm"
                    >
                      <div className="relative h-64 overflow-hidden">
                        {item.image ? (
                          <img
                            src={
                              item.image
                            }
                            alt={
                              item.title
                            }
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#f8eee7] text-5xl">
                            {
                              item.icon
                            }
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                        <div className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-2xl shadow-sm">
                          {
                            item.icon
                          }
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-bold">
                              {
                                item.title
                              }
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-400">
                              {
                                item.description
                              }
                            </p>
                          </div>
                        </div>

                        {item
                          .features
                          .length >
                          0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.features
                              .slice(
                                0,
                                3
                              )
                              .map(
                                (
                                  feature,
                                  featureIndex
                                ) => (
                                  <span
                                    key={
                                      feature +
                                      featureIndex
                                    }
                                    className="rounded-full bg-[#fffaf5] px-3 py-1 text-xs text-gray-500"
                                  >
                                    {
                                      feature
                                    }
                                  </span>
                                )
                              )}
                          </div>
                        )}

                        <div className="mt-4 flex items-center justify-between border-t border-[#f0e7e1] pt-4">
                          <span className="text-sm font-bold text-[#6B3038]">
                            {
                              item.price
                            }
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

                {store.catalog
                  .length ===
                  0 && (
                  <div className="col-span-full py-12 text-center text-sm text-gray-400">
                    لا توجد خدمات أو منتجات مضافة حاليًا
                  </div>
                )}
              </div>
            )}

            {/* =================================================
                Packages
            ================================================= */}

            {activeTab ===
              "packages" && (
              <div className="grid gap-4 md:grid-cols-3">
                {store.packages.map(
                  (
                    pkg,
                    index
                  ) => (
                    <div
                      key={
                        pkg.id ||
                        pkg.name +
                          index
                      }
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
                        {
                          pkg.name
                        }
                      </h3>

                      <div className="mt-4">
                        <span className="text-2xl font-bold text-[#6B3038]">
                          {Number(
                            pkg.price ||
                              0
                          ).toLocaleString(
                            "en-US"
                          )}
                        </span>

                        <span className="mr-1 text-sm text-gray-400">
                          ₪
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-gray-400">
                        {
                          pkg.description
                        }
                      </p>

                      <div className="mt-4 space-y-2">
                        {pkg.services
                          .slice(
                            0,
                            4
                          )
                          .map(
                            (
                              service,
                              serviceIndex
                            ) => (
                              <div
                                key={
                                  service +
                                  serviceIndex
                                }
                                className="flex items-center gap-2 text-xs text-gray-500"
                              >
                                <CheckCircle
                                  size={
                                    14
                                  }
                                  className="text-[#6B3038]"
                                />

                                {
                                  service
                                }
                              </div>
                            )
                          )}
                      </div>

                      <button
                        type="button"
                        className="mt-5 w-full rounded-xl bg-[#6B3038] py-3 text-sm font-bold text-white transition hover:bg-[#57262D]"
                      >
                        استفسار عن الباقة
                      </button>
                    </div>
                  )
                )}

                {store.packages
                  .length ===
                  0 && (
                  <div className="col-span-full py-12 text-center text-sm text-gray-400">
                    لا توجد باقات مضافة حاليًا
                  </div>
                )}
              </div>
            )}

            {/* =================================================
                Reviews
            ================================================= */}

            {activeTab ===
              "reviews" && (
              <div className="space-y-4">
                <div className="mb-6 flex items-center gap-4 rounded-2xl bg-[#fffaf5] p-5">
                  <div className="text-center">
                    <p className="text-3xl font-bold">
                      {
                        store.rating
                      }
                    </p>

                    <div className="mt-1 text-sm">
                      ⭐⭐⭐⭐⭐
                    </div>

                    <p className="mt-1 text-xs text-gray-400">
                      {
                        store.reviewsCount
                      }{" "}
                      تقييم
                    </p>
                  </div>
                </div>

                {store.reviews.map(
                  (
                    review,
                    index
                  ) => (
                    <div
                      key={
                        review.id ||
                        review.name +
                          index
                      }
                      className="rounded-2xl border border-[#eadfd7] p-5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold">
                            {
                              review.name
                            }
                          </h3>

                          <p className="mt-1 text-xs text-gray-400">
                            {
                              review.date
                            }
                          </p>
                        </div>

                        <span className="text-sm">
                          {"⭐".repeat(
                            review.rating
                          )}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-gray-500">
                        {
                          review.comment
                        }
                      </p>
                    </div>
                  )
                )}

                {store.reviews
                  .length ===
                  0 && (
                  <div className="py-12 text-center text-sm text-gray-400">
                    لا توجد تقييمات حاليًا
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* =====================================================
          Image Modal
      ===================================================== */}

      {selectedImage !==
        null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() =>
            setSelectedImage(
              null
            )
          }
        >
          <button
            type="button"
            onClick={() =>
              setSelectedImage(
                null
              )
            }
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              setSelectedImage(
                (current) =>
                  current === 0
                    ? store.images
                        .length -
                      1
                    : current - 1
              );
            }}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:right-8"
          >
            <ChevronRight
              size={24}
            />
          </button>

          <img
            src={
              store.images[
                selectedImage
              ]?.url
            }
            alt={store.name}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
          />

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              setSelectedImage(
                (current) =>
                  current ===
                  store.images
                    .length -
                    1
                    ? 0
                    : current + 1
              );
            }}
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:left-8"
          >
            <ChevronLeft
              size={24}
            />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
            {selectedImage +
              1}{" "}
            /{" "}
            {
              store.images
                .length
            }
          </div>
        </div>
      )}

      {/* =====================================================
          Reel Modal
      ===================================================== */}

      {selectedReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() =>
            setSelectedReel(
              null
            )
          }
        >
          <button
            type="button"
            onClick={() =>
              setSelectedReel(
                null
              )
            }
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
              src={
                selectedReel.video
              }
              poster={
                selectedReel.thumbnail ||
                undefined
              }
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />

            <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-12">
              <h3 className="font-bold text-white">
                {
                  selectedReel.title
                }
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreDetails;