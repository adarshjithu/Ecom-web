import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_REQUEST,
  REMOVE_FROM_WISHLIST_REQUEST,
  LOAD_MORE_WISHLIST_REQUEST,
} from './actionTypes';

import {
  fetchWishlistSuccess,
  fetchWishlistFailure,
  addToWishlistSuccess,
  addToWishlistFailure,
  removeFromWishlistSuccess,
  removeFromWishlistFailure,
  loadMoreWishlistSuccess,
  loadMoreWishlistFailure,
} from './actions'; // adjust path as needed

import toast from 'react-hot-toast';
import axiosInstance from '@/api/axiosintercepter';
import { showError, showSuccess } from '@/helpers/notification_helper';
import { updateProductWishlistStatus } from '../actions';

const fetchWishlistApi = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);
  if (params.category) queryParams.append('category', params.category);
  
  const queryString = queryParams.toString();
  const url = queryString ? `/user/wishlist?${queryString}` : `/user/wishlist`;
  
  return await axiosInstance.get(url);
};

const addToWishlistApi = async (productId) => {
  return await axiosInstance.post(`/user/wishlist`, { productId:productId });
};

const removeFromWishlistApi = async (productId) => {
  return await axiosInstance.delete(`/user/wishlist/${productId}`);
};


function* fetchWishlistSaga(action) {
  try {
    const params = action.payload || {};
    const response = yield call(fetchWishlistApi, params);
    yield put(fetchWishlistSuccess(response?.data?.data));
  } catch (error) {
    yield put(fetchWishlistFailure(error?.message));
  }
}

function* loadMoreWishlistSaga(action) {
  try {
    const params = action.payload || {};
    const response = yield call(fetchWishlistApi, params);
    yield put(loadMoreWishlistSuccess(response?.data?.data));
  } catch (error) {
    yield put(loadMoreWishlistFailure(error?.message));
  }
}

function* addToWishlistSaga(action) {
  try {
    const {productId}= action.payload;
    const response = yield call(addToWishlistApi, productId);
    yield put(addToWishlistSuccess(response?.data?.message));
    yield put(updateProductWishlistStatus(productId,true));
    showSuccess('Product added to wishlist!');

  } catch (error) {
    yield put(addToWishlistFailure(error?.message));
  }
}

// Remove from Wishlist
function* removeFromWishlistSaga(action) {
  try {
    const {productId} = action.payload;
    yield call(removeFromWishlistApi, productId);
    yield put(removeFromWishlistSuccess(productId));
    yield put(updateProductWishlistStatus(productId,false))
    showSuccess('Product removed from wishlist!');
  } catch (error) {
    yield put(removeFromWishlistFailure(error?.message));
    showError('Failed to remove from wishlist');
  }
}

// Watcher saga
export default function* wishlistSaga() {
  yield takeLatest(FETCH_WISHLIST_REQUEST, fetchWishlistSaga);
  yield takeLatest(LOAD_MORE_WISHLIST_REQUEST, loadMoreWishlistSaga);
  yield takeLatest(ADD_TO_WISHLIST_REQUEST, addToWishlistSaga);
  yield takeLatest(REMOVE_FROM_WISHLIST_REQUEST, removeFromWishlistSaga);
}
