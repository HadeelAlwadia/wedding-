import { useEffect, useState } from "react";

import {
  getPendingRequests,
  approveProvider,
  rejectProvider,
} from "../../api/adminApi";

const serviceLabels = {
  hall: "قاعات أفراح",
  beauty: "صالونات وتجميل",
  "bridal-dresses": "فساتين زفاف",
  "groom-suits": "بدلات رجالية",
  photographers: "تصوير",
  "wedding-cars": "سيارات أفراح",
};

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPendingRequests();

      setRequests(data);
    } catch (error) {
      console.error(error);

      setError("حدث خطأ أثناء تحميل الطلبات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      setActionLoading(id);
      setError("");

      await approveProvider(id);

      setRequests((prev) =>
        prev.filter((request) => request._id !== id)
      );
    } catch (error) {
      console.error(error);

      setError("حدث خطأ أثناء اعتماد الحساب");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    const confirmed = window.confirm(
      "هل أنتِ متأكدة من رفض هذا الطلب؟"
    );

    if (!confirmed) return;

    try {
      setActionLoading(id);
      setError("");

      await rejectProvider(id);

      setRequests((prev) =>
        prev.filter((request) => request._id !== id)
      );
    } catch (error) {
      console.error(error);

      setError("حدث خطأ أثناء رفض الطلب");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fffaf5] p-6 md:p-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#2d2424]">
          طلبات مقدمي الخدمات
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          مراجعة واعتماد طلبات أصحاب الأنشطة التجارية للانضمام إلى زَفَاف.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="rounded-2xl border border-[#eadfd7] bg-white p-12 text-center">
          <p className="text-gray-500">
            جاري تحميل الطلبات...
          </p>
        </div>
      ) : requests.length === 0 ? (
        /* Empty */
        <div className="rounded-2xl border border-[#eadfd7] bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f8eee7] text-2xl">
            ✓
          </div>

          <h2 className="font-bold text-[#2d2424]">
            لا توجد طلبات جديدة
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            جميع طلبات مقدمي الخدمات تمت مراجعتها.
          </p>
        </div>
      ) : (
        /* Requests */
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="rounded-2xl border border-[#eadfd7] bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* Information */}
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold text-[#2d2424]">
                      {request.name}
                    </h2>

                    <span className="rounded-full bg-[#f8eee7] px-3 py-1 text-xs font-medium text-[#6B3038]">
                      {serviceLabels[request.serviceType] ||
                        request.serviceType}
                    </span>

                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                      قيد المراجعة
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-500">
                    <p>
                      البريد الإلكتروني: {request.email}
                    </p>

                    <p dir="ltr" className="text-right">
                      الهاتف: {request.phone}
                    </p>

                    {request.whatsapp && (
                      <p dir="ltr" className="text-right">
                        WhatsApp: {request.whatsapp}
                      </p>
                    )}
                  </div>

                  <p className="mt-3 text-xs text-gray-400">
                    تاريخ الطلب:{" "}
                    {new Date(request.createdAt).toLocaleDateString(
                      "ar"
                    )}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={actionLoading === request._id}
                    onClick={() =>
                      handleApprove(request._id)
                    }
                    className="rounded-xl bg-[#6B3038] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#54252c] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {actionLoading === request._id
                      ? "جاري التنفيذ..."
                      : "اعتماد الحساب"}
                  </button>

                  <button
                    type="button"
                    disabled={actionLoading === request._id}
                    onClick={() =>
                      handleReject(request._id)
                    }
                    className="rounded-xl border border-red-200 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    رفض
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}