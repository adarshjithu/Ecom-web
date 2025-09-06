import axiosInstance from './axiosintercepter';
import qs from 'qs';

export const getProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`/user/product/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const response = await axiosInstance.get(`/user/product/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/user/products', { params,paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }) });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchProducts = async (query, params = {}) => {
  try {
    const response = await axiosInstance.get('/user/products/search', { 
      params: { ...params, q: query } 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search products using the specific endpoint
export const searchProductsForHeader = async (searchQuery) => {
  try {
    const response = await axiosInstance.get(`/user/product/search?search=${searchQuery}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get available filters (brands and categories)
export const getFilters = async (params) => {
  try {
    const response = await axiosInstance.get('/user/products/filters', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 