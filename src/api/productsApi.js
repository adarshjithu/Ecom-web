import axiosInstance from "./axiosintercepter";

export const getProducts = async (params) => {
  try {
    const response = await axiosInstance.get(`/products`, { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
