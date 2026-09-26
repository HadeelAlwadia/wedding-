import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Bell,
  LogOut,
  Eye,
  EyeOff,
  ShieldCheck,
  Trash2,
  ChevronLeft,
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [accountForm, setAccountForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    reviews: true,
    messages: true,
    updates: true,
  });

  const [accountMessage, setAccountMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleAccountChange = (e) => {
    const { name, value } = e.target;

    setAccountForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();

    setAccountMessage("تم حفظ بيانات الحساب بنجاح ✨");

    setTimeout(() => {
      setAccountMessage("");
    }, 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    setPasswordMessage("");

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setPasswordMessage("يرجى تعبئة جميع حقول كلمة المرور.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordMessage(
        "كلمة المرور الجديدة يجب أن تحتوي على 8 أحرف على الأقل."
      );
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("كلمتا المرور غير متطابقتين.");
      return;
    }

    setPasswordMessage("تم تغيير كلمة المرور بنجاح ✨");

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      setPasswordMessage("");
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/auth/login", { replace: true });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="rounded-xl bg-[#f8eee7] p-2 text-[#6B3038]">
            <ShieldCheck size={20} />
          </div>

          <span className="text-sm font-medium text-[#9b8178]">
            الحساب والأمان
          </span>
        </div>

        <h1 className="text-2xl font-bold text-[#2d2424] md:text-3xl">
          الإعدادات
        </h1>

        <p className="mt-2 text-sm text-[#8c7770]">
          إدارة بيانات حسابك وإعدادات الأمان والإشعارات.
        </p>
      </div>

      {/* Account */}
      <section className="rounded-3xl border border-[#eadbd2] bg-white shadow-sm">
        <div className="border-b border-[#f0e5df] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#f8eee7] p-3 text-[#6B3038]">
              <User size={20} />
            </div>

            <div>
              <h2 className="font-bold text-[#2d2424]">
                معلومات الحساب
              </h2>

              <p className="mt-1 text-xs text-[#9b8178]">
                بيانات الحساب الأساسية
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAccountSubmit} className="p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#5d4a44]">
                اسم صاحب الحساب
              </label>

              <input
                type="text"
                name="name"
                value={accountForm.name}
                onChange={handleAccountChange}
                className="w-full rounded-xl border border-[#eadbd2] bg-[#fffaf7] px-4 py-3 text-sm text-[#2d2424] outline-none transition focus:border-[#b88a78] focus:ring-2 focus:ring-[#e5c28d]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#5d4a44]">
                البريد الإلكتروني
              </label>

              <input
                type="email"
                value={accountForm.email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-[#eadbd2] bg-[#f7f2ef] px-4 py-3 text-sm text-[#8c7770]"
              />

              <p className="mt-2 text-xs text-[#a9968e]">
                لا يمكن تغيير البريد الإلكتروني حاليًا.
              </p>
            </div>
          </div>

          {accountMessage && (
            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {accountMessage}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-[#6B3038] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#57262d]"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </section>

      {/* Password */}
      <section className="rounded-3xl border border-[#eadbd2] bg-white shadow-sm">
        <div className="border-b border-[#f0e5df] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#f8eee7] p-3 text-[#6B3038]">
              <Lock size={20} />
            </div>

            <div>
              <h2 className="font-bold text-[#2d2424]">
                تغيير كلمة المرور
              </h2>

              <p className="mt-1 text-xs text-[#9b8178]">
                احرص على استخدام كلمة مرور قوية.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-5 p-6">
          {/* Current password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#5d4a44]">
              كلمة المرور الحالية
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-xl border border-[#eadbd2] bg-[#fffaf7] px-4 py-3 pl-12 text-sm text-[#2d2424] outline-none transition focus:border-[#b88a78] focus:ring-2 focus:ring-[#e5c28d]/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9b8178]"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* New password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#5d4a44]">
                كلمة المرور الجديدة
              </label>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full rounded-xl border border-[#eadbd2] bg-[#fffaf7] px-4 py-3 pl-12 text-sm text-[#2d2424] outline-none transition focus:border-[#b88a78] focus:ring-2 focus:ring-[#e5c28d]/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword((prev) => !prev)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9b8178]"
                >
                  {showNewPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#5d4a44]">
                تأكيد كلمة المرور الجديدة
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full rounded-xl border border-[#eadbd2] bg-[#fffaf7] px-4 py-3 pl-12 text-sm text-[#2d2424] outline-none transition focus:border-[#b88a78] focus:ring-2 focus:ring-[#e5c28d]/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9b8178]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#fffaf5] p-4 text-xs leading-6 text-[#8c7770]">
            كلمة المرور القوية يجب أن تحتوي على 8 أحرف على الأقل،
            ويفضل أن تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز.
          </div>

          {passwordMessage && (
            <div
              className={`rounded-xl px-4 py-3 text-sm font-medium ${
                passwordMessage.includes("بنجاح")
                  ? "border border-green-200 bg-green-50 text-green-700"
                  : "border border-red-200 bg-red-50 text-red-600"
              }`}
            >
              {passwordMessage}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-[#6B3038] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#57262d]"
            >
              تغيير كلمة المرور
            </button>
          </div>
        </form>
      </section>

      {/* Notifications */}
      <section className="rounded-3xl border border-[#eadbd2] bg-white shadow-sm">
        <div className="border-b border-[#f0e5df] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#f8eee7] p-3 text-[#6B3038]">
              <Bell size={20} />
            </div>

            <div>
              <h2 className="font-bold text-[#2d2424]">
                الإشعارات
              </h2>

              <p className="mt-1 text-xs text-[#9b8178]">
                اختر الإشعارات التي تريد استقبالها.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#f0e5df]">
          <NotificationItem
            title="التقييمات الجديدة"
            description="إشعار عند وصول تقييم جديد لنشاطك."
            checked={notifications.reviews}
            onChange={() =>
              setNotifications((prev) => ({
                ...prev,
                reviews: !prev.reviews,
              }))
            }
          />

          <NotificationItem
            title="الرسائل والاستفسارات"
            description="إشعار عند وجود تفاعل أو استفسار جديد."
            checked={notifications.messages}
            onChange={() =>
              setNotifications((prev) => ({
                ...prev,
                messages: !prev.messages,
              }))
            }
          />

          <NotificationItem
            title="تحديثات زَفَاف"
            description="استقبال الأخبار والتحديثات المهمة."
            checked={notifications.updates}
            onChange={() =>
              setNotifications((prev) => ({
                ...prev,
                updates: !prev.updates,
              }))
            }
          />
        </div>
      </section>

      {/* Logout */}
      <section className="rounded-3xl border border-[#eadbd2] bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-[#f8eee7] p-3 text-[#6B3038]">
              <LogOut size={20} />
            </div>

            <div>
              <h2 className="font-bold text-[#2d2424]">
                تسجيل الخروج
              </h2>

              <p className="mt-1 text-sm text-[#8c7770]">
                تسجيل الخروج من حسابك على هذا الجهاز.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#6B3038] px-5 py-3 text-sm font-bold text-[#6B3038] transition hover:bg-[#6B3038] hover:text-white"
          >
            <LogOut size={17} />
            تسجيل الخروج
          </button>
        </div>
      </section>

      {/* Danger zone */}
      <section className="rounded-3xl border border-red-200 bg-red-50/40 shadow-sm">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-red-100 p-3 text-red-600">
              <Trash2 size={20} />
            </div>

            <div className="flex-1">
              <h2 className="font-bold text-red-700">
                منطقة الخطر
              </h2>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-red-600/80">
                حذف الحساب إجراء نهائي ولا يمكن التراجع عنه.
                سنضيف هذه الخاصية لاحقًا بعد تأكيد الهوية.
              </p>

              <button
                type="button"
                disabled
                className="mt-4 inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-400"
              >
                حذف الحساب
                <ChevronLeft size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const NotificationItem = ({
  title,
  description,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between gap-5 p-6">
      <div>
        <h3 className="text-sm font-bold text-[#2d2424]">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-[#8c7770]">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          checked ? "bg-[#6B3038]" : "bg-[#d9cbc4]"
        }`}
        aria-label={title}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
            checked ? "right-1" : "right-6"
          }`}
        />
      </button>
    </div>
  );
};

export default Settings;