import { createSlice } from "@reduxjs/toolkit";

// Initial state for payment
const paymentInitialState = {
  loading: false,
  error: null,
  paymentStatus: { status: "pending" },
  paymentDetails: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState: paymentInitialState,
  reducers: {
    // Action to set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Action to set error message
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Action to set payment status
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload.status;
      state.paymentDetails = action.payload.details;
    },
    // Action to reset payment state to initial state
    resetPaymentState: () => paymentInitialState,
  },
});

// Export actions
export const { setLoading, setError, setPaymentStatus, resetPaymentState } =
  paymentSlice.actions;

// Export reducer
export default paymentSlice.reducer;
