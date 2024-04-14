import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  user: null,
  role: null, // Initialize role
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setRole: (state, action) => {
      state.role = action.payload; // Set user role in the state
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
      state.user = null;
      state.role = null; // Reset role
    },
    resetAuthState: () => {
      return authInitialState;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      return { ...authInitialState, token: null, isAuthenticated: false }; // Reset the state
    },
  },
});

export const {
  setToken,
  setRole, // Export the new action
  setLoading,
  setError,
  setUser,
  resetAuth,
  resetAuthState,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
