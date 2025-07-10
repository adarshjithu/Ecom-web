import axiosInstance from "./axiosintercepter";

export const getProducts = async (params) => {
  try {
    const response = await axiosInstance.get(`/products`, { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProductsDealOfTheDay = async (params) => {
  try {
    const response = await axiosInstance.get(`/products/deal-of-the-day`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProductsFeatured = async (params) => {
  try {
    const response = await axiosInstance.get(`/products/featured`, { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSimilarProducts = async (id, params) => {
  try {
    const response = await axiosInstance.get(`/products/${id}/similar`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getRecommendedProducts = async (id, params) => {
  try {
    const response = await axiosInstance.get(`/products/${id}/recommended`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProductsByBrand = async (id, params) => {
  try {
    const response = await axiosInstance.get(`/products/brand/${id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProductsByCategory = async (id, params) => {
  try {
    const response = await axiosInstance.get(`/products/category/${id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProductsBySearch = async (params) => {
  try {
    const response = await axiosInstance.get(`/products/search`, { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
