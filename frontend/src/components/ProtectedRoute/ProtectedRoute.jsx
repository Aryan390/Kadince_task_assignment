import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const cookieData = Cookies.get("jwt");
  const location = useLocation();
  // If user is not authenticated, redirect to login
  if (!cookieData && cookieData === "loggedout") {
    // Save the attempted location for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
