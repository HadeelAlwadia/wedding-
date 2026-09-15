import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const car = {
  id: 1,
  name: "Mercedes S-Class",
  company: "Royal Wedding Cars",
  location: "غزة - الرمال",
  price: 900,
  rating: 4.9,
  reviewsCount: 41,
  category: "سيارة فاخرة",
  type: "Mercedes S-Class",
  year: 2023,
  seats: 4,
  driver: true,
  available: true,

  images: [
    "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80",
  ],

  description:
    "سيارة Mercedes S-Class فاخرة ومجهزة خصيصًا لمناسبات الزفاف، تجمع بين الفخامة والراحة والأناقة لتكون جزءًا مميزًا من يومك.",

  features: [
    "مقاعد جلدية فاخرة",
    "تكييف مركزي",
    "نظام صوتي مميز",
    "إضاءة داخلية فاخرة",
    "زجاج معتم",
    "سائق محترف",
    "تنظيف وتجهيز قبل المناسبة",
    "تزيين السيارة حسب الطلب",
  ],

  services: [
    {
      name: "نقل العروس والعريس",
      description: "رحلة الزفاف الأساسية من المنزل إلى القاعة.",
      price: 900,
    },
    {
      name: "جولة تصوير",
      description: "استخدام السيارة أثناء جلسة تصوير العروسين.",
      price: 500,
    },
    {
      name: "الباقة الكاملة",
      description: "نقل + تصوير + تزيين السيارة.",
      price: 1200,
      popular: true,
    },
  ],

  workingHours: [
    ["السبت - الخميس", "9:00 ص - 10:00 م"],
    ["الجمعة", "2:00 م - 10:00 م"],
  ],

  reviews: [
    {
      name: "سارة محمد",
      rating: 5,
      date: "منذ أسبوع",
      comment:
        "السيارة كانت فخمة جدًا ونظيفة، والسائق كان محترم وملتزم بالموعد.",
    },
    {
      name: "ريم أحمد",
      rating: 5,
      date: "منذ شهر",
      comment:
        "التجربة كانت رائعة جدًا، والسيارة أعطت صور الزفاف شكل جميل.",
    },
    {
      name: "نور علي",
      rating: 4,
      date: "منذ شهرين",
      comment:
        "الخدمة ممتازة والسيارة كانت مثل الصور تمامًا.",
    },
  ],
};

const WeddingCarDetails = () => {
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(car.images[0]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const [selectedService, setSelectedService] = useState(
    car.services[2].name
  );

  const [bookingData, setBookingData] = useState({
    date: "",
    startTime: "",
    hours: "4",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!bookingData.date) {
      alert("يرجى اختيار تاريخ الحجز");
      return;
    }

    if (!bookingData.startTime) {
      alert("يرجى اختيار وقت الحجز");
      return;
    }

    console.log({
      carId: id,
      car: car.name,
      service: selectedService,
      ...bookingData,
    });

    alert("تم إرسال طلب الحجز بنجاح 🚘🤍");

    setShowBookingModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFAF5]">
      {/* Breadcrumb */}
      <div className="border-b border-[#eaded4] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link
              to="/"
              className="transition hover:text-[#6B3038]"
            >
              الرئيسية
            </Link>

            <span>←</span>

            <Link
              to="/wedding-cars"
              className="transition hover:text-[#6B3038]"
            >
              سيارات الزفاف
            </Link>

            <span>←</span>

            <span className="text-[#6B3038]">
              {car.name}
            </span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Main */}
        <section className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-[#f5ebe3]">
              <img
                src={selectedImage}
                alt={car.name}
                className="h-[580px] w-full object-cover"
              />

              <button
                onClick={() =>
                  setIsFavorite(!isFavorite)
                }
                className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-lg transition hover:scale-105"
              >
                {isFavorite ? "♥" : "♡"}
              </button>

              <div className="absolute right-5 top-5 rounded-full bg-[#6B3038] px-4 py-2 text-sm font-semibold text-white">
                {car.category}
              </div>

              {car.available && (
                <div className="absolute bottom-5 right-5 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">
                  متاحة للحجز
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {car.images.map((image, index) => (
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
                    alt={`${car.name} ${index + 1}`}
                    className="h-24 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="mb-3 text-sm font-semibold text-[#a77b4f]">
              {car.company}
            </p>

            <h1 className="text-4xl font-bold text-[#2d2424] md:text-5xl">
              {car.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-lg text-yellow-500">
                  ★
                </span>

                <span className="font-bold">
                  {car.rating}
                </span>

                <span className="text-gray-500">
                  ({car.reviewsCount} تقييم)
                </span>
              </div>

              <span className="h-5 w-px bg-gray-300" />

              <span className="text-gray-500">
                📍 {car.location}
              </span>
            </div>

            {/* Price */}
            <div className="my-7 border-y border-[#eaded4] py-6">
              <p className="text-3xl font-bold text-[#6B3038]">
                {car.price.toLocaleString()} ₪
              </p>

              <p className="mt-2 text-sm text-gray-500">
                السعر يبدأ من / يوم
              </p>
            </div>

            {/* Quick info */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <div className="text-2xl">🚘</div>
                <p className="mt-2 text-xs text-gray-500">
                  النوع
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {car.type}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <div className="text-2xl">📅</div>
                <p className="mt-2 text-xs text-gray-500">
                  الموديل
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {car.year}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <div className="text-2xl">👥</div>
                <p className="mt-2 text-xs text-gray-500">
                  المقاعد
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {car.seats}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <div className="text-2xl">👨‍✈️</div>
                <p className="mt-2 text-xs text-gray-500">
                  السائق
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {car.driver ? "متوفر" : "غير متوفر"}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="mb-3 text-xl font-bold text-[#2d2424]">
                عن السيارة
              </h2>

              <p className="leading-8 text-gray-600">
                {car.description}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setShowBookingModal(true)}
                className="rounded-2xl bg-[#6B3038] px-6 py-4 font-semibold text-white transition hover:bg-[#57262d]"
              >
                احجزي السيارة
              </button>

              <button
                onClick={() => setShowInquiryModal(true)}
                className="rounded-2xl border border-[#6B3038] bg-white px-6 py-4 font-semibold text-[#6B3038] transition hover:bg-[#f8eeee]"
              >
                استفسار
              </button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-16">
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <p className="mb-2 text-sm font-semibold text-[#a77b4f]">
              مواصفات السيارة
            </p>

            <h2 className="text-2xl font-bold text-[#2d2424]">
              ماذا توفر لك السيارة؟
            </h2>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {car.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-2xl bg-[#FFFAF5] p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5ebe3] text-[#6B3038]">
                    ✓
                  </span>

                  <span className="text-sm text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="mt-16">
          <div className="mb-7">
            <p className="mb-2 text-sm font-semibold text-[#a77b4f]">
              اختاري الخدمة المناسبة
            </p>

            <h2 className="text-3xl font-bold text-[#2d2424]">
              خدمات تأجير السيارة
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {car.services.map((service) => (
              <div
                key={service.name}
                className={`relative rounded-3xl border bg-white p-7 ${
                  service.popular
                    ? "border-[#6B3038] shadow-lg"
                    : "border-[#eaded4]"
                }`}
              >
                {service.popular && (
                  <span className="absolute right-5 top-5 rounded-full bg-[#6B3038] px-3 py-1 text-xs font-semibold text-white">
                    الأكثر طلبًا
                  </span>
                )}

                <h3 className="text-xl font-bold text-[#2d2424]">
                  {service.name}
                </h3>

                <p className="mt-4 min-h-14 leading-7 text-gray-500">
                  {service.description}
                </p>

                <p className="mt-5 text-2xl font-bold text-[#6B3038]">
                  {service.price.toLocaleString()} ₪
                </p>

                <button
                  onClick={() => {
                    setSelectedService(service.name);
                    setShowBookingModal(true);
                  }}
                  className={`mt-6 w-full rounded-xl px-5 py-3 font-semibold transition ${
                    service.popular
                      ? "bg-[#6B3038] text-white hover:bg-[#57262d]"
                      : "border border-[#6B3038] text-[#6B3038] hover:bg-[#f8eeee]"
                  }`}
                >
                  اختيار الخدمة
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Location + Hours */}
        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#2d2424]">
              أوقات العمل
            </h2>

            <div className="mt-6 space-y-4">
              {car.workingHours.map(([day, hours]) => (
                <div
                  key={day}
                  className="flex justify-between border-b border-gray-100 pb-4"
                >
                  <span className="text-gray-600">
                    {day}
                  </span>

                  <span className="font-medium text-[#6B3038]">
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-[#2d2424]">
              موقع الشركة
            </h2>

            <div className="mt-6 rounded-2xl bg-[#FFFAF5] p-6">
              <p className="text-sm text-gray-500">
                العنوان
              </p>

              <p className="mt-2 font-semibold text-[#2d2424]">
                📍 {car.location}
              </p>

              <button className="mt-5 text-sm font-semibold text-[#6B3038] underline">
                عرض الموقع على الخريطة
              </button>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-16">
          <div className="mb-7">
            <p className="mb-2 text-sm font-semibold text-[#a77b4f]">
              آراء العملاء
            </p>

            <h2 className="text-3xl font-bold text-[#2d2424]">
              تقييمات السيارة
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {car.reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-3xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-[#2d2424]">
                      {review.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      {review.date}
                    </p>
                  </div>

                  <span className="text-yellow-500">
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
          <h2 className="text-3xl font-bold">
            جاهزة تختاري سيارة زفافك؟ 🚘🤍
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-8 text-white/70">
            احجزي سيارتك الآن وخلي وصولك إلى ليلة العمر
            مميزًا مثل باقي تفاصيل فرحك.
          </p>

          <button
            onClick={() => setShowBookingModal(true)}
            className="mt-7 rounded-xl bg-[#e5c28d] px-8 py-3 font-bold text-[#2d2424] transition hover:opacity-90"
          >
            احجزي الآن
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
                  حجز السيارة
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {car.name}
                </p>
              </div>

              <button
                onClick={() => setShowBookingModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleBookingSubmit}
              className="mt-7 space-y-5"
            >
              {/* Service */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  الخدمة
                </label>

                <select
                  value={selectedService}
                  onChange={(e) =>
                    setSelectedService(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6B3038]"
                >
                  {car.services.map((service) => (
                    <option key={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  تاريخ الحجز
                </label>

                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6B3038]"
                />
              </div>

              {/* Time */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  وقت البداية
                </label>

                <input
                  type="time"
                  name="startTime"
                  value={bookingData.startTime}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6B3038]"
                />
              </div>

              {/* Hours */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  عدد الساعات
                </label>

                <select
                  name="hours"
                  value={bookingData.hours}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6B3038]"
                >
                  <option value="2">ساعتان</option>
                  <option value="4">4 ساعات</option>
                  <option value="6">6 ساعات</option>
                  <option value="8">8 ساعات</option>
                  <option value="12">12 ساعة</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  ملاحظات
                </label>

                <textarea
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="مثلاً: أحتاج تزيين السيارة بالورد..."
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
                استفسار عن السيارة
              </h2>

              <button
                onClick={() => setShowInquiryModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl"
              >
                ×
              </button>
            </div>

            <p className="mt-4 leading-7 text-gray-500">
              يمكنك إرسال استفسار إلى {car.company} حول
              السعر، التوفر، التزيين أو أي تفاصيل أخرى.
            </p>

            <textarea
              rows="5"
              placeholder="اكتبي استفسارك هنا..."
              className="mt-5 w-full resize-none rounded-xl border border-gray-200 p-4 outline-none focus:border-[#6B3038]"
            />

            <button className="mt-4 w-full rounded-xl bg-[#6B3038] py-3 font-semibold text-white">
              إرسال الاستفسار
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingCarDetails;