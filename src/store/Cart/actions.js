import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
  UPDATE_CART_QUANTITY_REQUEST,
  UPDATE_CART_QUANTITY_SUCCESS,
  UPDATE_CART_QUANTITY_FAILURE,
  CLEAR_CART,
  SET_CART_LOADING
} from './actionTypes';

// Add to cart actions
export const addToCartRequest = (productData) => ({
  type: ADD_TO_CART_REQUEST,
  payload: productData
});

export const addToCartSuccess = (cart) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: cart
});

export const addToCartFailure = (error) => ({
  type: ADD_TO_CART_FAILURE,
  payload: error
});

// Get cart actions
export const getCartRequest = () => ({
  type: GET_CART_REQUEST
});

export const getCartSuccess = (cart) => ({
  type: GET_CART_SUCCESS,
  payload: cart
});

export const getCartFailure = (error) => ({
  type: GET_CART_FAILURE,
  payload: error
});

// Remove from cart actions
export const removeFromCartRequest = (productId, variantId) => ({
  type: REMOVE_FROM_CART_REQUEST,
  payload: { productId, variantId }
});

export const removeFromCartSuccess = (cart) => ({
  type: REMOVE_FROM_CART_SUCCESS,
  payload: cart
});

export const removeFromCartFailure = (error) => ({
  type: REMOVE_FROM_CART_FAILURE,
  payload: error
});

// Update cart quantity actions
export const updateCartQuantityRequest = (productId, variantId, action) => ({
  type: UPDATE_CART_QUANTITY_REQUEST,
  payload: { productId, variantId, action }
});

export const updateCartQuantitySuccess = (cart) => ({
  type: UPDATE_CART_QUANTITY_SUCCESS,
  payload: cart
});

export const updateCartQuantityFailure = (error) => ({
  type: UPDATE_CART_QUANTITY_FAILURE,
  payload: error
});

// Clear cart action
export const clearCart = () => ({
  type: CLEAR_CART
});

// Set cart loading action
export const setCartLoading = (loading) => ({
  type: SET_CART_LOADING,
  payload: loading
});



