import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("customer");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("يرجى تعبئة جميع الحقول المطلوبة.");
      return;
    }

    if (formData.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("يرجى الموافقة على الشروط والأحكام.");
      return;
    }

    try {
      setLoading(true);

      // مؤقتًا إلى أن نربط Backend
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: accountType,
      };

      console.log("Register Data:", userData);

      alert("تم إنشاء حسابك بنجاح 🤍");

      navigate("/login");
    } catch (err) {
      setError("حدث خطأ أثناء إنشاء الحساب، حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FFFAF5] px-4 py-10 md:px-8">
      <div className="mx-auto flex min-h-[760px] max-w-6xl overflow-hidden rounded-[32px] border border-[#eadbd2] bg-white shadow-[0_25px_80px_rgba(75,38,40,0.12)]">
        {/* ================= LEFT SIDE ================= */}
        <div className="relative hidden w-[42%] overflow-hidden bg-[#6B3038] lg:block">
          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#e5c28d]/20" />
          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-[#e5c28d]/20" />

          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full border border-white/10" />

          {/* Content */}
          <div className="relative flex h-full flex-col justify-between p-12">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-3xl font-bold text-[#e5c28d]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e5c28d]/50 text-xl">
                  ه
                </span>

                هنا
              </Link>

              <div className="mt-24">
                <span className="mb-5 inline-block rounded-full border border-[#e5c28d]/30 bg-white/5 px-4 py-2 text-sm text-[#e5c28d]">
                  ✦ أهلاً بكِ في هنا
                </span>

                <h1 className="max-w-md text-5xl font-bold leading-[1.35] text-white">
                  ابدئي رحلة
                  <br />
                  <span className="text-[#e5c28d]">فرحك من هنا</span>
                </h1>

                <p className="mt-7 max-w-md text-base leading-8 text-white/70">
                  أنشئي حسابك واكتشفي أفضل صالات الأفراح، فساتين العرائس،
                  الكوافيرات، المصورين وكل تفاصيل يومك المميز.
                </p>
              </div>
            </div>

            {/* Bottom quote */}
            <div className="border-t border-white/10 pt-7">
              <p className="text-lg leading-8 text-white/80">
                "لأن أجمل الذكريات تبدأ من
                <span className="mx-1 text-[#e5c28d]">هنا</span>."
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-px w-10 bg-[#e5c28d]" />
                <span className="text-sm text-white/50">
                  هنا للزفاف
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FORM SIDE ================= */}
        <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-xl">
            {/* Mobile Logo */}
            <div className="mb-8 text-center lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-3xl font-bold text-[#6B3038]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#6B3038]/30">
                  ه
                </span>
                هنا
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-2 text-sm font-medium text-[#b18456]">
                أهلاً بك في هنا ✦
              </p>

              <h2 className="text-3xl font-bold text-[#2d2424] md:text-4xl">
                إنشاء حساب جديد
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#8b7b7b]">
                أنشئي حسابك وابدئي باكتشاف كل ما تحتاجينه لفرحك.
              </p>
            </div>

            {/* Account Type */}
            <div className="mb-7">
              <label className="mb-3 block text-sm font-semibold text-[#3b2b2c]">
                نوع الحساب
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Customer */}
                <button
                  type="button"
                  onClick={() => setAccountType("customer")}
                  className={`group rounded-2xl border p-4 text-right transition-all duration-300 ${
                    accountType === "customer"
                      ? "border-[#6B3038] bg-[#6B3038]/5 shadow-sm"
                      : "border-[#eadfd9] bg-white hover:border-[#c8aaa0]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl transition ${
                        accountType === "customer"
                          ? "bg-[#6B3038] text-white"
                          : "bg-[#f8f1ec] text-[#6B3038]"
                      }`}
                    >
                      ♡
                    </div>

                    <div>
                      <p className="font-bold text-[#2d2424]">
                        عميلة
                      </p>
                      <p className="mt-1 text-xs text-[#918383]">
                        أبحث وأحجز خدمات الزفاف
                      </p>
                    </div>
                  </div>
                </button>

                {/* Provider */}
                <button
                  type="button"
                  onClick={() => setAccountType("provider")}
                  className={`group rounded-2xl border p-4 text-right transition-all duration-300 ${
                    accountType === "provider"
                      ? "border-[#6B3038] bg-[#6B3038]/5 shadow-sm"
                      : "border-[#eadfd9] bg-white hover:border-[#c8aaa0]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl transition ${
                        accountType === "provider"
                          ? "bg-[#6B3038] text-white"
                          : "bg-[#f8f1ec] text-[#6B3038]"
                      }`}
                    >
                      ✦
                    </div>

                    <div>
                      <p className="font-bold text-[#2d2424]">
                        صاحب خدمة
                      </p>
                      <p className="mt-1 text-xs text-[#918383]">
                        أضيف وأدير خدماتي
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Phone */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[#3b2b2c]"
                  >
                    الاسم الكامل
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#a58f91]">
                      ◯
                    </span>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="مثال: سارة أحمد"
                      className="h-13 w-full rounded-xl border border-[#e8ddd7] bg-[#fffdfb] pr-11 pl-4 text-sm text-[#2d2424] outline-none transition placeholder:text-[#b9aaaa] focus:border-[#6B3038] focus:ring-4 focus:ring-[#6B3038]/5"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-[#3b2b2c]"
                  >
                    رقم الجوال
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#a58f91]">
                      ☎
                    </span>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="059 xxx xxxx"
                      className="h-13 w-full rounded-xl border border-[#e8ddd7] bg-[#fffdfb] pr-11 pl-4 text-sm text-[#2d2424] outline-none transition placeholder:text-[#b9aaaa] focus:border-[#6B3038] focus:ring-4 focus:ring-[#6B3038]/5"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#3b2b2c]"
                >
                  البريد الإلكتروني
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#a58f91]">
                    @
                  </span>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="h-13 w-full rounded-xl border border-[#e8ddd7] bg-[#fffdfb] pr-11 pl-4 text-sm text-[#2d2424] outline-none transition placeholder:text-[#b9aaaa] focus:border-[#6B3038] focus:ring-4 focus:ring-[#6B3038]/5"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#3b2b2c]"
                >
                  كلمة المرور
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#a58f91]">
                    ◆
                  </span>

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="6 أحرف على الأقل"
                    className="h-13 w-full rounded-xl border border-[#e8ddd7] bg-[#fffdfb] px-12 text-sm text-[#2d2424] outline-none transition placeholder:text-[#b9aaaa] focus:border-[#6B3038] focus:ring-4 focus:ring-[#6B3038]/5"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#8e7779] transition hover:text-[#6B3038]"
                  >
                    {showPassword ? "إخفاء" : "إظهار"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-[#3b2b2c]"
                >
                  تأكيد كلمة المرور
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#a58f91]">
                    ◆
                  </span>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="أعيدي كتابة كلمة المرور"
                    className="h-13 w-full rounded-xl border border-[#e8ddd7] bg-[#fffdfb] px-12 text-sm text-[#2d2424] outline-none transition placeholder:text-[#b9aaaa] focus:border-[#6B3038] focus:ring-4 focus:ring-[#6B3038]/5"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#8e7779] transition hover:text-[#6B3038]"
                  >
                    {showConfirmPassword ? "إخفاء" : "إظهار"}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 cursor-pointer accent-[#6B3038]"
                />

                <span className="text-xs leading-6 text-[#8b7b7b]">
                  أوافق على{" "}
                  <button
                    type="button"
                    className="font-semibold text-[#6B3038] hover:underline"
                  >
                    الشروط والأحكام
                  </button>{" "}
                  و{" "}
                  <button
                    type="button"
                    className="font-semibold text-[#6B3038] hover:underline"
                  >
                    سياسة الخصوصية
                  </button>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative mt-2 flex h-14 w-full items-center justify-center overflow-hidden rounded-xl bg-[#6B3038] font-semibold text-white shadow-[0_10px_25px_rgba(107,48,56,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#57262d] hover:shadow-[0_14px_30px_rgba(107,48,56,0.28)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {loading ? (
                  <div className="flex items-center gap-3">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    جاري إنشاء الحساب...
                  </div>
                ) : (
                  <span className="relative flex items-center gap-2">
                    إنشاء حساب
                    <span className="text-[#e5c28d]">←</span>
                  </span>
                )}
              </button>
            </form>

            {/* Login */}
            <div className="mt-7 text-center">
              <p className="text-sm text-[#8b7b7b]">
                لديك حساب بالفعل؟{" "}
                <Link
                  to="/login"
                  className="font-bold text-[#6B3038] transition hover:text-[#b18456]"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>

            {/* Footer mini text */}
            <div className="mt-8 flex items-center justify-center gap-3 text-xs text-[#b1a2a2]">
              <span className="h-px w-10 bg-[#eadfd9]" />
              <span>هنا للزفاف</span>
              <span className="h-px w-10 bg-[#eadfd9]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;