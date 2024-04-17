import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../types";

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: "0",
    username: "",
    email: "",
    avatar: "https://via.placeholder.com/200x200.png",
    isEmailVerified: false,
    role: "USER",
  },
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart(state) {
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        isEmailVerified: action.payload.isEmailVerified,
        avatar: action.payload.avatar,
        role: action.payload.role,
      };
      state.error = null;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    googleSignInStart(state) {
      state.error = null;
    },
    googleSignInSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    googleSignInFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    emailVerification(state, action: PayloadAction<boolean>) {
      state.user.isEmailVerified = action.payload;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  googleSignInStart,
  googleSignInSuccess,
  googleSignInFailure,
  emailVerification,
} = authSlice.actions;

export default authSlice.reducer;
