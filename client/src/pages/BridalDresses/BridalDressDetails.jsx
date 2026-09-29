import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  MapPin,
  Phone,
  MessageCircle,
  Share2,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import api from "../../api/api";

const BridalDressDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dress, setDress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // =========================================================
  // Fetch Dress
  // =========================================================

  useEffect(() => {
    const fetchDress = async () => {
      try {
        setLoading(true);
        setError("");

  const response = await api.get(
  `/businesses/catalog/${id}?serviceType=bridal-dresses`
);

        const item = response.data?.item;

        if (!item) {
          throw new Error("الفستان غير موجود");
        }

        const data = item.data || {};

        const images = item.images || [];

        const gallery =
          data.gallery?.length > 0
            ? data.gallery
            : images;

        const mappedDress = {
          id: item._id,

          name: item.name || "فستان زفاف",

          store:
            item.businessName ||
            "دار أزياء",

          location:
            item.businessAddress ||
            "غزة",

          price: item.price || 0,

          priceType:
            item.priceType || "fixed",

          rating:
            item.businessRating || 0,

          reviews:
            item.businessRatingCount || 0,

          phone:
            item.businessPhone || "",

          whatsapp:
            item.businessWhatsapp ||
            item.businessPhone ||
            "",

          description:
            item.description || "",

          style:
            data.style ||
            data.design ||
            data.type ||
            "فستان زفاف",

          color:
            data.color ||
            data.colour ||
            "أبيض",

          sizes:
            Array.isArray(data.sizes)
              ? data.sizes
              : [],

          images:
            images.length > 0
              ? images
              : gallery,

          gallery:
            gallery.length > 0
              ? gallery
              : images,

          businessId:
            item.businessId,

          businessName:
            item.businessName,

          serviceType:
            item.serviceType,
        };

        setDress(mappedDress);
      } catch (error) {
        console.error(
          "Error fetching bridal dress:",
          error
        );

        setError(
          error?.response?.data?.message ||
            error?.message ||
            "حدث خطأ أثناء تحميل بيانات الفستان"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDress();
    }
  }, [id]);

  // =========================================================
  // Loading
  // =========================================================

  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#fffaf5] px-6"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2
            size={32}
            className="animate-spin text-[#6B3038]"
          />

          <p className="text-sm text-gray-400">
            جاري تحميل تفاصيل الفستان...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // Error / Not Found
  // =========================================================

  if (error || !dress) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#fffaf5] px-6"
      >
        <div className="text-center">
          <div className="text-5xl">
            👰
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#2d2424]">
            الفستان غير موجود
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-7 text-gray-400">
            {error ||
              "لم نتمكن من العثور على هذا الفستان."}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/bridal-dresses")
            }
            className="mt-5 rounded-xl bg-[#6B3038] px-6 py-3 text-sm font-bold text-white"
          >
            العودة للفساتين
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // WhatsApp
  // =========================================================

  const openWhatsApp = () => {
    const number =
      dress.whatsapp?.replace(/\D/g, "");

    if (!number) {
      alert("رقم الواتساب غير متوفر");
      return;
    }

    const message = encodeURIComponent(
      `مرحباً، أريد الاستفسار عن ${dress.name} من ${dress.store}.`
    );

    window.open(
      `https://wa.me/${number}?text=${message}`,
      "_blank"
    );
  };

  // =========================================================
  // Call
  // =========================================================

  const callStore = () => {
    if (!dress.phone) {
      alert("رقم الهاتف غير متوفر");
      return;
    }

    window.location.href = `tel:${dress.phone}`;
  };

  // =========================================================
  // Share
  // =========================================================

  const shareDress = async () => {
    const shareData = {
      title: dress.name,

      text: `شاهدي ${dress.name} من ${dress.store} على زفاف`,

      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert("تم نسخ رابط الفستان");
      }
    } catch {
      // المستخدم أغلق نافذة المشاركة
    }
  };

  // =========================================================
  // Images
  // =========================================================

  const currentImageIndex = selectedImage
    ? dress.images.indexOf(selectedImage)
    : -1;

  const nextImage = () => {
    if (
      currentImageIndex === -1 ||
      dress.images.length <= 1
    ) {
      return;
    }

    const nextIndex =
      (currentImageIndex + 1) %
      dress.images.length;

    setSelectedImage(
      dress.images[nextIndex]
    );
  };

  const previousImage = () => {
    if (
      currentImageIndex === -1 ||
      dress.images.length <= 1
    ) {
      return;
    }

    const previousIndex =
      (currentImageIndex -
        1 +
        dress.images.length) %
      dress.images.length;

    setSelectedImage(
      dress.images[previousIndex]
    );
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fffaf5] text-[#2d2424]"
    >
      {/* =====================================================
          Header
      ====================================================== */}

      <header className="sticky top-0 z-30 border-b border-[#eadfd7]/70 bg-[#fffaf5]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#6B3038] shadow-sm"
          >
            <ArrowRight size={20} />
          </button>

          <span className="text-sm font-bold">
            تفاصيل الفستان
          </span>

          <button
            type="button"
            onClick={shareDress}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#6B3038] shadow-sm"
          >
            <Share2 size={18} />
          </button>

        </div>
      </header>

      {/* =====================================================
          Main
      ====================================================== */}

      <main className="mx-auto max-w-6xl px-5 py-7 md:py-10">

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">

          {/* =================================================
              Images
          ================================================== */}

          <section>

            {dress.images.length > 0 ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedImage(
                      dress.images[0]
                    )
                  }
                  className="group relative block w-full overflow-hidden rounded-[2rem] bg-[#f2e7df]"
                >
                  <img
                    src={dress.images[0]}
                    alt={dress.name}
                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />

                  <span className="absolute bottom-5 right-5 text-sm font-semibold text-white">
                    اضغطي لمشاهدة الصور
                  </span>
                </button>

                {/* Thumbnails */}

                {dress.images.length > 1 && (
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {dress.images
                      .slice(0, 3)
                      .map(
                        (image, index) => (
                          <button
                            key={`${image}-${index}`}
                            type="button"
                            onClick={() =>
                              setSelectedImage(
                                image
                              )
                            }
                            className="overflow-hidden rounded-2xl"
                          >
                            <img
                              src={image}
                              alt={`${dress.name} ${
                                index + 1
                              }`}
                              className="aspect-square w-full object-cover transition duration-300 hover:scale-105"
                            />
                          </button>
                        )
                      )}
                  </div>
                )}
              </>
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center rounded-[2rem] bg-[#f2e7df] text-5xl">
                👰
              </div>
            )}

          </section>

          {/* =================================================
              Details
          ================================================== */}

          <section className="lg:pt-4">

            {/* Store */}

            <Link
              to={`/store/bridal-dresses/${dress.businessId}`}
              className="mt-3 block w-full rounded-xl bg-[#f8eee7] px-4 py-3 text-center text-base font-bold text-[#6B3038] transition-all hover:bg-[#e5c28d]/30"
            >
              تعرفي أكثر عن {dress.store} ←
            </Link>

            {/* Title */}

            <div className="mt-5 flex items-start justify-between gap-4">

              <div>
                <h1 className="text-3xl font-bold leading-tight md:text-4xl">
                  {dress.name}
                </h1>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                  <MapPin size={15} />

                  <span>
                    {dress.location}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setIsFavorite(
                    (current) => !current
                  )
                }
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#eadfd7] bg-white"
              >
                <Heart
                  size={21}
                  className={
                    isFavorite
                      ? "fill-[#6B3038] text-[#6B3038]"
                      : "text-[#6B3038]"
                  }
                />
              </button>

            </div>

            {/* Rating */}

            <div className="mt-6 flex items-center gap-3">

              <div className="flex items-center gap-1.5 rounded-full bg-[#f8eee7] px-4 py-2">

                <Star
                  size={15}
                  className="fill-[#e5c28d] text-[#e5c28d]"
                />

                <span className="text-sm font-bold">
                  {dress.rating > 0
                    ? dress.rating
                    : "جديد"}
                </span>

              </div>

              <span className="text-sm text-gray-400">
                {dress.reviews} تقييم
              </span>

            </div>

            {/* Price */}

            <div className="mt-8 rounded-3xl bg-white p-6">

              <p className="text-xs text-gray-400">
                سعر الإيجار
              </p>

              <div className="mt-1 flex items-end gap-2">

                <span className="text-3xl font-bold text-[#6B3038]">
                  {dress.price > 0
                    ? dress.price
                    : "عند التواصل"}
                </span>

                {dress.price > 0 && (
                  <span className="mb-1 text-sm text-gray-400">
                    ₪
                  </span>
                )}

              </div>

            </div>

            {/* Description */}

            <div className="mt-6">

              <h2 className="text-base font-bold">
                عن الفستان
              </h2>

              <p className="mt-3 text-sm leading-8 text-gray-500">
                {dress.description ||
                  "لم تتم إضافة وصف لهذا الفستان بعد."}
              </p>

            </div>

            {/* Details */}

            <div className="mt-6 border-t border-[#eadfd7] pt-6">

              <h2 className="text-base font-bold">
                تفاصيل التصميم
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">

                {dress.style && (
                  <span className="rounded-full bg-[#f8eee7] px-4 py-2 text-xs text-[#6B3038]">
                    {dress.style}
                  </span>
                )}

                {dress.color && (
                  <span className="rounded-full bg-[#f8eee7] px-4 py-2 text-xs text-[#6B3038]">
                    {dress.color}
                  </span>
                )}

              </div>

            </div>

            {/* Sizes */}

            {dress.sizes.length > 0 && (
              <div className="mt-6 border-t border-[#eadfd7] pt-6">

                <h2 className="text-base font-bold">
                  المقاسات المتوفرة
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">

                  {dress.sizes.map(
                    (size) => (
                      <span
                        key={size}
                        className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-[#eadfd7] bg-white px-3 text-xs font-semibold text-gray-600"
                      >
                        {size}
                      </span>
                    )
                  )}

                </div>

              </div>
            )}

            {/* Contact */}

            <div className="mt-8 grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#6B3038] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#57262D]"
              >
                <MessageCircle size={18} />
                استفسري
              </button>

              <button
                type="button"
                onClick={callStore}
                className="flex items-center justify-center gap-2 rounded-2xl border border-[#eadfd7] bg-white px-5 py-4 text-sm font-bold text-[#6B3038] transition hover:bg-[#f8eee7]"
              >
                <Phone size={18} />
                اتصال
              </button>

            </div>

            <p className="mt-4 text-center text-xs leading-6 text-gray-400">
              للاستفسار عن توفر الفستان والمقاس والسعر النهائي،
              تواصلي مباشرة مع دار الأزياء.
            </p>

          </section>
        </div>

        {/* ===================================================
            Gallery
        ==================================================== */}

        {dress.gallery.length > 0 && (
          <section className="mt-16 border-t border-[#eadfd7] pt-10">

            <div className="flex items-end justify-between">

              <div>
                <span className="text-xs font-semibold tracking-[2px] text-[#a27643]">
                  GALLERY
                </span>

                <h2 className="mt-2 text-2xl font-bold">
                  صور الفستان
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  تفاصيل أكثر عن التصميم والإطلالة
                </p>
              </div>

            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">

              {dress.gallery.map(
                (image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      setSelectedImage(image)
                    }
                    className="group overflow-hidden rounded-2xl"
                  >
                    <img
                      src={image}
                      alt={`${dress.name} gallery ${
                        index + 1
                      }`}
                      className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </button>
                )
              )}

            </div>

          </section>
        )}

        {/* ===================================================
            Store Contact
        ==================================================== */}

        <section className="mt-16 rounded-[2rem] bg-[#f8eee7] px-6 py-10 text-center">

          <div className="mx-auto max-w-xl">

            <p className="text-xs font-semibold tracking-[2px] text-[#a27643]">
              CONTACT
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              حبيتي الفستان؟
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              تواصلي مع دار الأزياء مباشرة للاستفسار عن
              المقاس والتوفر والتفاصيل.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

              <button
                type="button"
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#6B3038] px-7 py-3.5 text-sm font-bold text-white"
              >
                <MessageCircle size={17} />
                واتساب
              </button>

              <button
                type="button"
                onClick={callStore}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#6B3038]"
              >
                <Phone size={17} />
                اتصال
              </button>

            </div>

          </div>

        </section>

      </main>

      {/* =====================================================
          Image Modal
      ====================================================== */}

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">

          {/* Close */}

          <button
            type="button"
            onClick={() =>
              setSelectedImage(null)
            }
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur"
          >
            <X size={22} />
          </button>

          {/* Previous */}

          {currentImageIndex !== -1 &&
            dress.images.length > 1 && (
              <button
                type="button"
                onClick={previousImage}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur md:right-8"
              >
                <ChevronRight size={24} />
              </button>
            )}

          {/* Image */}

          <img
            src={selectedImage}
            alt={dress.name}
            className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain"
          />

          {/* Next */}

          {currentImageIndex !== -1 &&
            dress.images.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur md:left-8"
              >
                <ChevronLeft size={24} />
              </button>
            )}

        </div>
      )}
    </div>
  );
};

export default BridalDressDetails;