import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Camera,
  CarFront,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Edit3,
  Image as ImageIcon,
  Loader2,
  Package,
  Plus,
  Save,
  Search,
  Shirt,
  Sparkles,
  Trash2,
  X,
  Eye,
  MoreHorizontal,
  Layers3,
  Activity,
  UploadCloud,
  Star,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";

// =========================================================
// Cloudinary
// =========================================================

const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_UPLOAD_PRESET =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// =========================================================
// Service Configuration
// =========================================================

const SERVICE_CONFIG = {
  beauty: {
    label: "الكوافيرات",
    singular: "خدمة كوافير",
    icon: Sparkles,
    fields: [
      {
        key: "duration",
        label: "مدة الخدمة",
        type: "text",
        placeholder: "مثال: ساعتان",
      },
      {
        key: "bridal",
        label: "تجهيز عروس",
        type: "boolean",
      },
      {
        key: "hair",
        label: "تصفيف شعر",
        type: "boolean",
      },
      {
        key: "makeup",
        label: "مكياج",
        type: "boolean",
      },
      {
        key: "nails",
        label: "أظافر",
        type: "boolean",
      },
      {
        key: "homeService",
        label: "خدمة منزلية",
        type: "boolean",
      },
    ],
  },

  "bridal-dress": {
    label: "فساتين العرائس",
    singular: "فستان عروس",
    icon: Shirt,
    fields: [
      {
        key: "sizes",
        label: "المقاسات",
        type: "text",
        placeholder: "مثال: 36 - 38 - 40 - 42",
      },
      {
        key: "colors",
        label: "الألوان المتوفرة",
        type: "text",
        placeholder: "مثال: أبيض، أوف وايت",
      },
      {
        key: "rental",
        label: "تأجير",
        type: "boolean",
      },
      {
        key: "sale",
        label: "بيع",
        type: "boolean",
      },
      {
        key: "customDesign",
        label: "تصميم حسب الطلب",
        type: "boolean",
      },
      {
        key: "alterations",
        label: "تعديل المقاس",
        type: "boolean",
      },
    ],
  },

  "groom-suit": {
    label: "بدلات العرسان",
    singular: "بدلة عريس",
    icon: Shirt,
    fields: [
      {
        key: "sizes",
        label: "المقاسات",
        type: "text",
        placeholder: "مثال: S - M - L - XL",
      },
      {
        key: "colors",
        label: "الألوان المتوفرة",
        type: "text",
        placeholder: "مثال: أسود، كحلي، رمادي",
      },
      {
        key: "rental",
        label: "تأجير",
        type: "boolean",
      },
      {
        key: "sale",
        label: "بيع",
        type: "boolean",
      },
      {
        key: "customDesign",
        label: "تفصيل حسب الطلب",
        type: "boolean",
      },
      {
        key: "alterations",
        label: "تعديل المقاس",
        type: "boolean",
      },
    ],
  },

  photographer: {
    label: "المصورين",
    singular: "خدمة تصوير",
    icon: Camera,
    fields: [
      {
        key: "photography",
        label: "تصوير فوتوغرافي",
        type: "boolean",
      },
      {
        key: "videography",
        label: "تصوير فيديو",
        type: "boolean",
      },
      {
        key: "drone",
        label: "تصوير درون",
        type: "boolean",
      },
      {
        key: "album",
        label: "ألبوم صور",
        type: "boolean",
      },
      {
        key: "cinematic",
        label: "تصوير سينمائي",
        type: "boolean",
      },
    ],
  },

  "wedding-car": {
    label: "سيارات الزفاف",
    singular: "سيارة زفاف",
    icon: CarFront,
    fields: [
      {
        key: "model",
        label: "الموديل",
        type: "text",
        placeholder: "مثال: Mercedes S-Class",
      },
      {
        key: "year",
        label: "سنة الصنع",
        type: "text",
        placeholder: "مثال: 2024",
      },
      {
        key: "seats",
        label: "عدد المقاعد",
        type: "number",
        placeholder: "مثال: 4",
      },
      {
        key: "withDriver",
        label: "مع سائق",
        type: "boolean",
      },
      {
        key: "decoration",
        label: "زينة السيارة",
        type: "boolean",
      },
      {
        key: "hourlyRental",
        label: "تأجير بالساعة",
        type: "boolean",
      },
    ],
  },
};

// =========================================================
// Price Types
// =========================================================

const PRICE_TYPES = [
  {
    value: "fixed",
    label: "سعر ثابت",
  },
  {
    value: "starting",
    label: "يبدأ من",
  },
  {
    value: "hourly",
    label: "بالساعة",
  },
  {
    value: "daily",
    label: "باليوم",
  },
  {
    value: "contact",
    label: "تواصل معنا",
  },
];

// =========================================================
// Helpers
// =========================================================

const getInitialForm = (serviceType) => {
  const config = SERVICE_CONFIG[serviceType];

  const data = {};

  if (config?.fields) {
    config.fields.forEach((field) => {
      data[field.key] =
        field.type === "boolean" ? false : "";
    });
  }

  return {
    name: "",
    description: "",
    price: "",
    priceType: "fixed",
    images: [],
    imageFiles: [],
    features: [""],
    data,
    isActive: true,
  };
};

// =========================================================
// Component
// =========================================================

const Catalog = () => {
  const { user } = useContext(AuthContext);

  const serviceType = user?.serviceType;
  const config = SERVICE_CONFIG[serviceType];
  const fileInputRef = useRef(null);

  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] =
    useState(false);

  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState(
    getInitialForm(serviceType)
  );

  const isHall = serviceType === "hall";

  // =======================================================
  // Fetch
  // =======================================================

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/provider/catalog");

      setCatalog(response.data?.items || []);
    } catch (err) {
      console.error("Get catalog error:", err);

      setError(
        err?.response?.data?.message ||
          "حدث خطأ أثناء جلب الخدمات"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!serviceType || isHall) {
      setLoading(false);
      return;
    }

    fetchCatalog();
  }, [serviceType, isHall]);

  // =======================================================
  // Filter
  // =======================================================

  const filteredCatalog = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return catalog;

    return catalog.filter((item) => {
      return (
        item.name?.toLowerCase().includes(value) ||
        item.description?.toLowerCase().includes(value)
      );
    });
  }, [catalog, search]);

  // =======================================================
  // Stats
  // =======================================================

  const stats = useMemo(() => {
    const active = catalog.filter(
      (item) => item.isActive
    ).length;

    const inactive = catalog.filter(
      (item) => !item.isActive
    ).length;

    return {
      total: catalog.length,
      active,
      inactive,
    };
  }, [catalog]);

  // =======================================================
  // Modal
  // =======================================================

  const openAddModal = () => {
    setEditingItem(null);
    setForm(getInitialForm(serviceType));
    setError("");
    setSuccess("");
    setShowModal(true);
  };

  const openEditModal = (item) => {
    const configData = item.data || {};
    const serviceData = {};

    if (config?.fields) {
      config.fields.forEach((field) => {
        serviceData[field.key] =
          configData[field.key] ??
          (field.type === "boolean" ? false : "");
      });
    }

    setEditingItem(item);

    setForm({
      name: item.name || "",
      description: item.description || "",
      price:
        item.price !== undefined &&
        item.price !== null
          ? item.price
          : "",
      priceType: item.priceType || "fixed",
      images: Array.isArray(item.images)
        ? [...item.images]
        : [],
      imageFiles: [],
      features:
        Array.isArray(item.features) &&
        item.features.length
          ? [...item.features]
          : [""],
      data: serviceData,
      isActive:
        item.isActive !== undefined
          ? item.isActive
          : true,
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving || uploadingImages) return;

    setShowModal(false);
    setEditingItem(null);
    setForm(getInitialForm(serviceType));
  };

  // =======================================================
  // Form
  // =======================================================

  const updateForm = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateData = (key, value) => {
    setForm((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [key]: value,
      },
    }));
  };

  // =======================================================
  // Features
  // =======================================================

  const updateFeature = (index, value) => {
    setForm((prev) => {
      const features = [...prev.features];

      features[index] = value;

      return {
        ...prev,
        features,
      };
    });
  };

  const addFeature = () => {
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    setForm((prev) => {
      const features = prev.features.filter(
        (_, i) => i !== index
      );

      return {
        ...prev,
        features: features.length ? features : [""],
      };
    });
  };

  // =======================================================
  // Images
  // =======================================================

  const handleImageSelect = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) return;

    const validFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (!validFiles.length) {
      setError("يرجى اختيار ملفات صور فقط");
      return;
    }

    const MAX_SIZE = 10 * 1024 * 1024;

    const tooLarge = validFiles.some(
      (file) => file.size > MAX_SIZE
    );

    if (tooLarge) {
      setError(
        "حجم الصورة الواحدة يجب ألا يتجاوز 10MB"
      );
      return;
    }

    setError("");

    setForm((prev) => ({
      ...prev,
      imageFiles: [
        ...prev.imageFiles,
        ...validFiles,
      ],
    }));

    event.target.value = "";
  };

  const removeNewImage = (index) => {
    setForm((prev) => ({
      ...prev,
      imageFiles: prev.imageFiles.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const removeUploadedImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // =======================================================
  // Cloudinary
  // =======================================================

  const uploadImageToCloudinary = async (file) => {
    if (
      !CLOUDINARY_CLOUD_NAME ||
      !CLOUDINARY_UPLOAD_PRESET
    ) {
      throw new Error(
        "إعدادات Cloudinary غير موجودة في ملف البيئة"
      );
    }

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "upload_preset",
      CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(
        "فشل رفع الصورة إلى Cloudinary"
      );
    }

    const data = await response.json();

    return data.secure_url;
  };

  const uploadSelectedImages = async () => {
    if (!form.imageFiles.length) return [];

    setUploadingImages(true);
    setError("");

    try {
      const uploadedUrls = [];

      for (const file of form.imageFiles) {
        const url =
          await uploadImageToCloudinary(file);

        uploadedUrls.push(url);
      }

      setForm((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          ...uploadedUrls,
        ],
        imageFiles: [],
      }));

      return uploadedUrls;
    } catch (err) {
      console.error(
        "Upload images error:",
        err
      );

      setError(
        err.message ||
          "حدث خطأ أثناء رفع الصور"
      );

      return null;
    } finally {
      setUploadingImages(false);
    }
  };

  // =======================================================
  // Submit
  // =======================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("اسم الخدمة مطلوب");
      return;
    }

    if (
      form.priceType !== "contact" &&
      (form.price === "" ||
        form.price === null ||
        Number(form.price) < 0)
    ) {
      setError("يرجى إدخال سعر صحيح");
      return;
    }

    try {
      setSaving(true);

      let finalImages = [...form.images];

      if (form.imageFiles.length) {
        const uploadedUrls =
          await uploadSelectedImages();

        if (!uploadedUrls) {
          setSaving(false);
          return;
        }

        finalImages = [
          ...finalImages,
          ...uploadedUrls,
        ];
      }

      const cleanFeatures =
        form.features
          .map((feature) => feature.trim())
          .filter(Boolean);

      const payload = {
        name: form.name.trim(),
        description:
          form.description.trim(),
        price:
          form.priceType === "contact"
            ? 0
            : Number(form.price || 0),
        priceType: form.priceType,
        images: finalImages,
        features: cleanFeatures,
        data: {
          ...form.data,
        },
        isActive: form.isActive,
      };

      if (!editingItem) {
        const response = await api.post(
          "/provider/catalog",
          payload
        );

        const newItem =
          response.data?.item;

        if (newItem) {
          setCatalog((prev) => [
            newItem,
            ...prev,
          ]);
        } else {
          await fetchCatalog();
        }

        setSuccess(
          "تمت إضافة الخدمة بنجاح"
        );
      } else {
        const response = await api.put(
          `/provider/catalog/${editingItem._id}`,
          payload
        );

        const updatedItem =
          response.data?.item;

        if (updatedItem) {
          setCatalog((prev) =>
            prev.map((item) =>
              item._id === updatedItem._id
                ? updatedItem
                : item
            )
          );
        } else {
          await fetchCatalog();
        }

        setSuccess(
          "تم تعديل الخدمة بنجاح"
        );
      }

      setTimeout(() => {
        setShowModal(false);
        setEditingItem(null);
        setForm(getInitialForm(serviceType));
        setSuccess("");
      }, 700);
    } catch (err) {
      console.error(
        "Save catalog error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "حدث خطأ أثناء حفظ الخدمة"
      );
    } finally {
      setSaving(false);
    }
  };

  // =======================================================
  // Delete
  // =======================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "هل أنت متأكد من حذف هذه الخدمة؟"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      await api.delete(
        `/provider/catalog/${id}`
      );

      setCatalog((prev) =>
        prev.filter((item) => item._id !== id)
      );

      setSuccess("تم حذف الخدمة بنجاح");

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error(
        "Delete catalog error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "حدث خطأ أثناء حذف الخدمة"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =======================================================
  // Toggle
  // =======================================================

  const handleToggleStatus = async (id) => {
    try {
      setTogglingId(id);
      setError("");

      const response = await api.patch(
        `/provider/catalog/${id}/toggle`
      );

      const updatedItem =
        response.data?.item;

      if (updatedItem) {
        setCatalog((prev) =>
          prev.map((item) =>
            item._id === updatedItem._id
              ? updatedItem
              : item
          )
        );
      }

      setSuccess(
        "تم تحديث حالة الخدمة"
      );

      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (err) {
      console.error(
        "Toggle catalog error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "حدث خطأ أثناء تحديث الحالة"
      );
    } finally {
      setTogglingId(null);
    }
  };

  // =======================================================
  // Helpers
  // =======================================================

  const getPriceLabel = (type) => {
    return (
      PRICE_TYPES.find(
        (item) => item.value === type
      )?.label || "سعر ثابت"
    );
  };

  const getPreviewUrl = (file) => {
    return URL.createObjectURL(file);
  };

  // =======================================================
  // Hall
  // =======================================================

  if (isHall) {
    return (
      <div
        dir="rtl"
        className="min-h-[80vh] bg-[#faf7f4] px-4 py-10"
      >
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-[36px] border border-[#e5c28d]/30 bg-white p-10 text-center shadow-[0_30px_80px_rgba(45,36,36,0.08)]">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#e5c28d]/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#6B3038]/5 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-[28px] bg-[#6B3038] text-white shadow-[0_18px_40px_rgba(107,48,56,0.25)]">
                <Package size={40} />
              </div>

              <span className="mb-3 inline-block rounded-full bg-[#f8eee7] px-4 py-1.5 text-xs font-semibold text-[#6B3038]">
                إدارة الصالة
              </span>

              <h2 className="text-3xl font-bold text-[#2d2424]">
                الكتالوج غير متاح للصالات
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-[#2d2424]/55">
                مقدمو خدمات الصالات لا يحتاجون إلى
                كتالوج منفصل. يمكنك إدارة بيانات الصالة
                والصور والباقات من الأقسام المخصصة لها.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =======================================================
  // Invalid Service
  // =======================================================

  if (!serviceType || !config) {
    return (
      <div
        dir="rtl"
        className="p-6"
      >
        <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-red-700">
          لم يتم تحديد نوع الخدمة لهذا الحساب.
        </div>
      </div>
    );
  }

  const ServiceIcon = config.icon;

  // =======================================================
  // Loading
  // =======================================================

  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-[70vh] items-center justify-center bg-[#faf7f4]"
      >
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6B3038]/10">
            <Loader2
              size={28}
              className="animate-spin text-[#6B3038]"
            />
          </div>

          <p className="mt-4 text-sm text-[#2d2424]/50">
            جاري تجهيز لوحة الخدمات...
          </p>
        </div>
      </div>
    );
  }

  // =======================================================
  // Render
  // =======================================================

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#faf7f4] px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1450px]">

        {/* =================================================
            HERO HEADER
        ================================================= */}

        <section className="relative mb-7 overflow-hidden rounded-[32px] bg-[#2d2424] px-6 py-7 text-white shadow-[0_25px_70px_rgba(45,36,36,0.12)] sm:px-8 lg:px-10 lg:py-9">
          <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-[#e5c28d]/10 blur-3xl" />
          <div className="absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-[#6B3038]/30 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] border border-white/10 bg-white/10 backdrop-blur">
                <ServiceIcon
                  size={29}
                  className="text-[#e5c28d]"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-medium tracking-[0.15em] text-[#e5c28d]">
                    ZAFaf · SERVICES
                  </span>
                </div>

                <h1 className="text-2xl font-bold sm:text-3xl">
                  {config.label}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/55">
                  إدارة خدماتك ومنتجاتك وعرضها للعملاء
                  بطريقة احترافية تليق بعلامتك التجارية.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="group flex items-center justify-center gap-2 rounded-2xl bg-[#e5c28d] px-6 py-3.5 font-bold text-[#2d2424] shadow-[0_12px_30px_rgba(229,194,141,0.15)] transition hover:-translate-y-0.5 hover:bg-[#f0d19f]"
            >
              <Plus
                size={19}
                className="transition group-hover:rotate-90"
              />
              إضافة {config.singular}
            </button>
          </div>
        </section>

        {/* =================================================
            ALERTS
        ================================================= */}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="mr-auto rounded-lg p-1 transition hover:bg-red-100"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            <CheckCircle2 size={19} />
            {success}
          </div>
        )}

        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="group relative overflow-hidden rounded-[26px] border border-[#e5c28d]/25 bg-white p-5 shadow-[0_12px_35px_rgba(45,36,36,0.045)] transition hover:-translate-y-0.5">
            <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-[#6B3038]/5" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-[#2d2424]/45">
                  إجمالي الخدمات
                </p>

                <p className="mt-2 text-3xl font-bold text-[#2d2424]">
                  {stats.total}
                </p>

                <p className="mt-1 text-[11px] text-[#2d2424]/35">
                  جميع الخدمات المضافة
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6B3038]/8 text-[#6B3038]">
                <Layers3 size={22} />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[26px] border border-green-100 bg-white p-5 shadow-[0_12px_35px_rgba(45,36,36,0.045)] transition hover:-translate-y-0.5">
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-[#2d2424]/45">
                  الخدمات النشطة
                </p>

                <p className="mt-2 text-3xl font-bold text-[#2d2424]">
                  {stats.active}
                </p>

                <p className="mt-1 text-[11px] text-green-600/70">
                  ظاهرة للعملاء
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <Activity size={22} />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[26px] border border-gray-100 bg-white p-5 shadow-[0_12px_35px_rgba(45,36,36,0.045)] transition hover:-translate-y-0.5">
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-[#2d2424]/45">
                  غير النشطة
                </p>

                <p className="mt-2 text-3xl font-bold text-[#2d2424]">
                  {stats.inactive}
                </p>

                <p className="mt-1 text-[11px] text-[#2d2424]/35">
                  مخفية عن العملاء
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-500">
                <Package size={22} />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <section className="mb-7 rounded-[26px] border border-[#e5c28d]/20 bg-white p-4 shadow-[0_12px_35px_rgba(45,36,36,0.045)] sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#2d2424]">
                خدماتك
              </h2>

              <p className="mt-1 text-xs text-[#2d2424]/40">
                {filteredCatalog.length} خدمة معروضة
              </p>
            </div>

            <div className="relative w-full lg:max-w-md">
              <Search
                size={19}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2d2424]/30"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder={`ابحث في ${config.label}...`}
                className="w-full rounded-2xl border border-[#2d2424]/8 bg-[#faf7f4] py-3.5 pr-11 pl-4 text-sm text-[#2d2424] outline-none transition placeholder:text-[#2d2424]/30 focus:border-[#6B3038]/30 focus:bg-white focus:ring-4 focus:ring-[#6B3038]/5"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#2d2424]/40 hover:bg-[#f8eee7]"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            EMPTY
        ================================================= */}

        {!filteredCatalog.length ? (
          <div className="relative overflow-hidden rounded-[32px] border border-[#e5c28d]/20 bg-white px-6 py-20 text-center shadow-[0_15px_50px_rgba(45,36,36,0.05)]">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#e5c28d]/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#f8eee7]">
                <Package
                  size={34}
                  className="text-[#6B3038]"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#2d2424]">
                {search
                  ? "لا توجد نتائج"
                  : "ابدأ بإضافة خدماتك"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#2d2424]/45">
                {search
                  ? "لم نجد أي خدمة مطابقة للبحث. جرّبي كلمة أخرى."
                  : "أضيفي خدماتك ومنتجاتك حتى تظهر بشكل احترافي أمام عملاء زَفَاف."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={openAddModal}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#6B3038] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#6B3038]/15 transition hover:-translate-y-0.5 hover:bg-[#57272e]"
                >
                  <Plus size={18} />
                  إضافة أول خدمة
                </button>
              )}
            </div>
          </div>
        ) : (
          /* =================================================
             CARDS
          ================================================= */

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCatalog.map((item) => (
              <article
                key={item._id}
                className="group overflow-hidden rounded-[28px] border border-[#e5c28d]/20 bg-white shadow-[0_14px_45px_rgba(45,36,36,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(45,36,36,0.1)]"
              >
                {/* IMAGE */}

                <div className="relative aspect-[1.18] overflow-hidden bg-[#f8eee7]">
                  {item.images?.length ? (
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 text-[#6B3038]/40">
                        <ImageIcon size={28} />
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 opacity-70" />

                  {/* Status */}

                  <div className="absolute right-4 top-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold shadow-lg backdrop-blur-md ${
                        item.isActive
                          ? "bg-green-500/90 text-white"
                          : "bg-black/55 text-white"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.isActive
                            ? "bg-white"
                            : "bg-white/60"
                        }`}
                      />

                      {item.isActive
                        ? "نشطة"
                        : "غير نشطة"}
                    </span>
                  </div>

                  {/* Image count */}

                  {item.images?.length > 1 && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      <ImageIcon size={13} />
                      {item.images.length}
                    </div>
                  )}

                  {/* Preview */}

                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        item.images?.[0],
                        "_blank"
                      )
                    }
                    disabled={!item.images?.length}
                    className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#2d2424] opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100 disabled:hidden"
                  >
                    <Eye size={17} />
                  </button>
                </div>

                {/* CONTENT */}

                <div className="p-5">
                  <div className="mb-4">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h3 className="line-clamp-1 text-[17px] font-bold text-[#2d2424]">
                        {item.name}
                      </h3>

                      <div className="flex shrink-0 items-center gap-1 text-[#e5b65f]">
                        <Star
                          size={14}
                          fill="currentColor"
                        />
                      </div>
                    </div>

                    {item.description && (
                      <p className="line-clamp-2 min-h-[42px] text-xs leading-6 text-[#2d2424]/45">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* PRICE */}

                  <div className="mb-4 flex items-center justify-between rounded-2xl border border-[#e5c28d]/20 bg-[#faf7f4] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#6B3038]/8 text-[#6B3038]">
                        <CircleDollarSign
                          size={17}
                        />
                      </div>

                      <span className="text-[11px] text-[#2d2424]/45">
                        {getPriceLabel(
                          item.priceType
                        )}
                      </span>
                    </div>

                    <span className="text-sm font-bold text-[#6B3038]">
                      {item.priceType ===
                      "contact"
                        ? "تواصل معنا"
                        : `${item.price || 0} ₪`}
                    </span>
                  </div>

                  {/* FEATURES */}

                  {item.features?.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {item.features
                        .slice(0, 3)
                        .map(
                          (feature, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-[#f8eee7] px-2.5 py-1 text-[10px] font-medium text-[#6B3038]"
                            >
                              {feature}
                            </span>
                          )
                        )}

                      {item.features.length > 3 && (
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] text-gray-500">
                          +{item.features.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* ACTIONS */}

                  <div className="flex items-center gap-2 border-t border-[#2d2424]/6 pt-4">
                    <button
                      type="button"
                      onClick={() =>
                        openEditModal(item)
                      }
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#6B3038] py-2.5 text-xs font-bold text-white transition hover:bg-[#57272e]"
                    >
                      <Edit3 size={15} />
                      تعديل
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleToggleStatus(
                          item._id
                        )
                      }
                      disabled={
                        togglingId === item._id
                      }
                      title="تغيير الحالة"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5c28d]/30 bg-[#fffaf5] text-[#6B3038] transition hover:bg-[#f8eee7] disabled:opacity-50"
                    >
                      {togglingId ===
                      item._id ? (
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                      ) : (
                        <Check size={16} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(item._id)
                      }
                      disabled={
                        deletingId === item._id
                      }
                      title="حذف الخدمة"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100 disabled:opacity-50"
                    >
                      {deletingId ===
                      item._id ? (
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>

                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2d2424]/8 bg-white text-[#2d2424]/40 transition hover:bg-[#faf7f4]"
                    >
                      <MoreHorizontal size={17} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* ===================================================
          MODAL
      =================================================== */}

      {showModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#1e1718]/70 px-3 py-4 backdrop-blur-md sm:px-6 sm:py-8"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/20 bg-[#faf7f4] shadow-[0_40px_100px_rgba(0,0,0,0.25)]">

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="relative overflow-hidden bg-[#2d2424] px-5 py-6 text-white sm:px-8">
              <div className="absolute -left-20 -top-24 h-60 w-60 rounded-full bg-[#e5c28d]/10 blur-3xl" />

              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5c28d] text-[#2d2424]">
                    <ServiceIcon size={22} />
                  </div>

                  <div>
                    <p className="text-[11px] font-medium tracking-wider text-[#e5c28d]">
                      {editingItem
                        ? "EDIT SERVICE"
                        : "NEW SERVICE"}
                    </p>

                    <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                      {editingItem
                        ? editingItem.name
                        : `إضافة ${config.singular}`}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={
                    saving ||
                    uploadingImages
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-50"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="p-5 sm:p-8"
            >

              {/* BASIC */}

              <section className="mb-8">
                <div className="mb-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#6B3038] text-xs font-bold text-white">
                      01
                    </span>

                    <div>
                      <h3 className="font-bold text-[#2d2424]">
                        المعلومات الأساسية
                      </h3>

                      <p className="mt-0.5 text-[11px] text-[#2d2424]/40">
                        المعلومات التي ستظهر للعملاء
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[26px] border border-[#e5c28d]/20 bg-white p-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label className="mb-2 block text-xs font-bold text-[#2d2424]">
                        اسم الخدمة
                      </label>

                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          updateForm(
                            "name",
                            e.target.value
                          )
                        }
                        placeholder={`مثال: ${config.singular} مميزة`}
                        className="w-full rounded-2xl border border-[#2d2424]/8 bg-[#faf7f4] px-4 py-3.5 text-sm outline-none transition focus:border-[#6B3038]/30 focus:bg-white focus:ring-4 focus:ring-[#6B3038]/5"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold text-[#2d2424]">
                        وصف الخدمة
                      </label>

                      <textarea
                        value={form.description}
                        onChange={(e) =>
                          updateForm(
                            "description",
                            e.target.value
                          )
                        }
                        rows={4}
                        placeholder="اكتبي وصفًا واضحًا وجذابًا للخدمة..."
                        className="w-full resize-none rounded-2xl border border-[#2d2424]/8 bg-[#faf7f4] px-4 py-3.5 text-sm leading-7 outline-none transition focus:border-[#6B3038]/30 focus:bg-white focus:ring-4 focus:ring-[#6B3038]/5"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* PRICE */}

              <section className="mb-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#6B3038] text-xs font-bold text-white">
                    02
                  </span>

                  <div>
                    <h3 className="font-bold text-[#2d2424]">
                      التسعير
                    </h3>

                    <p className="mt-0.5 text-[11px] text-[#2d2424]/40">
                      حددي طريقة عرض سعر الخدمة
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 rounded-[26px] border border-[#e5c28d]/20 bg-white p-5 sm:grid-cols-2 sm:p-6">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-[#2d2424]">
                      نوع السعر
                    </label>

                    <div className="relative">
                      <select
                        value={form.priceType}
                        onChange={(e) =>
                          updateForm(
                            "priceType",
                            e.target.value
                          )
                        }
                        className="w-full appearance-none rounded-2xl border border-[#2d2424]/8 bg-[#faf7f4] px-4 py-3.5 pl-10 text-sm outline-none focus:border-[#6B3038]/30"
                      >
                        {PRICE_TYPES.map(
                          (type) => (
                            <option
                              key={type.value}
                              value={
                                type.value
                              }
                            >
                              {type.label}
                            </option>
                          )
                        )}
                      </select>

                      <ChevronDown
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#2d2424]/35"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-[#2d2424]">
                      السعر
                    </label>

                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={form.price}
                        disabled={
                          form.priceType ===
                          "contact"
                        }
                        onChange={(e) =>
                          updateForm(
                            "price",
                            e.target.value
                          )
                        }
                        placeholder={
                          form.priceType ===
                          "contact"
                            ? "لا يحتاج إلى سعر"
                            : "مثال: 1200"
                        }
                        className="w-full rounded-2xl border border-[#2d2424]/8 bg-[#faf7f4] px-4 py-3.5 text-sm outline-none focus:border-[#6B3038]/30 disabled:bg-gray-100"
                      />

                      {form.priceType !==
                        "contact" && (
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#2d2424]/35">
                          ₪
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* IMAGES */}

              <section className="mb-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#6B3038] text-xs font-bold text-white">
                    03
                  </span>

                  <div>
                    <h3 className="font-bold text-[#2d2424]">
                      صور الخدمة
                    </h3>

                    <p className="mt-0.5 text-[11px] text-[#2d2424]/40">
                      الصور عالية الجودة تعطي الخدمة
                      حضورًا أفضل
                    </p>
                  </div>
                </div>

                <div className="rounded-[26px] border border-[#e5c28d]/20 bg-white p-5 sm:p-6">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    disabled={
                      saving ||
                      uploadingImages
                    }
                    className="group flex w-full flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-[#e5c28d]/40 bg-[#faf7f4] px-5 py-9 transition hover:border-[#6B3038]/30 hover:bg-[#f8eee7]/40 disabled:opacity-50"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6B3038] text-white shadow-lg shadow-[#6B3038]/15 transition group-hover:scale-105">
                      <UploadCloud size={24} />
                    </div>

                    <span className="text-sm font-bold text-[#2d2424]">
                      أضيفي صور الخدمة
                    </span>

                    <span className="mt-1 text-[11px] text-[#2d2424]/40">
                      يمكنك اختيار عدة صور في نفس الوقت
                    </span>
                  </button>

                  {/* Existing */}

                  {form.images.length > 0 && (
                    <div className="mt-6">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#2d2424]">
                          الصور الحالية
                        </span>

                        <span className="text-[10px] text-[#2d2424]/35">
                          {form.images.length} صورة
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {form.images.map(
                          (image, index) => (
                            <div
                              key={`${image}-${index}`}
                              className="group relative aspect-square overflow-hidden rounded-2xl bg-[#f8eee7]"
                            >
                              <img
                                src={image}
                                alt={`صورة ${
                                  index + 1
                                }`}
                                className="h-full w-full object-cover"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition group-hover:opacity-100" />

                              <button
                                type="button"
                                onClick={() =>
                                  removeUploadedImage(
                                    index
                                  )
                                }
                                className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                              >
                                <X size={15} />
                              </button>

                              {index === 0 && (
                                <span className="absolute bottom-2 right-2 rounded-full bg-[#e5c28d] px-2.5 py-1 text-[9px] font-bold text-[#2d2424]">
                                  الصورة الرئيسية
                                </span>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* New */}

                  {form.imageFiles.length > 0 && (
                    <div className="mt-6">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#2d2424]">
                          صور جديدة
                        </span>

                        <span className="text-[10px] text-[#2d2424]/35">
                          بانتظار الرفع
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {form.imageFiles.map(
                          (file, index) => (
                            <div
                              key={`${file.name}-${index}`}
                              className="group relative aspect-square overflow-hidden rounded-2xl bg-[#f8eee7]"
                            >
                              <img
                                src={getPreviewUrl(
                                  file
                                )}
                                alt={file.name}
                                className="h-full w-full object-cover"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeNewImage(
                                    index
                                  )
                                }
                                className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                              >
                                <X size={15} />
                              </button>

                              <span className="absolute bottom-2 right-2 max-w-[80%] truncate rounded-full bg-black/55 px-2 py-1 text-[9px] text-white">
                                {file.name}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* FEATURES */}

              <section className="mb-8">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#6B3038] text-xs font-bold text-white">
                      04
                    </span>

                    <div>
                      <h3 className="font-bold text-[#2d2424]">
                        مميزات الخدمة
                      </h3>

                      <p className="mt-0.5 text-[11px] text-[#2d2424]/40">
                        أبرز النقاط التي تميز الخدمة
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center gap-1.5 rounded-xl bg-[#6B3038]/7 px-3 py-2 text-xs font-bold text-[#6B3038]"
                  >
                    <Plus size={15} />
                    إضافة
                  </button>
                </div>

                <div className="rounded-[26px] border border-[#e5c28d]/20 bg-white p-5 sm:p-6">
                  <div className="space-y-3">
                    {form.features.map(
                      (feature, index) => (
                        <div
                          key={index}
                          className="flex gap-2"
                        >
                          <div className="flex flex-1 items-center rounded-2xl border border-[#2d2424]/8 bg-[#faf7f4] px-4 transition focus-within:border-[#6B3038]/30 focus-within:bg-white">
                            <Check
                              size={16}
                              className="ml-3 shrink-0 text-[#6B3038]"
                            />

                            <input
                              type="text"
                              value={feature}
                              onChange={(e) =>
                                updateFeature(
                                  index,
                                  e.target.value
                                )
                              }
                              placeholder="مثال: خدمة منزلية"
                              className="w-full bg-transparent py-3.5 text-sm outline-none"
                            />
                          </div>

                          {form.features.length >
                            1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeFeature(
                                  index
                                )
                              }
                              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </section>

              {/* SERVICE DETAILS */}

              {config.fields?.length > 0 && (
                <section className="mb-8">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#6B3038] text-xs font-bold text-white">
                      05
                    </span>

                    <div>
                      <h3 className="font-bold text-[#2d2424]">
                        تفاصيل {config.singular}
                      </h3>

                      <p className="mt-0.5 text-[11px] text-[#2d2424]/40">
                        معلومات إضافية خاصة بنوع الخدمة
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 rounded-[26px] border border-[#e5c28d]/20 bg-white p-5 sm:grid-cols-2 sm:p-6">
                    {config.fields.map(
                      (field) => (
                        <div
                          key={field.key}
                          className={
                            field.type ===
                            "boolean"
                              ? "rounded-2xl border border-[#2d2424]/8 bg-[#faf7f4] p-4"
                              : ""
                          }
                        >
                          {field.type ===
                          "boolean" ? (
                            <label className="flex cursor-pointer items-center justify-between gap-4">
                              <span className="text-xs font-bold text-[#2d2424]">
                                {field.label}
                              </span>

                              <input
                                type="checkbox"
                                checked={Boolean(
                                  form.data[
                                    field.key
                                  ]
                                )}
                                onChange={(e) =>
                                  updateData(
                                    field.key,
                                    e.target
                                      .checked
                                  )
                                }
                                className="h-5 w-5 accent-[#6B3038]"
                              />
                            </label>
                          ) : (
                            <>
                              <label className="mb-2 block text-xs font-bold text-[#2d2424]">
                                {field.label}
                              </label>

                              <input
                                type={
                                  field.type ===
                                  "number"
                                    ? "number"
                                    : "text"
                                }
                                value={
                                  form.data[
                                    field.key
                                  ] ?? ""
                                }
                                onChange={(e) =>
                                  updateData(
                                    field.key,
                                    e.target.value
                                  )
                                }
                                placeholder={
                                  field.placeholder
                                }
                                className="w-full rounded-2xl border border-[#2d2424]/8 bg-[#faf7f4] px-4 py-3.5 text-sm outline-none transition focus:border-[#6B3038]/30 focus:bg-white"
                              />
                            </>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </section>
              )}

              {/* STATUS */}

              <section className="mb-8">
                <div className="rounded-[26px] border border-[#e5c28d]/25 bg-white p-5 sm:p-6">
                  <label className="flex cursor-pointer items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                        <Activity size={20} />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-[#2d2424]">
                          نشر الخدمة
                        </h3>

                        <p className="mt-1 text-[11px] text-[#2d2424]/40">
                          الخدمات النشطة تظهر للعملاء
                        </p>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) =>
                        updateForm(
                          "isActive",
                          e.target.checked
                        )
                      }
                      className="h-5 w-5 accent-[#6B3038]"
                    />
                  </label>
                </div>
              </section>

              {/* UPLOAD */}

              {uploadingImages && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[#e5c28d]/30 bg-[#f8eee7] p-4 text-sm text-[#6B3038]">
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />

                  <span>
                    جاري رفع الصور إلى Cloudinary...
                  </span>
                </div>
              )}

              {/* ACTIONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-[#2d2424]/8 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={
                    saving ||
                    uploadingImages
                  }
                  className="rounded-2xl border border-[#2d2424]/10 bg-white px-7 py-3.5 text-sm font-bold text-[#2d2424] transition hover:bg-[#f8eee7] disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={
                    saving ||
                    uploadingImages
                  }
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#6B3038] px-8 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(107,48,56,0.18)] transition hover:-translate-y-0.5 hover:bg-[#57272e] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ||
                  uploadingImages ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save size={18} />

                      {editingItem
                        ? "حفظ التعديلات"
                        : "إضافة الخدمة"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;