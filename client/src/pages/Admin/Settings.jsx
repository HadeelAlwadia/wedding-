import { useEffect, useState } from "react";
import {
  UserPlus,
  Users,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  X,
} from "lucide-react";

import {
  createAdminStaff,
  getAdminStaff,
} from "../../api/adminApi";

const AdminSettings = () => {
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [staff, setStaff] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // Get admin staff
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await getAdminStaff();
        setStaff(data);
      } catch (error) {
        console.error("Failed to fetch admin staff:", error);

        setMessage({
          type: "error",
          text:
            error.response?.data?.message ||
            "حدث خطأ أثناء جلب أعضاء الإدارة",
        });
      } finally {
        setLoadingStaff(false);
      }
    };

    fetchStaff();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({
      type: "",
      text: "",
    });

    try {
      setLoading(true);

      const data = await createAdminStaff(formData);

      // Add new admin immediately to the list
setStaff((prev) => [data.staff, ...prev]);
      setMessage({
        type: "success",
        text: "تم إنشاء عضو الإدارة بنجاح",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });

      setShowForm(false);
      setShowPassword(false);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "حدث خطأ أثناء إنشاء عضو الإدارة",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2d2424] md:text-3xl">
          الإعدادات
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          إدارة إعدادات فريق إدارة منصة زَفَاف
        </p>
      </div>

      {/* Admin Team Header */}
      <section className="rounded-3xl border border-[#eadbd1] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#6B3038]">
              <Users size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#2d2424]">
                فريق الإدارة
              </h2>

              <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500">
                إضافة وإدارة أعضاء فريق زَفَاف الذين لديهم صلاحية الوصول إلى
                لوحة الإدارة.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowForm(true);

              setMessage({
                type: "",
                text: "",
              });
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6B3038] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#55252c]"
          >
            <UserPlus size={18} />
            إضافة عضو إداري
          </button>
        </div>
      </section>

      {/* Message */}
      {message.text && (
        <div
          className={`rounded-2xl border p-4 text-sm font-medium ${
            message.type === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Admin Staff */}
      <section className="rounded-3xl border border-[#eadbd1] bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-[#2d2424]">
            أعضاء فريق الإدارة
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            جميع أعضاء الإدارة الذين لديهم صلاحية الوصول إلى لوحة التحكم.
          </p>
        </div>

        {loadingStaff ? (
          <div className="rounded-2xl bg-[#fffaf5] p-8 text-center text-sm text-gray-500">
            جاري تحميل أعضاء الإدارة...
          </div>
        ) : staff.length === 0 ? (
          <div className="rounded-2xl bg-[#fffaf5] p-8 text-center">
            <Users
              size={34}
              className="mx-auto text-[#6B3038]"
            />

            <p className="mt-3 font-semibold text-[#2d2424]">
              لا يوجد أعضاء إدارة حاليًا
            </p>

            <p className="mt-1 text-sm text-gray-500">
              يمكنك إضافة عضو جديد من خلال الزر أعلاه.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {staff.map((member) => (
              <div
                key={member._id}
                className="rounded-2xl border border-[#eadbd1] bg-[#fffaf5] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f8eee7] font-bold text-[#6B3038]">
                      {member.name?.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-bold text-[#2d2424]">
                        {member.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        عضو إدارة
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                    نشط
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />

                    <span dir="ltr">
                      {member.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={16} />

                    <span dir="ltr">
                      {member.phone}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add Admin Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#2d2424]">
                  إضافة عضو إداري
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  أنشئ حسابًا جديدًا لفريق إدارة زَفَاف.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-[#f8eee7] hover:text-[#6B3038]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2d2424]">
                  اسم العضو
                </label>

                <div className="relative">
                  <Users
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="مثال: سارة أحمد"
                    required
                    className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf5] py-3 pr-11 pl-4 text-sm outline-none transition focus:border-[#6B3038] focus:ring-2 focus:ring-[#6B3038]/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2d2424]">
                  البريد الإلكتروني
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@zafaf.com"
                    required
                    className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf5] py-3 pr-11 pl-4 text-sm outline-none transition focus:border-[#6B3038] focus:ring-2 focus:ring-[#6B3038]/10"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2d2424]">
                  رقم الهاتف
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="059xxxxxxx"
                    required
                    className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf5] py-3 pr-11 pl-4 text-sm outline-none transition focus:border-[#6B3038] focus:ring-2 focus:ring-[#6B3038]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#2d2424]">
                  كلمة المرور
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="كلمة مرور قوية"
                    minLength={6}
                    required
                    className="w-full rounded-xl border border-[#eadbd1] bg-[#fffaf5] py-3 pr-11 pl-12 text-sm outline-none transition focus:border-[#6B3038] focus:ring-2 focus:ring-[#6B3038]/10"
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

                <p className="mt-2 text-xs text-gray-400">
                  يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-[#eadbd1] px-5 py-3 text-sm font-semibold text-[#2d2424] transition hover:bg-[#fffaf5]"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-[#6B3038] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#55252c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "جاري الإنشاء..."
                    : "إنشاء الحساب"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;