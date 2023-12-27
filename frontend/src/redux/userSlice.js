// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  loading: false,
  error: null,
  paymentData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPaymentData: (state, action) => {
      // Include the status from the payment response in the paymentData field
      state.paymentData = { ...action.payload, status: action.payload?.status };
    },
    resetUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.token = null;
      state.paymentData = null;
    },
  },
});

export const {
  setUser,
  setToken,
  setLoading,
  setError,
  setPaymentData,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
