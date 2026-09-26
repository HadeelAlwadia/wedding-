import { useEffect, useState } from "react";
import {
  Users,
  Clock3,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getAdminStats } from "../../api/adminApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProviders: 0,
    pending: 0,
    approved: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();

        setStats(data);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "إجمالي مقدمي الخدمات",
      value: stats.totalProviders,
      icon: Users,
      description: "جميع مقدمي الخدمات المسجلين",
    },
    {
      title: "طلبات قيد المراجعة",
      value: stats.pending,
      icon: Clock3,
      description: "طلبات تحتاج إلى مراجعة",
      link: "/admin/requests",
    },
    {
      title: "الحسابات المعتمدة",
      value: stats.approved,
      icon: CheckCircle2,
      description: "مقدمو الخدمات المعتمدون",
      link: "/admin/providers",
    },
  ];

  return (
    <div dir="rtl" className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2d2424] md:text-3xl">
          لوحة الإدارة
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          نظرة عامة على مقدمي الخدمات في منصة زَفَاف
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          const content = (
            <div className="group rounded-3xl border border-[#eadbd1] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-[#2d2424]">
                    {loading ? "..." : card.value}
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#6B3038]">
                  <Icon size={23} />
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                {card.description}
              </p>

              {card.link && (
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#6B3038]">
                  <span>عرض التفاصيل</span>
                  <ArrowLeft size={16} />
                </div>
              )}
            </div>
          );

          return card.link ? (
            <Link key={card.title} to={card.link}>
              {content}
            </Link>
          ) : (
            <div key={card.title}>{content}</div>
          );
        })}
      </div>

      {/* Pending Requests */}
      <div className="rounded-3xl border border-[#eadbd1] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#2d2424]">
              طلبات مقدمي الخدمات
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              راجع الطلبات الجديدة واعتمد الحسابات.
            </p>
          </div>

          <Link
            to="/admin/requests"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6B3038] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#55252c]"
          >
            مراجعة الطلبات
            <ArrowLeft size={17} />
          </Link>
        </div>

        {!loading && stats.pending > 0 && (
          <div className="mt-5 rounded-2xl bg-[#fffaf5] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8eee7] text-[#6B3038]">
                <Clock3 size={19} />
              </div>

              <div>
                <p className="font-semibold text-[#2d2424]">
                  لديك {stats.pending} طلب قيد المراجعة
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  يمكنك مراجعة الطلبات واعتمادها أو رفضها.
                </p>
              </div>
            </div>
          </div>
        )}

        {!loading && stats.pending === 0 && (
          <div className="mt-5 rounded-2xl bg-[#fffaf5] p-4 text-center text-sm text-gray-500">
            لا توجد طلبات قيد المراجعة حاليًا.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;