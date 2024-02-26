// authSlice.js
import { createSlice } from '@reduxjs/toolkit';


const authInitialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token') ? true : false,
  loading: false,
  error: null,
  user: null,
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetAuth: (state) => {
      state.loading = false;
      state.error = null;
    },
    resetAuthState: (state) => {
      return { ...authInitialState };
    },
    // New action for logout
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {
  setToken,
  setLoading,
  setError,
  setUser,
  resetAuth,
  resetAuthState,
  logout, // Include the new logout action
} = authSlice.actions;

export default authSlice.reducer;
