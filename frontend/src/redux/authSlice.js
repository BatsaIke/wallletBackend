// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token') ? true : false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetAuth: (state) => {
      state.loading = false;
      state.error = null;
    },
    resetAuthState: (state) => {
      state = { ...authInitialState };
      return state;
    },
  },
});

export const {
  setToken,
  setLoading,
  setError,
  resetAuth,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
