import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";
import ScrollToTop from "./ScrollToTop";
import Navigation from "./pages/Mobile/Navigation";

function AppMobile() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
      <Navigation />
      <Footer />
    </>
  );
}

export default AppMobile;
