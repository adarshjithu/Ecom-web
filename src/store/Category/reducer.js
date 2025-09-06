import { UPDATE_PRODUCT_WISHLIST_STATUS } from '../actions';
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

const initialState = {
  // Categories
  parentCategories: [],
  subCategories: [],
  products: [],
  
  // UI State
  selectedCategory: null,
  selectedSubcategory: null,
  
  // Loading States
  loadingCategories: false,
  loadingSubcategories: false,
  loadingProducts: false,
  
  // Error States
  categoriesError: null,
  subcategoriesError: null,
  productsError: null,

  // Infinite scroll state
  currentPage: 1,
  hasMore: true,
  loadingMore: false
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    // Categories
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loadingCategories: true,
        categoriesError: null
      };
    
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loadingCategories: false,
        parentCategories: action.payload,
        categoriesError: null
      };
    
    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loadingCategories: false,
        categoriesError: action.payload
      };

    // Subcategories
    case GET_SUBCATEGORIES_REQUEST:
      return {
        ...state,
        loadingSubcategories: true,
        subcategoriesError: null
      };
    
    case GET_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        loadingSubcategories: false,
        subCategories: action.payload,
        subcategoriesError: null,
        selectedSubcategory: null, // Reset selected subcategory when new subcategories are loaded
        products: [] // Clear products when subcategories change
      };
    
    case GET_SUBCATEGORIES_FAILURE:
      return {
        ...state,
        loadingSubcategories: false,
        subcategoriesError: action.payload
      };

    // Products
    case GET_PRODUCTS_BY_CATEGORY_REQUEST:
      return {
        ...state,
        loadingProducts: true,
        productsError: null,
        currentPage: action.payload.page || 1,
        hasMore: true
      };
    
    case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loadingProducts: false,
        products: action.payload.data || action.payload,
        currentPage: action.payload.currentPage || 1,
        hasMore: (action.payload.data || action.payload).length === 15,
        productsError: null
      };

    case LOAD_MORE_PRODUCTS_BY_CATEGORY_REQUEST:
      return {
        ...state,
        loadingMore: true,
        productsError: null
      };
    
    case LOAD_MORE_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loadingMore: false,
        products: [...state.products, ...(action.payload.data || action.payload)],
        currentPage: action.payload.currentPage || state.currentPage + 1,
        hasMore: (action.payload.data || action.payload).length === 15,
        productsError: null
      };
    
    case LOAD_MORE_PRODUCTS_BY_CATEGORY_FAILURE:
      return {
        ...state,
        loadingMore: false,
        productsError: action.payload
      };
    
    case GET_PRODUCTS_BY_CATEGORY_FAILURE:
      return {
        ...state,
        loadingProducts: false,
        productsError: action.payload
      };

    case SET_HAS_MORE_PRODUCTS:
      return {
        ...state,
        hasMore: action.payload
      };

    // UI State
    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
        selectedSubcategory: null,
        subCategories: [], // Clear subcategories when parent changes
        products: [],
        currentPage: 1,
        hasMore: true,
        loadingMore: false
      };
    
    case SET_SELECTED_SUBCATEGORY:
      return {
        ...state,
        selectedSubcategory: action.payload,
        currentPage: 1,
        hasMore: true,
        loadingMore: false
      };
    
    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: [],
        currentPage: 1,
        hasMore: true,
        loadingMore: false
      };

    default:
      return state;
  }
};

export default categoryReducer; 