import api from "./api";

// =========================================================
// BUSINESS
// =========================================================

// جلب بيانات النشاط
export const getProviderBusiness = async () => {
  const response = await api.get("/provider/business");
  return response.data;
};

// إنشاء النشاط
export const createProviderBusiness = async (businessData) => {
  const response = await api.post(
    "/provider/business",
    businessData
  );

  return response.data;
};

// تحديث النشاط
export const updateProviderBusiness = async (businessData) => {
  const response = await api.put(
    "/provider/business",
    businessData
  );

  return response.data;
};

// =========================================================
// PROVIDER CONFIG
// =========================================================

// جلب إعدادات نوع مزود الخدمة
export const getProviderConfig = async () => {
  const response = await api.get("/provider/config");
  return response.data;
};

// =========================================================
// CATALOG
// =========================================================

// جلب المنتجات / الخدمات
export const getProviderCatalog = async () => {
  const response = await api.get("/provider/catalog");
  return response.data;
};

// إضافة منتج / خدمة
export const createCatalogItem = async (itemData) => {
  const response = await api.post(
    "/provider/catalog",
    itemData
  );

  return response.data;
};

// تحديث منتج / خدمة
export const updateCatalogItem = async (
  itemId,
  itemData
) => {
  const response = await api.put(
    `/provider/catalog/${itemId}`,
    itemData
  );

  return response.data;
};

// حذف منتج / خدمة
export const deleteCatalogItem = async (itemId) => {
  const response = await api.delete(
    `/provider/catalog/${itemId}`
  );

  return response.data;
};

// =========================================================
// PACKAGES
// =========================================================

// جلب الباقات
export const getProviderPackages = async () => {
  const response = await api.get("/provider/packages");
  return response.data;
};

// إنشاء باقة
export const createProviderPackage = async (
  packageData
) => {
  const response = await api.post(
    "/provider/packages",
    packageData
  );

  return response.data;
};

// تحديث باقة
export const updateProviderPackage = async (
 packageId,
 packageData
) => {
  const response = await api.put(
    `/provider/packages/${packageId}`,
    packageData
  );

  return response.data;
};

// حذف باقة
export const deleteProviderPackage = async (
  packageId
) => {
  const response = await api.delete(
    `/provider/packages/${packageId}`
  );

  return response.data;
};

// =========================================================
// MEDIA
// =========================================================

// جلب الصور والريلز
export const getProviderMedia = async () => {
  const response = await api.get("/provider/media");
  return response.data;
};

// إضافة صورة / Reel
export const createProviderMedia = async (
  mediaData
) => {
  const response = await api.post(
    "/provider/media",
    mediaData
  );

  return response.data;
};

// حذف صورة / Reel
export const deleteProviderMedia = async (
 mediaId
) => {
  const response = await api.delete(
    `/provider/media/${mediaId}`
  );

  return response.data;
};