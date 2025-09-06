
import {
    SET_AUTH,
    CLEAR_AUTH,
    AUTH_FAILURE,
    LOAD_AUTH_FROM_COOKIES
  } from './actionTypes';
  import Cookies from 'js-cookie';
  
  // Set auth (after login)
  export const setAuth = (user) => {
    Cookies.set('user', JSON.stringify(user));
  
    return {
      type: SET_AUTH,
      payload: { user }
    };
  };
  
  // Clear auth (logout)
  export const clearAuth = () => {
    Cookies.remove('user');
    return {
      type: CLEAR_AUTH
    };
  };
  
  // Auth error
  export const authFailure = (error) => ({
    type: AUTH_FAILURE,
    payload: error
  });
  
  // Load auth from cookies on app init
  export const loadAuthFromCookies = () => {
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  
    if ( user) {
      return {
        type: SET_AUTH,
        payload: {user }
      };
    } else {
      return {
        type: CLEAR_AUTH
      };
    }
  };
  