import axiosInstance from './axiosintercepter';

// Add product to cart
export const addToCart = async (productData) => {
  try {
    const response = await axiosInstance.post('/user/cart', productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get latest cart
export const getCart = async () => {
  try {
    const response = await axiosInstance.get('/user/cart');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Remove product from cart
export const removeFromCart = async (productId, variantId) => {
  try {
    const response = await axiosInstance.delete(`/user/cart?productId=${productId}&variantId=${variantId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update product quantity (increment/decrement)
export const updateCartQuantity = async (productId, variantId, action) => {
  try {
    const response = await axiosInstance.patch(`/user/cart/update-quantity?productId=${productId}&variantId=${variantId}&action=${action}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};



