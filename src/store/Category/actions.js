import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_SUBCATEGORIES_REQUEST,
  GET_SUBCATEGORIES_SUCCESS,
  GET_SUBCATEGORIES_FAILURE,
  GET_PRODUCTS_BY_CATEGORY_REQUEST,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY_FAILURE,
  SET_SELECTED_CATEGORY,
  SET_SELECTED_SUBCATEGORY,
  CLEAR_PRODUCTS,
  LOAD_MORE_PRODUCTS_BY_CATEGORY_REQUEST,
  LOAD_MORE_PRODUCTS_BY_CATEGORY_SUCCESS,
  LOAD_MORE_PRODUCTS_BY_CATEGORY_FAILURE,
  SET_HAS_MORE_PRODUCTS
} from './actionTypes';

// Category Actions
export const getCategoriesRequest = () => ({
  type: GET_CATEGORIES_REQUEST
});

export const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories
});

export const getCategoriesFailure = (error) => ({
  type: GET_CATEGORIES_FAILURE,
  payload: error
});

// Subcategory Actions
export const getSubcategoriesRequest = (parentId) => ({
  type: GET_SUBCATEGORIES_REQUEST,
  payload: parentId
});

export const getSubcategoriesSuccess = (subcategories) => ({
  type: GET_SUBCATEGORIES_SUCCESS,
  payload: subcategories
});

export const getSubcategoriesFailure = (error) => ({
  type: GET_SUBCATEGORIES_FAILURE,
  payload: error
});

// Product Actions
export const getProductsByCategoryRequest = (categoryId, page = 1) => ({
  type: GET_PRODUCTS_BY_CATEGORY_REQUEST,
  payload: { categoryId, page }
});

export const getProductsByCategorySuccess = (products) => ({
  type: GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  payload: products
});

export const getProductsByCategoryFailure = (error) => ({
  type: GET_PRODUCTS_BY_CATEGORY_FAILURE,
  payload: error
});

// Infinite Scroll Actions
export const loadMoreProductsByCategoryRequest = (categoryId, page) => ({
  type: LOAD_MORE_PRODUCTS_BY_CATEGORY_REQUEST,
  payload: { categoryId, page }
});

export const loadMoreProductsByCategorySuccess = (products) => ({
  type: LOAD_MORE_PRODUCTS_BY_CATEGORY_SUCCESS,
  payload: products
});

export const loadMoreProductsByCategoryFailure = (error) => ({
  type: LOAD_MORE_PRODUCTS_BY_CATEGORY_FAILURE,
  payload: error
});

export const setHasMoreProducts = (hasMore) => ({
  type: SET_HAS_MORE_PRODUCTS,
  payload: hasMore
});

// UI State Actions
export const setSelectedCategory = (category) => ({
  type: SET_SELECTED_CATEGORY,
  payload: category
});

export const setSelectedSubcategory = (subcategory) => ({
  type: SET_SELECTED_SUBCATEGORY,
  payload: subcategory
});

export const clearProducts = () => ({
  type: CLEAR_PRODUCTS
}); 