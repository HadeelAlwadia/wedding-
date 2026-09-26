import api from "./api";

export const getHalls = () => {
  return api.get("/halls");
};

export const getHallById = (id) => {
  return api.get(`/halls/${id}`);
};