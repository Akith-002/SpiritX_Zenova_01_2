// This file should be created at src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../services/auth.service";

const ProtectedRoute = () => {
  const isAuthenticated = AuthService.isAuthenticated();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
