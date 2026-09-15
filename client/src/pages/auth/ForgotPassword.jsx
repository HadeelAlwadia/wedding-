import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!email.trim()) {
      setError("يرجى إدخال البريد الإلكتروني.");
      return;
    }

    try {
      setLoading(true);

      // مؤقتًا إلى أن نربط Backend
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log("Forgot Password Email:", email);

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError("حدث خطأ، يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FFFAF5] px-4 py-10 md:px-8">
      <div className="mx-auto flex min-h-[650px] max-w-6xl overflow-hidden rounded-[32px] border border-[#eadbd2] bg-white shadow-[0_25px_80px_rgba(75,38,40,0.12)]">

        {/* ================= LEFT SIDE ================= */}
        <div className="relative hidden w-[42%] overflow-hidden bg-[#6B3038] lg:block">

          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#e5c28d]/20" />

          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-[#e5c28d]/20" />

          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full border border-white/10" />

          <div className="relative flex h-full flex-col justify-between p-12">

            {/* Logo */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-3xl font-bold text-[#e5c28d]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e5c28d]/50 text-xl">
                ه
              </span>

              هنا
            </Link>

            {/* Main Content */}
            <div className="-mt-10">
              <span className="mb-5 inline-block rounded-full border border-[#e5c28d]/30 bg-white/5 px-4 py-2 text-sm text-[#e5c28d]">
                ✦ لا تقلقي
              </span>

              <h1 className="max-w-md text-5xl font-bold leading-[1.4] text-white">
                سنساعدك على
                <br />
                <span className="text-[#e5c28d]">
                  استعادة حسابك
                </span>
              </h1>

              <p className="mt-7 max-w-md text-base leading-8 text-white/70">
                أدخلي بريدك الإلكتروني وسنرسل لك رابطًا آمنًا
                لإعادة تعيين كلمة المرور الخاصة بحسابك.
              </p>
            </div>

            {/* Bottom */}
            <div className="border-t border-white/10 pt-7">
              <p className="text-lg leading-8 text-white/80">
                "كل تفاصيل فرحك تبدأ من
                <span className="mx-1 text-[#e5c28d]">
                  هنا
                </span>
                ."
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
        <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-10 text-center lg:hidden">
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

            {/* Icon */}
            <div className="mb-7 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#6B3038]/5 text-3xl text-[#6B3038] shadow-sm">
                🔐
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-medium text-[#b18456]">
                استعادة الحساب ✦
              </p>

              <h2 className="text-3xl font-bold text-[#2d2424]">
                نسيتِ كلمة المرور؟
              </h2>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#8b7b7b]">
                لا تقلقي، أدخلي بريدك الإلكتروني وسنرسل لك
                رابطًا لإعادة تعيين كلمة المرور.
              </p>
            </div>

            {/* Success */}
            {success && (
              <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm leading-7 text-green-700">
                <div className="flex gap-3">
                  <span className="text-lg">✓</span>

                  <div>
                    <p className="font-bold">
                      تم إرسال الرابط بنجاح
                    </p>

                    <p className="mt-1 text-green-600">
                      إذا كان البريد مسجلًا لدينا، ستصلك رسالة
                      تحتوي على رابط إعادة تعيين كلمة المرور.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

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
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                      setSuccess(false);
                    }}
                    placeholder="example@email.com"
                    className="h-14 w-full rounded-xl border border-[#e8ddd7] bg-[#fffdfb] pr-11 pl-4 text-sm text-[#2d2424] outline-none transition placeholder:text-[#b9aaaa] focus:border-[#6B3038] focus:ring-4 focus:ring-[#6B3038]/5"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-xl bg-[#6B3038] font-semibold text-white shadow-[0_10px_25px_rgba(107,48,56,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#57262d] hover:shadow-[0_14px_30px_rgba(107,48,56,0.28)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {loading ? (
                  <div className="relative flex items-center gap-3">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    جاري الإرسال...
                  </div>
                ) : (
                  <span className="relative flex items-center gap-2">
                    إرسال رابط الاستعادة

                    <span className="text-[#e5c28d]">
                      ←
                    </span>
                  </span>
                )}
              </button>
            </form>

            {/* Back To Login */}
            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#6B3038] transition hover:text-[#b18456]"
              >
                <span>→</span>
                العودة إلى تسجيل الدخول
              </Link>
            </div>

            {/* Footer */}
            <div className="mt-10 flex items-center justify-center gap-3 text-xs text-[#b1a2a2]">
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

export default ForgotPassword;