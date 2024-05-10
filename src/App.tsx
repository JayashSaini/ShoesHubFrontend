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
  ErrorMessage,
  Product,
  New,
  Collection,
  Category,
  Cart,
} from "./Pages";
import Layout from "./Layout.jsx";
import { useEffect, useState } from "react";
import { ApiCall } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { login, setIsAuthenticated } from "./features/auth";
import { UserState, AuthState, RootState } from "./types/state.js";
import { Loading } from "./Components";
import { setCart } from "@/features/Cart.js";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!accessToken || accessToken.trim() == "") {
        dispatch(setIsAuthenticated(false));
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
        } else if (response.error) {
          dispatch(setIsAuthenticated(false));
        }
      } catch (error) {
        dispatch(setIsAuthenticated(false));
      }

      ApiCall({
        url: `/api/v1/cart/`,
        method: "GET",
      })
        .then((response) => {
          dispatch(
            setCart({
              cart: [...response.data.data.items],
              totalPrice: response.data.data.cartTotal,
              discountedTotalPrice: response.data.data.discountedTotal,
            })
          );
        })
        .catch((error) => {
          dispatch(
            setCart({
              cart: [],
              totalPrice: 0,
              discountedTotalPrice: 0,
            })
          );
        });
    })();
  }, []);

  const AuthRoute = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }, []);

    return isLoading ? (
      <Loading />
    ) : isAuthenticated ? (
      <Cart />
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* secure route  */}
          <Route path="/" element={<Home />} />;{/* public route  */}
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
          {/* product routes */}
          <Route
            path="/product/:productTitle/:productId"
            element={<Product />}
          />
          {/* Collection routes  */}
          <Route
            path="/collection/:collectionTitle/:collectionId"
            element={<Collection />}
          />
          <Route
            path="/p/collection/:collectionTitle/:collectionId"
            element={<Category />}
          />
          {/* Cart Routes  */}
          <Route path="/cart" element={AuthRoute()} />
          <Route path="/new" element={<New />} />
          {/* error message handler route*/}
          <Route path="/error" element={<ErrorMessage />} />
          {/* Define the 404 route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
