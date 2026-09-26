
import { Link } from "react-router-dom";
import logo from "../../assets/logo.ico";

const Footer = () => {
  return (
    <footer
      dir="rtl"
      className="bg-[#2d2424] text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* =========================
              BRAND
          ========================= */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <img
                src={logo}
                alt="شعار زَفَاف"
                className="h-10 w-10 object-contain"
              />

              <span className="text-2xl font-bold text-white">
                زَفَاف
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-8 text-white/60">
              منصتك لاكتشاف خدمات الزفاف في مكان واحد،
              حتى تشوفي الخيارات وتقارني وتتواصلي قبل الزيارة.
            </p>
          </div>

          {/* =========================
              DISCOVER
          ========================= */}
          <div>
            <h3 className="mb-5 text-base font-semibold">
              اكتشفي
            </h3>

            <ul className="space-y-3 text-sm text-white/60">

              <li>
                <Link
                  to="/halls"
                  className="transition hover:text-[#e5c28d]"
                >
                  صالات الأفراح
                </Link>
              </li>

              <li>
                <Link
                  to="/beauty"
                  className="transition hover:text-[#e5c28d]"
                >
                  الكوافيرات والتجميل
                </Link>
              </li>

              <li>
                <Link
                  to="/bridal-dresses"
                  className="transition hover:text-[#e5c28d]"
                >
                  فساتين العرائس
                </Link>
              </li>

              <li>
                <Link
                  to="/groom-suits"
                  className="transition hover:text-[#e5c28d]"
                >
                  بدلات العرسان
                </Link>
              </li>

              <li>
                <Link
                  to="/photographers"
                  className="transition hover:text-[#e5c28d]"
                >
                  المصورين
                </Link>
              </li>

              <li>
                <Link
                  to="/wedding-cars"
                  className="transition hover:text-[#e5c28d]"
                >
                  سيارات الزفاف
                </Link>
              </li>

            </ul>
          </div>

          {/* =========================
              PLAN
          ========================= */}
          <div>
            <h3 className="mb-5 text-base font-semibold">
              خططي لفرحك
            </h3>

            <ul className="space-y-3 text-sm text-white/60">

              <li>
                <Link
                  to="/wedding-assistant"
                  className="transition hover:text-[#e5c28d]"
                >
                  مساعد زَفَاف
                </Link>
              </li>

              <li>
                <Link
                  to="/wedding-look"
                  className="transition hover:text-[#e5c28d]"
                >
                  نسّقي إطلالتك
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="transition hover:text-[#e5c28d]"
                >
                  كيف يساعدك زَفَاف؟
                </Link>
              </li>

            </ul>
          </div>

          {/* =========================
              PROVIDERS
          ========================= */}
          <div>
            <h3 className="mb-5 text-base font-semibold">
              لمقدمي الخدمات
            </h3>

            <ul className="space-y-3 text-sm text-white/60">

              <li>
                <Link
                  to="/auth/register"
                  className="transition hover:text-[#e5c28d]"
                >
                  أضيفي خدمتك على زَفَاف
                </Link>
              </li>

              <li>
                <Link
                  to="/auth/login"
                  className="transition hover:text-[#e5c28d]"
                >
                  تسجيل الدخول
                </Link>
              </li>

            </ul>
          </div>

        </div>

        {/* =========================
            BOTTOM
        ========================= */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/40 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} زَفَاف. جميع الحقوق محفوظة.
          </p>

          <p>
            صُنع بحب لتسهيل رحلة زفافك 🤍
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;

