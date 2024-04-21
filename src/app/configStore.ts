import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/index.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
