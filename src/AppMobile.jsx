import React from "react";
import Notifications from "./pages/Mobile/Notification";
import AddressScreen from "./pages/Mobile/Address";
import LoginPage from "./pages/Mobile/Login";
import Payment from "./pages/Mobile/Payment";
import Footer from "./layout/Footer";
import Profile from "./pages/Mobile/Profile";

function AppMobile() {
  return (
    <div>
      <LoginPage />
      
      <Notifications />
      <AddressScreen />
      <Payment />
      <Profile/>
      <Footer/>
    </div>
  );
}

export default AppMobile;
