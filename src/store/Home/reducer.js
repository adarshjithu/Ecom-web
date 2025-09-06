import { UPDATE_PRODUCT_WISHLIST_STATUS } from '../actions';
import {
    FETCH_HOME_DATA_REQUEST,
    FETCH_HOME_DATA_SUCCESS,
    FETCH_HOME_DATA_FAILURE
  } from './actionTypes';
  
  const initialState = {
    loading: false,
    homeDetails: null,  // could hold { banners: [], categories: [], featuredProducts: [] }
    error: null
  };
  
  const homeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_HOME_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_HOME_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          homeDetails: action.payload,
          error: null
        };
  
      case FETCH_HOME_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default homeReducer;
  