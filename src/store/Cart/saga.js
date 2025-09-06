import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { showError, showSuccess } from '@/helpers/notification_helper';
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity
} from '@/api/cartApi';
import {
  ADD_TO_CART_REQUEST,
  GET_CART_REQUEST,
  REMOVE_FROM_CART_REQUEST,
  UPDATE_CART_QUANTITY_REQUEST
} from './actionTypes';
import {
  addToCartSuccess,
  addToCartFailure,
  getCartSuccess,
  getCartFailure,
  removeFromCartSuccess,
  removeFromCartFailure,
  updateCartQuantitySuccess,
  updateCartQuantityFailure
} from './actions';

// Add to cart saga
function* addToCartSaga(action) {
  try {
    const response = yield call(addToCart, action.payload);
    yield put(addToCartSuccess(response));
    
    if (response.success) {
      showSuccess(response.message || 'Product added to cart successfully');
    }
  } catch (error) {
    yield put(addToCartFailure(error));
    showError(error?.message || 'Failed to add product to cart');
  }
}

// Get cart saga
function* getCartSaga() {
  try {
    const response = yield call(getCart);
    yield put(getCartSuccess(response));
  } catch (error) {
    yield put(getCartFailure(error));
    // Don't show error for get cart as it might be called frequently
    console.error('Failed to get cart:', error);
  }
}

// Remove from cart saga
function* removeFromCartSaga(action) {
  try {
    const { productId, variantId } = action.payload;
    const response = yield call(removeFromCart, productId, variantId);
    yield put(removeFromCartSuccess(response));
    
    if (response.success) {
      showSuccess(response.message || 'Product removed from cart successfully');
    }
  } catch (error) {
    yield put(removeFromCartFailure(error));
    showError(error?.message || 'Failed to remove product from cart');
  }
}

// Update cart quantity saga
function* updateCartQuantitySaga(action) {
  try {
    const { productId, variantId, action: quantityAction } = action.payload;
    const response = yield call(updateCartQuantity, productId, variantId, quantityAction);
    yield put(updateCartQuantitySuccess(response));
    
    if (response.success) {
      // Optional: Show success message for quantity updates
      showSuccess(response.message || `Product quantity updated successfully`);
    }
  } catch (error) {
    yield put(updateCartQuantityFailure(error));
    showError(error?.message || 'Failed to update product quantity');
  }
}

// Watcher sagas
export default function* cartSaga() {
  yield takeEvery(ADD_TO_CART_REQUEST, addToCartSaga);
  yield takeLatest(GET_CART_REQUEST, getCartSaga);
  yield takeEvery(REMOVE_FROM_CART_REQUEST, removeFromCartSaga);
  yield takeEvery(UPDATE_CART_QUANTITY_REQUEST, updateCartQuantitySaga);
}



