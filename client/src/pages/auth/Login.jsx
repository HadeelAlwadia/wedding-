import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    try {
      setLoading(true);

      // لاحقًا سنربط هنا الـ API
      console.log("Login data:", {
        ...formData,
        rememberMe,
      });

      await new Promise((resolve) => setTimeout(resolve, 800));

      alert("تم تسجيل الدخول بنجاح 🤍");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ، يرجى المحاولة مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFAF5]">
      <div className="grid min-h-screen w-full lg:grid-cols-2">

        {/* =====================================================
            LEFT SIDE
        ====================================================== */}
        <div className="relative hidden min-h-screen overflow-hidden bg-[#6B3038] lg:flex lg:items-center lg:justify-center">

          {/* Decorative circles */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border-[40px] border-[#e5c28d]" />

            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full border-[50px] border-[#e5c28d]" />

            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          </div>

          {/* Small decorative stars */}
          <div className="absolute left-20 top-24 text-2xl text-[#e5c28d]/50">
            ✦
          </div>

          <div className="absolute right-24 bottom-28 text-xl text-[#e5c28d]/40">
            ✦
          </div>

          <div className="absolute left-32 bottom-40 text-sm text-white/20">
            ✧
          </div>

          {/* Content */}
          <div className="relative max-w-xl px-12 text-center text-white">

            {/* Logo */}
            <Link
              to="/"
              className="mb-14 inline-flex items-center gap-3 text-3xl font-bold text-[#e5c28d]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e5c28d]/50 text-xl">
                ه
              </span>

              هنا
            </Link>

            {/* Icon */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#e5c28d] text-4xl text-[#6B3038] shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
              ♡
            </div>

            {/* Heading */}
            <h2 className="mt-8 text-4xl font-bold leading-[1.5] xl:text-5xl">
              كل تفاصيل فرحك

              <span className="block text-[#e5c28d]">
                تبدأ من هنا
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-white/70">
              اكتشفي أفضل صالات الأفراح، فساتين العرائس،
              الكوافيرات، المصورين وسيارات الزفاف في مكان واحد.
            </p>

            {/* Services */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">

              <span className="rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm text-white/80 backdrop-blur-sm">
                صالات أفراح
              </span>

              <span className="rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm text-white/80 backdrop-blur-sm">
                فساتين
              </span>

              <span className="rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm text-white/80 backdrop-blur-sm">
                تصوير
              </span>

              <span className="rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm text-white/80 backdrop-blur-sm">
                سيارات
              </span>

            </div>

            {/* Bottom quote */}
            <div className="mt-12">
              <div className="mx-auto mb-4 h-px w-16 bg-[#e5c28d]/50" />

              <p className="text-sm text-white/50">
                "لأن أجمل الذكريات تبدأ من هنا."
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}
        <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">

          <div className="w-full max-w-md">

            {/* Logo - Mobile */}
            <div className="mb-8 text-center lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-4xl font-bold text-[#6B3038]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#6B3038]/30 text-xl">
                  ه
                </span>

                هنا
              </Link>
            </div>

            {/* Login Card */}
            <div className="rounded-[28px] border border-[#eadfd9] bg-white p-7 shadow-[0_20px_60px_rgba(75,38,40,0.08)] sm:p-9">

              {/* Header */}
              <div className="text-center">

                <p className="mb-2 text-sm font-medium text-[#b18456]">
                  أهلاً بكِ مرة أخرى ✦
                </p>

                <h1 className="text-3xl font-bold text-[#2d2424]">
                  تسجيل الدخول
                </h1>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  سجّلي الدخول للوصول إلى حسابك ومتابعة حجوزاتك.
                </p>

              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#2d2424]"
                  >
                    البريد الإلكتروني
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-[#ded3cb] bg-[#FFFAF5] px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#6B3038] focus:ring-2 focus:ring-[#6B3038]/10"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-[#2d2424]"
                  >
                    كلمة المرور
                  </label>

                  <div className="relative">

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="أدخلي كلمة المرور"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-[#ded3cb] bg-[#FFFAF5] px-4 py-3.5 pl-16 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#6B3038] focus:ring-2 focus:ring-[#6B3038]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#6B3038] transition hover:text-[#b18456]"
                    >
                      {showPassword ? "إخفاء" : "إظهار"}
                    </button>

                  </div>
                </div>

                {/* Options */}
                <div className="flex items-center justify-between gap-4">

                  {/* Remember */}
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">

                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(e.target.checked)
                      }
                      className="h-4 w-4 cursor-pointer accent-[#6B3038]"
                    />

                    تذكريني
                  </label>

                  {/* Forgot Password */}
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-[#6B3038] transition hover:text-[#b18456] hover:underline"
                  >
                    نسيتِ كلمة المرور؟
                  </Link>

                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#6B3038] py-3.5 font-semibold text-white shadow-[0_8px_20px_rgba(107,48,56,0.18)] transition duration-300 hover:bg-[#57262d] hover:shadow-[0_12px_25px_rgba(107,48,56,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "جاري تسجيل الدخول..."
                    : "تسجيل الدخول"}
                </button>

              </form>

              {/* Register */}
              <div className="mt-7 border-t border-gray-100 pt-6 text-center">

                <p className="text-sm text-gray-500">
                  ليس لديكِ حساب؟
                </p>

                <Link
                  to="/register"
                  className="mt-2 inline-block font-semibold text-[#6B3038] transition hover:text-[#b18456] hover:underline"
                >
                  إنشاء حساب جديد
                </Link>

              </div>

            </div>

            {/* Bottom */}
            <div className="mt-7 flex items-center justify-center gap-3 text-xs text-[#b1a2a2]">

              <span className="h-px w-10 bg-[#eadfd9]" />

              <span>
                هنا للزفاف
              </span>

              <span className="h-px w-10 bg-[#eadfd9]" />

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;