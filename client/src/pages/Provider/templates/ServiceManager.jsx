
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  Sparkles,
  CheckCircle2,
  CircleOff,
  Clock3,
  SlidersHorizontal,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| Beauty Service Configuration
|--------------------------------------------------------------------------
*/

const serviceConfig = {
  beauty: {
    title: "الخدمات",
    singular: "خدمة",
    description:
      "إدارة خدمات التجميل والأسعار والتفاصيل الخاصة بعملائك",
    icon: Sparkles,
  },
};

/*
|--------------------------------------------------------------------------
| Mock Data
|--------------------------------------------------------------------------
*/

const mockServices = {
  beauty: [
    {
      id: 1,
      name: "مكياج عروس",
      description:
        "مكياج عروس متكامل بتنسيق يناسب ملامح الوجه وإطلالة الزفاف.",
      price: 250,
      duration: "ساعتان",
      category: "مكياج",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
    },

    {
      id: 2,
      name: "تسريحة عروس",
      description:
        "تسريحة احترافية مع إمكانية اختيار الستايل المناسب للفستان.",
      price: 200,
      duration: "ساعة ونصف",
      category: "تسريحات",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
    },

    {
      id: 3,
      name: "مكياج وصيفات",
      description:
        "إطلالة ناعمة ومتناسقة للوصيفات والمناسبات الخاصة.",
      price: 120,
      duration: "ساعة",
      category: "مكياج",
      status: "available",
      image:
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80",
    },

    {
      id: 4,
      name: "عناية بالبشرة",
      description:
        "جلسة عناية وتنظيف للبشرة قبل المناسبة.",
      price: 100,
      duration: "45 دقيقة",
      category: "عناية",
      status: "unavailable",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
    },
  ],
};

const ServiceManager = ({
  serviceType = "beauty",
}) => {
  const config =
    serviceConfig[serviceType] ||
    serviceConfig.beauty;

  const Icon = config.icon;

  const [services, setServices] = useState(
    mockServices[serviceType] || []
  );

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("الكل");

  const [statusFilter, setStatusFilter] =
    useState("الكل");

  const [selectedService, setSelectedService] =
    useState(null);

  const [editingService, setEditingService] =
    useState(null);

  /*
  |--------------------------------------------------------------------------
  | Categories
  |--------------------------------------------------------------------------
  */

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        services
          .map((item) => item.category)
          .filter(Boolean)
      ),
    ];

    return ["الكل", ...uniqueCategories];
  }, [services]);

  /*
  |--------------------------------------------------------------------------
  | Filter
  |--------------------------------------------------------------------------
  */

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        service.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "الكل" ||
        service.category === category;

      const matchesStatus =
        statusFilter === "الكل" ||
        (statusFilter === "متوفر" &&
          service.status === "available") ||
        (statusFilter === "غير متوفر" &&
          service.status === "unavailable");

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    services,
    search,
    category,
    statusFilter,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Add
  |--------------------------------------------------------------------------
  */

  const handleAdd = () => {
    setEditingService({
      id: null,
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "",
      status: "available",
      image: "",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Save
  |--------------------------------------------------------------------------
  */

  const handleSave = (event) => {
    event.preventDefault();

    if (!editingService.name.trim()) {
      alert("يرجى إدخال اسم الخدمة");
      return;
    }

    if (editingService.id) {
      setServices((prev) =>
        prev.map((item) =>
          item.id === editingService.id
            ? editingService
            : item
        )
      );
    } else {
      setServices((prev) => [
        {
          ...editingService,
          id: Date.now(),
        },
        ...prev,
      ]);
    }

    setEditingService(null);
  };

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "هل أنت متأكد من حذف هذه الخدمة؟"
    );

    if (!confirmed) return;

    setServices((prev) =>
      prev.filter((item) => item.id !== id)
    );

    if (selectedService?.id === id) {
      setSelectedService(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Stats
  |--------------------------------------------------------------------------
  */

  const total = services.length;

  const available = services.filter(
    (item) => item.status === "available"
  ).length;

  const unavailable = services.filter(
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
          <div className="flex items-center gap-3">
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
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#6B3038] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#57262d]"
        >
          <Plus size={18} />
          إضافة خدمة
        </button>
      </div>

      {/* =====================================================
          Stats
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="إجمالي الخدمات"
          value={total}
          icon={Sparkles}
        />

        <StatCard
          title="متوفرة"
          value={available}
          icon={CheckCircle2}
        />

        <StatCard
          title="غير متوفرة"
          value={unavailable}
          icon={CircleOff}
        />
      </div>

      {/* =====================================================
          Filters
      ===================================================== */}

      <div className="rounded-3xl border border-[#eadfd8] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* Search */}

          <div className="relative">
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a28f88]"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="ابحث عن خدمة..."
              className="w-full rounded-2xl border border-[#eadfd8] bg-[#fffaf5] py-3 pr-11 pl-4 text-sm outline-none transition focus:border-[#e5c28d]"
            />
          </div>

          {/* Category */}

          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal
              size={17}
              className="text-[#8c7770]"
            />

            {categories.map((item) => (
              <button
                key={item}
                onClick={() =>
                  setCategory(item)
                }
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  category === item
                    ? "bg-[#6B3038] text-white"
                    : "bg-[#f8eee7] text-[#6B3038] hover:bg-[#efe0d7]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Status */}

          <div className="flex flex-wrap gap-2">
            {[
              "الكل",
              "متوفر",
              "غير متوفر",
            ].map((item) => (
              <button
                key={item}
                onClick={() =>
                  setStatusFilter(item)
                }
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  statusFilter === item
                    ? "bg-[#2d2424] text-white"
                    : "border border-[#eadfd8] text-[#6B3038] hover:bg-[#f8eee7]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          Services
      ===================================================== */}

      {filteredServices.length === 0 ? (
        <EmptyState
          onAdd={handleAdd}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredServices.map(
            (service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onView={() =>
                  setSelectedService(
                    service
                  )
                }
                onEdit={() =>
                  setEditingService(
                    service
                  )
                }
                onDelete={() =>
                  handleDelete(
                    service.id
                  )
                }
              />
            )
          )}
        </div>
      )}

      {/* =====================================================
          Details
      ===================================================== */}

      {selectedService && (
        <ServiceDetails
          service={selectedService}
          onClose={() =>
            setSelectedService(null)
          }
          onEdit={() => {
            setEditingService(
              selectedService
            );

            setSelectedService(null);
          }}
        />
      )}

      {/* =====================================================
          Form
      ===================================================== */}

      {editingService && (
        <ServiceForm
          service={editingService}
          setService={setEditingService}
          onClose={() =>
            setEditingService(null)
          }
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
| Service Card
|--------------------------------------------------------------------------
*/

const ServiceCard = ({
  service,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#eadfd8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Image */}

      <div className="relative h-56 overflow-hidden bg-[#f8eee7]">
        {service.image ? (
          <img
            src={service.image}
            alt={service.name}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#b6a39b]">
            <Sparkles size={42} />
          </div>
        )}

        <div className="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#6B3038]">
          {service.category ||
            "خدمة تجميل"}
        </div>

        <div
          className={`absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold ${
            service.status ===
            "available"
              ? "text-green-700"
              : "text-red-600"
          }`}
        >
          {service.status ===
          "available"
            ? "متوفرة"
            : "غير متوفرة"}
        </div>
      </div>

      {/* Content */}

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-[#2d2424]">
              {service.name}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#8c7770]">
              {service.description}
            </p>
          </div>

          <div className="shrink-0 text-left">
            <span className="text-lg font-bold text-[#6B3038]">
              {Number(
                service.price || 0
              ).toLocaleString()}
            </span>

            <span className="mr-1 text-xs text-[#8c7770]">
              ₪
            </span>
          </div>
        </div>

        {/* Duration */}

        <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#fffaf5] px-3 py-2.5">
          <Clock3
            size={16}
            className="text-[#6B3038]"
          />

          <div>
            <p className="text-[11px] text-[#a28f88]">
              مدة الخدمة
            </p>

            <p className="text-xs font-semibold text-[#2d2424]">
              {service.duration ||
                "غير محددة"}
            </p>
          </div>
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
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={onDelete}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 text-red-500 transition hover:bg-red-50"
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

const ServiceDetails = ({
  service,
  onClose,
  onEdit,
}) => {
  return (
    <Modal onClose={onClose}>
      <div className="overflow-hidden rounded-[28px] bg-white">
        <div className="relative h-72">
          {service.image ? (
            <img
              src={service.image}
              alt={service.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#f8eee7]">
              <Sparkles size={45} />
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
              <span className="rounded-full bg-[#f8eee7] px-3 py-1 text-xs font-bold text-[#6B3038]">
                {service.category ||
                  "خدمة"}
              </span>

              <h2 className="mt-3 text-2xl font-bold text-[#2d2424]">
                {service.name}
              </h2>
            </div>

            <div className="text-left">
              <span className="text-2xl font-bold text-[#6B3038]">
                {Number(
                  service.price || 0
                ).toLocaleString()}
              </span>

              <span className="mr-1 text-sm text-[#8c7770]">
                ₪
              </span>
            </div>
          </div>

          <p className="mt-5 leading-7 text-[#6f5d56]">
            {service.description ||
              "لا يوجد وصف للخدمة."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#fffaf5] p-4">
              <div className="flex items-center gap-2 text-[#6B3038]">
                <Clock3 size={16} />

                <span className="text-xs text-[#8c7770]">
                  المدة
                </span>
              </div>

              <p className="mt-2 font-bold text-[#2d2424]">
                {service.duration ||
                  "غير محددة"}
              </p>
            </div>

            <div className="rounded-2xl bg-[#fffaf5] p-4">
              <span className="text-xs text-[#8c7770]">
                الحالة
              </span>

              <p className="mt-2 font-bold text-[#2d2424]">
                {service.status ===
                "available"
                  ? "متوفرة"
                  : "غير متوفرة"}
              </p>
            </div>
          </div>

          <button
            onClick={onEdit}
            className="mt-6 w-full rounded-2xl bg-[#6B3038] py-3 font-bold text-white transition hover:bg-[#57262d]"
          >
            تعديل الخدمة
          </button>
        </div>
      </div>
    </Modal>
  );
};

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
*/

const ServiceForm = ({
  service,
  setService,
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
              {service.id
                ? "تعديل الخدمة"
                : "إضافة خدمة"}
            </h2>

            <p className="mt-1 text-sm text-[#8c7770]">
              أدخل تفاصيل الخدمة
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
            label="اسم الخدمة"
            value={service.name}
            onChange={(value) =>
              setService({
                ...service,
                name: value,
              })
            }
          />

          <div>
            <label className="mb-2 block text-sm font-bold text-[#2d2424]">
              وصف الخدمة
            </label>

            <textarea
              value={
                service.description
              }
              onChange={(e) =>
                setService({
                  ...service,
                  description:
                    e.target.value,
                })
              }
              rows={3}
              className="w-full resize-none rounded-2xl border border-[#eadfd8] bg-[#fffaf5] px-4 py-3 text-sm outline-none transition focus:border-[#e5c28d]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="السعر"
              type="number"
              value={service.price}
              onChange={(value) =>
                setService({
                  ...service,
                  price: value,
                })
              }
            />

            <Input
              label="المدة"
              placeholder="مثال: ساعتان"
              value={service.duration}
              onChange={(value) =>
                setService({
                  ...service,
                  duration: value,
                })
              }
            />
          </div>

          <Input
            label="التصنيف"
            placeholder="مثال: مكياج"
            value={service.category}
            onChange={(value) =>
              setService({
                ...service,
                category: value,
              })
            }
          />

          <Input
            label="رابط صورة الخدمة"
            value={service.image}
            onChange={(value) =>
              setService({
                ...service,
                image: value,
              })
            }
          />

          <div>
            <label className="mb-2 block text-sm font-bold text-[#2d2424]">
              حالة الخدمة
            </label>

            <select
              value={service.status}
              onChange={(e) =>
                setService({
                  ...service,
                  status:
                    e.target.value,
                })
              }
              className="w-full rounded-2xl border border-[#eadfd8] bg-[#fffaf5] px-4 py-3 text-sm outline-none focus:border-[#e5c28d]"
            >
              <option value="available">
                متوفرة
              </option>

              <option value="unavailable">
                غير متوفرة
              </option>
            </select>
          </div>
        </div>

        <div className="mt-7 flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-2xl bg-[#6B3038] py-3 font-bold text-white transition hover:bg-[#57262d]"
          >
            حفظ الخدمة
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
  placeholder = "",
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
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-2xl border border-[#eadfd8] bg-[#fffaf5] px-4 py-3 text-sm outline-none transition focus:border-[#e5c28d]"
      />
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Empty State
|--------------------------------------------------------------------------
*/

const EmptyState = ({
  onAdd,
}) => {
  return (
    <div className="rounded-3xl border border-dashed border-[#dfd0c8] bg-white py-20 text-center">
      <Sparkles
        size={42}
        className="mx-auto mb-4 text-[#c8b4aa]"
      />

      <h3 className="text-lg font-bold text-[#2d2424]">
        لا توجد خدمات
      </h3>

      <p className="mt-2 text-sm text-[#8c7770]">
        ابدئي بإضافة أول خدمة للصالون
      </p>

      <button
        onClick={onAdd}
        className="mt-5 rounded-2xl bg-[#6B3038] px-5 py-3 text-sm font-bold text-white"
      >
        إضافة خدمة
      </button>
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
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        {children}
      </div>
    </div>
  );
};

export default ServiceManager;

