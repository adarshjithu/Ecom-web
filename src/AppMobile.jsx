import React from "react";
import Notifications from "./pages/Mobile/Notification";
import AddressScreen from "./pages/Mobile/Address";
import LoginPage from "./pages/Mobile/Login";
import Payment from "./pages/Mobile/Payment";
import Footer from "./layout/Footer";
import Profile from "./pages/Mobile/Profile";
import Home from "./pages/Mobile/Home";

function AppMobile() {
  return (
    <div>
      <LoginPage />
      <Home/>
      <Notifications />
      <AddressScreen />
      <Payment />
      <Profile/>
      <Footer/>
    </div>
  );
}

export default AppMobile;
