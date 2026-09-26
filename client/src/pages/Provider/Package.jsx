import {
  Check,
  Edit3,
  Loader2,
  MoreHorizontal,
  Package,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import api from "../../api/api";

const Packages = () => {
  // =========================================================
  // State
  // =========================================================

  const [packages, setPackages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    services: [],
    isActive: true,
  });

  const [newService, setNewService] = useState("");

  // =========================================================
  // Get Packages
  // =========================================================

  const getPackages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/provider/packages");

      setPackages(response.data.packages || []);
    } catch (error) {
      console.error("Get Packages Error:", error);

      setError(
        error.response?.data?.message ||
          "حدث خطأ أثناء جلب الباقات"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // Initial Load
  // =========================================================

  useEffect(() => {
    getPackages();
  }, []);

  // =========================================================
  // Start Edit
  // =========================================================

  const handleEdit = (item) => {
    setEditingId(item._id);

    setEditForm({
      name: item.name || "",
      description: item.description || "",
      price: item.price ?? "",
      services: item.services || [],
      isActive: item.isActive ?? true,
    });

    setNewService("");
  };

  // =========================================================
  // Cancel Edit
  // =========================================================

  const handleCancelEdit = () => {
    setEditingId(null);

    setEditForm({
      name: "",
      description: "",
      price: "",
      services: [],
      isActive: true,
    });

    setNewService("");
  };

  // =========================================================
  // Handle Edit Change
  // =========================================================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // Add Service
  // =========================================================

  const handleAddService = () => {
    const service = newService.trim();

    if (!service) return;

    if (editForm.services.includes(service)) {
      setNewService("");
      return;
    }

    setEditForm((prev) => ({
      ...prev,
      services: [...prev.services, service],
    }));

    setNewService("");
  };

  // =========================================================
  // Remove Service
  // =========================================================

  const handleRemoveService = (index) => {
    setEditForm((prev) => ({
      ...prev,
      services: prev.services.filter(
        (_, serviceIndex) => serviceIndex !== index
      ),
    }));
  };

  // =========================================================
  // Save Edit
  // =========================================================

  const handleSaveEdit = async () => {
    if (!editForm.name.trim()) {
      setError("اسم الباقة مطلوب");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await api.put(
        `/provider/packages/${editingId}`,
        {
          name: editForm.name.trim(),
          description: editForm.description,
          price: Number(editForm.price) || 0,
          services: editForm.services,
          isActive: editForm.isActive,
        }
      );

      const updatedPackage = response.data.package;

      setPackages((prev) =>
        prev.map((item) =>
          item._id === editingId
            ? updatedPackage
            : item
        )
      );

      handleCancelEdit();
    } catch (error) {
      console.error("Update Package Error:", error);

      setError(
        error.response?.data?.message ||
          "حدث خطأ أثناء تعديل الباقة"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // Delete Package
  // =========================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "هل أنت متأكد من حذف هذه الباقة؟"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      await api.delete(`/provider/packages/${id}`);

      setPackages((prev) =>
        prev.filter((item) => item._id !== id)
      );

      if (editingId === id) {
        handleCancelEdit();
      }
    } catch (error) {
      console.error("Delete Package Error:", error);

      setError(
        error.response?.data?.message ||
          "حدث خطأ أثناء حذف الباقة"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================================
  // Add New Package
  // =========================================================

  const handleAddPackage = async () => {
    try {
      setSaving(true);
      setError("");

      const response = await api.post(
        "/provider/packages",
        {
          name: "باقة جديدة",
          description: "",
          price: 0,
          services: [],
          isActive: true,
        }
      );

      const newPackage = response.data.package;

      setPackages((prev) => [
        newPackage,
        ...prev,
      ]);

      // مباشرة ندخل الباقة الجديدة في وضع التعديل
      handleEdit(newPackage);
    } catch (error) {
      console.error("Create Package Error:", error);

      setError(
        error.response?.data?.message ||
          "حدث خطأ أثناء إنشاء الباقة"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // Statistics
  // =========================================================

  const activePackages = packages.filter(
    (item) => item.isActive
  ).length;

  const inactivePackages = packages.filter(
    (item) => !item.isActive
  ).length;

  // =========================================================
  // Loading
  // =========================================================

  if (loading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#fbf8f5] p-6"
      >
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2
              size={34}
              className="animate-spin text-[#6B3038]"
            />

            <p className="text-sm text-[#6b625f]">
              جاري تحميل الباقات...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // Page
  // =========================================================

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fbf8f5] p-4 sm:p-6 lg:p-8"
    >
      {/* =====================================================
          Header
      ===================================================== */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[#6B3038]">
            <Package size={20} />

            <span className="text-sm font-medium">
              إدارة الباقات
            </span>
          </div>

          <h1 className="text-2xl font-bold text-[#2d2424] sm:text-3xl">
            الباقات
          </h1>

          <p className="mt-2 text-sm text-[#786f6b]">
            أنشئ وأدر الباقات التي تقدمها لعملائك.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddPackage}
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6B3038] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#57262d] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {saving ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <Plus size={18} />
          )}

          إضافة باقة
        </button>
      </div>

      {/* =====================================================
          Error
      ===================================================== */}

      {error && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            className="shrink-0"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* =====================================================
          Statistics
      ===================================================== */}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#eee5df] bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-[#786f6b]">
              إجمالي الباقات
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8eee7] text-[#6B3038]">
              <Package size={19} />
            </div>
          </div>

          <p className="text-2xl font-bold text-[#2d2424]">
            {packages.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#eee5df] bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-[#786f6b]">
              الباقات النشطة
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
              <Check size={19} />
            </div>
          </div>

          <p className="text-2xl font-bold text-[#2d2424]">
            {activePackages}
          </p>
        </div>

        <div className="rounded-2xl border border-[#eee5df] bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-[#786f6b]">
              غير النشطة
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <MoreHorizontal size={19} />
            </div>
          </div>

          <p className="text-2xl font-bold text-[#2d2424]">
            {inactivePackages}
          </p>
        </div>
      </div>

      {/* =====================================================
          Empty State
      ===================================================== */}

      {packages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#ddcec5] bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#6B3038]">
            <Package size={28} />
          </div>

          <h2 className="text-lg font-bold text-[#2d2424]">
            لا توجد باقات حتى الآن
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#786f6b]">
            أضف أول باقة للخدمة التي تقدمها ليتمكن
            العملاء من التعرف عليها.
          </p>

          <button
            type="button"
            onClick={handleAddPackage}
            disabled={saving}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6B3038] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#57262d]"
          >
            <Plus size={18} />
            إضافة أول باقة
          </button>
        </div>
      ) : (
        /* ===================================================
           Packages
        =================================================== */

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {packages.map((item) => {
            const isEditing =
              editingId === item._id;

            if (isEditing) {
              return (
                <div
                  key={item._id}
                  className="rounded-2xl border border-[#e5c28d] bg-white p-5 shadow-sm lg:col-span-2"
                >
                  {/* Edit Header */}

                  <div className="mb-6 flex items-center justify-between border-b border-[#eee5df] pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-[#2d2424]">
                        تعديل الباقة
                      </h2>

                      <p className="mt-1 text-xs text-[#786f6b]">
                        عدّل بيانات الباقة ثم احفظ التغييرات.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      disabled={saving}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f8eee7] text-[#6B3038] transition hover:bg-[#eee0d7]"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Edit Form */}

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* Name */}

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#403836]">
                        اسم الباقة
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        placeholder="مثال: الباقة الذهبية"
                        className="w-full rounded-xl border border-[#e1d6d0] bg-[#fffaf5] px-4 py-3 text-sm text-[#2d2424] outline-none transition focus:border-[#6B3038]"
                      />
                    </div>

                    {/* Price */}

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#403836]">
                        السعر
                      </label>

                      <div className="relative">
                        <input
                          type="number"
                          name="price"
                          min="0"
                          value={editForm.price}
                          onChange={handleEditChange}
                          placeholder="0"
                          className="w-full rounded-xl border border-[#e1d6d0] bg-[#fffaf5] px-4 py-3 pl-12 text-sm text-[#2d2424] outline-none transition focus:border-[#6B3038]"
                        />

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#786f6b]">
                          ₪
                        </span>
                      </div>
                    </div>

                    {/* Description */}

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-[#403836]">
                        وصف الباقة
                      </label>

                      <textarea
                        name="description"
                        value={editForm.description}
                        onChange={handleEditChange}
                        rows={4}
                        placeholder="اكتب وصفًا مختصرًا للباقة..."
                        className="w-full resize-none rounded-xl border border-[#e1d6d0] bg-[#fffaf5] px-4 py-3 text-sm text-[#2d2424] outline-none transition focus:border-[#6B3038]"
                      />
                    </div>

                    {/* Status */}

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#403836]">
                        حالة الباقة
                      </label>

                      <select
                        value={
                          editForm.isActive
                            ? "active"
                            : "inactive"
                        }
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            isActive:
                              e.target.value ===
                              "active",
                          }))
                        }
                        className="w-full rounded-xl border border-[#e1d6d0] bg-[#fffaf5] px-4 py-3 text-sm text-[#2d2424] outline-none focus:border-[#6B3038]"
                      >
                        <option value="active">
                          نشطة
                        </option>

                        <option value="inactive">
                          غير نشطة
                        </option>
                      </select>
                    </div>

                    {/* Services */}

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-[#403836]">
                        الخدمات الموجودة داخل الباقة
                      </label>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newService}
                          onChange={(e) =>
                            setNewService(
                              e.target.value
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddService();
                            }
                          }}
                          placeholder="أضف خدمة..."
                          className="flex-1 rounded-xl border border-[#e1d6d0] bg-[#fffaf5] px-4 py-3 text-sm text-[#2d2424] outline-none transition focus:border-[#6B3038]"
                        />

                        <button
                          type="button"
                          onClick={handleAddService}
                          className="rounded-xl bg-[#f8eee7] px-4 text-[#6B3038] transition hover:bg-[#eee0d7]"
                        >
                          <Plus size={19} />
                        </button>
                      </div>

                      {editForm.services.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {editForm.services.map(
                            (service, index) => (
                              <div
                                key={`${service}-${index}`}
                                className="flex items-center gap-2 rounded-lg bg-[#f8eee7] px-3 py-2 text-xs font-medium text-[#6B3038]"
                              >
                                <span>{service}</span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveService(
                                      index
                                    )
                                  }
                                  className="text-[#6B3038] transition hover:text-red-600"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Edit Actions */}

                  <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#eee5df] pt-5 sm:flex-row sm:justify-start">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      disabled={saving}
                      className="rounded-xl border border-[#ddd1cb] px-5 py-3 text-sm font-medium text-[#5f5652] transition hover:bg-[#faf6f3]"
                    >
                      إلغاء
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      disabled={saving}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#6B3038] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#57262d] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? (
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                      ) : (
                        <Save size={17} />
                      )}

                      حفظ التعديلات
                    </button>
                  </div>
                </div>
              );
            }

            // =================================================
            // Normal Package Card
            // =================================================

            return (
              <div
                key={item._id}
                className="group rounded-2xl border border-[#eee5df] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Card Header */}

                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8eee7] text-[#6B3038]">
                      <Package size={22} />
                    </div>

                    <div>
                      <h2 className="font-bold text-[#2d2424]">
                        {item.name}
                      </h2>

                      <span
                        className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          item.isActive
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.isActive
                          ? "نشطة"
                          : "غير نشطة"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(item)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-[#786f6b] transition hover:bg-[#f8eee7] hover:text-[#6B3038]"
                      title="تعديل"
                    >
                      <Edit3 size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(item._id)
                      }
                      disabled={
                        deletingId === item._id
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-[#786f6b] transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      title="حذف"
                    >
                      {deletingId === item._id ? (
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Description */}

                {item.description && (
                  <p className="mb-5 line-clamp-2 text-sm leading-6 text-[#786f6b]">
                    {item.description}
                  </p>
                )}

                {/* Price */}

                <div className="mb-5 rounded-xl bg-[#fffaf5] p-4">
                  <span className="text-xs text-[#786f6b]">
                    سعر الباقة
                  </span>

                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#6B3038]">
                      {Number(
                        item.price || 0
                      ).toLocaleString("en-US")}
                    </span>

                    <span className="text-sm text-[#786f6b]">
                      ₪
                    </span>
                  </div>
                </div>

                {/* Services */}

                <div>
                  <h3 className="mb-3 text-sm font-semibold text-[#403836]">
                    الخدمات
                  </h3>

                  {item.services?.length > 0 ? (
                    <div className="space-y-2">
                      {item.services.map(
                        (service, index) => (
                          <div
                            key={`${service}-${index}`}
                            className="flex items-center gap-2 text-sm text-[#665d59]"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038]">
                              <Check size={12} />
                            </span>

                            <span>{service}</span>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-[#9a918d]">
                      لا توجد خدمات مضافة لهذه الباقة.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Packages;