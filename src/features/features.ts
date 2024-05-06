import { createSlice } from "@reduxjs/toolkit";
import { featureState } from "../types/state.js";

const initialState: featureState = {
  hamburger: false,
  category: {
    men: [],
    women: [],
  },
};

const featureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    toggleHamburger(state) {
      state.hamburger = !state.hamburger;
    },
    setMenCategory(state, actions) {
      state.category.men = actions.payload;
    },
    setWomenCategory(state, actions) {
      state.category.women = actions.payload;
    },
    // Add other reducers as needed (e.g., for updating user profile, email verification status, etc.)
  },
});

// Export actions and reducer
export const { toggleHamburger, setMenCategory, setWomenCategory } =
  featureSlice.actions;
export default featureSlice.reducer;
