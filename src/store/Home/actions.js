import {
    FETCH_HOME_DATA_REQUEST,
    FETCH_HOME_DATA_SUCCESS,
    FETCH_HOME_DATA_FAILURE
  } from './actionTypes';
  
  // Request
  export const fetchHomeDataRequest = (params) => ({
    type: FETCH_HOME_DATA_REQUEST,
    payload: params // Optional, if API needs filters or params
  });
  
  // Success
  export const fetchHomeDataSuccess = (data) => ({
    type: FETCH_HOME_DATA_SUCCESS,
    payload: data
  });
  
  // Failure
  export const fetchHomeDataFailure = (error) => ({
    type: FETCH_HOME_DATA_FAILURE,
    payload: error
  });
  