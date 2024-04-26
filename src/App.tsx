import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  VerifyEmail,
  VerifyEmailSuccess,
  NotFound,
  Redirect,
} from "./Pages";
import Layout from "./Layout.jsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ApiCall } from "./utils";
import { login } from "./features/auth";
import { UserState, AuthState } from "./types";
import { Loading } from "./Components";

function App() {
  const dispatch = useDispatch();

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

  const Authenticated = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken || accessToken.trim() == "") {
      return false;
    }

    try {
      const response = await ApiCall({
        url: "/api/v1/users/self",
        method: "GET",
        data: {},
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data) {
        const user: any = response.data?.data;
        const userState: UserState = {
          userId: user?._id,
          username: user?.username,
          email: user?.email,
          isEmailVerified: user?.isEmailVerified,
          avatar: user?.avatar,
          role: user?.role,
          accessToken: accessToken,
          refreshToken: refreshToken,
          isLoggedIn: true,
        };

        const loginPayload: AuthState = {
          isAuthenticated: true,
          user: userState,
          error: null,
        };
        dispatch(login(loginPayload));
        return true;
      } else if (response.error) {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const AuthRoute = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuthentication = async () => {
        const isAuthenticated = await Authenticated();
        setIsAuthenticated(isAuthenticated || false);
        setLoading(false); // Set loading to false when authentication check is complete
      };
      checkAuthentication();
    }, []);

    if (loading) {
      return <Loading />;
    }

    return isAuthenticated ? <Home /> : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* secure route  */}
          <Route path="/" element={<AuthRoute />} />;{/* public route  */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user/:accessToken/:refreshToken"
            element={<Redirect />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
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
