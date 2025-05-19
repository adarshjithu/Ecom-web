import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginPage from "./pages/Mobile/Login";
import Payment from "./pages/Mobile/Payment";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Header /> */}
    {/* <HomePage /> */}
    <LoginPage />
    <div className="p-2"></div>
    <Payment />
  </StrictMode>
);
