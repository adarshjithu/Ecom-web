import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_FILTERS_REQUEST,
  LOAD_MORE_PRODUCTS_REQUEST
} from './actionTypes';
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchFiltersSuccess,
  fetchFiltersFailure,
  loadMoreProductsSuccess,
  loadMoreProductsFailure
} from './actions';
import { getProducts, getFilters } from '../../api/productApi';
import qs from 'qs'

// Selector to get current state
const getProductState = (state) => state.Product;

// Worker saga for fetching products
function* fetchProductsSaga(action) {
  try {
    const state = yield select(getProductState);
    const { filters, sortBy, sortOrder, currentPage, limit } = state;
    
    // Build params object
    const params = {
      page: currentPage,
      limit,
      sortBy,
      sortOrder,
      ...action.payload
    };
    
    // Add filters if they exist
    if (filters.categories.length > 0) {
      params.categories= filters.categories;
    }
    if (filters.brands.length > 0) {
      params.brands= filters.brands;
    }
 
    const response = yield call(getProducts, params);
    yield put(fetchProductsSuccess(response));
  } catch (error) {
    yield put(fetchProductsFailure(error.message || 'Failed to fetch products'));
  }
}

// Worker saga for loading more products
function* loadMoreProductsSaga(action) {
  try {
    const state = yield select(getProductState);
    const { filters, sortBy, sortOrder, currentPage, limit } = state;
    
    // Build params object for next page
    const params = {
      page: currentPage + 1,
      limit,
      sortBy,
      sortOrder,
      ...action.payload // Allow override from action
    };
    
    // Add filters if they exist
    if (filters.categories.length > 0) {
      params.categories= filters.categories;
    }
    if (filters.brands.length > 0) {
      params.brands= filters.brands;
    }
    
    const response = yield call(getProducts, params);
    yield put(loadMoreProductsSuccess(response));
  } catch (error) {
    yield put(loadMoreProductsFailure(error.message || 'Failed to load more products'));
  }
}

// Worker saga for fetching filters
function* fetchFiltersSaga(action) {
  try {
    const params = action.payload || {};
    const response = yield call(getFilters, params);
    yield put(fetchFiltersSuccess(response));
  } catch (error) {
    yield put(fetchFiltersFailure(error.message || 'Failed to fetch filters'));
  }
}

// Watcher sagas
export default function* productSaga() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
  yield takeLatest(LOAD_MORE_PRODUCTS_REQUEST, loadMoreProductsSaga);
  yield takeLatest(FETCH_FILTERS_REQUEST, fetchFiltersSaga);
} 