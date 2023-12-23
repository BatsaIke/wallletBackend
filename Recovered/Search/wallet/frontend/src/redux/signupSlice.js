// signupSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  password: '',
  phone: '',
  loading: false,
  error: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state = { ...state, username: action.payload };
      return state;
    },
    setEmail: (state, action) => {
      state = { ...state, email: action.payload };
      return state;
    },
    setPassword: (state, action) => {
      state = { ...state, password: action.payload };
      return state;
    },
    setPhone: (state, action) => {
      state = { ...state, phone: action.payload };
      return state;
    },
    setLoading: (state, action) => {
      state = { ...state, loading: action.payload };
      return state;
    },
    setError: (state, action) => {
      state = { ...state, error: action.payload };
      return state;
    },
    resetSignup: (state) => {
      state = { ...initialState };
      return state;
    },
  },
});

export const {
  setUsername,
  setEmail,
  setPassword,
  setPhone,
  setLoading,
  setError,
  resetSignup,
} = signupSlice.actions;


export default signupSlice.reducer;
