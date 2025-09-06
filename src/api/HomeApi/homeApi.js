import axiosInstance from "../axiosintercepter";

export const getHomeDetails = async () => {
  try {
    const response = await axiosInstance.get(`/user/home`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
