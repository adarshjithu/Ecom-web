import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";

function AppMobile() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default AppMobile;
