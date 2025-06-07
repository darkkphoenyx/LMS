import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "ADMIN" | "USER";
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const location = useLocation();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    // Redirect to login with the current location for redirect after login
    return <Navigate to="/login" state={{ from: location.pathname, message: "Please log in to continue" }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If specific role is required and user doesn't have it
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
} 