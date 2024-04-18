import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  status: null,
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setAllMessageStatuses: (state, action) => {
      state.messages = action.payload;
    },
    setMessageStatus: (state, action) => {
      // Assuming the action payload contains messageId and status
      const { messageId, status } = action.payload;
      const index = state.messages.findIndex((msg) => msg.id === messageId);
      if (index !== -1) {
        state.messages[index].status = status;
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, addMessage, setMessageStatus,setAllMessageStatuses, setError } = messageSlice.actions;

export default messageSlice.reducer;
