import { createSlice } from "@reduxjs/toolkit";
import { wishlistState } from "../types/state.js";

const initialState: wishlistState = {
  proudcts: [],
};

const wishlistReducer = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.proudcts = action.payload;
    },
    // Add other reducers as needed (e.g., for updating user profile, email verification status, etc.)
  },
});

// Export actions and reducer
export const { setWishlist } = wishlistReducer.actions;
export default wishlistReducer.reducer;
