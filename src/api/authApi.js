import axiosInstance from "./axiosintercepter";

export const sendOTP = async (data) => {
  try {
    const response = await axiosInstance.post(`/auth/otp/send`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyOTP = async (data) => {
  try {
    const response = await axiosInstance.post(`/auth/otp/verify`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/auth/customer/password-reset`,
      data
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const OTPLogin = async (data) => {
  try {
    const response = await axiosInstance.post(`/auth/customer/otp-login`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (data) => {
  try {
    const response = await axiosInstance.post(`/auth/customer/login`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (data) => {
  try {
    const response = await axiosInstance.post(`/auth/customer/register`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const regenerateAccessToken = async () => {
  try {
    const response = await axiosInstance.get(`/auth/regenerate-accessToken`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logOut = async () => {
  try {
    const response = await axiosInstance.get(`/auth/logout`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const authGoogle = async () => {
  try {
    const response = await axiosInstance.get(`/auth/google`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const callbackGoogle = async () => {
  try {
    const response = await axiosInstance.get(`/auth/google/callback`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
