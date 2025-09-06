import { call, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
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
  LOAD_MORE_PRODUCTS_BY_CATEGORY_REQUEST,
  LOAD_MORE_PRODUCTS_BY_CATEGORY_SUCCESS,
  LOAD_MORE_PRODUCTS_BY_CATEGORY_FAILURE
} from './actionTypes';
import {
  getCategoriesSuccess,
  getCategoriesFailure,
  getSubcategoriesSuccess,
  getSubcategoriesFailure,
  getProductsByCategorySuccess,
  getProductsByCategoryFailure,
  loadMoreProductsByCategorySuccess,
  loadMoreProductsByCategoryFailure
} from './actions';
import axiosInstance from '@/api/axiosintercepter';

// API Functions
const fetchCategoriesAPI = async () => {
  try {
    const response = await axiosInstance.get('/user/categories?type=all');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchSubcategoriesAPI = async (parentId) => {
  try {
    const response = await axiosInstance.get(`/user/categories?type=selected&parent_id=${parentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchProductsByCategoryAPI = async (categoryId, page = 1) => {
  try {
    const response = await axiosInstance.get(`/user/products/category/${categoryId}?page=${page}&limit=15`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Saga Workers
function* fetchCategories() {
  try {
    const response = yield call(fetchCategoriesAPI);
    
    if (response.success) {
      yield put(getCategoriesSuccess(response.data.parentCategories));
    } else {
      yield put(getCategoriesFailure('Failed to fetch categories'));
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    yield put(getCategoriesFailure(error.message || 'Failed to fetch categories'));
  }
}

function* fetchSubcategories(action) {
  try {
    const parentId = action.payload;
    const response = yield call(fetchSubcategoriesAPI, parentId);
    
    if (response.success) {
      yield put(getSubcategoriesSuccess(response.data.subCategories));
    } else {
      yield put(getSubcategoriesFailure('Failed to fetch subcategories'));
    }
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    yield put(getSubcategoriesFailure(error.message || 'Failed to fetch subcategories'));
  }
}

function* fetchProductsByCategory(action) {
  try {
    const { categoryId, page = 1 } = action.payload;
    const response = yield call(fetchProductsByCategoryAPI, categoryId, page);
    
    if (response.success) {
      yield put(getProductsByCategorySuccess(response.data));
    } else {
      yield put(getProductsByCategoryFailure('Failed to fetch products'));
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    yield put(getProductsByCategoryFailure(error.message || 'Failed to fetch products'));
  }
}

function* loadMoreProductsByCategory(action) {
  try {
    const { categoryId, page } = action.payload;
    const response = yield call(fetchProductsByCategoryAPI, categoryId, page);
    
    if (response.success) {
      yield put(loadMoreProductsByCategorySuccess(response.data));
    } else {
      yield put(loadMoreProductsByCategoryFailure('Failed to load more products'));
    }
  } catch (error) {
    console.error('Error loading more products:', error);
    yield put(loadMoreProductsByCategoryFailure(error.message || 'Failed to load more products'));
  }
}

// Saga Watchers
export function* categorySaga() {
  yield takeLatest(GET_CATEGORIES_REQUEST, fetchCategories);
  yield takeLatest(GET_SUBCATEGORIES_REQUEST, fetchSubcategories);
  yield takeLatest(GET_PRODUCTS_BY_CATEGORY_REQUEST, fetchProductsByCategory);
  yield takeLatest(LOAD_MORE_PRODUCTS_BY_CATEGORY_REQUEST, loadMoreProductsByCategory);
} 