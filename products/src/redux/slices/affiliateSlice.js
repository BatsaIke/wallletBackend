import { createSlice } from '@reduxjs/toolkit';

const affiliateInitialState = {
  affiliates: [],
  loading: false,
  error: null,
};

const affiliateSlice = createSlice({
  name: 'affiliate',
  initialState: affiliateInitialState,
  reducers: {
    setAffiliates: (state, action) => {
      state.affiliates = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetAffiliates: (state) => {
      state.affiliates = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setAffiliates,
  setLoading,
  setError,
  resetAffiliates,
} = affiliateSlice.actions;

export default affiliateSlice.reducer;
