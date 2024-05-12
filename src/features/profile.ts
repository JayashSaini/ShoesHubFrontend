import { createSlice } from "@reduxjs/toolkit";
import { profileState } from "../types/state.js";

const initialState: profileState = {
  firstName: "John",
  lastName: "Doe",
  phone: "9192000000",
  email: "john@gmail.com",
};

const profileReducer = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phoneNumber;
    },
    // Add other reducers as needed (e.g., for updating user profile, email verification status, etc.)
  },
});

// Export actions and reducer
export const { setProfile } = profileReducer.actions;
export default profileReducer.reducer;
