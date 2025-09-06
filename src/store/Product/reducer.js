import { UPDATE_PRODUCT_WISHLIST_STATUS } from '../actions';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_FILTERS_REQUEST,
  FETCH_FILTERS_SUCCESS,
  FETCH_FILTERS_FAILURE,
  SET_FILTERS,
  CLEAR_FILTERS,
  SET_SORT,
  SET_PAGE,
  SET_LIMIT,
  LOAD_MORE_PRODUCTS_REQUEST,
  LOAD_MORE_PRODUCTS_SUCCESS,
  LOAD_MORE_PRODUCTS_FAILURE,
  RESET_PRODUCTS,
  SET_HAS_MORE
} from './actionTypes';

const initialState = {
  // Products state
  products: [],
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  totalPages: 1,
  
  // Filters state
  filters: {
    categories: [],
    brands: []
  },
  filtersLoading: false,
  filtersError: null,
  availableFilters: {
    brands: [],
    categories: []
  },
  
  // Sort and pagination
  sortBy: 'createdAt',
  sortOrder: 'desc',
  limit: 15, // Changed to 15 for infinite scroll
  
  // Infinite scroll state
  loadingMore: false,
  hasMore: true
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data,
        totalCount: action.payload.totalCount,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        hasMore: action.payload.data.length === state.limit,
        error: null
      };
    
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case LOAD_MORE_PRODUCTS_REQUEST:
      return {
        ...state,
        loadingMore: true,
        error: null
      };
    
    case LOAD_MORE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loadingMore: false,
        products: [...state.products, ...action.payload.data],
        currentPage: action.payload.currentPage,
        hasMore: action.payload.data.length === state.limit,
        error: null
      };
    
    case LOAD_MORE_PRODUCTS_FAILURE:
      return {
        ...state,
        loadingMore: false,
        error: action.payload
      };

    case RESET_PRODUCTS:
      return {
        ...state,
        products: [],
        currentPage: 1,
        hasMore: true,
        loadingMore: false
      };

    case SET_HAS_MORE:
      return {
        ...state,
        hasMore: action.payload
      };
    
    case FETCH_FILTERS_REQUEST:
      return {
        ...state,
        filtersLoading: true,
        filtersError: null
      };
    
    case FETCH_FILTERS_SUCCESS:
      return {
        ...state,
        filtersLoading: false,
        availableFilters: action.payload.data,
        filtersError: null
      };
    
    case FETCH_FILTERS_FAILURE:
      return {
        ...state,
        filtersLoading: false,
        filtersError: action.payload
      };
    
    case SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          categories: [],
          brands: []
        }
      };
    
    case SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder
      };
    
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      };
    
    default:
      return state;
  }
};

export default productReducer; 