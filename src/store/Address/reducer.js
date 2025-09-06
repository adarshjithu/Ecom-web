// addressReducer.js

import {
  FETCH_ADDRESSES_REQUEST,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_FAILURE,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  SET_ADDRESS_ERRORS,
} from './actionTypes';

const initialState = {
  addresses: [],
  loading: false,
  error: null,
  fieldErrors: {},
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADDRESSES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: action.payload,
      };
    case FETCH_ADDRESSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_ADDRESS_REQUEST:
    case UPDATE_ADDRESS_REQUEST:
    case DELETE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
         addresses: action.payload.isDefault
      ? [
          ...state.addresses.map(addr => ({ ...addr, isDefault: false })),
          action.payload
        ]
      : [...state.addresses, action.payload],
        fieldErrors: {},
      };
    case ADD_ADDRESS_FAILURE:
    case UPDATE_ADDRESS_FAILURE:
    case DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
       addresses: action.payload.isDefault
        ? state.addresses.map(addr =>
            addr._id === action.payload._id
              ? action.payload
              : { ...addr, isDefault: false } // make others false
          )
        : state.addresses.map(addr =>
            addr._id === action.payload._id ? action.payload : addr
          ),
        fieldErrors: {},
      };

    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: state.addresses.filter((addr) =>addr._id != action.payload),
      };

    case SET_ADDRESS_ERRORS:
      return {
        ...state,
        fieldErrors: action.payload,
      };

    default:
      return state;
  }
};

export default addressReducer;
