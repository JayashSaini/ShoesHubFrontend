import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home,
  Login,
  Register,
  ForgotPassword,
  OtpVerification,
  ResetPassword,
  VerifyEmail,
} from "./Pages";
import Layout from "./Layout.jsx";

function App() {
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
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="email-verification" element={<VerifyEmail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
