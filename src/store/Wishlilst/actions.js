import {
  FETCH_WISHLIST_REQUEST,
  FETCH_WISHLIST_SUCCESS,
  FETCH_WISHLIST_FAILURE,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_FAILURE,
  REMOVE_FROM_WISHLIST_REQUEST,
  REMOVE_FROM_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_FAILURE,
  LOAD_MORE_WISHLIST_SUCCESS,
  LOAD_MORE_WISHLIST_FAILURE,
} from './actionTypes';

export const fetchWishlistRequest = (params = {}) => ({
  type: FETCH_WISHLIST_REQUEST,
  payload: params,
});

export const fetchWishlistSuccess = (wishlist) => ({
  type: FETCH_WISHLIST_SUCCESS,
  payload: wishlist,
});

export const fetchWishlistFailure = (error) => ({
  type: FETCH_WISHLIST_FAILURE,
  payload: error,
});

export const addToWishlistRequest = (productId) => ({
  type: ADD_TO_WISHLIST_REQUEST,
  payload: {productId},
});

export const addToWishlistSuccess = (message) => ({
  type: ADD_TO_WISHLIST_SUCCESS,
  payload: message,
});

export const addToWishlistFailure = (error) => ({
  type: ADD_TO_WISHLIST_FAILURE,
  payload: error,
});

export const removeFromWishlistRequest = (productId) => ({
  type: REMOVE_FROM_WISHLIST_REQUEST,
  payload: {productId},
});

export const removeFromWishlistSuccess = (productId) => ({
  type: REMOVE_FROM_WISHLIST_SUCCESS,
  payload: productId,
});

export const removeFromWishlistFailure = (error) => ({
  type: REMOVE_FROM_WISHLIST_FAILURE,
  payload: error,
});

export const loadMoreWishlistSuccess = (wishlist) => ({
  type: LOAD_MORE_WISHLIST_SUCCESS,
  payload: wishlist,
});

export const loadMoreWishlistFailure = (error) => ({
  type: LOAD_MORE_WISHLIST_FAILURE,
  payload: error,
});
