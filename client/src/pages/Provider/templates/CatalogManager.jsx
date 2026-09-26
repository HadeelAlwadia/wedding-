
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  Image as ImageIcon,
  CheckCircle2,
  CircleOff,
  Package,
  CarFront,
  Shirt,
  SlidersHorizontal,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| Provider Catalog Configuration
|--------------------------------------------------------------------------
| نفس الصفحة تخدم:
| - فساتين العرائس
| - بدلات العرسان
| - سيارات الزفاف
|--------------------------------------------------------------------------
*/

const catalogConfig = {
  "bridal-dresses": {
    title: "فساتيني",
    singular: "فستان",
    description: "إدارة فساتين العرائس المتوفرة لديك",
    icon: Shirt,

    fields: [
      { key: "size", label: "المقاسات" },
      { key: "color", label: "اللون" },
      { key: "style", label: "التصميم" },
    ],

    filters: ["الكل", "متوفر", "غير متوفر"],
  },

  "groom-suits": {
    title: "بدلاتي",
    singular: "بدلة",
    description: "إدارة بدلات العرسان المتوفرة لديك",
    icon: Shirt,

    fields: [
      { key: "size", label: "المقاسات" },
      { key: "color", label: "اللون" },
      { key: "material", label: "الخامة" },
    ],

    filters: ["الكل", "متوفر", "غير متوفر"],
  },

  "wedding-cars": {
    title: "سياراتي",
    singular: "سيارة",
    description: "إدارة سيارات الزفاف المتوفرة لديك",
    icon: CarFront,

    fields: [
      { key: "model", label: "الموديل" },
      { key: "year", label: "السنة" },
      { key: "passengers", label: "عدد الركاب" },
    ],

    filters: ["الكل", "متوفر", "غير متوفر"],
  },
};

/*
|--------------------------------------------------------------------------
| Mock Data
|--------------------------------------------------------------------------
*/

const mockCatalog = {
  "bridal-dresses": [
    {
      id: 1,
      name: "فستان إليانا",
      price: 1800,
      image:
        "https://images.unsplash.com/photo-1594552072238-5c7d8a1c4c2f?auto=format&fit=crop&w=800&q=80",
      status: "available",
      size: "38 - 44",
      color: "أوف وايت",
      style: "كلاسيك",
    },
    {
      id: 2,
      name: "فستان لورين",
      price: 2200,
      image:
        "https://images.unsplash.com/photo-1519657337289-077653f724ed?auto=format&fit=crop&w=800&q=80",
      status: "available",
      size: "36 - 42",
      color: "أبيض",
      style: "فخم",
    },
    {
      id: 3,
      name: "فستان ليان",
      price: 1500,
      image:
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
      status: "unavailable",
      size: "40 - 44",
      color: "أبيض",
      style: "ناعم",
    },
  ],

  "groom-suits": [
    {
      id: 1,
      name: "بدلة Black Royal",
      price: 750,
      image:
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
      status: "available",
      size: "M - XXL",
      color: "أسود",
      material: "صوف",
    },
    {
      id: 2,
      name: "بدلة Classic Navy",
      price: 680,
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      status: "available",
      size: "M - XL",
      color: "كحلي",
      material: "صوف إيطالي",
    },
  ],

  "wedding-cars": [
    {
      id: 1,
      name: "Mercedes S-Class",
      price: 900,
      image:
        "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
      status: "available",
      model: "S-Class",
      year: "2024",
      passengers: "4",
    },
    {
      id: 2,
      name: "Range Rover Vogue",
      price: 750,
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80",
      status: "available",
      model: "Vogue",
      year: "2023",
      passengers: "5",
    },
  ],
};

const CatalogManager = ({ serviceType = "bridal-dresses" }) => {
  const config =
    catalogConfig[serviceType] || catalogConfig["bridal-dresses"];

  const Icon = config.icon;

  const [items, setItems] = useState(
    mockCatalog[serviceType] || []
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("الكل");

  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | Filter
  |--------------------------------------------------------------------------
  */

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "الكل" ||
        (filter === "متوفر" && item.status === "available") ||
        (filter === "غير متوفر" &&
          item.status === "unavailable");

      return matchesSearch && matchesFilter;
    });
  }, [items, search, filter]);

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "هل أنت متأكد من حذف هذا العنصر؟"
    );

    if (!confirmed) return;

    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );

    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Add
  |--------------------------------------------------------------------------
  */

  const handleAdd = () => {
    setEditingItem({
      id: null,
      name: "",
      price: "",
      image: "",
      status: "available",
      ...Object.fromEntries(
        config.fields.map((field) => [field.key, ""])
      ),
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Save
  |--------------------------------------------------------------------------
  */

  const handleSave = (e) => {
    e.preventDefault();

    if (!editingItem.name.trim()) {
      alert(`يرجى إدخال اسم ${config.singular}`);
      return;
    }

    if (editingItem.id) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? editingItem
            : item
        )
      );
    } else {
      setItems((prev) => [
        {
          ...editingItem,
          id: Date.now(),
        },
        ...prev,
      ]);
    }

    setEditingItem(null);
  };

  /*
  |--------------------------------------------------------------------------
  | Stats
  |--------------------------------------------------------------------------
  */

  const total = items.length;

  const available = items.filter(
    (item) => item.status === "available"
  ).length;

  const unavailable = items.filter(
    (item) => item.status === "unavailable"
  ).length;

  return (
    <div
      dir="rtl"
      className="space-y-7"
    >
      {/* =====================================================
          Header
      ===================================================== */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6B3038] text-[#e5c28d]">
              <Icon size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#2d2424]">
                {config.title}
              </h1>

              <p className="mt-1 text-sm text-[#8c7770]">
                {config.description}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#6B3038] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#57262d]"
        >
          <Plus size={18} />
          إضافة {config.singular}
        </button>
      </div>

      {/* =====================================================
          Stats
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title={`إجمالي ${config.title}`}
          value={total}
          icon={Package}
        />

        <StatCard
          title="متوفر"
          value={available}
          icon={CheckCircle2}
        />

        <StatCard
          title="غير متوفر"
          value={unavailable}
          icon={CircleOff}
        />
      </div>

      {/* =====================================================
          Search / Filter
      ===================================================== */}

      <div className="rounded-3xl border border-[#eadfd8] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a28f88]"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`ابحث عن ${config.singular}...`}
              className="w-full rounded-2xl border border-[#eadfd8] bg-[#fffaf5] py-3 pr-11 pl-4 text-sm outline-none transition focus:border-[#e5c28d]"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal
              size={17}
              className="text-[#8c7770]"
            />

            {config.filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  filter === item
                    ? "bg-[#6B3038] text-white"
                    : "bg-[#f8eee7] text-[#6B3038] hover:bg-[#efe0d7]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          Catalog
      ===================================================== */}

      {filteredItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#dfd0c8] bg-white py-20 text-center">
          <Package
            size={42}
            className="mx-auto mb-4 text-[#c8b4aa]"
          />

          <h3 className="text-lg font-bold text-[#2d2424]">
            لا توجد نتائج
          </h3>

          <p className="mt-2 text-sm text-[#8c7770]">
            جرّبي تغيير البحث أو الفلتر
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <CatalogCard
              key={item.id}
              item={item}
              config={config}
              onView={() => setSelectedItem(item)}
              onEdit={() => setEditingItem(item)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      )}

      {/* =====================================================
          Details Modal
      ===================================================== */}

      {selectedItem && (
        <DetailsModal
          item={selectedItem}
          config={config}
          onClose={() => setSelectedItem(null)}
          onEdit={() => {
            setEditingItem(selectedItem);
            setSelectedItem(null);
          }}
        />
      )}

      {/* =====================================================
          Add / Edit Modal
      ===================================================== */}

      {editingItem && (
        <EditModal
          item={editingItem}
          setItem={setEditingItem}
          config={config}
          onClose={() => setEditingItem(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Stat Card
|--------------------------------------------------------------------------
*/

const StatCard = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div className="rounded-3xl border border-[#eadfd8] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#8c7770]">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-[#2d2424]">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#6B3038]">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Catalog Card
|--------------------------------------------------------------------------
*/

const CatalogCard = ({
  item,
  config,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#eadfd8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Image */}

      <div className="relative h-64 overflow-hidden bg-[#f8eee7]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#b6a39b]">
            <ImageIcon size={40} />
          </div>
        )}

        <div
          className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold ${
            item.status === "available"
              ? "bg-white text-green-700"
              : "bg-white text-red-600"
          }`}
        >
          {item.status === "available"
            ? "متوفر"
            : "غير متوفر"}
        </div>
      </div>

      {/* Content */}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-[#2d2424]">
              {item.name}
            </h3>

            <p className="mt-1 text-sm text-[#8c7770]">
              {config.singular}
            </p>
          </div>

          <div className="text-left">
            <span className="text-lg font-bold text-[#6B3038]">
              {Number(item.price).toLocaleString()}
            </span>

            <span className="mr-1 text-xs text-[#8c7770]">
              ₪
            </span>
          </div>
        </div>

        {/* Attributes */}

        <div className="mt-4 grid grid-cols-2 gap-2">
          {config.fields.map((field) => (
            <div
              key={field.key}
              className="rounded-xl bg-[#fffaf5] px-3 py-2"
            >
              <p className="text-[11px] text-[#a28f88]">
                {field.label}
              </p>

              <p className="mt-1 truncate text-xs font-medium text-[#2d2424]">
                {item[field.key] || "—"}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}

        <div className="mt-5 flex items-center gap-2 border-t border-[#f0e7e2] pt-4">
          <button
            onClick={onView}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#f8eee7] py-2.5 text-xs font-bold text-[#6B3038] transition hover:bg-[#efe0d7]"
          >
            <Eye size={15} />
            عرض
          </button>

          <button
            onClick={onEdit}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#eadfd8] text-[#6B3038] transition hover:bg-[#f8eee7]"
            title="تعديل"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={onDelete}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 text-red-500 transition hover:bg-red-50"
            title="حذف"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Details Modal
|--------------------------------------------------------------------------
*/

const DetailsModal = ({
  item,
  config,
  onClose,
  onEdit,
}) => {
  return (
    <Modal onClose={onClose}>
      <div className="overflow-hidden rounded-[28px] bg-white">
        <div className="relative h-72">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#f8eee7]">
              <ImageIcon size={45} />
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#2d2424]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-[#8c7770]">
                {config.singular}
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#2d2424]">
                {item.name}
              </h2>
            </div>

            <div className="text-left">
              <span className="text-2xl font-bold text-[#6B3038]">
                {Number(item.price).toLocaleString()}
              </span>

              <span className="mr-1 text-sm text-[#8c7770]">
                ₪
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {config.fields.map((field) => (
              <div
                key={field.key}
                className="rounded-2xl bg-[#fffaf5] p-4"
              >
                <p className="text-xs text-[#a28f88]">
                  {field.label}
                </p>

                <p className="mt-1 font-bold text-[#2d2424]">
                  {item[field.key] || "—"}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={onEdit}
            className="mt-6 w-full rounded-2xl bg-[#6B3038] py-3 font-bold text-white transition hover:bg-[#57262d]"
          >
            تعديل {config.singular}
          </button>
        </div>
      </div>
    </Modal>
  );
};

/*
|--------------------------------------------------------------------------
| Edit Modal
|--------------------------------------------------------------------------
*/

const EditModal = ({
  item,
  setItem,
  config,
  onClose,
  onSave,
}) => {
  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={onSave}
        className="rounded-[28px] bg-white p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#2d2424]">
              {item.id
                ? `تعديل ${config.singular}`
                : `إضافة ${config.singular}`}
            </h2>

            <p className="mt-1 text-sm text-[#8c7770]">
              أدخل المعلومات الأساسية
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8eee7] text-[#6B3038]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <Input
            label={`اسم ${config.singular}`}
            value={item.name}
            onChange={(value) =>
              setItem({
                ...item,
                name: value,
              })
            }
          />

          <Input
            label="السعر"
            type="number"
            value={item.price}
            onChange={(value) =>
              setItem({
                ...item,
                price: value,
              })
            }
          />

          <Input
            label="رابط الصورة"
            value={item.image}
            onChange={(value) =>
              setItem({
                ...item,
                image: value,
              })
            }
          />

          {config.fields.map((field) => (
            <Input
              key={field.key}
              label={field.label}
              value={item[field.key] || ""}
              onChange={(value) =>
                setItem({
                  ...item,
                  [field.key]: value,
                })
              }
            />
          ))}

          <div>
            <label className="mb-2 block text-sm font-bold text-[#2d2424]">
              الحالة
            </label>

            <select
              value={item.status}
              onChange={(e) =>
                setItem({
                  ...item,
                  status: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-[#eadfd8] bg-[#fffaf5] px-4 py-3 text-sm outline-none focus:border-[#e5c28d]"
            >
              <option value="available">
                متوفر
              </option>

              <option value="unavailable">
                غير متوفر
              </option>
            </select>
          </div>
        </div>

        <div className="mt-7 flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-2xl bg-[#6B3038] py-3 font-bold text-white"
          >
            حفظ
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-[#f8eee7] px-6 py-3 font-bold text-[#6B3038]"
          >
            إلغاء
          </button>
        </div>
      </form>
    </Modal>
  );
};

/*
|--------------------------------------------------------------------------
| Input
|--------------------------------------------------------------------------
*/

const Input = ({
  label,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-[#2d2424]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-[#eadfd8] bg-[#fffaf5] px-4 py-3 text-sm outline-none transition focus:border-[#e5c28d]"
      />
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Modal
|--------------------------------------------------------------------------
*/

const Modal = ({
  children,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2d2424]/50 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default CatalogManager;

