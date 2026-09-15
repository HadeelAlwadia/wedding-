import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const dress = {
  id: 1,
  name: "فستان لؤلؤة",
  store: "دار ليان للفساتين",
  location: "غزة - الرمال",
  price: 1800,
  rating: 4.9,
  reviewsCount: 32,
  style: "ملكي",
  color: "أبيض",
  sizes: ["36", "38", "40", "42", "44"],
  images: [
    "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519657337289-077653f724ed?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80",
  ],
  description:
    "فستان زفاف ملكي بتصميم أنيق وفخم، مزين بتفاصيل ناعمة ولمسات من اللؤلؤ تمنح العروس إطلالة راقية ومميزة في ليلة العمر.",
  details: [
    "تصميم ملكي فاخر",
    "تطريز يدوي ناعم",
    "طبقات تول متعددة",
    "خصر محدد بطريقة أنيقة",
    "مناسب لحفلات الزفاف والقاعات الكبيرة",
  ],
  accessories: [
    "طرحة طويلة",
    "حزام خصر",
    "قفازات اختيارية",
    "إكسسوارات شعر",
  ],
  packages: [
    {
      name: "الباقة الأساسية",
      price: 1800,
      description: "الفستان + التعديلات الأساسية",
    },
    {
      name: "الباقة الكاملة",
      price: 2200,
      description: "الفستان + الطرحة + التعديلات + الإكسسوارات",
      popular: true,
    },
    {
      name: "الباقة الملكية",
      price: 2600,
      description: "الفستان + الطرحة + الإكسسوارات + جلسة قياس خاصة",
    },
  ],
  workingHours: [
    ["السبت - الخميس", "10:00 ص - 8:00 م"],
    ["الجمعة", "4:00 م - 8:00 م"],
  ],
  reviews: [
    {
      name: "سارة محمد",
      rating: 5,
      comment: "الفستان كان أجمل مما توقعت، والتعامل كان رائع جدًا.",
      date: "منذ أسبوعين",
    },
    {
      name: "ريم أحمد",
      rating: 5,
      comment: "التفاصيل والخياطة ممتازة، وأنصح به جدًا.",
      date: "منذ شهر",
    },
    {
      name: "نور علي",
      rating: 4,
      comment: "الفستان جميل جدًا والقياس كان مناسبًا بعد التعديل.",
      date: "منذ شهرين",
    },
  ],
};

const BridalDressDetails = () => {
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(dress.images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(
    dress.packages[1].name
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const [bookingData, setBookingData] = useState({
    date: "",
    notes: "",
  });

  const handleBookingChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!selectedSize) {
      alert("يرجى اختيار المقاس أولًا");
      return;
    }

    if (!bookingData.date) {
      alert("يرجى اختيار موعد القياس");
      return;
    }

    console.log({
      dressId: id,
      dress: dress.name,
      size: selectedSize,
      package: selectedPackage,
      date: bookingData.date,
      notes: bookingData.notes,
    });

    alert("تم إرسال طلب الحجز بنجاح 🤍");

    setShowBookingModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFAF5]">
      {/* Breadcrumb */}
      <div className="border-b border-[#eaded4] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="transition hover:text-[#6B3038]">
              الرئيسية
            </Link>

            <span>←</span>

            <Link
              to="/bridal-dresses"
              className="transition hover:text-[#6B3038]"
            >
              فساتين العرائس
            </Link>

            <span>←</span>

            <span className="text-[#6B3038]">{dress.name}</span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Main Product */}
        <section className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-[#f5ebe3]">
              <img
                src={selectedImage}
                alt={dress.name}
                className="h-[600px] w-full object-cover"
              />

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-lg transition hover:scale-105"
              >
                {isFavorite ? "♥" : "♡"}
              </button>

              <div className="absolute right-5 top-5 rounded-full bg-[#6B3038] px-4 py-2 text-sm font-semibold text-white">
                {dress.style}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {dress.images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`overflow-hidden rounded-2xl border-2 ${
                    selectedImage === image
                      ? "border-[#6B3038]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${dress.name} ${index + 1}`}
                    className="h-28 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="mb-3 text-sm font-medium text-[#a77b4f]">
              {dress.store}
            </p>

            <h1 className="text-4xl font-bold text-[#2d2424] md:text-5xl">
              {dress.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-lg text-yellow-500">★</span>
                <span className="font-semibold">{dress.rating}</span>
                <span className="text-gray-500">
                  ({dress.reviewsCount} تقييم)
                </span>
              </div>

              <span className="h-5 w-px bg-gray-300" />

              <span className="text-gray-500">{dress.location}</span>
            </div>

            <div className="my-7 border-y border-[#eaded4] py-6">
              <p className="text-3xl font-bold text-[#6B3038]">
                {dress.price.toLocaleString()} ₪
              </p>

              <p className="mt-2 text-sm text-gray-500">
                يبدأ السعر من هذا المبلغ حسب الباقة والتعديلات
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-[#2d2424]">
                عن الفستان
              </h2>

              <p className="leading-8 text-gray-600">
                {dress.description}
              </p>
            </div>

            {/* Color */}
            <div className="mt-7">
              <h3 className="mb-3 font-semibold text-[#2d2424]">اللون</h3>

              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full border-4 border-white bg-white shadow ring-1 ring-gray-300" />
                <span className="text-sm text-gray-600">{dress.color}</span>
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-[#2d2424]">المقاس</h3>

                <button className="text-sm font-medium text-[#6B3038] underline">
                  دليل المقاسات
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {dress.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 min-w-14 rounded-xl border px-4 font-medium transition ${
                      selectedSize === size
                        ? "border-[#6B3038] bg-[#6B3038] text-white"
                        : "border-[#ddcec3] bg-white text-gray-700 hover:border-[#6B3038]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setShowBookingModal(true)}
                className="rounded-2xl bg-[#6B3038] px-6 py-4 font-semibold text-white transition hover:bg-[#57262d]"
              >
                احجزي موعد قياس
              </button>

              <button
                onClick={() => setShowInquiryModal(true)}
                className="rounded-2xl border border-[#6B3038] bg-white px-6 py-4 font-semibold text-[#6B3038] transition hover:bg-[#f8eeee]"
              >
                استفسار عن الفستان
              </button>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="mt-16 grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-7 shadow-sm lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-[#2d2424]">
              تفاصيل الفستان
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {dress.details.map((detail) => (
                <div
                  key={detail}
                  className="flex items-center gap-3 rounded-2xl bg-[#FFFAF5] p-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5ebe3] text-[#6B3038]">
                    ✓
                  </span>

                  <span className="text-gray-700">{detail}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-xl font-bold text-[#2d2424]">
                الإكسسوارات المتاحة
              </h3>

              <div className="flex flex-wrap gap-3">
                {dress.accessories.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#f5ebe3] px-5 py-2 text-sm text-[#6B3038]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-[#2d2424]">
              أوقات العمل
            </h2>

            <div className="space-y-4">
              {dress.workingHours.map(([day, hours]) => (
                <div
                  key={day}
                  className="flex items-center justify-between border-b border-gray-100 pb-4"
                >
                  <span className="text-gray-600">{day}</span>
                  <span className="text-sm font-medium text-[#6B3038]">
                    {hours}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl bg-[#FFFAF5] p-5">
              <p className="mb-2 text-sm text-gray-500">الموقع</p>
              <p className="font-semibold text-[#2d2424]">
                📍 {dress.location}
              </p>

              <button className="mt-4 text-sm font-medium text-[#6B3038] underline">
                عرض الموقع على الخريطة
              </button>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="mt-16">
          <div className="mb-7">
            <p className="mb-2 text-sm font-semibold text-[#a77b4f]">
              اختاري ما يناسبك
            </p>

            <h2 className="text-3xl font-bold text-[#2d2424]">
              باقات الفستان
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {dress.packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-3xl border bg-white p-7 ${
                  pkg.popular
                    ? "border-[#6B3038] shadow-lg"
                    : "border-[#eaded4]"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute right-5 top-5 rounded-full bg-[#6B3038] px-3 py-1 text-xs font-semibold text-white">
                    الأكثر طلبًا
                  </span>
                )}

                <h3 className="text-xl font-bold text-[#2d2424]">
                  {pkg.name}
                </h3>

                <p className="mt-4 text-3xl font-bold text-[#6B3038]">
                  {pkg.price.toLocaleString()} ₪
                </p>

                <p className="mt-4 min-h-12 leading-7 text-gray-500">
                  {pkg.description}
                </p>

                <button
                  onClick={() => {
                    setSelectedPackage(pkg.name);
                    setShowBookingModal(true);
                  }}
                  className={`mt-7 w-full rounded-xl px-5 py-3 font-semibold transition ${
                    pkg.popular
                      ? "bg-[#6B3038] text-white hover:bg-[#57262d]"
                      : "border border-[#6B3038] text-[#6B3038] hover:bg-[#f8eeee]"
                  }`}
                >
                  اختيار الباقة
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-16">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-[#a77b4f]">
                آراء العرائس
              </p>

              <h2 className="text-3xl font-bold text-[#2d2424]">
                تقييمات العملاء
              </h2>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-2xl font-bold">{dress.rating}</span>
              <span className="text-yellow-500">★★★★★</span>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {dress.reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-3xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-[#2d2424]">
                      {review.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      {review.date}
                    </p>
                  </div>

                  <span className="text-sm text-yellow-500">
                    {"★".repeat(review.rating)}
                  </span>
                </div>

                <p className="mt-5 leading-7 text-gray-600">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-[#6B3038] px-7 py-12 text-center text-white">
          <h2 className="text-3xl font-bold">وجدتِ فستان أحلامك؟ 👰🏻‍♀️</h2>

          <p className="mx-auto mt-4 max-w-xl leading-8 text-white/75">
            احجزي موعد قياسك الآن وخلي أول خطوة نحو إطلالتك المميزة تبدأ من هنا.
          </p>

          <button
            onClick={() => setShowBookingModal(true)}
            className="mt-7 rounded-xl bg-[#e5c28d] px-8 py-3 font-bold text-[#2d2424] transition hover:opacity-90"
          >
            احجزي موعدك الآن
          </button>
        </section>
      </main>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#2d2424]">
                  حجز موعد قياس
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {dress.name} — {dress.store}
                </p>
              </div>

              <button
                onClick={() => setShowBookingModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  الباقة
                </label>

                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6B3038]"
                >
                  {dress.packages.map((pkg) => (
                    <option key={pkg.name}>{pkg.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  المقاس
                </label>

                <div className="flex flex-wrap gap-2">
                  {dress.sizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-lg border px-4 py-2 ${
                        selectedSize === size
                          ? "border-[#6B3038] bg-[#6B3038] text-white"
                          : "border-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  موعد القياس
                </label>

                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleBookingChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6B3038]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  ملاحظات إضافية
                </label>

                <textarea
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleBookingChange}
                  rows="4"
                  placeholder="اكتبي أي ملاحظات أو طلبات خاصة..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6B3038]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#6B3038] py-3 font-semibold text-white transition hover:bg-[#57262d]"
              >
                تأكيد طلب الحجز
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#2d2424]">
                استفسار عن الفستان
              </h2>

              <button
                onClick={() => setShowInquiryModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl"
              >
                ×
              </button>
            </div>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              يمكنك التواصل مع {dress.store} للاستفسار عن المقاسات، التعديلات،
              الأسعار والتوفر.
            </p>

            <div className="mt-6 space-y-3">
              <button className="w-full rounded-xl bg-[#6B3038] py-3 font-semibold text-white">
                إرسال استفسار
              </button>

              <button
                onClick={() => setShowInquiryModal(false)}
                className="w-full rounded-xl border border-gray-200 py-3 font-semibold text-gray-600"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BridalDressDetails;