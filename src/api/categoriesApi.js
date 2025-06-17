import axiosInstance from "./axiosintercepter";

export const getCategories = async (params) => {
  try {
    const response = await axiosInstance.get(`/categories/user`, { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
