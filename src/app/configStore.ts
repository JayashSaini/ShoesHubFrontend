import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/index.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
