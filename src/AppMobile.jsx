import React from "react";
import Notifications from "./pages/Mobile/Notification";
import AddressScreen from "./pages/Mobile/Address";
import LoginPage from "./pages/Mobile/Login";
import Payment from "./pages/Mobile/Payment";

function AppMobile() {
  return (
    <div>
      <LoginPage />
      
      <Notifications />
      <AddressScreen />
      <Payment />
    </div>
  );
}

export default AppMobile;
