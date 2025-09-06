import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute() {
  const user = useSelector((state) => state.Auth);
  
  return user.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;