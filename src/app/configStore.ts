import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/index.js";
import featureReducer from "../features/features.js";
import cartReducer from "@/features/Cart.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    features: featureReducer,
    cart: cartReducer,
  },
});
