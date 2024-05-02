import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/index.js";
import featureReducer from "../features/features.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    features: featureReducer,
  },
});
