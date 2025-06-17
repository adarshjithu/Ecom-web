import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ScrollToTop from "./ScrollToTop";

function AppDesktop() {
  return (
    <>
      <Header />
      <ScrollToTop/>
      <Outlet />
      <Footer/>
    </>
  );
}

export default AppDesktop;
