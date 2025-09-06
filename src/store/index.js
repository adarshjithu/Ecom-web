import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./saga"
import rootReducer from "./reducers"
import Cookies from "js-cookie"

// Pre-load auth state from cookies for immediate availability
const preloadedState = {
  Auth: {
    isAuthenticated: false,
    user: null,
    error: null
  }
};

// Check if user exists in cookies and set initial auth state
const userCookie = Cookies.get("user");
if (userCookie) {
  try {
    const user = JSON.parse(userCookie);
    preloadedState.Auth = {
      isAuthenticated: true,
      user: user,
      error: null
    };
  } catch (error) {
    console.error("Error parsing user cookie:", error);
    // If cookie is invalid, remove it
    Cookies.remove("user");
  }
}

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)

export default store
