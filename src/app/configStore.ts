import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/index.js";
import featureReducer from "../features/features.js";
import cartReducer from "@/features/cart.js";
import wishlistReducer from "@/features/wishlist.js";
import profileReducer from "@/features/profile.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    features: featureReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    profile: profileReducer,
  },
});
