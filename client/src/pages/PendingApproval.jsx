import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Clock3, ShieldCheck, ArrowRight, LogOut } from "lucide-react";

const PendingApproval = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#f8eee7]"
    >
      {/* Background Decorations */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#e5c28d]/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#6B3038]/10 blur-3xl" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-14">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6B3038] text-xl font-bold text-[#e5c28d] shadow-md transition-transform duration-300 group-hover:scale-105">
            ز
          </div>

          <span className="text-2xl font-bold tracking-wide text-[#6B3038]">
            زَفَاف
          </span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full border border-[#6B3038]/15 bg-white/70 px-5 py-2.5 text-sm font-medium text-[#6B3038] backdrop-blur-md transition-all hover:bg-white hover:shadow-md"
        >
          <LogOut size={17} />
          تسجيل الخروج
        </button>
      </header>

      {/* Main */}
      <main className="relative z-10 flex min-h-[calc(100vh-100px)] items-center justify-center px-5 py-10">
        <div className="w-full max-w-2xl">

          {/* Card */}
          <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/90 p-8 text-center shadow-[0_25px_80px_rgba(107,48,56,0.12)] backdrop-blur-xl sm:p-12">

            {/* Top decorative line */}
            <div className="absolute left-1/2 top-0 h-1 w-32 -translate-x-1/2 rounded-b-full bg-gradient-to-r from-[#6B3038] via-[#e5c28d] to-[#6B3038]" />

            {/* Icon */}
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#f8eee7]">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#6B3038] shadow-lg shadow-[#6B3038]/20">
                <Clock3
                  size={31}
                  strokeWidth={1.7}
                  className="animate-pulse text-[#e5c28d]"
                />

                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-[#e5c28d]" />
              </div>
            </div>

            {/* Title */}
            <div className="mb-4">
              <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-[#b58a50]">
                أهلاً بك في زَفَاف
              </p>

              <h1 className="text-3xl font-bold leading-tight text-[#2d2424] sm:text-4xl">
                حسابك قيد المراجعة
              </h1>
            </div>

            {/* Description */}
            <p className="mx-auto max-w-lg text-base leading-8 text-gray-500 sm:text-lg">
              تم إنشاء حساب نشاطك التجاري بنجاح.
              <br />
              يقوم فريق إدارة زَفَاف حاليًا بمراجعة بياناتك قبل تفعيل الحساب.
            </p>

            {/* Status */}
            <div className="mx-auto mt-8 flex max-w-md items-center gap-4 rounded-2xl border border-[#e5c28d]/40 bg-[#fdf8f3] p-4 text-right">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e5c28d]/20">
                <ShieldCheck
                  size={22}
                  className="text-[#6B3038]"
                />
              </div>

              <div>
                <p className="font-semibold text-[#2d2424]">
                  مراجعة الحساب
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  سيتم تفعيل حسابك بعد اعتماد بيانات النشاط التجاري من الإدارة.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-gray-100" />

            {/* Actions */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row">

              <button
                onClick={() => navigate("/")}
                className="group flex items-center justify-center gap-2 rounded-xl bg-[#6B3038] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#6B3038]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#57262d] hover:shadow-xl"
              >
                العودة إلى الصفحة الرئيسية

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 font-semibold text-gray-600 transition-all duration-300 hover:border-[#6B3038]/20 hover:bg-[#fdf8f3] hover:text-[#6B3038]"
              >
                <LogOut size={18} />
                تسجيل الخروج
              </button>

            </div>

            {/* Bottom note */}
            <p className="mt-7 text-xs leading-6 text-gray-400">
              شكرًا لاختيارك زَفَاف — يسعدنا انضمام نشاطك التجاري إلى منصتنا.
            </p>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-[#6B3038]/50">
            © {new Date().getFullYear()} زَفَاف — منصة خدمات الأفراح
          </p>
        </div>
      </main>
    </div>
  );
};

export default PendingApproval;