import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import AppMobile from "@/AppMobile.jsx";
import LoginPage from "@/pages/Mobile/Login";
import PrivateRoute from "./PrivateRoute";
import Category from "@/pages/Mobile/Category";
import Categories from "@/pages/Mobile/Category";
import AllProduct from "@/pages/Mobile/Product/AllProduct";
import Product from "@/pages/Mobile/Product";
import Cart from "@/pages/Mobile/cart";
import Payment from "@/pages/Mobile/Payment";
import Notifications from "@/pages/Mobile/Notification";
import AddressScreen from "@/pages/Mobile/Address";
import Profile from "@/pages/Mobile/Profile";
import EditProfile from "@/components/mobile/EditProfile";
import AppDesktop from "@/AppDesktop";
import HomePage from "@/pages/home/HomePage";
import ProductDetail from "@/components/desktop/ProductDetail";
import { Toaster } from "react-hot-toast";
import Register from "@/pages/Register";
import RegisterSuccessfull from "@/pages/Register/RegisterSuccessfull";
import VerificationScreen from "@/pages/Mobile/Login/VerificationScreen";
import OTPScreen from "@/pages/Mobile/Login/OTPScreen";
import ProductDetails from "@/components/desktop/home/ProductDetails";
import ProductDetailMobile from "@/components/mobile/product/ProductDetailMobile";
import Wishlist from "@/pages/Wishlist";
import OrderPage from "@/pages/OrderPage";
import OrderSuccess from "@/pages/OrderSuccess";
import NotFoundPage from "@/pages/404";
import CollectionPage from "@/pages/Collections";
import BrandsPage from "@/pages/Brands";
import ResetPassword from "@/pages/Mobile/Login/ResetPassword";


const desktopRouter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-successfull",
    element: <RegisterSuccessfull />,
  },
  {
    path: "/verify",
    element: <VerificationScreen />,
  },
  {
    path: "/otp",
    element: <OTPScreen />,
  },
  {
    path: "/reset-password/:id",
    element:<ResetPassword />
  },
  {
    path: "/",
    element: <AppDesktop />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "category", element: <Categories /> },
      {path:"/products",element:<ProductDetails />},
      { path: "product/:productId", element: <ProductDetail /> },
      { path: "product/slug/:slug", element: <ProductDetail /> },
      { path: "test-product", element: <ProductDetail /> },
      { path: "product-list", element: <AllProduct /> },
      {path:"collections/:id",element:<CollectionPage />},
      {path:"brands",element:<BrandsPage />},
      // { path: "cart", element: <Cart /> },
      { path: "notifications", element: <Notifications /> },
      // { path: "location", element: <AddressScreen /> },
      // { path: "profile", element: <Profile /> },
      // { path: "edit-profile", element: <EditProfile /> },
      {element:<PrivateRoute />, children:[
          { path: "checkout", element: <Payment /> },
          { path: "wishlist", element: <Wishlist /> },
          { path: "orders", element: <OrderPage /> },
          {path:"order-success",element:<OrderSuccess />}
      ]},
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={desktopRouter} />
      </Suspense>
    </>
  );
}

export default App;
