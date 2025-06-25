import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile.jsx";
import AppMobile from "@/AppMobile.jsx";
import LoginPage from "@/pages/Mobile/Login";
import Home from "@/pages/Mobile/Home";
import PrivateRoute from "./PrivateRoute";
import Category from "@/pages/Mobile/Category";
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

const mobileRouter = createBrowserRouter([
  {
    path: "/",
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
    path: "/",
    element: <AppMobile />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          { path: "home", element: <Home /> },
          { path: "category", element: <Category /> },
          { path: "product-list", element: <AllProduct /> },
          { path: "product", element: <Product /> },
          { path: "cart", element: <Cart /> },
          { path: "checkout", element: <Payment /> },
          { path: "notifications", element: <Notifications /> },
          { path: "location", element: <AddressScreen /> },
          { path: "profile", element: <Profile /> },
          { path: "edit-profile", element: <EditProfile /> },
        ],
      },
    ],
  },
]);

const desktopRouter = createBrowserRouter([
  {
    path: "/",
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
    path: "/",
    element: <AppDesktop />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "category", element: <Category desktop /> },
      { path: "/home", element: <HomePage /> },
      { path: "checkout", element: <Payment /> },
      { path: "product", element: <ProductDetail /> },
    ],
  },
]);

function App() {
  const isMobile = useIsMobile();
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "bg-white text-gray-900 rounded shadow-lg",
          style: {
            border: "1px solid #e5e7eb",
            padding: "16px",
          },
        }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={isMobile ? mobileRouter : desktopRouter} />
      </Suspense>
    </>
  );
}

export default App;
