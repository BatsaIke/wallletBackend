// signupSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token') ? true : false,
  emailPhone: '',
  password: '',
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmailPhone: (state, action) => {
      state.emailPhone = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    resetLogin: (state) => {
      state.emailPhone = '';
      state.password = '';
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setEmailPhone,
  setPassword,
  setLoading,
  setError,
  setToken,
  resetLogin,
} = loginSlice.actions;

export default loginSlice.reducer;
