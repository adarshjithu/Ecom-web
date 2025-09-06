import { UPDATE_PRODUCT_WISHLIST_STATUS } from '../actions';
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
  LOAD_MORE_WISHLIST_REQUEST,
  LOAD_MORE_WISHLIST_SUCCESS,
  LOAD_MORE_WISHLIST_FAILURE,
  RESET_WISHLIST,
  SET_HAS_MORE_WISHLIST
} from './actionTypes';

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasMore: true,
  loadingMore: false,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 15
  }
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WISHLIST_REQUEST:
    case ADD_TO_WISHLIST_REQUEST:
    case REMOVE_FROM_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: action.payload.wishlist || action.payload,
        currentPage: action.payload.currentPage || 1,
        hasMore: (action.payload.wishlist || action.payload).length === 15,
        pagination: {
          currentPage: action.payload.currentPage || 1,
          totalPages: action.payload.totalPages || 1,
          totalCount: action.payload.totalCount || 0,
          limit: action.payload.limit || 15
        }
      };

    case LOAD_MORE_WISHLIST_REQUEST:
      return {
        ...state,
        loadingMore: true,
        error: null,
      };

    case LOAD_MORE_WISHLIST_SUCCESS:
      return {
        ...state,
        loadingMore: false,
        wishlist: [...state.wishlist, ...(action.payload.wishlist || action.payload)],
        currentPage: action.payload.currentPage || state.currentPage + 1,
        hasMore: (action.payload.wishlist || action.payload).length === 15,
        error: null,
      };

    case LOAD_MORE_WISHLIST_FAILURE:
      return {
        ...state,
        loadingMore: false,
        error: action.payload,
      };

    case FETCH_WISHLIST_FAILURE:
    case ADD_TO_WISHLIST_FAILURE:
    case REMOVE_FROM_WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };

    case REMOVE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: state.wishlist.filter((item) => item._id !== action.payload),
      };

    case RESET_WISHLIST:
      return {
        ...state,
        wishlist: [],
        currentPage: 1,
        hasMore: true,
        loadingMore: false
      };

    case SET_HAS_MORE_WISHLIST:
      return {
        ...state,
        hasMore: action.payload
      };

    case UPDATE_PRODUCT_WISHLIST_STATUS:
      return {
        ...state,
        wishlist: action.payload.inWishlist ? [...state.wishlist,{_id:action.payload?.productId,wishlist:true}] : state.wishlist.filter(product =>
          product._id !== action.payload.productId
        ),
      };

    default:
      return state;
  }
};

export default wishlistReducer;
