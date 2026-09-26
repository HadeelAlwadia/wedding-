import { useEffect, useState } from "react";
import {
  Users,
  Search,
  CheckCircle2,
  Clock3,
  Phone,
  Mail,
} from "lucide-react";
import { getProviders } from "../../api/adminApi";

const AdminProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await getProviders();
        setProviders(data);
      } catch (error) {
        console.error("Failed to fetch providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const filteredProviders = providers.filter((provider) => {
    const searchValue = search.toLowerCase();

    return (
      provider.name?.toLowerCase().includes(searchValue) ||
      provider.email?.toLowerCase().includes(searchValue) ||
      provider.serviceType?.toLowerCase().includes(searchValue)
    );
  });

  const serviceLabels = {
    hall: "قاعات أفراح",
    beauty: "صالونات وتجميل",
    "bridal-dresses": "فساتين زفاف",
    "groom-suits": "بدلات رجالية",
    photographers: "تصوير",
    "wedding-cars": "سيارات أفراح",
  };

  return (
    <div dir="rtl" className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#6B3038]">
            <Users size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#2d2424] md:text-3xl">
              مقدمو الخدمات
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              جميع مقدمي الخدمات المسجلين في منصة زَفَاف
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-3xl border border-[#eadbd1] bg-white p-5 shadow-sm">
        <div className="relative">
          <Search
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="ابحث باسم مقدم الخدمة أو البريد الإلكتروني..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-[#fffaf5] py-3 pr-12 pl-4 text-sm outline-none transition focus:border-[#6B3038]"
          />
        </div>
      </div>

      {/* Providers */}
      <div className="rounded-3xl border border-[#eadbd1] bg-white shadow-sm">
        <div className="border-b border-[#eee2dc] px-6 py-5">
          <h2 className="font-bold text-[#2d2424]">
            قائمة مقدمي الخدمات
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {loading
              ? "جاري تحميل البيانات..."
              : `${filteredProviders.length} مقدم خدمة`}
          </p>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            جاري تحميل مقدمي الخدمات...
          </div>
        ) : filteredProviders.length === 0 ? (
          <div className="p-10 text-center">
            <Users
              size={40}
              className="mx-auto mb-3 text-gray-300"
            />

            <p className="font-semibold text-[#2d2424]">
              لا يوجد مقدمو خدمات
            </p>

            <p className="mt-1 text-sm text-gray-400">
              لم يتم العثور على نتائج مطابقة للبحث.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#eee2dc]">
            {filteredProviders.map((provider) => (
              <div
                key={provider._id}
                className="p-6 transition hover:bg-[#fffaf5]"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Provider Info */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#6B3038] text-white">
                      <Users size={21} />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#2d2424]">
                        {provider.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#6B3038]">
                        {serviceLabels[provider.serviceType] ||
                          provider.serviceType}
                      </p>

                      <div className="mt-3 flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:gap-5">
                        {provider.email && (
                          <span className="flex items-center gap-1.5">
                            <Mail size={14} />
                            {provider.email}
                          </span>
                        )}

                        {provider.phone && (
                          <span className="flex items-center gap-1.5">
                            <Phone size={14} />
                            {provider.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    {provider.isApproved ? (
                      <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                        <CheckCircle2 size={16} />
                        حساب معتمد
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
                        <Clock3 size={16} />
                        قيد المراجعة
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProviders;