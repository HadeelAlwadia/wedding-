import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  Check,
  Image as ImageIcon,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Save,
  Store,
  Upload,
  X,
} from "lucide-react";

import api from "../../api/api";

// ============================================================
// Service labels
// ============================================================

const SERVICE_LABELS = {
  hall: "صالات الأفراح",
  beauty: "الكوافيرات والتجميل",
  "bridal-dresses": "فساتين العرائس",
  "groom-suits": "بدلات العرسان",
  photographers: "التصوير",
  "wedding-cars": "سيارات الزفاف",
};

// ============================================================
// Initial form
// ============================================================

const INITIAL_FORM = {
  name: "",
  description: "",
  governorate: "",
  address: "",
  phone: "",
  whatsapp: "",
  logo: "",
};

// ============================================================
// Reusable Field
// ============================================================

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-medium text-[#554640]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-[52px]
          w-full
          rounded-xl
          border border-[#e8ddd5]
          bg-[#fcfaf8]
          px-4
          text-sm
          text-[#2d2424]
          outline-none
          transition-all
          placeholder:text-[#b6aaa3]
          hover:border-[#d8c9c0]
          focus:border-[#6B3038]
          focus:bg-white
          focus:ring-4
          focus:ring-[#6B3038]/5
        "
      />
    </div>
  );
};

// ============================================================
// Info Item
// ============================================================

const InfoItem = ({
  icon: Icon,
  label,
  children,
}) => {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[#eee5df] bg-[#fcfaf8] p-4">
      <div
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center
          rounded-xl
          bg-[#6B3038]/[0.07]
          text-[#6B3038]
        "
      >
        <Icon size={18} strokeWidth={1.7} />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] text-[#a0938c]">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-[#3b302d]">
          {children || "غير مضاف"}
        </p>
      </div>
    </div>
  );
};

// ============================================================
// Logo Upload
// ============================================================

const LogoUpload = ({
  image,
  uploading,
  onUpload,
  onRemove,
}) => {
  const inputRef = useRef(null);

  const handleSelect = () => {
    if (uploading) return;

    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="
          relative
          h-40
          w-40
          overflow-hidden
          rounded-[32px]
          border
          border-[#e7dcd4]
          bg-[#f8eee7]
        "
      >
        {image ? (
          <>
            <img
              src={image}
              alt="شعار النشاط"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-3 right-3 left-3 flex gap-2">
              <button
                type="button"
                onClick={handleSelect}
                disabled={uploading}
                className="
                  flex flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-white/95
                  py-2.5
                  text-xs
                  font-semibold
                  text-[#2d2424]
                  shadow-sm
                  transition
                  hover:bg-white
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {uploading ? (
                  <Loader2
                    size={14}
                    className="animate-spin"
                  />
                ) : (
                  <Upload size={14} />
                )}

                تغيير
              </button>

              <button
                type="button"
                onClick={onRemove}
                disabled={uploading}
                className="
                  flex h-9 w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-black/45
                  text-white
                  backdrop-blur
                  transition
                  hover:bg-black/60
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <X size={15} />
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={handleSelect}
            disabled={uploading}
            className="
              flex h-full w-full
              flex-col
              items-center
              justify-center
              transition
              hover:bg-[#f4eae4]
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            <div
              className="
                flex h-14 w-14
                items-center justify-center
                rounded-2xl
                bg-white
                text-[#6B3038]
                shadow-sm
              "
            >
              {uploading ? (
                <Loader2
                  size={23}
                  className="animate-spin"
                />
              ) : (
                <Camera
                  size={23}
                  strokeWidth={1.6}
                />
              )}
            </div>

            <span className="mt-3 text-xs font-semibold text-[#4a3b36]">
              {uploading
                ? "جاري الرفع..."
                : "إضافة الشعار"}
            </span>
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              onUpload(file);
            }

            e.target.value = "";
          }}
        />
      </div>

      <p className="mt-4 text-center text-[11px] leading-5 text-[#a0948d]">
        يفضل استخدام شعار واضح
        <br />
        JPG أو PNG أو WEBP
      </p>
    </div>
  );
};

// ============================================================
// Section Title
// ============================================================

const SectionTitle = ({
  eyebrow,
  title,
  description,
}) => {
  return (
    <div className="mb-6">
      <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-[#b49668]">
        {eyebrow}
      </p>

      <h2 className="text-lg font-semibold text-[#302624]">
        {title}
      </h2>

      {description && (
        <p className="mt-1.5 text-xs leading-6 text-[#978b84]">
          {description}
        </p>
      )}
    </div>
  );
};

// ============================================================
// Business Profile
// ============================================================

const BusinessProfile = () => {
  const [business, setBusiness] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================================
  // Normalize
  // ==========================================================

  const normalizeProfile = (data) => {
    const profile = data?.businessProfile || {};

    return {
      name:
        profile.name ||
        data?.businessName ||
        "",

      description:
        profile.description || "",

      governorate:
        profile.governorate || "",

      address:
        profile.address || "",

      phone:
        profile.phone || "",

      whatsapp:
        profile.whatsapp || "",

      logo:
        profile.logo || "",
    };
  };

  // ==========================================================
  // Fetch
  // ==========================================================

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/provider/business-profile"
        );

        if (!mounted) return;

        const data = response.data;

        setBusiness(data);
        setForm(normalizeProfile(data));
      } catch (err) {
        console.error(
          "Get Business Profile Error:",
          err
        );

        if (!mounted) return;

        setError(
          err?.response?.data?.message ||
            "تعذر تحميل بيانات النشاط."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  // ==========================================================
  // Change
  // ==========================================================

  const handleChange = (field, value) => {
    if (field === "description") {
      value = value.slice(0, 500);
    }

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setError("");
    setSuccess("");
  };

  // ==========================================================
  // Upload logo directly to Cloudinary
  // ==========================================================

  const uploadLogo = async (file) => {
    if (!file) return;

    try {
      // ------------------------------------------------------
      // Validate size
      // ------------------------------------------------------

      if (file.size > 5 * 1024 * 1024) {
        setError(
          "حجم الشعار يجب ألا يتجاوز 5 ميجابايت."
        );

        return;
      }

      // ------------------------------------------------------
      // Validate type
      // ------------------------------------------------------

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        setError(
          "نوع الصورة غير مدعوم. استخدمي JPG أو PNG أو WEBP."
        );

        return;
      }

      // ------------------------------------------------------
      // Cloudinary config
      // ------------------------------------------------------

      const cloudName =
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

      const uploadPreset =
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error(
          "إعدادات Cloudinary غير موجودة. تأكدي من ملف .env."
        );
      }

      setUploadingLogo(true);
      setError("");
      setSuccess("");

      // ------------------------------------------------------
      // Upload directly to Cloudinary
      // ------------------------------------------------------

      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "upload_preset",
        uploadPreset
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error?.message ||
            "فشل رفع الصورة إلى Cloudinary."
        );
      }

      // ------------------------------------------------------
      // Get Cloudinary URL
      // ------------------------------------------------------

      if (!data?.secure_url) {
        throw new Error(
          "لم يتم استلام رابط الصورة من Cloudinary."
        );
      }

      // ------------------------------------------------------
      // Store URL in form
      // ------------------------------------------------------

      handleChange(
        "logo",
        data.secure_url
      );

      setSuccess(
        "تم رفع الشعار بنجاح. اضغطي حفظ التغييرات لتثبيته."
      );
    } catch (err) {
      console.error(
        "Cloudinary Upload Error:",
        err
      );

      setError(
        err?.message ||
          "حدث خطأ أثناء رفع الشعار."
      );
    } finally {
      setUploadingLogo(false);
    }
  };

  // ==========================================================
  // Save
  // ==========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploadingLogo) {
      setError(
        "يرجى الانتظار حتى يكتمل رفع الشعار."
      );

      return;
    }

    if (!form.name.trim()) {
      setError("اسم النشاط مطلوب.");

      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.put(
        "/provider/business-profile",
        {
          businessProfile: {
            name: form.name.trim(),
            description:
              form.description.trim(),
            governorate:
              form.governorate.trim(),
            address:
              form.address.trim(),
            phone:
              form.phone.trim(),
            whatsapp:
              form.whatsapp.trim(),
            logo: form.logo,
          },
        }
      );

      const data = response.data;

      setBusiness(data);
      setForm(normalizeProfile(data));

      setSuccess(
        data?.message ||
          "تم حفظ بيانات النشاط بنجاح."
      );
    } catch (err) {
      console.error(
        "Update Business Profile Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "حدث خطأ أثناء حفظ البيانات."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // Loading
  // ==========================================================

  if (loading) {
    return (
      <div
        dir="rtl"
        className="
          flex min-h-[75vh]
          items-center justify-center
          bg-[#fffaf5]
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto flex h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-[#6B3038]/[0.07]
              text-[#6B3038]
            "
          >
            <Loader2
              size={22}
              className="animate-spin"
            />
          </div>

          <p className="mt-4 text-xs text-[#91847d]">
            جاري تحميل ملف النشاط...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // Data
  // ==========================================================

  const serviceType =
    business?.businessProfile?.serviceType ||
    business?.serviceType ||
    "";

  const serviceLabel =
    SERVICE_LABELS[serviceType] ||
    "مقدم خدمة";

  const completionFields = [
    form.name,
    form.description,
    form.governorate,
    form.address,
    form.phone,
    form.whatsapp,
    form.logo,
  ];

  const completedCount =
    completionFields.filter(
      (item) =>
        typeof item === "string" &&
        item.trim()
    ).length;

  const completionPercentage = Math.round(
    (completedCount /
      completionFields.length) *
      100
  );

  // ==========================================================
  // Render
  // ==========================================================

  return (
    <div
      dir="rtl"
      className="
        min-h-screen
        bg-[#fffaf5]
        text-[#2d2424]
      "
    >
      <div className="mx-auto max-w-[1180px] px-4 py-7 md:px-7 md:py-10">

        {/* ====================================================
            Header
        ===================================================== */}

        <header className="mb-8">
          <div className="mb-5 flex items-center gap-2 text-[11px] text-[#9c9089]">
            <span>لوحة مقدم الخدمة</span>

            <ArrowLeft size={12} />

            <span className="font-medium text-[#6B3038]">
              ملف النشاط
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-[#b49668]">
                MY BUSINESS
              </p>

              <h1 className="text-2xl font-semibold tracking-tight text-[#2d2424] md:text-[30px]">
                ملف النشاط
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-7 text-[#92867f]">
                رتّبي المعلومات الأساسية لنشاطك حتى تظهر
                للعملاء بصورة واضحة واحترافية.
              </p>
            </div>

            <div
              className="
                inline-flex
                w-fit
                items-center gap-2
                rounded-full
                border border-[#eaded5]
                bg-white
                px-4 py-2.5
              "
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-medium text-[#645650]">
                {serviceLabel}
              </span>
            </div>
          </div>
        </header>

        {/* ====================================================
            Alerts
        ===================================================== */}

        {error && (
          <div
            className="
              mb-6
              flex items-start gap-3
              rounded-2xl
              border border-red-100
              bg-red-50
              px-4 py-3.5
              text-sm
              text-red-700
            "
          >
            <X
              size={17}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>
          </div>
        )}

        {success && (
          <div
            className="
              mb-6
              flex items-center gap-3
              rounded-2xl
              border border-emerald-100
              bg-emerald-50
              px-4 py-3.5
              text-sm
              text-emerald-700
            "
          >
            <div
              className="
                flex h-6 w-6
                items-center justify-center
                rounded-full
                bg-emerald-100
              "
            >
              <Check size={14} />
            </div>

            {success}
          </div>
        )}

        {/* ====================================================
            Main
        ===================================================== */}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

            {/* ==================================================
                Main content
            ================================================== */}

            <main className="space-y-6">

              {/* ==================================================
                  Identity Card
              ================================================== */}

              <section
                className="
                  overflow-hidden
                  rounded-[28px]
                  border border-[#e9ded7]
                  bg-white
                  shadow-[0_8px_35px_rgba(45,36,36,0.035)]
                "
              >
                <div className="border-b border-[#f0e8e3] px-6 py-5 md:px-8">
                  <SectionTitle
                    eyebrow="IDENTITY"
                    title="هوية النشاط"
                    description="المعلومات التي تمثل نشاطك أمام العملاء."
                  />
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-col gap-7 md:flex-row">

                    {/* Logo */}

                    <div className="shrink-0">
                      <LogoUpload
                        image={form.logo}
                        uploading={uploadingLogo}
                        onUpload={uploadLogo}
                        onRemove={() =>
                          handleChange(
                            "logo",
                            ""
                          )
                        }
                      />
                    </div>

                    {/* Fields */}

                    <div className="flex-1">
                      <div className="grid gap-5 md:grid-cols-2">

                        <Field
                          label="اسم النشاط"
                          value={form.name}
                          onChange={(value) =>
                            handleChange(
                              "name",
                              value
                            )
                          }
                          placeholder="مثال: قاعة ليالي العمر"
                        />

                        <div>
                          <label className="mb-2 block text-[13px] font-medium text-[#554640]">
                            مجال النشاط
                          </label>

                          <div
                            className="
                              flex h-[52px]
                              items-center
                              justify-between
                              rounded-xl
                              border border-[#e8ddd5]
                              bg-[#f9f5f1]
                              px-4
                            "
                          >
                            <span className="text-sm text-[#554640]">
                              {serviceLabel}
                            </span>

                            <span className="text-[10px] font-semibold text-[#a48a66]">
                              ثابت
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5">
                        <label className="mb-2 block text-[13px] font-medium text-[#554640]">
                          نبذة عن النشاط
                        </label>

                        <textarea
                          value={form.description}
                          onChange={(e) =>
                            handleChange(
                              "description",
                              e.target.value
                            )
                          }
                          maxLength={500}
                          rows={5}
                          placeholder="اكتبي نبذة قصيرة عن نشاطك والخدمات التي تقدمينها..."
                          className="
                            w-full
                            resize-none
                            rounded-xl
                            border border-[#e8ddd5]
                            bg-[#fcfaf8]
                            px-4 py-3.5
                            text-sm
                            leading-7
                            text-[#2d2424]
                            outline-none
                            transition
                            placeholder:text-[#b6aaa3]
                            focus:border-[#6B3038]
                            focus:bg-white
                            focus:ring-4
                            focus:ring-[#6B3038]/5
                          "
                        />

                        <div className="mt-2 flex justify-between text-[10px] text-[#aaa099]">
                          <span>
                            نبذة مختصرة وواضحة أفضل
                          </span>

                          <span>
                            {form.description.length}/500
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ==================================================
                  Contact & Location
              ================================================== */}

              <section
                className="
                  rounded-[28px]
                  border border-[#e9ded7]
                  bg-white
                  p-6
                  shadow-[0_8px_35px_rgba(45,36,36,0.035)]
                  md:p-8
                "
              >
                <SectionTitle
                  eyebrow="CONTACT"
                  title="الموقع والتواصل"
                  description="بيانات تساعد العملاء على الوصول إليك والتواصل مع نشاطك."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <InfoItem
                    icon={MapPin}
                    label="المحافظة"
                  >
                    {form.governorate}
                  </InfoItem>

                  <InfoItem
                    icon={MapPin}
                    label="العنوان"
                  >
                    {form.address}
                  </InfoItem>

                  <InfoItem
                    icon={Phone}
                    label="رقم الهاتف"
                  >
                    {form.phone}
                  </InfoItem>

                  <InfoItem
                    icon={MessageCircle}
                    label="واتساب"
                  >
                    {form.whatsapp}
                  </InfoItem>
                </div>

                <div className="my-7 h-px bg-[#f0e8e3]" />

                <div className="grid gap-5 md:grid-cols-2">

                  <Field
                    label="المحافظة"
                    value={form.governorate}
                    onChange={(value) =>
                      handleChange(
                        "governorate",
                        value
                      )
                    }
                    placeholder="مثال: غزة"
                  />

                  <Field
                    label="العنوان"
                    value={form.address}
                    onChange={(value) =>
                      handleChange(
                        "address",
                        value
                      )
                    }
                    placeholder="مثال: الرمال، شارع عمر المختار"
                  />

                  <Field
                    label="رقم الهاتف"
                    value={form.phone}
                    onChange={(value) =>
                      handleChange(
                        "phone",
                        value
                      )
                    }
                    placeholder="059 xxx xxxx"
                    type="tel"
                  />

                  <Field
                    label="رقم واتساب"
                    value={form.whatsapp}
                    onChange={(value) =>
                      handleChange(
                        "whatsapp",
                        value
                      )
                    }
                    placeholder="059 xxx xxxx"
                    type="tel"
                  />
                </div>
              </section>
            </main>

            {/* ==================================================
                Sidebar
            ================================================== */}

            <aside className="space-y-5">

              {/* ==================================================
                  Save
              ================================================== */}

              <div
                className="
                  sticky top-6
                  rounded-[28px]
                  border border-[#e9ded7]
                  bg-white
                  p-6
                  shadow-[0_8px_35px_rgba(45,36,36,0.05)]
                "
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.16em] text-[#b49668]">
                      PROFILE
                    </p>

                    <h3 className="mt-1 text-base font-semibold text-[#302624]">
                      حالة الملف
                    </h3>
                  </div>

                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-2xl
                      bg-[#6B3038]/[0.07]
                      text-[#6B3038]
                    "
                  >
                    <Store
                      size={20}
                      strokeWidth={1.6}
                    />
                  </div>
                </div>

                {/* Progress */}

                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-[#8f837c]">
                    اكتمال البيانات
                  </span>

                  <span className="text-sm font-bold text-[#6B3038]">
                    {completionPercentage}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#eee6e1]">
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-[#6B3038]
                      transition-all
                      duration-500
                    "
                    style={{
                      width: `${completionPercentage}%`,
                    }}
                  />
                </div>

                <p className="mt-4 text-xs leading-6 text-[#968a83]">
                  {completionPercentage === 100
                    ? "جميع بيانات ملف النشاط مكتملة."
                    : "أكملي البيانات الأساسية حتى يظهر نشاطك بصورة أفضل."}
                </p>

                <button
                  type="submit"
                  disabled={
                    saving ||
                    uploadingLogo
                  }
                  className="
                    mt-6
                    flex w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-[#6B3038]
                    px-5 py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_10px_25px_rgba(107,48,56,0.18)]
                    transition
                    hover:bg-[#59272e]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      جاري الحفظ...
                    </>
                  ) : uploadingLogo ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      جاري رفع الشعار...
                    </>
                  ) : (
                    <>
                      <Save size={17} />

                      حفظ التغييرات
                    </>
                  )}
                </button>
              </div>

              {/* ==================================================
                  Preview
              ================================================== */}

              <div
                className="
                  rounded-[28px]
                  border border-[#e9ded7]
                  bg-[#f8eee7]
                  p-6
                "
              >
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-xl
                      bg-white
                      text-[#6B3038]
                    "
                  >
                    <ImageIcon
                      size={18}
                      strokeWidth={1.6}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#40332f]">
                      ظهور نشاطك
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#978a82]">
                      معاينة الهوية
                    </p>
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    border border-[#eaded5]
                    bg-white
                    p-4
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        h-12 w-12
                        overflow-hidden
                        rounded-xl
                        bg-[#f8eee7]
                      "
                    >
                      {form.logo ? (
                        <img
                          src={form.logo}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[#6B3038]">
                          <Store size={19} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#302624]">
                        {form.name ||
                          "اسم النشاط"}
                      </p>

                      <p className="mt-1 truncate text-[10px] text-[#988c85]">
                        {serviceLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessProfile;