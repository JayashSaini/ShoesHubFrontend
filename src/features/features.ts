import { createSlice } from "@reduxjs/toolkit";
import { featureState } from "../types/state.js";

const initialState: featureState = {
  hamburger: false,
};

const featureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    toggleHamburger(state) {
      state.hamburger = !state.hamburger;
    },
    // Add other reducers as needed (e.g., for updating user profile, email verification status, etc.)
  },
});

// Export actions and reducer
export const { toggleHamburger } = featureSlice.actions;
export default featureSlice.reducer;
