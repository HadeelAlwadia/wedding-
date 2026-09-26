
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.ico";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
const {login}=useContext(AuthContext)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState(null);

  // ===============================
  // Handle input changes
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setResult(null);
  };

  // ===============================
  // Validate form
  // ===============================
  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "أدخل بريدًا إلكترونيًا صحيحًا";
    }

    if (!form.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

// ===============================
// Handle login
// ===============================
const handleSubmit = async (e) => {
  e.preventDefault();

  setResult(null);

  if (!validateForm()) return;

  try {
    setLoading(true);

    // تسجيل الدخول من AuthContext
    const response = await login(
      form.email.trim(),
      form.password
    );

    const user = response.user;

    // Make sure user data exists
    if (!user) {
      throw new Error("لم يتم استلام بيانات المستخدم");
    }

    // Make sure token exists
    if (!response.token) {
      throw new Error("لم يتم استلام رمز الدخول");
    }

    // ===============================
    // Success message
    // ===============================
    setResult({
      type: "success",
      title: "تم تسجيل الدخول",
      message: "مرحبًا بك في زَفَاف ✨",
    });

    // ===============================
    // Redirect based on role
    // ===============================
    setTimeout(() => {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "provider") {
        if (user.isApproved === false) {
          navigate("/pending-approval");
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/");
      }
    }, 1000);

  } catch (error) {
    console.error("Login error:", error);

    // Provider account is waiting for approval
    if (error.response?.status === 403) {
      navigate("/pending-approval");
      return;
    }

    setResult({
      type: "error",
      title: "تعذر تسجيل الدخول",
      message:
        error.response?.data?.message ||
        error.message ||
        "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    });
  } finally {
    setLoading(false);
  }
};
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#faf8f5] px-4 py-8 md:px-8"
    >
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
        {/* ===============================
            Image Section
        =============================== */}
        <div className="relative hidden overflow-hidden bg-[#3b2923] lg:block">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
            alt="Wedding"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#241713] via-[#3b2923]/70 to-transparent" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white xl:p-14">
            <div>
              <div className="mb-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                ✨ أهلاً بك في زَفَاف
              </div>

              <h1 className="max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
                خدمات أفراحك
                <span className="block text-[#e8bd8b]">
                  تبدأ من هنا
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-base leading-8 text-white/80">
                سجّل دخولك للوصول إلى حسابك وإدارة خدماتك على منصة
                زَفَاف.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
              <div className="mb-4 text-3xl">💍</div>

              <h3 className="text-xl font-bold">
                منصتك لخدمات الأفراح
              </h3>

              <p className="mt-2 text-sm leading-7 text-white/70">
                اعرض خدماتك، عرّف الناس بنشاطك، وتواصل مباشرة مع
                العملاء المهتمين بخدماتك.
              </p>
            </div>
          </div>
        </div>

        {/* ===============================
            Login Section
        =============================== */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-16">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-10">
              <Link
                to="/"
                className="mb-8 inline-flex items-center text-xl font-bold text-[#5b3a2e]"
              >
                <img
                  src={logo}
                  alt="زَفَاف"
                  className="h-12 w-12 object-contain"
                />

                <span className="mr-3">
                  زَفَاف
                </span>
              </Link>

              <h2 className="text-3xl font-bold text-gray-900">
                تسجيل الدخول
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                سجّل دخولك إلى حسابك في منصة زَفَاف.
              </p>
            </div>

            {/* Result Message */}
            {result && (
              <div
                className={`mb-6 rounded-2xl border p-4 ${
                  result.type === "success"
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
                      result.type === "success"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {result.type === "success" ? "✓" : "!"}
                  </div>

                  <div>
                    <h3
                      className={`font-bold ${
                        result.type === "success"
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      {result.title}
                    </h3>

                    <p
                      className={`mt-1 text-sm leading-6 ${
                        result.type === "success"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {result.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  البريد الإلكتروني
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  autoComplete="email"
                  className={`w-full rounded-xl border bg-gray-50 px-4 py-3.5 outline-none transition focus:bg-white ${
                    errors.email
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#8b5e3c]"
                  }`}
                />

                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700">
                    كلمة المرور
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-[#8b5e3c] hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="أدخل كلمة المرور"
                    autoComplete="current-password"
                    className={`w-full rounded-xl border bg-gray-50 px-4 py-3.5 pl-12 outline-none transition focus:bg-white ${
                      errors.password
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#8b5e3c]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    aria-label={
                      showPassword
                        ? "إخفاء كلمة المرور"
                        : "إظهار كلمة المرور"
                    }
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-7-9-7a16.3 16.3 0 013.138-3.96M9.88 4.42A9.97 9.97 0 0112 4c5 0 9 7 9 7a16.3 16.3 0 013.138 3.96M9.88 4.42L21 21M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />

                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#5b3a2e] px-5 py-4 font-bold text-white shadow-lg shadow-[#5b3a2e]/20 transition hover:bg-[#472d24] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    جاري تسجيل الدخول...
                  </span>
                ) : (
                  "تسجيل الدخول"
                )}
              </button>
            </form>

            {/* Register */}
            <p className="mt-7 text-center text-sm text-gray-500">
              ليس لديك حساب؟

              <Link
                to="/auth/register"
                className="mr-1 font-bold text-[#8b5e3c] hover:underline"
              >
                إنشاء حساب جديد
              </Link>
            </p>

            <p className="mt-5 text-center text-xs leading-5 text-gray-400">
              التسجيل متاح لأصحاب الخدمات فقط.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
