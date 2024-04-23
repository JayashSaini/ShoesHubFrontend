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
  Redirect,
} from "./Pages";
import Layout from "./Layout.jsx";
import { ApiCall } from "./utils";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import PrivateRoute from "./Components/PrivateRoute"; // Correct import

function App() {
  // useSelector should be inside the functional component body

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

  const Authenticated = () => {
    const isAuthenticated = useSelector((state: any) => state.authenticated);
    if (isAuthenticated) return true;
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) return true;
    return false;
  };
  return (
    <BrowserRouter>
      <Routes>
        {/* Place the layout only once outside the Routes */}
        <Route element={<Layout />}>
          {/* Define your home route here */}
          <Route
            path="/"
            element={Authenticated() ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={Authenticated() ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={Authenticated() ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/user/:accessToken/:refreshToken"
            element={<Redirect />}
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
