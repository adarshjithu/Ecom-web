import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ScrollToTop from "./ScrollToTop";

function AppDesktop() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppDesktop;
