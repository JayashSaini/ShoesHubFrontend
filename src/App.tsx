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
  Wishlist,
  Profile,
  Checkout
} from "./Pages";

import { useSelector } from "react-redux";
import { RootState } from "./types/state.js";
import { AuthRouteProps } from "./types";
import { StateMiddlewareComponent } from "./Components";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const AuthRoute: React.FC<AuthRouteProps> = ({ component: Component }) => {
    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StateMiddlewareComponent />}>
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
            key={"productId"}
            path="/product/:productTitle/:productId"
            element={<Product />}
          />
          {/* Collection routes  */}
          <Route
            key={"collectionId"}
            path="/collection/:collectionTitle/:collectionId"
            element={<Collection />}
          />
          <Route
            key={"collectionId"}
            path="/p/collection/:collectionTitle/:collectionId"
            element={<Category />}
          />
          {/* Cart Routes  */}
          <Route path="/cart" element={<AuthRoute component={Cart} />} />
          <Route
            path="/wishlist"
            element={<AuthRoute component={Wishlist} />}
          />
          <Route path="/profile" element={<AuthRoute component={Profile} />} />
          <Route path="/checkout" element={<AuthRoute component={Checkout} />} />
          
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
