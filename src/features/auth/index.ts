import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types/state.js";

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    accessToken: null,
    refreshToken: null,
    username: "",
    email: "",
    avatar: {
      url: "https://res.cloudinary.com/dcvb5vgyf/image/upload/c_scale,h_500,w_500/oysy3d5lzxjzjp8am3bi.jpg",
    },
    userId: "",
    isEmailVerified: false,
    role: "user", // Default role, can be adjusted based on your application logic
    isLoggedIn: false,
  },
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState>) {
      const {
        accessToken,
        refreshToken,
        username,
        email,
        avatar,
        userId,
        isEmailVerified,
        role,
      } = action.payload.user;
      state.isAuthenticated = true;

      // user credentials
      state.user.accessToken = accessToken;
      state.user.refreshToken = refreshToken;
      state.user.username = username;
      state.user.email = email;
      state.user.avatar = avatar;
      state.user.userId = userId;
      state.user.isEmailVerified = isEmailVerified;
      state.user.role = role;
      state.user.isLoggedIn = true;

      state.error = null;
    },
    loginFailed(state, action) {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = initialState.user;
    },
    logout(state) {
      Object.assign(state, initialState);
    },
    register(state, action) {
      state.user.email = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    updateAvatar(state, action) {
      state.user.avatar.url = action.payload;
    },
    // Add other reducers as needed (e.g., for updating user profile, email verification status, etc.)
  },
});

// Export actions and reducer
export const {
  login,
  logout,
  loginFailed,
  register,
  setIsAuthenticated,
  updateAvatar,
} = userSlice.actions;
export default userSlice.reducer;
