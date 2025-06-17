import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";
import ScrollToTop from "./ScrollToTop";

function AppMobile() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppMobile;
