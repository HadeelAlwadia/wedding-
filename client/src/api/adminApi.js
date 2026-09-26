import api from "./api";

export const getAdminStats = async () => {
  const response = await api.get("/admin/stats");
  return response.data;
};

export const getPendingRequests = async () => {
  const response = await api.get("/admin/requests");
  return response.data;
};

export const approveProvider = async (id) => {
  const response = await api.patch(`/admin/requests/${id}/approve`);
  return response.data;
};

export const rejectProvider = async (id) => {
  const response = await api.patch(`/admin/requests/${id}/reject`);
  return response.data;
};

// Get all approved providers
export const getProviders = async () => {
  const response = await api.get("/admin/providers");
  return response.data;
};

// Get provider details
export const getInfoProvider = async (id) => {
  const response = await api.get(`/admin/providers/${id}`);
  return response.data;
};

// Create admin staff
export const createAdminStaff = async (data) => {
  const response = await api.post("/admin/staff", data);
  return response.data;
};

// Get admin staff
export const getAdminStaff = async () => {
  const response = await api.get("/admin/staff");
  return response.data;
};