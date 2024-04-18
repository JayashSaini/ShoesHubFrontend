import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  OtpVerification,
  ResetPassword,
  VerifyEmail,
  VerifyEmailSuccess,
} from "./Pages";
import Layout from "./Layout.jsx";
import { ApiCall } from "./utils";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const sendData = async () => {
      try {
        const response = await ApiCall({
          url: "/api/v1/healthcheck",
          method: "GET",
          data: {},
          debounceTime: 1000,
        });
        console.log("res : ", JSON.stringify(response));
      } catch (error) {}
    };
    sendData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" index element={<Home />} />
            <Route path="/login" index element={<Login />} />
            <Route path="/register" index element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<OtpVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/email-verification" element={<VerifyEmail />}></Route>
            <Route
              path="/email-verification/:token"
              element={<VerifyEmailSuccess />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
