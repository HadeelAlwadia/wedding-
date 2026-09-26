
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Store,
  Eye,
  EyeOff,
  Check,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import logo from "../../assets/logo.ico";
import { registerUser } from "../../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("visitor");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    serviceType: "",
    password: "",
    confirmPassword: "",
    bussnisename:'',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState({
    type: "",
    message: "",
  });

  const serviceTypes = [
    { value: "hall", label: "قاعات أفراح" },
    { value: "beauty", label: "صالونات وتجميل" },
    { value: "bridal-dresses", label: "فساتين زفاف" },
    { value: "groom-suits", label: "بدلات رجالية" },
    { value: "photographers", label: "تصوير" },
    { value: "wedding-cars", label: "سيارات أفراح" },
  ];

  // تغيير نوع الحساب
  const handleAccountType = (type) => {
    setAccountType(type);

    // تنظيف بيانات النوع الآخر
    setFormData((prev) => ({
      ...prev,
      phone: "",
      whatsapp: "",
      serviceType: "",
    }));

    setResult({
      type: "",
      message: "",
    });
  };

  // تغيير الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (result.message) {
      setResult({
        type: "",
        message: "",
      });
    }
  };

  // قوة كلمة المرور
  const getPasswordStrength = () => {
    const password = formData.password;

    if (!password) {
      return {
        label: "",
        width: "0%",
      };
    }

    if (password.length < 6) {
      return {
        label: "ضعيفة",
        width: "30%",
      };
    }

    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return {
        label: "قوية",
        width: "100%",
      };
    }

    return {
      label: "متوسطة",
      width: "65%",
    };
  };

  const passwordStrength = getPasswordStrength();

  // إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();

    setResult({
      type: "",
      message: "",
    });

    // الاسم
    if (!formData.name.trim()) {
      setResult({
        type: "error",
        message:
          accountType === "provider"
            ? "يرجى إدخال اسم النشاط / مقدم الخدمة."
            : "يرجى إدخال اسمك.",
      });
      return;
    }

    // البريد
    if (!formData.email.trim()) {
      setResult({
        type: "error",
        message: "يرجى إدخال البريد الإلكتروني.",
      });
      return;
    }

    // كلمة المرور
    if (!formData.password) {
      setResult({
        type: "error",
        message: "يرجى إدخال كلمة المرور.",
      });
      return;
    }

    if (formData.password.length < 6) {
      setResult({
        type: "error",
        message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل.",
      });
      return;
    }

    // تأكيد كلمة المرور
    if (formData.password !== formData.confirmPassword) {
      setResult({
        type: "error",
        message: "كلمتا المرور غير متطابقتين.",
      });
      return;
    }

    // تحقق خاص بمقدم الخدمة فقط
    if (accountType === "provider") {
      if (!formData.phone.trim()) {
        setResult({
          type: "error",
          message: "يرجى إدخال رقم الهاتف.",
        });
        return;
      }

      if (!formData.serviceType) {
        setResult({
          type: "error",
          message: "يرجى اختيار نوع الخدمة.",
        });
        return;
      }
    }

    try {
      setLoading(true);

      /*
       * مهم:
       * حساب الزائرة يرسل فقط بيانات الزائرة.
       * حساب مقدم الخدمة يرسل البيانات التجارية المطلوبة.
       */

      let payload;

      if (accountType === "visitor") {
        payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          role: "visitor",
        };
      } else {
        payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          role: "provider",
          phone: formData.phone.trim(),
          whatsapp: formData.whatsapp.trim(),
          serviceType: formData.serviceType,
        };
      }

      await registerUser(payload);

      // نجاح مقدم الخدمة
      if (accountType === "provider") {
        setResult({
          type: "success",
          message:
            "تم إرسال طلبك بنجاح. حسابك الآن قيد المراجعة من إدارة زَفَاف.",
        });

        setTimeout(() => {
          navigate("/pending-approval");
        }, 1800);

        return;
      }

      // نجاح الزائرة
      setResult({
        type: "success",
        message: "تم إنشاء حسابك بنجاح. أهلًا بكِ في زَفَاف.",
      });

      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    } catch (error) {
      console.error("Register error:", error);

      const message =
        error?.response?.data?.message ||
        "حدث خطأ أثناء إنشاء الحساب. حاولي مرة أخرى.";

      setResult({
        type: "error",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f8eee7] px-4 py-6 sm:px-6 lg:py-10"
    >
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[34px] bg-white shadow-[0_25px_80px_rgba(70,35,30,0.12)] lg:grid-cols-[0.82fr_1.18fr]">

          {/* =========================
              الصورة الجانبية
          ========================== */}
          <div className="relative hidden min-h-[780px] overflow-hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
              alt="زفاف"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#2d181b]/90 via-[#5c3036]/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-10 text-white">
              <div className="mb-5 flex items-center gap-2">
                <img
                  src={logo}
                  alt="زفاف"
                  className="h-11 w-11 object-contain brightness-0 invert"
                />

                <span className="text-2xl font-bold tracking-wide">
                  زَفَاف
                </span>
              </div>

              <h2 className="max-w-sm text-4xl font-bold leading-[1.35]">
                ابدئي رحلتك نحو
                <span className="block text-[#e5c28d]">
                  يومك المميز
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
                اكتشفي أفضل خدمات الزفاف، أو انضمي إلى زَفَاف لتعرضي نشاطك
                وتوصلي بخدماتك إلى المقبلين على الزواج.
              </p>

              <div className="mt-8 flex items-center gap-3 text-xs text-white/70">
                <span className="h-px w-10 bg-[#e5c28d]" />
                كل تفاصيل يومك في مكان واحد
              </div>
            </div>
          </div>

          {/* =========================
              الجانب الخاص بالفورم
          ========================== */}
          <div className="px-5 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <Link
                to="/"
                className="flex items-center gap-2 lg:hidden"
              >
                <img
                  src={logo}
                  alt="زفاف"
                  className="h-9 w-9 object-contain"
                />

                <span className="text-xl font-bold text-[#6B3038]">
                  زَفَاف
                </span>
              </Link>

              <Link
                to="/"
                className="mr-auto flex items-center gap-1 text-xs font-medium text-gray-400 transition hover:text-[#6B3038]"
              >
                العودة للرئيسية
                <ArrowLeft size={15} />
              </Link>
            </div>

            {/* العنوان */}
            <div className="mb-8">
              <p className="mb-2 text-sm font-bold text-[#6B3038]">
                أهلًا بكِ في زَفَاف
              </p>

              <h1 className="text-3xl font-bold text-[#2d2424]">
                إنشاء حساب
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                اختاري نوع الحساب وابدئي بخطوتك الأولى.
              </p>
            </div>

            {/* =========================
                خطوات التسجيل
            ========================== */}
            <div className="mb-8 flex items-center">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6B3038] text-xs font-bold text-white">
                  01
                </div>

                <span className="text-xs font-semibold text-[#6B3038]">
                  نوع الحساب
                </span>
              </div>

              <div className="mx-3 h-px flex-1 bg-[#eadbd1]" />

              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e5c28d] text-xs font-bold text-[#6B3038]">
                  02
                </div>

                <span className="text-xs font-semibold text-[#6B3038]">
                  البيانات
                </span>
              </div>
            </div>

            {/* =========================
                اختيار نوع الحساب
            ========================== */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-bold text-[#2d2424]">
                أريد إنشاء حساب كـ
              </p>

              <div className="grid grid-cols-2 gap-3">

                {/* زائرة */}
                <button
                  type="button"
                  onClick={() => handleAccountType("visitor")}
                  className={`relative rounded-2xl border p-4 text-right transition-all duration-200 ${
                    accountType === "visitor"
                      ? "border-[#6B3038] bg-[#f8eee7]"
                      : "border-[#eadbd1] bg-white hover:border-[#cdaea1]"
                  }`}
                >
                  {accountType === "visitor" && (
                    <div className="absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#6B3038] text-white">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}

                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                      accountType === "visitor"
                        ? "bg-[#6B3038] text-white"
                        : "bg-[#f8eee7] text-[#6B3038]"
                    }`}
                  >
                    <UserRound size={19} strokeWidth={1.8} />
                  </div>

                  <p className="text-sm font-bold text-[#2d2424]">
                    زائرة
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-gray-400">
                    للتصفح وحفظ المفضلة
                  </p>
                </button>

                {/* مقدم خدمة */}
                <button
                  type="button"
                  onClick={() => handleAccountType("provider")}
                  className={`relative rounded-2xl border p-4 text-right transition-all duration-200 ${
                    accountType === "provider"
                      ? "border-[#6B3038] bg-[#f8eee7]"
                      : "border-[#eadbd1] bg-white hover:border-[#cdaea1]"
                  }`}
                >
                  {accountType === "provider" && (
                    <div className="absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#6B3038] text-white">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}

                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                      accountType === "provider"
                        ? "bg-[#6B3038] text-white"
                        : "bg-[#f8eee7] text-[#6B3038]"
                    }`}
                  >
                    <Store size={19} strokeWidth={1.8} />
                  </div>

                  <p className="text-sm font-bold text-[#2d2424]">
                    مقدم خدمة
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-gray-400">
                    لعرض نشاطك وخدماتك
                  </p>
                </button>
              </div>
            </div>

            {/* =========================
                الفورم
            ========================== */}
            <form onSubmit={handleSubmit}>

              {/* عنوان البيانات */}
              <div className="mb-5">
                <h2 className="text-lg font-bold text-[#2d2424]">
                  {accountType === "provider"
                    ? "بيانات النشاط"
                    : "بياناتك الشخصية"}
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  {accountType === "provider"
                    ? "أدخلي بيانات نشاطك كما تريدين ظهورها على المنصة."
                    : "أدخلي بياناتك لإنشاء حسابك الشخصي."}
                </p>
              </div>

              {/* الاسم */}
              <div className="mb-5">
                <label className="mb-2 block text-xs font-bold text-[#2d2424]">
                  {accountType === "provider"
                    ? "اسم النشاط / مقدم الخدمة"
                    : "الاسم"}
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={
                    accountType === "provider"
                      ? "مثال: قاعة ليالي العمر"
                      : "مثال: سارة أحمد"
                  }
                  className="h-12 w-full rounded-xl border border-[#eadbd1] bg-[#fffdfb] px-4 text-sm text-[#2d2424] outline-none transition placeholder:text-gray-300 focus:border-[#6B3038] focus:ring-4 focus:ring-[#6B3038]/5"
                />
              </div>

              {/* البريد الإلكتروني */}
              <div className="mb-5">
                <label className="mb-2 block text-xs font-bold text-[#2d2424]">
                  البريد الإلكتروني
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-[#eadbd1] bg-[#fffdfb] px-4 text-sm text-[#2d2424] outline-none transition placeholder:text-gray-300 focus:border-[#6B3038] focus:ring-4 focus:ring-[#6B3038]/5"
                />
              </div>

              {/* =========================
                  حقول مقدم الخدمة فقط
              ========================== */}
              {accountType === "provider" && (
                <>
                  {/* الهاتف والواتساب */}
                  <div className="mb-5 grid gap-4 sm:grid-cols-2">

                    {/* الهاتف */}
                    <div>
                      <label className="mb-2 block text-xs font-bold text-[#2d2424]">
                        رقم الهاتف
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="059xxxxxxx"
                        dir="ltr"
                        className="h-12 w-full rounded-xl border border-[#eadbd1] bg-[#fffdfb] px-4 text-sm outline-none transition placeholder:text-gray-300 focus:border-[#6B3038] focus:ring-4 focus:ring-[#6B3038]/5"
                      />
                    </div>

                    {/* واتساب */}
                    <div>
                      <label className="mb-2 block text-xs font-bold text-[#2d2424]">
                        واتساب

                        <span className="mr-1 font-normal text-gray-400">
                          (اختياري)
                        </span>
                      </label>

                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="059xxxxxxx"
                        dir="ltr"
                        className="h-12 w-full rounded-xl border border-[#eadbd1] bg-[#fffdfb] px-4 text-sm outline-none transition placeholder:text-gray-300 focus:border-[#6B3038] focus:ring-4 focus:ring-[#6B3038]/5"
                      />
                    </div>
                  </div>

                  {/* نوع الخدمة */}
                  <div className="mb-5">
                    <label className="mb-2 block text-xs font-bold text-[#2d2424]">
                      نوع الخدمة
                    </label>

                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="h-12 w-full rounded-xl border border-[#eadbd1] bg-[#fffdfb] px-4 text-sm text-[#2d2424] outline-none transition focus:border-[#6B3038] focus:ring-4 focus:ring-[#6B3038]/5"
                    >
                      <option value="">
                        اختاري نوع الخدمة
                      </option>

                      {serviceTypes.map((service) => (
                        <option
                          key={service.value}
                          value={service.value}
                        >
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* =========================
                  كلمة المرور
              ========================== */}
              <div className="mb-5">
                <label className="mb-2 block text-xs font-bold text-[#2d2424]">
                  كلمة المرور
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="أدخلي كلمة مرور قوية"
                    dir="ltr"
                    className="h-12 w-full rounded-xl border border-[#eadbd1] bg-[#fffdfb] px-4 pl-12 text-sm outline-none transition placeholder:text-gray-300 focus:border-[#6B3038] focus:ring-4 focus:ring-[#6B3038]/5"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#6B3038]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {/* قوة كلمة المرور */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="h-1 overflow-hidden rounded-full bg-[#eee5df]">
                      <div
                        className="h-full rounded-full bg-[#6B3038] transition-all duration-300"
                        style={{
                          width: passwordStrength.width,
                        }}
                      />
                    </div>

                    <p className="mt-1 text-[10px] text-gray-400">
                      قوة كلمة المرور:{" "}
                      <span className="font-bold text-[#6B3038]">
                        {passwordStrength.label}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* =========================
                  تأكيد كلمة المرور
              ========================== */}
              <div className="mb-6">
                <label className="mb-2 block text-xs font-bold text-[#2d2424]">
                  تأكيد كلمة المرور
                </label>

                <div className="relative">
                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="أعيدي كتابة كلمة المرور"
                    dir="ltr"
                    className={`h-12 w-full rounded-xl border bg-[#fffdfb] px-4 pl-12 text-sm outline-none transition placeholder:text-gray-300 focus:ring-4 ${
                      formData.confirmPassword &&
                      formData.confirmPassword !==
                        formData.password
                        ? "border-red-300 focus:border-red-400 focus:ring-red-400/5"
                        : "border-[#eadbd1] focus:border-[#6B3038] focus:ring-[#6B3038]/5"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#6B3038]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {formData.confirmPassword &&
                  formData.confirmPassword !==
                    formData.password && (
                    <p className="mt-2 text-[11px] text-red-500">
                      كلمتا المرور غير متطابقتين.
                    </p>
                  )}
              </div>

              {/* =========================
                  رسالة النتيجة
              ========================== */}
              {result.message && (
                <div
                  className={`mb-5 flex items-start gap-3 rounded-xl border p-4 ${
                    result.type === "success"
                      ? "border-green-100 bg-green-50 text-green-700"
                      : "border-red-100 bg-red-50 text-red-600"
                  }`}
                >
                  {result.type === "success" ? (
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0"
                    />
                  ) : (
                    <AlertCircle
                      size={18}
                      className="mt-0.5 shrink-0"
                    />
                  )}

                  <p className="text-xs leading-6">
                    {result.message}
                  </p>
                </div>
              )}

              {/* =========================
                  زر التسجيل
              ========================== */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#6B3038] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#6B3038]/10 transition hover:bg-[#57262D] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "جارٍ إنشاء الحساب..."
                  : accountType === "provider"
                  ? "إرسال طلب التسجيل"
                  : "إنشاء الحساب"}

                {!loading && (
                  <ArrowLeft
                    size={17}
                    className="transition group-hover:-translate-x-1"
                  />
                )}
              </button>
            </form>

            {/* تسجيل الدخول */}
            <div className="mt-6 border-t border-[#eee5df] pt-6 text-center">
              <p className="text-xs text-gray-400">
                لديكِ حساب بالفعل؟{" "}
                <Link
                  to="/auth/login"
                  className="font-bold text-[#6B3038] transition hover:underline"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

