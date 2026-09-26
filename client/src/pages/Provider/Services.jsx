
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Loader2,
  CheckCircle2,
  Power,
  PackageOpen,
} from "lucide-react";

import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import api from "../../api/api";
import { AuthContext } from "../../context/AuthContext";

// =====================================================
// Service configuration
// Only provider types that actually manage services
// =====================================================

const serviceConfig = {
  beauty: {
    label: "خدمات التجميل",
    singular: "خدمة تجميل",
    description:
      "أديري خدمات المكياج والتسريحات والعناية والباقات الخاصة بك.",
    example: "مكياج عروس كامل",
  },

  photographers: {
    label: "خدمات التصوير",
    singular: "خدمة تصوير",
    description:
      "أديري خدمات التصوير والفيديو والباقات الخاصة بك.",
    example: "تصوير حفل الزفاف",
  },
};

// =====================================================
// Initial form
// =====================================================

const initialForm = {
  name: "",
  description: "",
  category: "",
  price: "",
  duration: "",
  image: "",
};

// =====================================================
// Component
// =====================================================

const Services = () => {
  const { user } = useContext(AuthContext);

  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [form, setForm] = useState(initialForm);

  // =====================================================
  // Current provider type
  // =====================================================

  const currentConfig = useMemo(() => {
    return (
      serviceConfig[user?.serviceType] || {
        label: "الخدمات",
        singular: "خدمة",
        description:
          "إدارة الخدمات الخاصة بنشاطك.",
        example: "الخدمة الخاصة بك",
      }
    );
  }, [user?.serviceType]);

  // =====================================================
  // Load services
  // =====================================================

  const fetchServices = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/provider/services"
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "تعذر تحميل الخدمات"
        );
      }

      setServices(
        response.data?.services || []
      );
    } catch (error) {
      console.error(
        "Fetch Services Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "حدث خطأ أثناء تحميل الخدمات"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // =====================================================
  // Search
  // =====================================================

  const filteredServices = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    if (!value) {
      return services;
    }

    return services.filter((service) => {
      const name =
        service.name?.toLowerCase() || "";

      const description =
        service.description?.toLowerCase() || "";

      const category =
        service.category?.toLowerCase() || "";

      return (
        name.includes(value) ||
        description.includes(value) ||
        category.includes(value)
      );
    });
  }, [services, search]);

  // =====================================================
  // Add
  // =====================================================

  const openAddModal = () => {
    setEditingService(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  // =====================================================
  // Edit
  // =====================================================

  const openEditModal = (service) => {
    setEditingService(service);

    setForm({
      name: service.name || "",
      description:
        service.description || "",
      category: service.category || "",
      price:
        service.price !== undefined &&
        service.price !== null
          ? service.price
          : "",
      duration:
        service.duration || "",
      image:
        service.image || "",
    });

    setIsModalOpen(true);
  };

  // =====================================================
  // Close
  // =====================================================

  const closeModal = () => {
    if (saving) return;

    setIsModalOpen(false);
    setEditingService(null);
    setForm(initialForm);
  };

  // =====================================================
  // Form
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // Submit
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error(
        `يرجى إدخال اسم ${currentConfig.singular}`
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: form.name.trim(),

        description:
          form.description.trim(),

        category:
          form.category.trim(),

        price:
          Number(form.price) || 0,

        duration:
          form.duration.trim(),

        image:
          form.image.trim(),
      };

      // =================================================
      // Update
      // =================================================

      if (editingService) {
        const response = await api.put(
          `/provider/services/${editingService._id}`,
          payload
        );

        if (!response.data?.success) {
          throw new Error(
            response.data?.message ||
              "تعذر تحديث الخدمة"
          );
        }

        const updatedService =
          response.data?.service;

        setServices((prev) =>
          prev.map((service) =>
            service._id ===
            editingService._id
              ? updatedService
              : service
          )
        );

        toast.success(
          "تم تحديث الخدمة بنجاح"
        );
      }

      // =================================================
      // Create
      // =================================================

      else {
        const response = await api.post(
          "/provider/services",
          payload
        );

        if (!response.data?.success) {
          throw new Error(
            response.data?.message ||
              "تعذر إضافة الخدمة"
          );
        }

        const newService =
          response.data?.service;

        if (newService) {
          setServices((prev) => [
            newService,
            ...prev,
          ]);
        }

        toast.success(
          "تمت إضافة الخدمة بنجاح"
        );
      }

      closeModal();
    } catch (error) {
      console.error(
        "Save Service Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "حدث خطأ أثناء حفظ الخدمة"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // Delete
  // =====================================================

  const handleDelete = async (serviceId) => {
    const confirmed =
      window.confirm(
        "هل أنت متأكد من حذف هذه الخدمة؟"
      );

    if (!confirmed) return;

    try {
      setDeletingId(serviceId);

      await api.delete(
        `/provider/services/${serviceId}`
      );

      setServices((prev) =>
        prev.filter(
          (service) =>
            service._id !== serviceId
        )
      );

      toast.success(
        "تم حذف الخدمة بنجاح"
      );
    } catch (error) {
      console.error(
        "Delete Service Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "حدث خطأ أثناء حذف الخدمة"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // Toggle status
  // =====================================================

  const handleToggleStatus = async (
    service
  ) => {
    try {
      setTogglingId(service._id);

      const response = await api.put(
        `/provider/services/${service._id}`,
        {
          isActive:
            !service.isActive,
        }
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "تعذر تغيير حالة الخدمة"
        );
      }

      const updatedService =
        response.data?.service;

      setServices((prev) =>
        prev.map((item) =>
          item._id === service._id
            ? updatedService
            : item
        )
      );

      toast.success(
        updatedService?.isActive
          ? "تم تفعيل الخدمة"
          : "تم إيقاف الخدمة"
      );
    } catch (error) {
      console.error(
        "Toggle Service Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "حدث خطأ أثناء تغيير حالة الخدمة"
      );
    } finally {
      setTogglingId(null);
    }
  };

  // =====================================================
  // Loading
  // =====================================================

  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-[70vh] items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">

          <Loader2
            size={32}
            className="animate-spin text-[#6B3038]"
          />

          <p className="text-sm text-[#6b5b5b]">
            جاري تحميل الخدمات...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // Unsupported provider type
  // =====================================================

  if (
    user?.serviceType &&
    !serviceConfig[user.serviceType]
  ) {
    return (
      <div
        dir="rtl"
        className="flex min-h-[70vh] items-center justify-center px-4"
      >
        <div className="max-w-md rounded-3xl border border-[#eadfd8] bg-white p-8 text-center shadow-sm">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#6B3038]">
            <PackageOpen size={30} />
          </div>

          <h2 className="text-xl font-bold text-[#2d2424]">
            هذا القسم غير متاح لهذا النشاط
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#8b7c7c]">
            نوع النشاط الحالي لا يعتمد على إدارة
            الخدمات العامة. سيتم تخصيص صفحة إدارة
            خاصة به.
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fffaf5] px-4 py-6 sm:px-6 lg:px-8"
    >

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            Header
        ================================================= */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-2 flex items-center gap-2">

              <span className="h-2 w-2 rounded-full bg-[#e5c28d]" />

              <span className="text-sm font-medium text-[#6B3038]">
                إدارة الخدمات
              </span>

            </div>

            <h1 className="text-2xl font-bold text-[#2d2424] sm:text-3xl">
              {currentConfig.label}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#786969]">
              {currentConfig.description}
            </p>

          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#6B3038] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#57262d] active:scale-[0.98]"
          >
            <Plus size={18} />

            إضافة {currentConfig.singular}
          </button>

        </div>

        {/* =================================================
            Search + Stats
        ================================================= */}

        <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto_auto]">

          {/* Search */}

          <div className="relative">

            <Search
              size={19}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9a8989]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder={`ابحث في ${currentConfig.label}...`}
              className="h-12 w-full rounded-2xl border border-[#eadfd8] bg-white pr-11 pl-4 text-sm text-[#2d2424] outline-none transition placeholder:text-[#a99b9b] focus:border-[#6B3038] focus:ring-2 focus:ring-[#6B3038]/10"
            />

          </div>

          {/* Total */}

          <div className="flex items-center gap-3 rounded-2xl border border-[#eadfd8] bg-white px-5 py-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8eee7] text-[#6B3038]">
              <PackageOpen size={19} />
            </div>

            <div>

              <p className="text-xs text-[#8d7e7e]">
                إجمالي الخدمات
              </p>

              <p className="mt-0.5 text-lg font-bold text-[#2d2424]">
                {services.length}
              </p>

            </div>

          </div>

          {/* Active */}

          <div className="flex items-center gap-3 rounded-2xl border border-[#eadfd8] bg-white px-5 py-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4eee5] text-[#6B3038]">
              <CheckCircle2 size={19} />
            </div>

            <div>

              <p className="text-xs text-[#8d7e7e]">
                الخدمات النشطة
              </p>

              <p className="mt-0.5 text-lg font-bold text-[#2d2424]">
                {
                  services.filter(
                    (item) =>
                      item.isActive
                  ).length
                }
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            Services
        ================================================= */}

        {filteredServices.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-[#ddcec6] bg-white px-6 py-16 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#6B3038]">
              <PackageOpen size={28} />
            </div>

            <h3 className="text-lg font-bold text-[#2d2424]">
              {search
                ? "لم يتم العثور على نتائج"
                : "لا توجد خدمات بعد"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#8b7c7c]">
              {search
                ? "جرّبي البحث باسم الخدمة أو الفئة."
                : `ابدئي بإضافة أول ${currentConfig.singular} ليظهر هنا.`}
            </p>

            {!search && (
              <button
                type="button"
                onClick={openAddModal}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6B3038] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#57262d]"
              >
                <Plus size={17} />

                إضافة {currentConfig.singular}
              </button>
            )}

          </div>

        ) : (

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

            {filteredServices.map(
              (service) => (

                <div
                  key={service._id}
                  className="group overflow-hidden rounded-3xl border border-[#eadfd8] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >

                  {/* Image */}

                  <div className="relative h-52 overflow-hidden bg-[#f8eee7]">

                    {service.image ? (

                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center">

                        <PackageOpen
                          size={40}
                          className="text-[#c4a9a0]"
                        />

                      </div>

                    )}

                    {/* Status */}

                    <div className="absolute right-4 top-4">

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${
                          service.isActive
                            ? "bg-white/90 text-[#496b50]"
                            : "bg-white/90 text-[#8b7070]"
                        }`}
                      >

                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            service.isActive
                              ? "bg-[#496b50]"
                              : "bg-[#8b7070]"
                          }`}
                        />

                        {service.isActive
                          ? "نشطة"
                          : "متوقفة"}

                      </span>

                    </div>

                  </div>

                  {/* Content */}

                  <div className="p-5">

                    <div className="mb-4">

                      <h3 className="line-clamp-1 text-lg font-bold text-[#2d2424]">
                        {service.name}
                      </h3>

                      {service.category && (
                        <p className="mt-1 text-xs font-medium text-[#6B3038]">
                          {service.category}
                        </p>
                      )}

                    </div>

                    <p className="mb-5 min-h-[48px] line-clamp-2 text-sm leading-6 text-[#7e7070]">
                      {service.description ||
                        "لا يوجد وصف لهذه الخدمة حاليًا."}
                    </p>

                    <div className="mb-5 flex items-center justify-between border-t border-[#f0e7e2] pt-4">

                      <div>

                        <p className="text-xs text-[#988989]">
                          السعر
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#6B3038]">
                          {Number(
                            service.price || 0
                          ).toLocaleString(
                            "ar"
                          )}{" "}
                          ₪
                        </p>

                      </div>

                      {service.duration && (
                        <div className="text-left">

                          <p className="text-xs text-[#988989]">
                            المدة
                          </p>

                          <p className="mt-1 text-sm font-semibold text-[#2d2424]">
                            {service.duration}
                          </p>

                        </div>
                      )}

                    </div>

                    {/* Actions */}

                    <div className="grid grid-cols-3 gap-2">

                      <button
                        type="button"
                        disabled={
                          togglingId ===
                          service._id
                        }
                        onClick={() =>
                          handleToggleStatus(
                            service
                          )
                        }
                        title={
                          service.isActive
                            ? "إيقاف الخدمة"
                            : "تفعيل الخدمة"
                        }
                        className="flex items-center justify-center rounded-xl border border-[#eadfd8] py-2.5 text-[#6B3038] transition hover:bg-[#f8eee7] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {togglingId ===
                        service._id ? (
                          <Loader2
                            size={17}
                            className="animate-spin"
                          />
                        ) : (
                          <Power
                            size={17}
                          />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            service
                          )
                        }
                        className="flex items-center justify-center rounded-xl border border-[#eadfd8] py-2.5 text-[#6B3038] transition hover:bg-[#f8eee7]"
                      >
                        <Pencil
                          size={17}
                        />
                      </button>

                      <button
                        type="button"
                        disabled={
                          deletingId ===
                          service._id
                        }
                        onClick={() =>
                          handleDelete(
                            service._id
                          )
                        }
                        className="flex items-center justify-center rounded-xl border border-red-100 py-2.5 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId ===
                        service._id ? (
                          <Loader2
                            size={17}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2
                            size={17}
                          />
                        )}
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}
      </div>

      {/* =================================================
          Modal
      ================================================= */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2424]/40 p-4 backdrop-blur-sm">

          <div
            className="absolute inset-0"
            onClick={closeModal}
          />

          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#fffaf5] shadow-2xl">

            {/* Header */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#eadfd8] bg-[#fffaf5]/95 px-5 py-4 backdrop-blur-md sm:px-7">

              <div>

                <p className="text-xs font-medium text-[#6B3038]">
                  {editingService
                    ? "تعديل الخدمة"
                    : "خدمة جديدة"}
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#2d2424]">
                  {editingService
                    ? `تعديل ${currentConfig.singular}`
                    : `إضافة ${currentConfig.singular}`}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#eadfd8] text-[#6f6060] transition hover:bg-white disabled:opacity-50"
              >
                <X size={19} />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5 sm:p-7"
            >

              {/* Name */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[#3c3030]">
                  اسم الخدمة
                  <span className="mr-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={`مثال: ${currentConfig.example}`}
                  className="h-12 w-full rounded-xl border border-[#e5d9d2] bg-white px-4 text-sm text-[#2d2424] outline-none transition placeholder:text-[#b2a5a5] focus:border-[#6B3038] focus:ring-2 focus:ring-[#6B3038]/10"
                />

              </div>

              {/* Category */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[#3c3030]">
                  التصنيف
                </label>

                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder={
                    user?.serviceType ===
                    "beauty"
                      ? "مثال: مكياج العروس"
                      : "مثال: تصوير حفلات"
                  }
                  className="h-12 w-full rounded-xl border border-[#e5d9d2] bg-white px-4 text-sm text-[#2d2424] outline-none transition placeholder:text-[#b2a5a5] focus:border-[#6B3038] focus:ring-2 focus:ring-[#6B3038]/10"
                />

              </div>

              {/* Description */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[#3c3030]">
                  وصف الخدمة
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="اكتبي وصفًا واضحًا ومختصرًا للخدمة..."
                  className="w-full resize-none rounded-xl border border-[#e5d9d2] bg-white px-4 py-3 text-sm leading-7 text-[#2d2424] outline-none transition placeholder:text-[#b2a5a5] focus:border-[#6B3038] focus:ring-2 focus:ring-[#6B3038]/10"
                />

              </div>

              {/* Price + Duration */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-[#3c3030]">
                    السعر
                  </label>

                  <div className="relative">

                    <input
                      type="number"
                      name="price"
                      min="0"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0"
                      className="h-12 w-full rounded-xl border border-[#e5d9d2] bg-white px-4 pl-14 text-sm text-[#2d2424] outline-none transition placeholder:text-[#b2a5a5] focus:border-[#6B3038] focus:ring-2 focus:ring-[#6B3038]/10"
                    />

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8c7d7d]">
                      ₪
                    </span>

                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-[#3c3030]">
                    المدة
                  </label>

                  <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="مثال: 4 ساعات"
                    className="h-12 w-full rounded-xl border border-[#e5d9d2] bg-white px-4 text-sm text-[#2d2424] outline-none transition placeholder:text-[#b2a5a5] focus:border-[#6B3038] focus:ring-2 focus:ring-[#6B3038]/10"
                  />

                </div>

              </div>

              {/* Image */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[#3c3030]">
                  رابط الصورة
                </label>

                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  dir="ltr"
                  className="h-12 w-full rounded-xl border border-[#e5d9d2] bg-white px-4 text-left text-sm text-[#2d2424] outline-none transition placeholder:text-[#b2a5a5] focus:border-[#6B3038] focus:ring-2 focus:ring-[#6B3038]/10"
                />

                <p className="mt-2 text-xs text-[#948585]">
                  رابط صورة الخدمة. سنربطه لاحقًا
                  برفع الصور مباشرة.
                </p>

              </div>

              {/* Preview */}

              {form.image && (
                <div className="overflow-hidden rounded-2xl border border-[#eadfd8] bg-white">

                  <img
                    src={form.image}
                    alt="معاينة"
                    className="h-48 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display =
                        "none";
                    }}
                  />

                </div>
              )}

              {/* Buttons */}

              <div className="flex flex-col-reverse gap-3 border-t border-[#eadfd8] pt-5 sm:flex-row">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="flex-1 rounded-xl border border-[#dfd2cb] bg-white px-5 py-3 text-sm font-semibold text-[#5d5050] transition hover:bg-[#f8eee7] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6B3038] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#57262d] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {saving ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <CheckCircle2
                        size={18}
                      />

                      {editingService
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

export default Services;

