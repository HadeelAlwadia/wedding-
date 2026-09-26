import api from "./axios";

export const createBusiness = async (businessData) => {
  const response = await api.post("/businesses", businessData);

  return response.data;
};

export const getMyBusiness = async () => {
  const response = await api.get("/businesses/my-business");

  return response.data;
};

export const updateMyBusiness = async (businessData) => {
  const response = await api.put(
    "/businesses/my-business",
    businessData
  );

  return response.data;
};