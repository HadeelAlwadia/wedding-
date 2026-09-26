import { useMemo, useState } from "react";
import {
  Star,
  MessageSquare,
  ThumbsUp,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";

const Reviews = () => {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  // بيانات تجريبية مؤقتة
  // لاحقًا سيتم جلبها من الـBackend
  const [reviews] = useState([
    {
      id: 1,
      name: "سارة محمد",
      rating: 5,
      comment:
        "تجربة رائعة جدًا، الخدمة كانت ممتازة والتعامل راقٍ جدًا. أنصح بهم بشدة.",
      date: "منذ يومين",
      service: "الخدمة العامة",
      helpful: 4,
    },
    {
      id: 2,
      name: "نور أحمد",
      rating: 5,
      comment:
        "كل شيء كان مرتبًا وجميلًا، والتعامل كان محترمًا وسريعًا.",
      date: "منذ أسبوع",
      service: "الخدمة العامة",
      helpful: 2,
    },
    {
      id: 3,
      name: "ريم خالد",
      rating: 4,
      comment:
        "الخدمة جيدة جدًا والتعامل ممتاز، أتمنى فقط إضافة خيارات أكثر.",
      date: "منذ أسبوعين",
      service: "الخدمة العامة",
      helpful: 1,
    },
  ]);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        review.name.toLowerCase().includes(search.toLowerCase()) ||
        review.comment.toLowerCase().includes(search.toLowerCase());

      const matchesRating =
        ratingFilter === "all" ||
        review.rating === Number(ratingFilter);

      return matchesSearch && matchesRating;
    });
  }, [reviews, search, ratingFilter]);

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          totalReviews
        ).toFixed(1)
      : "—";

  const ratingCounts = {
    5: reviews.filter((review) => review.rating === 5).length,
    4: reviews.filter((review) => review.rating === 4).length,
    3: reviews.filter((review) => review.rating === 3).length,
    2: reviews.filter((review) => review.rating === 2).length,
    1: reviews.filter((review) => review.rating === 1).length,
  };

  const renderStars = (rating, size = 16) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= rating
                ? "fill-[#e5c28d] text-[#e5c28d]"
                : "text-[#d9cbc4]"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="rounded-xl bg-[#f8eee7] p-2 text-[#6B3038]">
            <MessageSquare size={20} />
          </div>

          <span className="text-sm font-medium text-[#9b8178]">
            آراء العملاء
          </span>
        </div>

        <h1 className="text-2xl font-bold text-[#2d2424] md:text-3xl">
          التقييمات
        </h1>

        <p className="mt-2 text-sm text-[#8c7770]">
          تابع آراء الزوار وتعرّف على تجربتهم مع نشاطك.
        </p>
      </div>

      {/* Overview */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Average */}
        <div className="rounded-3xl border border-[#eadbd2] bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-[#8c7770]">
            التقييم العام
          </p>

          <div className="mt-4 flex items-end gap-3">
            <span className="text-5xl font-bold text-[#6B3038]">
              {averageRating}
            </span>

            <div className="pb-2">
              {renderStars(Math.round(Number(averageRating)), 18)}

              <p className="mt-1 text-xs text-[#9b8178]">
                من أصل 5
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-[#8c7770]">
            <MessageSquare size={16} />
            <span>{totalReviews} تقييمات</span>
          </div>
        </div>

        {/* Rating distribution */}
        <div className="rounded-3xl border border-[#eadbd2] bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="font-bold text-[#2d2424]">
            توزيع التقييمات
          </h2>

          <div className="mt-5 space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingCounts[rating];
              const percentage =
                totalReviews > 0
                  ? (count / totalReviews) * 100
                  : 0;

              return (
                <div
                  key={rating}
                  className="flex items-center gap-3"
                >
                  <div className="flex w-12 items-center gap-1">
                    <span className="text-sm font-medium text-[#5d4a44]">
                      {rating}
                    </span>

                    <Star
                      size={13}
                      className="fill-[#e5c28d] text-[#e5c28d]"
                    />
                  </div>

                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#f1e8e2]">
                    <div
                      className="h-full rounded-full bg-[#e5c28d] transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <span className="w-8 text-left text-xs text-[#9b8178]">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-[#eadbd2] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a9968e]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث في التقييمات..."
              className="w-full rounded-xl border border-[#eadbd2] bg-[#fffaf7] py-3 pr-11 pl-4 text-sm text-[#2d2424] outline-none transition focus:border-[#b88a78] focus:ring-2 focus:ring-[#e5c28d]/20"
            />
          </div>

          {/* Rating filter */}
          <div className="relative md:w-52">
            <Filter
              size={17}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a9968e]"
            />

            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-[#eadbd2] bg-[#fffaf7] py-3 pr-11 pl-10 text-sm text-[#5d4a44] outline-none transition focus:border-[#b88a78] focus:ring-2 focus:ring-[#e5c28d]/20"
            >
              <option value="all">كل التقييمات</option>
              <option value="5">5 نجوم</option>
              <option value="4">4 نجوم</option>
              <option value="3">3 نجوم</option>
              <option value="2">نجمتان</option>
              <option value="1">نجمة واحدة</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a9968e]"
            />
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#2d2424]">
              تقييمات العملاء
            </h2>

            <p className="mt-1 text-sm text-[#9b8178]">
              {filteredReviews.length} تقييم
            </p>
          </div>
        </div>

        {filteredReviews.length > 0 ? (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-3xl border border-[#eadbd2] bg-white p-5 shadow-sm transition hover:shadow-md md:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* User */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8eee7] font-bold text-[#6B3038]">
                      {review.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-bold text-[#2d2424]">
                        {review.name}
                      </h3>

                      <p className="mt-1 text-xs text-[#9b8178]">
                        {review.date}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-3">
                    {renderStars(review.rating)}

                    <span className="rounded-full bg-[#f8eee7] px-3 py-1 text-xs font-bold text-[#6B3038]">
                      {review.rating}.0
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <p className="mt-5 text-sm leading-7 text-[#62534e]">
                  {review.comment}
                </p>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-[#f0e5df] pt-4">
                  <span className="rounded-full bg-[#fffaf5] px-3 py-1 text-xs text-[#8c7770]">
                    {review.service}
                  </span>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs text-[#9b8178] transition hover:text-[#6B3038]"
                  >
                    <ThumbsUp size={14} />
                    مفيد ({review.helpful})
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#eadbd2] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038]">
              <MessageSquare size={34} />
            </div>

            <h2 className="mt-5 text-lg font-bold text-[#2d2424]">
              لا توجد تقييمات
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8c7770]">
              لم يتم العثور على تقييمات تطابق البحث أو الفلتر المحدد.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Reviews;