import React, { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthMiddlewareProps {
  children: ReactNode;
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      // If access token exists, navigate to the dashboard
      navigate("/dashboard");
    } else {
      // If access token doesn't exist, navigate to the login page
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>; // Render children components
};

export default AuthMiddleware;
