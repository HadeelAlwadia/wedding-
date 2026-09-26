import {
  Camera,
  CheckCircle2,
  Edit3,
  Image as ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
  ZoomIn,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import api from "../../api/api";

// =========================================================
// Cloudinary Config
// =========================================================

const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_UPLOAD_PRESET =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// =========================================================
// Upload Image To Cloudinary
// =========================================================

const uploadImageToCloudinary = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
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
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
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
      if (xhr.status >= 200 && xhr.status < 300) {
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

        return;
      }

      try {
        const response = JSON.parse(
          xhr.responseText
        );

        reject(
          new Error(
            response?.error?.message ||
              "فشل رفع الصورة إلى Cloudinary"
          )
        );
      } catch {
        reject(
          new Error(
            "فشل رفع الصورة إلى Cloudinary"
          )
        );
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
        new Error("تم إلغاء رفع الصورة")
      );
    });

    xhr.send(formData);
  });
};

// =========================================================
// Gallery
// =========================================================

const Gallery = () => {
  // =======================================================
  // Gallery State
  // =======================================================

  const [gallery, setGallery] = useState([]);

  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [uploadProgress, setUploadProgress] =
    useState(0);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =======================================================
  // Add Modal
  // =======================================================

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  // =======================================================
  // Edit Modal
  // =======================================================

  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);

  const [editingImage, setEditingImage] =
    useState(null);

  const [editTitle, setEditTitle] =
    useState("");

  const [editDescription, setEditDescription] =
    useState("");

  const [editFile, setEditFile] =
    useState(null);

  const [editPreview, setEditPreview] =
    useState("");

  // =======================================================
  // Lightbox
  // =======================================================

  const [selectedImage, setSelectedImage] =
    useState(null);

  // =======================================================
  // Refs
  // =======================================================

  const addFileInputRef = useRef(null);

  const editFileInputRef = useRef(null);

  // =======================================================
  // Fetch Gallery
  // =======================================================

  const fetchGallery = async () => {
    try {
      setError("");

      const response = await api.get(
        "/provider/gallery"
      );

      const images =
        response.data?.gallery || [];

      setGallery(images);
    } catch (err) {
      console.error(
        "fetchGallery:",
        err
      );

      setError(
        err.response?.data?.message ||
          "تعذر تحميل معرض الصور"
      );
    }
  };

  // =======================================================
  // Initial Load
  // =======================================================

  useEffect(() => {
    const loadGallery = async () => {
      setLoading(true);

      await fetchGallery();

      setLoading(false);
    };

    loadGallery();
  }, []);

  // =======================================================
  // Success Message
  // =======================================================

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  // =======================================================
  // Cleanup Object URLs
  // =======================================================

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (
        editPreview &&
        editPreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(editPreview);
      }
    };
  }, [previewUrl, editPreview]);

  // =======================================================
  // Select New Image
  // =======================================================

  const handleSelectImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError(
        "يرجى اختيار ملف صورة صالح"
      );

      event.target.value = "";

      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(
        "حجم الصورة يجب ألا يتجاوز 10MB"
      );

      event.target.value = "";

      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl =
      URL.createObjectURL(file);

    setSelectedFile(file);

    setPreviewUrl(objectUrl);
  };

  // =======================================================
  // Reset Add Form
  // =======================================================

  const resetAddForm = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setTitle("");

    setDescription("");

    setSelectedFile(null);

    setPreviewUrl("");

    setUploadProgress(0);

    if (addFileInputRef.current) {
      addFileInputRef.current.value = "";
    }
  };

  // =======================================================
  // Open Add Modal
  // =======================================================

  const openAddModal = () => {
    setError("");

    setSuccess("");

    resetAddForm();

    setIsAddModalOpen(true);
  };

  // =======================================================
  // Close Add Modal
  // =======================================================

  const closeAddModal = () => {
    if (uploading || saving) return;

    resetAddForm();

    setIsAddModalOpen(false);
  };

  // =======================================================
  // Add Image
  // =======================================================

  const handleAddImage = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("يرجى اختيار صورة أولًا");

      return;
    }

    try {
      setError("");

      setSuccess("");

      setUploading(true);

      setUploadProgress(0);

      const cloudinaryResponse =
        await uploadImageToCloudinary(
          selectedFile,
          setUploadProgress
        );

      const imageUrl =
        cloudinaryResponse?.secure_url;

      if (!imageUrl) {
        throw new Error(
          "لم يتم الحصول على رابط الصورة من Cloudinary"
        );
      }

      setUploading(false);

      setSaving(true);

      await api.post(
        "/provider/gallery",
        {
          title: title.trim(),
          description:
            description.trim(),
          imageUrl,
        }
      );

      await fetchGallery();

      setSuccess(
        "تمت إضافة الصورة بنجاح"
      );

      resetAddForm();

      setIsAddModalOpen(false);
    } catch (err) {
      console.error(
        "handleAddImage:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "حدث خطأ أثناء إضافة الصورة"
      );
    } finally {
      setUploading(false);

      setSaving(false);

      setUploadProgress(0);
    }
  };

  // =======================================================
  // Open Edit Modal
  // =======================================================

  const openEditModal = (image) => {
    setError("");

    setSuccess("");

    setEditingImage(image);

    setEditTitle(
      image.title || ""
    );

    setEditDescription(
      image.description || ""
    );

    setEditFile(null);

    setEditPreview(
      image.imageUrl || ""
    );

    setUploadProgress(0);

    setIsEditModalOpen(true);
  };

  // =======================================================
  // Select Replacement Image
  // =======================================================

  const handleSelectEditImage = (
    event
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError(
        "يرجى اختيار ملف صورة صالح"
      );

      event.target.value = "";

      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(
        "حجم الصورة يجب ألا يتجاوز 10MB"
      );

      event.target.value = "";

      return;
    }

    if (
      editPreview &&
      editPreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(editPreview);
    }

    const objectUrl =
      URL.createObjectURL(file);

    setEditFile(file);

    setEditPreview(objectUrl);
  };

  // =======================================================
  // Close Edit Modal
  // =======================================================

  const closeEditModal = () => {
    if (uploading || saving) return;

    if (
      editPreview &&
      editPreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(editPreview);
    }

    setEditingImage(null);

    setEditTitle("");

    setEditDescription("");

    setEditFile(null);

    setEditPreview("");

    setUploadProgress(0);

    if (editFileInputRef.current) {
      editFileInputRef.current.value = "";
    }

    setIsEditModalOpen(false);
  };

  // =======================================================
  // Update Image
  // =======================================================

  const handleUpdateImage = async (
    event
  ) => {
    event.preventDefault();

    if (!editingImage) return;

    try {
      setError("");

      setSuccess("");

      let imageUrl =
        editingImage.imageUrl;

      if (editFile) {
        setUploading(true);

        setUploadProgress(0);

        const cloudinaryResponse =
          await uploadImageToCloudinary(
            editFile,
            setUploadProgress
          );

        imageUrl =
          cloudinaryResponse?.secure_url;

        if (!imageUrl) {
          throw new Error(
            "لم يتم الحصول على رابط الصورة الجديدة"
          );
        }

        setUploading(false);
      }

      setSaving(true);

      await api.put(
        `/provider/gallery/${editingImage._id}`,
        {
          title: editTitle.trim(),
          description:
            editDescription.trim(),
          imageUrl,
        }
      );

      await fetchGallery();

      setSuccess(
        "تم تحديث الصورة بنجاح"
      );

      closeEditModal();
    } catch (err) {
      console.error(
        "handleUpdateImage:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "حدث خطأ أثناء تحديث الصورة"
      );
    } finally {
      setUploading(false);

      setSaving(false);

      setUploadProgress(0);
    }
  };

  // =======================================================
  // Delete Image
  // =======================================================

  const handleDeleteImage = async (
    imageId
  ) => {
    const confirmed =
      window.confirm(
        "هل أنت متأكد من حذف هذه الصورة؟"
      );

    if (!confirmed) return;

    try {
      setDeletingId(imageId);

      setError("");

      setSuccess("");

      await api.delete(
        `/provider/gallery/${imageId}`
      );

      await fetchGallery();

      if (
        selectedImage?._id === imageId
      ) {
        setSelectedImage(null);
      }

      setSuccess(
        "تم حذف الصورة بنجاح"
      );
    } catch (err) {
      console.error(
        "handleDeleteImage:",
        err
      );

      setError(
        err.response?.data?.message ||
          "حدث خطأ أثناء حذف الصورة"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =======================================================
  // Open Lightbox
  // =======================================================

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  // =======================================================
  // Close Lightbox
  // =======================================================

  const closeLightbox = () => {
    setSelectedImage(null);
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
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6">
          <div className="flex flex-col items-center">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#e5c28d]/40" />

              <div className="absolute inset-2 rounded-full border border-[#6B3038]/20" />

              <Loader2
                size={21}
                strokeWidth={1.5}
                className="animate-spin text-[#6B3038]"
              />
            </div>

            <p className="mt-5 text-sm text-[#756967]">
              جاري تجهيز معرضك...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =======================================================
  // Render
  // =======================================================

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fffaf5]"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">

        {/* =================================================
            Luxury Header
        ================================================= */}

        <header className="mb-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#e5c28d]" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B3038]">
                  ZAFaf · Portfolio
                </span>
              </div>

              <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-[#2d2424] sm:text-[42px]">
                معرض أعمالك
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#756967]">
                مساحة مخصصة لعرض تفاصيل أعمالك
                وتجاربك بصريًا أمام عملائك.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="group inline-flex h-12 items-center justify-center gap-3 self-start border border-[#6B3038] bg-[#6B3038] px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#54252c] lg:self-auto"
            >
              <Plus
                size={17}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:rotate-90"
              />

              إضافة صورة
            </button>
          </div>

          {/* Header Meta */}

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-[#e8ddd7] py-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#968985]">
                إجمالي الصور
              </span>

              <span className="text-sm font-semibold text-[#2d2424]">
                {gallery.length}
              </span>
            </div>

            <span className="hidden h-4 w-px bg-[#ded1ca] sm:block" />

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6B3038]" />

              <span className="text-xs text-[#756967]">
                معرض النشاط
              </span>
            </div>
          </div>
        </header>

        {/* =================================================
            Messages
        ================================================= */}

        {error && (
          <div className="mb-7 flex items-center justify-between border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="flex items-center gap-3">
              <X size={17} />

              <span>{error}</span>
            </div>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-7 flex items-center gap-3 border border-[#d8c7a9] bg-[#faf6ed] px-4 py-3 text-sm text-[#6B3038]">
            <CheckCircle2
              size={17}
              strokeWidth={1.6}
            />

            <span>{success}</span>
          </div>
        )}

        {/* =================================================
            Empty State
        ================================================= */}

        {gallery.length === 0 ? (
          <section className="relative overflow-hidden border border-[#e5d8d0] bg-white">

            {/* Decorative Lines */}

            <div className="absolute right-0 top-0 h-full w-px bg-[#e5c28d]/50" />

            <div className="absolute bottom-0 left-0 h-px w-1/3 bg-[#e5c28d]/50" />

            <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center sm:py-32">

              <div className="mb-8 flex h-16 w-16 items-center justify-center border border-[#e5c28d] text-[#6B3038]">
                <ImageIcon
                  size={24}
                  strokeWidth={1.3}
                />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a0928d]">
                Your Visual Story
              </span>

              <h2 className="mt-4 text-2xl font-semibold text-[#2d2424] sm:text-3xl">
                ابدأ بعرض أعمالك
              </h2>

              <p className="mt-4 max-w-md text-sm leading-8 text-[#756967]">
                أضف صورًا مختارة بعناية لتمنح
                العملاء لمحة حقيقية عن مستوى
                خدماتك وتفاصيل عملك.
              </p>

              <button
                type="button"
                onClick={openAddModal}
                className="mt-8 inline-flex items-center gap-3 border border-[#6B3038] px-6 py-3 text-sm font-semibold text-[#6B3038] transition hover:bg-[#6B3038] hover:text-white"
              >
                <Plus
                  size={17}
                  strokeWidth={1.5}
                />

                إضافة أول صورة
              </button>
            </div>
          </section>
        ) : (
          /* =================================================
             Luxury Masonry Gallery
          ================================================= */

          <section className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">

            {gallery.map((image) => (
              <article
                key={image._id}
                className="group relative mb-4 break-inside-avoid overflow-hidden bg-[#eee5df]"
              >
                {/* Image */}

                <button
                  type="button"
                  onClick={() =>
                    openLightbox(image)
                  }
                  className="relative block w-full cursor-zoom-in text-right"
                >
                  <img
                    src={image.imageUrl}
                    alt={
                      image.title ||
                      "صورة من معرض النشاط التجاري"
                    }
                    className="block h-auto max-h-[700px] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                    loading="lazy"
                  />

                  {/* Soft Hover */}

                  <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/25" />

                  {/* Zoom */}

                  <div className="absolute left-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center bg-white/95 text-[#2d2424] opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ZoomIn
                      size={17}
                      strokeWidth={1.5}
                    />
                  </div>
                </button>


            {/* Bottom Information */}

<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 pb-5 pt-20">
  
  <div className="flex items-end justify-between gap-4">

    <div className="min-w-0 flex-1">

      {image.title && (
        <h3 className="truncate text-sm font-semibold text-white">
          {image.title}
        </h3>
      )}

      {image.description && (
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/75">
          {image.description}
        </p>
      )}

    </div>

    {/* Actions */}

    <div className="flex shrink-0 items-center gap-2">

      {/* Edit */}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();

          openEditModal(image);
        }}
        className="flex h-9 w-9 items-center justify-center bg-white text-[#6B3038] shadow-lg transition hover:bg-[#f8eee7]"
        title="تعديل"
      >
        <Edit3
          size={15}
          strokeWidth={1.5}
        />
      </button>

      {/* Delete */}

      <button
        type="button"
        disabled={
          deletingId === image._id
        }
        onClick={(event) => {
          event.stopPropagation();

          handleDeleteImage(
            image._id
          );
        }}
        className="flex h-9 w-9 items-center justify-center bg-white text-[#8b3333] shadow-lg transition hover:bg-[#f8eee7] disabled:opacity-60"
        title="حذف"
      >
        {deletingId === image._id ? (
          <Loader2
            size={15}
            className="animate-spin"
          />
        ) : (
          <Trash2
            size={15}
            strokeWidth={1.5}
          />
        )}
      </button>

    </div>

  </div>
</div>
                
              </article>
            ))}
          </section>
        )}
      </div>

      {/* ===================================================
          ADD MODAL
      =================================================== */}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#241b1b]/70 p-4 backdrop-blur-md">

          <div className="relative max-h-[94vh] w-full max-w-2xl overflow-y-auto bg-[#fffaf5] shadow-[0_30px_100px_rgba(0,0,0,0.25)]">

            {/* Modal Header */}

            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#e8ddd7] bg-[#fffaf5]/95 px-6 py-5 backdrop-blur-md sm:px-8">

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a0928d]">
                  New Gallery Image
                </span>

                <h2 className="mt-1 text-xl font-semibold text-[#2d2424]">
                  إضافة صورة
                </h2>
              </div>

              <button
                type="button"
                onClick={closeAddModal}
                disabled={
                  uploading || saving
                }
                className="flex h-9 w-9 items-center justify-center border border-[#e4d8d1] text-[#756967] transition hover:border-[#6B3038] hover:text-[#6B3038]"
              >
                <X
                  size={18}
                  strokeWidth={1.5}
                />
              </button>
            </div>

            <form
              onSubmit={handleAddImage}
              className="space-y-7 p-6 sm:p-8"
            >
              {/* Upload */}

              <div>
                <label className="mb-3 block text-xs font-semibold text-[#2d2424]">
                  الصورة
                </label>

                {!previewUrl ? (
                  <button
                    type="button"
                    onClick={() =>
                      addFileInputRef.current?.click()
                    }
                    className="group flex min-h-[300px] w-full flex-col items-center justify-center border border-dashed border-[#d8c8bf] bg-white transition hover:border-[#6B3038] hover:bg-[#fdfaf8]"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center border border-[#e5c28d] text-[#6B3038] transition group-hover:bg-[#6B3038] group-hover:text-white">
                      <Upload
                        size={21}
                        strokeWidth={1.4}
                      />
                    </div>

                    <span className="text-sm font-semibold text-[#2d2424]">
                      اختر صورة من جهازك
                    </span>

                    <span className="mt-2 text-xs text-[#968985]">
                      JPG · PNG · WEBP
                      <span className="mx-2">•</span>
                      حتى 10MB
                    </span>
                  </button>
                ) : (
                  <div className="relative overflow-hidden bg-[#eee5df]">

                    <img
                      src={previewUrl}
                      alt="معاينة الصورة"
                      className="max-h-[460px] w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

                    <button
                      type="button"
                      onClick={() =>
                        resetAddForm()
                      }
                      className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center bg-white text-[#8b3333] shadow-lg"
                    >
                      <X
                        size={16}
                        strokeWidth={1.5}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        addFileInputRef.current?.click()
                      }
                      className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-white px-4 py-2.5 text-xs font-semibold text-[#2d2424] shadow-lg"
                    >
                      <Camera
                        size={14}
                        strokeWidth={1.5}
                      />

                      تغيير الصورة
                    </button>
                  </div>
                )}

                <input
                  ref={addFileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={
                    handleSelectImage
                  }
                  className="hidden"
                />
              </div>

              {/* Title */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#2d2424]">
                  عنوان الصورة
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value
                    )
                  }
                  placeholder="مثال: تفاصيل من القاعة"
                  className="w-full border-b border-[#d9cbc4] bg-transparent px-1 py-3 text-sm text-[#2d2424] outline-none transition placeholder:text-[#b0a4a0] focus:border-[#6B3038]"
                />
              </div>

              {/* Description */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#2d2424]">
                  وصف الصورة
                  <span className="mr-2 font-normal text-[#a0928d]">
                    اختياري
                  </span>
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  rows={3}
                  placeholder="اكتب وصفًا بسيطًا للصورة..."
                  className="w-full resize-none border-b border-[#d9cbc4] bg-transparent px-1 py-3 text-sm leading-7 text-[#2d2424] outline-none transition placeholder:text-[#b0a4a0] focus:border-[#6B3038]"
                />
              </div>

              {/* Progress */}

              {(uploading || saving) && (
                <div className="border border-[#e5d9d2] bg-white p-5">

                  <div className="mb-3 flex items-center justify-between text-xs">
                    <span className="text-[#5f5350]">
                      {uploading
                        ? "جاري رفع الصورة..."
                        : "جاري حفظ الصورة..."}
                    </span>

                    <span className="font-semibold text-[#6B3038]">
                      {uploading
                        ? `${uploadProgress}%`
                        : "..."}
                    </span>
                  </div>

                  <div className="h-1 bg-[#eee5df]">
                    <div
                      className="h-full bg-[#6B3038] transition-all"
                      style={{
                        width: uploading
                          ? `${uploadProgress}%`
                          : "100%",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}

              <div className="flex flex-col-reverse gap-3 border-t border-[#e8ddd7] pt-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeAddModal}
                  disabled={
                    uploading || saving
                  }
                  className="border border-[#d9cbc4] px-6 py-3 text-sm font-semibold text-[#5f5350] transition hover:border-[#6B3038] hover:text-[#6B3038]"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={
                    uploading ||
                    saving ||
                    !selectedFile
                  }
                  className="inline-flex items-center justify-center gap-2 bg-[#6B3038] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#54252c] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploading ||
                  saving ? (
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  ) : (
                    <Plus
                      size={16}
                      strokeWidth={1.5}
                    />
                  )}

                  {uploading
                    ? "جاري الرفع..."
                    : saving
                    ? "جاري الحفظ..."
                    : "إضافة الصورة"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================
          EDIT MODAL
      =================================================== */}

      {isEditModalOpen &&
        editingImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#241b1b]/70 p-4 backdrop-blur-md">

            <div className="relative max-h-[94vh] w-full max-w-2xl overflow-y-auto bg-[#fffaf5] shadow-[0_30px_100px_rgba(0,0,0,0.25)]">

              {/* Header */}

              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#e8ddd7] bg-[#fffaf5]/95 px-6 py-5 backdrop-blur-md sm:px-8">

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a0928d]">
                    Edit Gallery Image
                  </span>

                  <h2 className="mt-1 text-xl font-semibold text-[#2d2424]">
                    تعديل الصورة
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={
                    closeEditModal
                  }
                  disabled={
                    uploading || saving
                  }
                  className="flex h-9 w-9 items-center justify-center border border-[#e4d8d1] text-[#756967] transition hover:border-[#6B3038] hover:text-[#6B3038]"
                >
                  <X
                    size={18}
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              <form
                onSubmit={
                  handleUpdateImage
                }
                className="space-y-7 p-6 sm:p-8"
              >
                {/* Image */}

                <div className="relative overflow-hidden bg-[#eee5df]">

                  <img
                    src={editPreview}
                    alt="معاينة الصورة"
                    className="max-h-[460px] w-full object-cover"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-5 pb-5 pt-20">
                    <button
                      type="button"
                      onClick={() =>
                        editFileInputRef.current?.click()
                      }
                      className="inline-flex items-center gap-2 bg-white px-4 py-2.5 text-xs font-semibold text-[#2d2424] shadow-lg"
                    >
                      <Camera
                        size={14}
                        strokeWidth={1.5}
                      />

                      استبدال الصورة
                    </button>
                  </div>
                </div>

                <input
                  ref={editFileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={
                    handleSelectEditImage
                  }
                  className="hidden"
                />

                {/* Title */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#2d2424]">
                    عنوان الصورة
                  </label>

                  <input
                    type="text"
                    value={editTitle}
                    onChange={(event) =>
                      setEditTitle(
                        event.target.value
                      )
                    }
                    className="w-full border-b border-[#d9cbc4] bg-transparent px-1 py-3 text-sm text-[#2d2424] outline-none transition focus:border-[#6B3038]"
                  />
                </div>

                {/* Description */}

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#2d2424]">
                    وصف الصورة
                  </label>

                  <textarea
                    value={editDescription}
                    onChange={(event) =>
                      setEditDescription(
                        event.target.value
                      )
                    }
                    rows={3}
                    className="w-full resize-none border-b border-[#d9cbc4] bg-transparent px-1 py-3 text-sm leading-7 text-[#2d2424] outline-none transition focus:border-[#6B3038]"
                  />
                </div>

                {/* Progress */}

                {(uploading || saving) && (
                  <div className="border border-[#e5d9d2] bg-white p-5">

                    <div className="mb-3 flex items-center justify-between text-xs">
                      <span className="text-[#5f5350]">
                        {uploading
                          ? "جاري رفع الصورة..."
                          : "جاري حفظ التعديلات..."}
                      </span>

                      <span className="font-semibold text-[#6B3038]">
                        {uploading
                          ? `${uploadProgress}%`
                          : "..."}
                      </span>
                    </div>

                    <div className="h-1 bg-[#eee5df]">
                      <div
                        className="h-full bg-[#6B3038]"
                        style={{
                          width: uploading
                            ? `${uploadProgress}%`
                            : "100%",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}

                <div className="flex flex-col-reverse gap-3 border-t border-[#e8ddd7] pt-6 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={
                      closeEditModal
                    }
                    disabled={
                      uploading || saving
                    }
                    className="border border-[#d9cbc4] px-6 py-3 text-sm font-semibold text-[#5f5350] transition hover:border-[#6B3038] hover:text-[#6B3038]"
                  >
                    إلغاء
                  </button>

                  <button
                    type="submit"
                    disabled={
                      uploading || saving
                    }
                    className="inline-flex items-center justify-center gap-2 bg-[#6B3038] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#54252c] disabled:opacity-50"
                  >
                    {uploading ||
                    saving ? (
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                    ) : (
                      <CheckCircle2
                        size={16}
                        strokeWidth={1.5}
                      />
                    )}

                    {uploading
                      ? "جاري الرفع..."
                      : saving
                      ? "جاري الحفظ..."
                      : "حفظ التعديلات"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      {/* ===================================================
          LIGHTBOX
      =================================================== */}

      {selectedImage && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#171212]/95 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close */}

          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-[#2d2424]"
          >
            <X
              size={20}
              strokeWidth={1.4}
            />
          </button>

          {/* Image */}

          <div
            className="relative flex max-h-[94vh] max-w-[1400px] flex-col overflow-hidden bg-[#fffaf5]"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex max-h-[82vh] items-center justify-center bg-[#171212]">
              <img
                src={selectedImage.imageUrl}
                alt={
                  selectedImage.title ||
                  "الصورة"
                }
                className="max-h-[82vh] max-w-full object-contain"
              />
            </div>

            {(selectedImage.title ||
              selectedImage.description) && (
              <div className="border-t border-[#e8ddd7] px-6 py-5 sm:px-8">

                {selectedImage.title && (
                  <h3 className="text-base font-semibold text-[#2d2424]">
                    {selectedImage.title}
                  </h3>
                )}

                {selectedImage.description && (
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-[#756967]">
                    {
                      selectedImage.description
                    }
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;