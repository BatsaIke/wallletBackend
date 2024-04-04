import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setContacts, addContact, setError } = contactSlice.actions;

export default contactSlice.reducer;
