import { CLEAR_FILTERS, FETCH_FILTERS_FAILURE, FETCH_FILTERS_REQUEST, FETCH_FILTERS_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, SET_FILTERS, SET_LIMIT, SET_PAGE, SET_SORT, LOAD_MORE_PRODUCTS_REQUEST, LOAD_MORE_PRODUCTS_SUCCESS, LOAD_MORE_PRODUCTS_FAILURE, RESET_PRODUCTS, SET_HAS_MORE } from "./actionTypes";


// Action Creators
export const fetchProductsRequest = (params) => ({
  type: FETCH_PRODUCTS_REQUEST,
  payload: params
});

export const fetchProductsSuccess = (data) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: data
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error
});

export const fetchFiltersRequest = (params) => ({
  type: FETCH_FILTERS_REQUEST,
  payload: params
});

export const fetchFiltersSuccess = (data) => ({
  type: FETCH_FILTERS_SUCCESS,
  payload: data
});

export const fetchFiltersFailure = (error) => ({
  type: FETCH_FILTERS_FAILURE,
  payload: error
});

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS
});

export const setSort = (sortBy, sortOrder) => ({
  type: SET_SORT,
  payload: { sortBy, sortOrder }
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit
});

// Infinite Scroll Actions
export const loadMoreProductsRequest = () => ({
  type: LOAD_MORE_PRODUCTS_REQUEST
});

export const loadMoreProductsSuccess = (data) => ({
  type: LOAD_MORE_PRODUCTS_SUCCESS,
  payload: data
});

export const loadMoreProductsFailure = (error) => ({
  type: LOAD_MORE_PRODUCTS_FAILURE,
  payload: error
});

export const resetProducts = () => ({
  type: RESET_PRODUCTS
});

export const setHasMore = (hasMore) => ({
  type: SET_HAS_MORE,
  payload: hasMore
}); 