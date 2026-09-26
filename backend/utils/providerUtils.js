const Business = require("../models/Business");

const {
  SERVICE_TYPE_CONFIG,
} = require("../config/serviceTypes");

// =========================================================
// Get Provider Business
// =========================================================

const getProviderBusiness = async (userId) => {
  return await Business.findOne({
    owner: userId,
  });
};

// =========================================================
// Check Catalog Type
// =========================================================

const isCatalogTypeAllowed = (
  serviceType,
  catalogType
) => {
  const config = SERVICE_TYPE_CONFIG[serviceType];

  if (!config) {
    return false;
  }

  return config.catalogTypes.includes(
    catalogType
  );
};

// =========================================================
// Get Service Configuration
// =========================================================

const getServiceConfig = (serviceType) => {
  return SERVICE_TYPE_CONFIG[serviceType] || null;
};

// =========================================================
// Export
// =========================================================

module.exports = {
  getProviderBusiness,
  isCatalogTypeAllowed,
  getServiceConfig,
};