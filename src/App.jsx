import React from "react";
import { useIsMobile } from "./hooks/useIsMobile.jsx";
const AppMobile = React.lazy(() => import("./AppMobile.jsx"));
const AppDesktop = React.lazy(() => import("./AppDesktop.jsx"));
function App() {
  const isMobile = useIsMobile();
  return isMobile ? <AppMobile /> : <AppDesktop />;
}

export default App;
