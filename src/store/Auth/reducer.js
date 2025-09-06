// src/store/auth/authReducer.js
import {
    SET_AUTH,
    CLEAR_AUTH,
    AUTH_FAILURE,
  } from './actionTypes';
  
  const initialState = {
    isAuthenticated: false,
    user: null,
    error: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_AUTH:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          error: null
        };
  
      case CLEAR_AUTH:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: null
        };
  
      case AUTH_FAILURE:
        return {
          ...state,
          error: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  