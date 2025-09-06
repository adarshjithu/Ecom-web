import { all, fork } from "redux-saga/effects";

import AddressSaga from "./Address/saga";
import { categorySaga } from "./Category/saga";
import ProductSaga from "./Product/saga"
import WishlistSaga from "./Wishlilst/saga"
import HomeSaga from "./Home/saga";
import CartSaga from "./Cart/saga";
export default function* rootSaga(){
    yield all([
        AddressSaga(),
        categorySaga(),
        ProductSaga(),
        WishlistSaga(),
        HomeSaga(),
        CartSaga()
    ])
}