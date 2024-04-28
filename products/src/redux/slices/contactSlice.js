import { createSlice } from '@reduxjs/toolkit';

const contactInitialState = {
  contacts: [],
  loading: false,
  error: null,
  contact: null, // Change to null since it represents a single contact
};

const contactSlice = createSlice({
  name: 'contact',
  initialState: contactInitialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setContact: (state, action) => {
      state.contact = action.payload; // Update contact state variable
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetContacts: (state) => {
      state.contacts = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setContacts,
  setContact,
  setLoading,
  setError,
  resetContacts,
} = contactSlice.actions;

export default contactSlice.reducer;
