// logoutSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedOut: false,
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    setLoggedOut: (state) => {
      state.isLoggedOut = true;
    },
    resetLogout: (state) => {
      state.isLoggedOut = false;
    },
  },
});

export const { setLoggedOut, resetLogout } = logoutSlice.actions;

export default logoutSlice.reducer;
