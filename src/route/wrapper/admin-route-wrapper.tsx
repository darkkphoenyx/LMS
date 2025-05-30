import { Navigate, Outlet } from "react-router";

const AdminRoutes = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};
export default AdminRoutes;
