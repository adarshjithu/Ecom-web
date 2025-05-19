import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./layout/Header";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/Mobile/LoginPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Header /> */}
    {/* <HomePage /> */}
   <LoginPage/>
  </StrictMode>
);
