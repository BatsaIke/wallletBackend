// modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    title: 'some title',
    body: "some body",
  },
  reducers: {
    openModal(state, action) {
      const { title = 'some title', body = 'some body' } = action.payload || {};
      state.isOpen = true;
      state.title = title;
      state.body = body;
    },
    closeModal(state) {
      state.isOpen = false;
      state.title = ''; 
      state.body = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
