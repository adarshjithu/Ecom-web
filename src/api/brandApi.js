import axiosInstance from "./axiosintercepter";

export const getBrands = async (params) => {
  try {
    const response = await axiosInstance.get(`/brands`, { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
