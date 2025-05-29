import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./layout/Header";

function AppDesktop() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default AppDesktop;
