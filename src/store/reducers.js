import {combineReducers} from "redux";

import Address from './Address/reducer'
import Category from './Category/reducer'
import Product from "./Product/reducer";
import Wishlist from "./Wishlilst/reducer";
import Auth from "./Auth/reducer";
import Home from "./Home/reducer";
import Cart from "./Cart/reducer";
const rootReducer = combineReducers({
    Address,
    Category,
    Product,
    Wishlist,
    Auth,
    Home,
    Cart
})

export default rootReducer;