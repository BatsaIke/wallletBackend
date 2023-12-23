// modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    title: '',
    body: null,
  },
  reducers: {
    openModal: {
      reducer(state, action) {
        const { title, body } = action.payload;
        state.isOpen = true;
        state.title = title;
        state.body = body;
      },
      prepare(title, body) {
        return { payload: { title, body } };
      },
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
