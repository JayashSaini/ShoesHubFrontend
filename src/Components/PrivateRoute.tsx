import React from "react";
import { Route, Navigate } from "react-router-dom";
import AuthMiddleware from "./AuthMiddleware";

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
  // Add any additional props you want to pass to Route
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  element,
  ...rest
}) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    // If access token doesn't exist, redirect to login page
    return <Navigate to="/login" />;
  }

  return (
    <AuthMiddleware>
      <Route path={path} element={element} {...rest} />
    </AuthMiddleware>
  );
};

export default PrivateRoute;
