import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  OtpVerification,
  ResetPassword,
  VerifyEmail,
  VerifyEmailSuccess,
  NotFound,
} from "./Pages";
import Layout from "./Layout.jsx";
import { ApiCall } from "./utils";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = () => {
    let authenticated = useSelector((state: any) => state.authenticated);
    if (authenticated) return true;
    const accessTokne = localStorage.getItem("accessToken");
    return accessTokne ? true : false;
  };

  useEffect(() => {
    const sendData = async () => {
      try {
        await ApiCall({
          url: "/api/v1/healthcheck",
          method: "GET",
          data: {},
          debounceTime: 1000,
        });
      } catch (error) {}
    };
    sendData();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Define your home route here */}
          <Route
            path="/"
            element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isAuthenticated() ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated() ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/email-verification" element={<VerifyEmail />} />
          <Route
            path="/email-verification/:token"
            element={<VerifyEmailSuccess />}
          />

          {/* Define the 404 route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
