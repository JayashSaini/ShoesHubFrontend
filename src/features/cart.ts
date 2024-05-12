import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../types/state.js";

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
  discountedTotalPrice: 0,
};

const cartReducer = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload.cart;
      state.totalPrice = action.payload.totalPrice;
      state.discountedTotalPrice = action.payload.discountedTotalPrice;
    },
    // Add other reducers as needed (e.g., for updating user profile, email verification status, etc.)
    initCart: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Export actions and reducer
export const { setCart, initCart } = cartReducer.actions;
export default cartReducer.reducer;
