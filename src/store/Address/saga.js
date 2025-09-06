// addressSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';

import {
  FETCH_ADDRESSES_REQUEST,
  ADD_ADDRESS_REQUEST,
  UPDATE_ADDRESS_REQUEST,
  DELETE_ADDRESS_REQUEST,
} from './actionTypes';

import {
  fetchAddressesSuccess,
  fetchAddressesFailure,
  addAddressSuccess,
  addAddressFailure,
  updateAddressSuccess,
  updateAddressFailure,
  deleteAddressSuccess,
  deleteAddressFailure,
  setAddressErrors,
} from './actions'; // adjust the path if needed


import toast from 'react-hot-toast';
import axiosInstance from '@/api/axiosintercepter';

// API calls
const fetchAddressesApi = async () => {
  return await axiosInstance.get(`/user/address`);
};

const addAddressApi = async ({ address }) => {
  return await axiosInstance.post(`/user/address`, address);
};

const updateAddressApi = async ({ id, address }) => {
  return await axiosInstance.put(`/user/address/${id}`, address);
};

const deleteAddressApi = async (addressId) => {
  return await axiosInstance.delete(`/user/address/${addressId}`);
};

// Fetch addresses
function* fetchAddressesSaga(action) {
  try {
    const response = yield call(fetchAddressesApi, action.payload);
    yield put(fetchAddressesSuccess(response?.data?.data));
  } catch (error) {
    yield put(fetchAddressesFailure(error.message));
  }
}

// Add address
function* addAddressSaga(action) {
  try {
    const { address, resetForm } = action.payload;
    const response = yield call(addAddressApi, {address});
    yield put(addAddressSuccess(response.data?.data));
    resetForm?.();
    toast.success('Address Created Successfully!');
    yield put({ type: FETCH_ADDRESSES_REQUEST, payload: customerId });
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.errors) {
      yield put(setAddressErrors(error.response.data.errors));
      yield put(addAddressFailure(error.message));
    }
    yield put(addAddressFailure(error.message));
  }
}

// Update address
function* updateAddressSaga(action) {
  try {
    const { id, address, resetForm } = action.payload;
    const response = yield call(updateAddressApi, { id, address });
    yield put(updateAddressSuccess(response?.data?.data));
    resetForm?.();
    toast.success('Address Updated Successfully!');
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.errors) {
      yield put(setAddressErrors(error.response.data.errors));
      yield put(updateAddressFailure(error.message));
    }
    yield put(updateAddressFailure(error.message));
  }
}

// Delete address
function* deleteAddressSaga(action) {
  try {
    yield call(deleteAddressApi, action.payload);
    yield put(deleteAddressSuccess(action.payload));
    toast.success('Address Deleted Successfully!');
  } catch (error) {
    yield put(deleteAddressFailure(error.message));
  }
}

// Watcher saga
export default function* addressSaga() {
  yield takeLatest(FETCH_ADDRESSES_REQUEST, fetchAddressesSaga);
  yield takeLatest(ADD_ADDRESS_REQUEST, addAddressSaga);
  yield takeLatest(UPDATE_ADDRESS_REQUEST, updateAddressSaga);
  yield takeLatest(DELETE_ADDRESS_REQUEST, deleteAddressSaga);
}
