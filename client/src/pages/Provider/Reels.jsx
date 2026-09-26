import {
  AlertCircle,
  CalendarDays,
  Edit3,
  FileVideo,
  Loader2,
  Play,
  Plus,
  Trash2,
  Upload,
  Video,
  X,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import api from "../../api/api";

// =========================================================
// Cloudinary
// =========================================================

const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_UPLOAD_PRESET =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// =========================================================
// Upload Video To Cloudinary
// =========================================================

const uploadVideoToCloudinary = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    if (
      !CLOUDINARY_CLOUD_NAME ||
      !CLOUDINARY_UPLOAD_PRESET
    ) {
      reject(
        new Error(
          "إعدادات Cloudinary غير موجودة في ملف .env"
        )
      );

      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      CLOUDINARY_UPLOAD_PRESET
    );

    const xhr = new XMLHttpRequest();

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`
    );

    xhr.upload.addEventListener(
      "progress",
      (event) => {
        if (event.lengthComputable) {
          const progress = Math.round(
            (event.loaded / event.total) * 100
          );

          onProgress(progress);
        }
      }
    );

    xhr.addEventListener("load", () => {
      if (
        xhr.status >= 200 &&
        xhr.status < 300
      ) {
        try {
          const response = JSON.parse(
            xhr.responseText
          );

          resolve(response);
        } catch {
          reject(
            new Error(
              "تعذر قراءة استجابة Cloudinary"
            )
          );
        }
      } else {
        try {
          const errorResponse =
            JSON.parse(xhr.responseText);

          reject(
            new Error(
              errorResponse?.error?.message ||
                "فشل رفع الفيديو إلى Cloudinary"
            )
          );
        } catch {
          reject(
            new Error(
              "فشل رفع الفيديو إلى Cloudinary"
            )
          );
        }
      }
    });

    xhr.addEventListener("error", () => {
      reject(
        new Error(
          "حدث خطأ أثناء الاتصال بـ Cloudinary"
        )
      );
    });

    xhr.addEventListener("abort", () => {
      reject(
        new Error(
          "تم إلغاء رفع الفيديو"
        )
      );
    });

    xhr.send(formData);
  });
};

// =========================================================
// Reels
// =========================================================

const Reels = () => {
  // =======================================================
  // Main States
  // =======================================================

  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =======================================================
  // Add Modal
  // =======================================================

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const [uploadProgress, setUploadProgress] =
    useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");

  const fileInputRef = useRef(null);

  // =======================================================
  // Edit Modal
  // =======================================================

  const [editingReel, setEditingReel] =
    useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    video: null,
  });

  const [editPreviewUrl, setEditPreviewUrl] =
    useState("");

  const [updating, setUpdating] = useState(false);

  const [
    editUploadProgress,
    setEditUploadProgress,
  ] = useState(0);

  const editFileInputRef = useRef(null);

  // =======================================================
  // Fetch Reels
  // =======================================================

  const fetchReels = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/provider/reels"
      );

      setReels(
        response.data?.reels || []
      );
    } catch (error) {
      console.error(
        "Fetch Reels Error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "حدث خطأ أثناء جلب الريلز"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  // =======================================================
  // Add Modal
  // =======================================================

  const openAddModal = () => {
    setFormData({
      title: "",
      description: "",
      video: null,
    });

    setPreviewUrl("");
    setUploadProgress(0);
    setError("");
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    if (saving) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setIsAddModalOpen(false);

    setFormData({
      title: "",
      description: "",
      video: null,
    });

    setPreviewUrl("");
    setUploadProgress(0);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =======================================================
  // Add Form
  // =======================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =======================================================
  // Select Video
  // =======================================================

  const handleVideoChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("video/")) {
      setError(
        "الملف المحدد يجب أن يكون فيديو"
      );

      event.target.value = "";

      return;
    }

    const maxSize =
      100 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "حجم الفيديو يجب ألا يتجاوز 100MB"
      );

      event.target.value = "";

      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const newPreviewUrl =
      URL.createObjectURL(file);

    setPreviewUrl(newPreviewUrl);

    setFormData((prev) => ({
      ...prev,
      video: file,
    }));
  };

  // =======================================================
  // Remove Add Video
  // =======================================================

  const removeSelectedVideo = () => {
    if (saving) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl("");

    setFormData((prev) => ({
      ...prev,
      video: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =======================================================
  // Add Reel
  // =======================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.video) {
      setError(
        "يرجى اختيار فيديو أولاً"
      );

      return;
    }

    try {
      setSaving(true);
      setUploadProgress(0);

      const cloudinaryResponse =
        await uploadVideoToCloudinary(
          formData.video,
          setUploadProgress
        );

      const videoUrl =
        cloudinaryResponse?.secure_url;

      if (!videoUrl) {
        throw new Error(
          "لم يتم الحصول على رابط الفيديو من Cloudinary"
        );
      }

      const response =
        await api.post(
          "/provider/reels",
          {
            title:
              formData.title.trim(),

            description:
              formData.description.trim(),

            videoUrl,

            thumbnail:
              cloudinaryResponse?.secure_url ||
              "",
          }
        );

      const newReel =
        response.data?.reel;

      if (newReel) {
        setReels((prev) => [
          newReel,
          ...prev,
        ]);
      } else {
        await fetchReels();
      }

      if (previewUrl) {
        URL.revokeObjectURL(
          previewUrl
        );
      }

      setFormData({
        title: "",
        description: "",
        video: null,
      });

      setPreviewUrl("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setUploadProgress(100);

      setTimeout(() => {
        setIsAddModalOpen(false);
        setUploadProgress(0);
      }, 500);
    } catch (error) {
      console.error(
        "Add Reel Error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "حدث خطأ أثناء إضافة الريل"
      );
    } finally {
      setSaving(false);
    }
  };

  // =======================================================
  // Edit Modal
  // =======================================================

  const openEditModal = (reel) => {
    setError("");

    setEditingReel(reel);

    setEditForm({
      title: reel.title || "",
      description:
        reel.description || "",
      video: null,
    });

    setEditPreviewUrl("");
    setEditUploadProgress(0);

    if (editFileInputRef.current) {
      editFileInputRef.current.value = "";
    }
  };

  const closeEditModal = () => {
    if (updating) return;

    if (editPreviewUrl) {
      URL.revokeObjectURL(
        editPreviewUrl
      );
    }

    setEditingReel(null);

    setEditForm({
      title: "",
      description: "",
      video: null,
    });

    setEditPreviewUrl("");
    setEditUploadProgress(0);

    if (editFileInputRef.current) {
      editFileInputRef.current.value = "";
    }
  };

  // =======================================================
  // Edit Form
  // =======================================================

  const handleEditChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =======================================================
  // Select New Video
  // =======================================================

  const handleEditVideoChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("video/")) {
      setError(
        "الملف المحدد يجب أن يكون فيديو"
      );

      event.target.value = "";

      return;
    }

    const maxSize =
      100 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "حجم الفيديو يجب ألا يتجاوز 100MB"
      );

      event.target.value = "";

      return;
    }

    if (editPreviewUrl) {
      URL.revokeObjectURL(
        editPreviewUrl
      );
    }

    const preview =
      URL.createObjectURL(file);

    setEditPreviewUrl(preview);

    setEditForm((prev) => ({
      ...prev,
      video: file,
    }));
  };

  // =======================================================
  // Remove Edit Video
  // =======================================================

  const removeEditVideo = () => {
    if (updating) return;

    if (editPreviewUrl) {
      URL.revokeObjectURL(
        editPreviewUrl
      );
    }

    setEditPreviewUrl("");

    setEditForm((prev) => ({
      ...prev,
      video: null,
    }));

    if (editFileInputRef.current) {
      editFileInputRef.current.value = "";
    }
  };

  // =======================================================
  // Update Reel
  // =======================================================

  const handleUpdateReel = async (
    event
  ) => {
    event.preventDefault();

    if (!editingReel) return;

    setError("");

    try {
      setUpdating(true);
      setEditUploadProgress(0);

      let videoUrl =
        editingReel.videoUrl;

      let thumbnail =
        editingReel.thumbnail || "";

      if (editForm.video) {
        const cloudinaryResponse =
          await uploadVideoToCloudinary(
            editForm.video,
            setEditUploadProgress
          );

        videoUrl =
          cloudinaryResponse?.secure_url;

        thumbnail =
          cloudinaryResponse?.secure_url ||
          "";

        if (!videoUrl) {
          throw new Error(
            "لم يتم الحصول على رابط الفيديو الجديد"
          );
        }
      }

      const response =
        await api.put(
          `/provider/reels/${editingReel._id}`,
          {
            title:
              editForm.title.trim(),

            description:
              editForm.description.trim(),

            videoUrl,
            thumbnail,
          }
        );

      const updatedReel =
        response.data?.reel;

      if (updatedReel) {
        setReels((prev) =>
          prev.map((reel) =>
            reel._id ===
            updatedReel._id
              ? updatedReel
              : reel
          )
        );
      } else {
        await fetchReels();
      }

      closeEditModal();
    } catch (error) {
      console.error(
        "Update Reel Error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "حدث خطأ أثناء تعديل الريل"
      );
    } finally {
      setUpdating(false);
    }
  };

  // =======================================================
  // Delete
  // =======================================================

  const handleDelete = async (
    reelId
  ) => {
    const confirmed =
      window.confirm(
        "هل أنت متأكد من حذف هذا الريل؟"
      );

    if (!confirmed) return;

    try {
      setError("");

      await api.delete(
        `/provider/reels/${reelId}`
      );

      setReels((prev) =>
        prev.filter(
          (reel) =>
            reel._id !== reelId
        )
      );
    } catch (error) {
      console.error(
        "Delete Reel Error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "حدث خطأ أثناء حذف الريل"
      );
    }
  };

  // =======================================================
  // Date
  // =======================================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(
      date
    ).toLocaleDateString(
      "ar-PS",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  // =======================================================
  // Loading
  // =======================================================

  if (loading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#fffaf5]"
      >
        <div className="flex min-h-[600px] items-center justify-center">
          <div className="text-center">
            <Loader2
              size={34}
              strokeWidth={1.3}
              className="mx-auto animate-spin text-[#6B3038]"
            />

            <p className="mt-4 text-sm text-[#2d2424]/50">
              جاري تحميل الريلز...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =======================================================
  // Page
  // =======================================================

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fffaf5] text-[#2d2424]"
    >
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">

        {/* =================================================
            Header
        ================================================= */}

        <div className="relative mb-10 overflow-hidden border border-[#6B3038]/10 bg-white">

          <div className="absolute inset-y-0 right-0 w-1 bg-[#6B3038]" />

          <div className="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[#e5c28d]/10 blur-3xl" />

          <div className="relative flex flex-col gap-7 px-6 py-8 sm:px-9 sm:py-10 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center border border-[#e5c28d]/70 bg-[#fffaf5] text-[#6B3038]">
                  <Video
                    size={19}
                    strokeWidth={1.3}
                  />
                </div>

                <span className="text-[10px] font-semibold tracking-[0.3em] text-[#6B3038]/70">
                  VISUAL STORIES
                </span>

              </div>

              <h1 className="font-serif text-3xl font-medium tracking-tight text-[#2d2424] sm:text-4xl">
                الريلز
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#2d2424]/55">
                شارك لحظاتك وأعمالك وأجواء
                نشاطك من خلال فيديوهات قصيرة
                تعكس هوية علامتك التجارية.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="group inline-flex h-12 items-center justify-center gap-3 bg-[#6B3038] px-7 text-sm font-medium text-white transition-all duration-300 hover:bg-[#57262d]"
            >
              <Plus
                size={18}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:rotate-90"
              />

              إضافة ريل
            </button>

          </div>

          <div className="flex items-center gap-5 border-t border-[#6B3038]/8 px-6 py-4 sm:px-9">

            <div className="flex items-center gap-2">

              <Video
                size={16}
                strokeWidth={1.4}
                className="text-[#6B3038]"
              />

              <span className="text-xs text-[#2d2424]/55">
                {reels.length} ريل
              </span>

            </div>

            <span className="h-3 w-px bg-[#2d2424]/10" />

            <span className="text-xs text-[#2d2424]/40">
              محتوى مرئي لنشاطك
            </span>

          </div>
        </div>

        {/* =================================================
            Error
        ================================================= */}

        {error &&
          !isAddModalOpen &&
          !editingReel && (
            <div className="mb-7 flex items-center gap-3 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              <AlertCircle
                size={18}
                strokeWidth={1.5}
              />

              <span>{error}</span>
            </div>
          )}

        {/* =================================================
            Empty
        ================================================= */}

        {reels.length === 0 ? (
          <div className="border border-dashed border-[#6B3038]/20 bg-white px-6 py-24 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center border border-[#e5c28d]/60 bg-[#fffaf5] text-[#6B3038]">
              <Video
                size={30}
                strokeWidth={1.1}
              />
            </div>

            <h2 className="mt-7 font-serif text-2xl text-[#2d2424]">
              ابدأ ببناء محتواك المرئي
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#2d2424]/50">
              أضف أول ريل لعرض أعمالك وخدماتك
              بطريقة تجعل نشاطك أكثر حضورًا
              أمام العملاء.
            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-7 inline-flex items-center gap-2 bg-[#6B3038] px-7 py-3 text-sm text-white transition hover:bg-[#57262d]"
            >
              <Plus
                size={17}
                strokeWidth={1.5}
              />

              إضافة أول ريل
            </button>

          </div>
        ) : (
          /* =================================================
             Reels Grid
          ================================================= */

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {reels.map((reel) => (
              <article
                key={reel._id}
                className="group overflow-hidden border border-[#6B3038]/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#e5c28d]/60 hover:shadow-[0_20px_50px_rgba(45,36,36,0.10)]"
              >

                {/* Video */}

                <div className="relative aspect-[9/14] overflow-hidden bg-[#2d2424]">

                  <video
                    src={reel.videoUrl}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    controls
                    preload="metadata"
                  />

                  {/* Play Badge */}

                  <div className="pointer-events-none absolute left-4 top-4 flex h-9 w-9 items-center justify-center border border-white/20 bg-black/35 text-white backdrop-blur-md">
                    <Play
                      size={14}
                      fill="currentColor"
                      strokeWidth={1.2}
                    />
                  </div>

                  {/* Number */}

                  <div className="pointer-events-none absolute right-4 top-4 flex h-8 min-w-8 items-center justify-center border border-white/20 bg-black/35 px-2 text-[10px] text-white backdrop-blur-md">
                    REEL
                  </div>

                </div>

                {/* Content */}

                <div className="p-5">

                  <div className="min-h-[76px]">

                    <h3 className="truncate font-serif text-lg text-[#2d2424]">
                      {reel.title ||
                        "ريل بدون عنوان"}
                    </h3>

                    {reel.description && (
                      <p className="mt-2 line-clamp-2 text-xs leading-6 text-[#2d2424]/50">
                        {reel.description}
                      </p>
                    )}

                  </div>

                  {reel.createdAt && (
                    <div className="mt-4 flex items-center gap-2 border-t border-[#2d2424]/8 pt-4 text-[11px] text-[#2d2424]/40">

                      <CalendarDays
                        size={14}
                        strokeWidth={1.3}
                      />

                      <span>
                        {formatDate(
                          reel.createdAt
                        )}
                      </span>

                    </div>
                  )}

                  {/* Actions */}

                  <div className="mt-5 flex items-center gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        openEditModal(reel)
                      }
                      title="تعديل"
                      className="flex h-10 flex-1 items-center justify-center gap-2 border border-[#6B3038]/15 bg-[#fffaf5] text-xs font-medium text-[#6B3038] transition-all duration-300 hover:border-[#6B3038] hover:bg-[#6B3038] hover:text-white"
                    >
                      <Edit3
                        size={15}
                        strokeWidth={1.4}
                      />

                      تعديل
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          reel._id
                        )
                      }
                      title="حذف الريل"
                      className="flex h-10 w-10 items-center justify-center border border-[#8b3333]/10 bg-white text-[#8b3333]/60 transition-all duration-300 hover:border-[#8b3333] hover:bg-[#8b3333] hover:text-white"
                    >
                      <Trash2
                        size={16}
                        strokeWidth={1.4}
                      />
                    </button>

                  </div>

                </div>
              </article>
            ))}

          </div>
        )}
      </div>

      {/* =====================================================
          ADD MODAL
      ====================================================== */}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2424]/70 p-4 backdrop-blur-md">

          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)]">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#2d2424]/8 bg-white px-6 py-5 sm:px-8">

              <div>

                <div className="mb-1 text-[9px] font-semibold tracking-[0.25em] text-[#6B3038]/60">
                  ADD VISUAL STORY
                </div>

                <h2 className="font-serif text-2xl text-[#2d2424]">
                  إضافة ريل جديد
                </h2>

                <p className="mt-1 text-xs text-[#2d2424]/45">
                  أضف فيديو قصير إلى معرض نشاطك
                </p>

              </div>

              <button
                type="button"
                onClick={closeAddModal}
                disabled={saving}
                className="flex h-10 w-10 items-center justify-center text-[#2d2424]/40 transition hover:bg-[#fffaf5] hover:text-[#6B3038]"
              >
                <X
                  size={20}
                  strokeWidth={1.3}
                />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6 sm:p-8"
            >

              {error &&
                isAddModalOpen && (
                  <div className="flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                    <AlertCircle
                      size={18}
                      className="mt-0.5 shrink-0"
                    />

                    <span>{error}</span>

                  </div>
                )}

              {/* Title */}

              <div>
                <label className="mb-2 block text-xs font-medium text-[#2d2424]/70">
                  عنوان الريل
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="مثال: أجواء قاعة ليالي العمر"
                  disabled={saving}
                  className="h-12 w-full border border-[#2d2424]/12 bg-white px-4 text-sm outline-none transition placeholder:text-[#2d2424]/30 focus:border-[#6B3038]/50 focus:ring-1 focus:ring-[#6B3038]/10"
                />
              </div>

              {/* Description */}

              <div>
                <label className="mb-2 block text-xs font-medium text-[#2d2424]/70">
                  وصف الريل
                  <span className="mr-1 text-[#2d2424]/30">
                    (اختياري)
                  </span>
                </label>

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={handleChange}
                  rows={4}
                  placeholder="اكتب وصفًا مختصرًا للفيديو..."
                  disabled={saving}
                  className="w-full resize-none border border-[#2d2424]/12 px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-[#2d2424]/30 focus:border-[#6B3038]/50 focus:ring-1 focus:ring-[#6B3038]/10"
                />
              </div>

              {/* Video */}

              <div>
                <label className="mb-2 block text-xs font-medium text-[#2d2424]/70">
                  الفيديو
                </label>

                {!formData.video ? (
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    disabled={saving}
                    className="flex min-h-[280px] w-full flex-col items-center justify-center border border-dashed border-[#6B3038]/20 bg-[#fffaf5] px-5 text-center transition hover:border-[#6B3038]/40"
                  >
                    <div className="flex h-16 w-16 items-center justify-center border border-[#e5c28d]/70 bg-white text-[#6B3038]">
                      <Upload
                        size={24}
                        strokeWidth={1.3}
                      />
                    </div>

                    <p className="mt-5 text-sm font-medium text-[#2d2424]">
                      اختر فيديو للريل
                    </p>

                    <p className="mt-2 text-xs text-[#2d2424]/40">
                      MP4, WebM, MOV — حتى 100MB
                    </p>
                  </button>
                ) : (
                  <div className="overflow-hidden border border-[#2d2424]/10 bg-[#2d2424]">

                    <div className="relative aspect-[9/14] max-h-[450px]">

                      <video
                        src={previewUrl}
                        controls
                        className="h-full w-full object-contain"
                      />

                      {!saving && (
                        <button
                          type="button"
                          onClick={
                            removeSelectedVideo
                          }
                          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-black/60 text-white transition hover:bg-[#8b3333]"
                        >
                          <X
                            size={17}
                            strokeWidth={1.3}
                          />
                        </button>
                      )}

                    </div>

                    <div className="flex items-center gap-3 bg-white px-4 py-3">

                      <FileVideo
                        size={20}
                        strokeWidth={1.4}
                        className="text-[#6B3038]"
                      />

                      <p className="truncate text-sm text-[#2d2424]">
                        {
                          formData.video
                            .name
                        }
                      </p>

                    </div>

                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={
                    handleVideoChange
                  }
                  className="hidden"
                />
              </div>

              {/* Progress */}

              {saving && (
                <div className="border border-[#6B3038]/10 bg-[#fffaf5] p-4">

                  <div className="mb-2 flex items-center justify-between text-xs">

                    <span className="text-[#2d2424]/55">
                      جاري رفع الفيديو...
                    </span>

                    <span className="font-medium text-[#6B3038]">
                      {uploadProgress}%
                    </span>

                  </div>

                  <div className="h-1 overflow-hidden bg-[#2d2424]/8">

                    <div
                      className="h-full bg-[#6B3038] transition-all"
                      style={{
                        width: `${uploadProgress}%`,
                      }}
                    />

                  </div>

                </div>
              )}

              {/* Actions */}

              <div className="flex flex-col-reverse gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={closeAddModal}
                  disabled={saving}
                  className="h-12 flex-1 border border-[#2d2424]/12 text-sm text-[#2d2424]/60 transition hover:border-[#6B3038]/30 hover:text-[#6B3038]"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={
                    saving ||
                    !formData.video
                  }
                  className="flex h-12 flex-1 items-center justify-center gap-2 bg-[#6B3038] text-sm font-medium text-white transition hover:bg-[#57262d] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      جاري الرفع...
                    </>
                  ) : (
                    <>
                      <Upload
                        size={17}
                        strokeWidth={1.4}
                      />

                      رفع الريل
                    </>
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          EDIT MODAL
      ====================================================== */}

      {editingReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2424]/70 p-4 backdrop-blur-md">

          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)]">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#2d2424]/8 bg-white px-6 py-5 sm:px-8">

              <div>

                <div className="mb-1 text-[9px] font-semibold tracking-[0.25em] text-[#6B3038]/60">
                  EDIT VISUAL STORY
                </div>

                <h2 className="font-serif text-2xl text-[#2d2424]">
                  تعديل الريل
                </h2>

                <p className="mt-1 text-xs text-[#2d2424]/45">
                  عدّل بيانات الريل أو استبدل الفيديو
                </p>

              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={updating}
                className="flex h-10 w-10 items-center justify-center text-[#2d2424]/40 transition hover:bg-[#fffaf5] hover:text-[#6B3038]"
              >
                <X
                  size={20}
                  strokeWidth={1.3}
                />
              </button>

            </div>

            <form
              onSubmit={handleUpdateReel}
              className="space-y-6 p-6 sm:p-8"
            >

              {error && (
                <div className="flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{error}</span>

                </div>
              )}

              {/* Title */}

              <div>
                <label className="mb-2 block text-xs font-medium text-[#2d2424]/70">
                  عنوان الريل
                </label>

                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={
                    handleEditChange
                  }
                  disabled={updating}
                  className="h-12 w-full border border-[#2d2424]/12 px-4 text-sm outline-none transition focus:border-[#6B3038]/50 focus:ring-1 focus:ring-[#6B3038]/10"
                />
              </div>

              {/* Description */}

              <div>
                <label className="mb-2 block text-xs font-medium text-[#2d2424]/70">
                  وصف الريل
                </label>

                <textarea
                  name="description"
                  value={
                    editForm.description
                  }
                  onChange={
                    handleEditChange
                  }
                  rows={4}
                  disabled={updating}
                  className="w-full resize-none border border-[#2d2424]/12 px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#6B3038]/50 focus:ring-1 focus:ring-[#6B3038]/10"
                />
              </div>

              {/* Current Video */}

              {!editPreviewUrl && (
                <div>
                  <label className="mb-2 block text-xs font-medium text-[#2d2424]/70">
                    الفيديو الحالي
                  </label>

                  <div className="overflow-hidden border border-[#2d2424]/10 bg-[#2d2424]">
                    <video
                      src={
                        editingReel.videoUrl
                      }
                      controls
                      className="max-h-[400px] w-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* New Video */}

              {editPreviewUrl && (
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label className="text-xs font-medium text-[#2d2424]/70">
                      الفيديو الجديد
                    </label>

                    {!updating && (
                      <button
                        type="button"
                        onClick={
                          removeEditVideo
                        }
                        className="text-xs text-[#8b3333] transition hover:text-[#6B3038]"
                      >
                        إلغاء الاستبدال
                      </button>
                    )}

                  </div>

                  <div className="overflow-hidden border border-[#2d2424]/10 bg-[#2d2424]">

                    <video
                      src={editPreviewUrl}
                      controls
                      className="max-h-[400px] w-full object-contain"
                    />

                  </div>

                </div>
              )}

              {/* Replace */}

              <div>

                <input
                  ref={editFileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={
                    handleEditVideoChange
                  }
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() =>
                    editFileInputRef.current?.click()
                  }
                  disabled={updating}
                  className="flex h-12 w-full items-center justify-center gap-2 border border-[#6B3038]/15 bg-[#fffaf5] text-sm font-medium text-[#6B3038] transition hover:border-[#6B3038]/40 hover:bg-[#f8eee7]"
                >
                  <Upload
                    size={17}
                    strokeWidth={1.4}
                  />

                  استبدال الفيديو
                </button>

                <p className="mt-2 text-center text-[11px] text-[#2d2424]/35">
                  اختياري — إذا لم تختَر فيديو جديدًا
                  سيبقى الفيديو الحالي.
                </p>

              </div>

              {/* Progress */}

              {updating &&
                editForm.video && (
                  <div className="border border-[#6B3038]/10 bg-[#fffaf5] p-4">

                    <div className="mb-2 flex items-center justify-between text-xs">

                      <span className="text-[#2d2424]/55">
                        جاري رفع الفيديو الجديد...
                      </span>

                      <span className="font-medium text-[#6B3038]">
                        {
                          editUploadProgress
                        }%
                      </span>

                    </div>

                    <div className="h-1 overflow-hidden bg-[#2d2424]/8">

                      <div
                        className="h-full bg-[#6B3038] transition-all"
                        style={{
                          width: `${editUploadProgress}%`,
                        }}
                      />

                    </div>

                  </div>
                )}

              {/* Actions */}

              <div className="flex flex-col-reverse gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={updating}
                  className="h-12 flex-1 border border-[#2d2424]/12 text-sm text-[#2d2424]/60 transition hover:border-[#6B3038]/30 hover:text-[#6B3038]"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="flex h-12 flex-1 items-center justify-center gap-2 bg-[#6B3038] text-sm font-medium text-white transition hover:bg-[#57262d] disabled:opacity-50"
                >
                  {updating ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Edit3
                        size={17}
                        strokeWidth={1.4}
                      />

                      حفظ التعديلات
                    </>
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reels;