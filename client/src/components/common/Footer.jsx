import { Link } from "react-router-dom";
import logo from '../../assets/logo.ico'

const Footer = () => {
  return (
    <footer className="bg-[#2d2424] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
  <a href="/" className="flex items-center gap-2">
    <img
      src={logo}
      alt="شعار هنا"
      className="h-10 w-10"
    />
  
    <span className="text-2xl font-bold text-[#6B3038]">
      هنا
    </span>
  </a>
            <p className="mt-5 max-w-sm text-sm leading-8 text-white/60">
              منصتك لاكتشاف كل ما تحتاجينه ليوم زفافك، من صالات الأفراح
              إلى أجمل تفاصيل إطلالتك.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
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
            </ul>
          </div>

          {/* Wedding Services */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              خدمات الزفاف
            </h3>

            <ul className="space-y-3 text-sm text-white/60">
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

          {/* Account */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              حسابك
            </h3>

            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link
                  to="/login"
                  className="transition hover:text-[#e5c28d]"
                >
                  تسجيل الدخول
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="transition hover:text-[#e5c28d]"
                >
                  إنشاء حساب
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} هنا. جميع الحقوق محفوظة.
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