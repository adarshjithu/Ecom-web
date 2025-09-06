import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
  UPDATE_CART_QUANTITY_REQUEST,
  UPDATE_CART_QUANTITY_SUCCESS,
  UPDATE_CART_QUANTITY_FAILURE,
  CLEAR_CART,
  SET_CART_LOADING
} from './actionTypes';

const initialState = {
  cart: null,
  items: [],
  totalMRP: 0,
  totalPrice: 0,
  savedAmount: 0,
  itemCount: 0,
  
  // Loading states
  loading: false,
  addingToCart: false,
  removingFromCart: false,
  updatingQuantity: false,
  
  // Error states
  error: null,
  addToCartError: null,
  removeFromCartError: null,
  updateQuantityError: null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add to cart
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        addingToCart: true,
        addToCartError: null
      };
    
    case ADD_TO_CART_SUCCESS:
      const addCart = action.payload.cart || action.payload;
      return {
        ...state,
        cart: addCart,
        items: addCart?.items || [],
        totalMRP: addCart?.totalMRP || 0,
        totalPrice: addCart?.totalPrice || 0,
        savedAmount: addCart?.savedAmount || 0,
        itemCount: addCart?.items?.reduce((count, item) => count + item.quantity, 0) || 0,
        addingToCart: false,
        addToCartError: null
      };
    
    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        addingToCart: false,
        addToCartError: action.payload
      };

    // Get cart
    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case GET_CART_SUCCESS:
      const getCart = action.payload.cart || action.payload;
      return {
        ...state,
        cart: getCart,
        items: getCart?.items || [],
        totalMRP: getCart?.totalMRP || 0,
        totalPrice: getCart?.totalPrice || 0,
        savedAmount: getCart?.savedAmount || 0,
        itemCount: getCart?.items?.reduce((count, item) => count + item.quantity, 0) || 0,
        loading: false,
        error: null
      };
    
    case GET_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // Remove from cart
    case REMOVE_FROM_CART_REQUEST:
      return {
        ...state,
        removingFromCart: true,
        removeFromCartError: null
      };
    
    case REMOVE_FROM_CART_SUCCESS:
      const removeCart = action.payload.cart || action.payload;
      return {
        ...state,
        cart: removeCart,
        items: removeCart?.items || [],
        totalMRP: removeCart?.totalMRP || 0,
        totalPrice: removeCart?.totalPrice || 0,
        savedAmount: removeCart?.savedAmount || 0,
        itemCount: removeCart?.items?.reduce((count, item) => count + item.quantity, 0) || 0,
        removingFromCart: false,
        removeFromCartError: null
      };
    
    case REMOVE_FROM_CART_FAILURE:
      return {
        ...state,
        removingFromCart: false,
        removeFromCartError: action.payload
      };

    // Update cart quantity
    case UPDATE_CART_QUANTITY_REQUEST:
      return {
        ...state,
        updatingQuantity: true,
        updateQuantityError: null
      };
    
    case UPDATE_CART_QUANTITY_SUCCESS:
      const updateCart = action.payload.cart || action.payload;
      return {
        ...state,
        cart: updateCart,
        items: updateCart?.items || [],
        totalMRP: updateCart?.totalMRP || 0,
        totalPrice: updateCart?.totalPrice || 0,
        savedAmount: updateCart?.savedAmount || 0,
        itemCount: updateCart?.items?.reduce((count, item) => count + item.quantity, 0) || 0,
        updatingQuantity: false,
        updateQuantityError: null
      };
    
    case UPDATE_CART_QUANTITY_FAILURE:
      return {
        ...state,
        updatingQuantity: false,
        updateQuantityError: action.payload
      };

    // Clear cart
    case CLEAR_CART:
      return {
        ...initialState
      };

    // Set cart loading
    case SET_CART_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

export default cartReducer;



