import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [],
  loading: false,
  error: null,
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    removeGroup: (state, action) => {
      state.groups = state.groups.filter(group => group._id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setGroups, addGroup, removeGroup, setError } = groupsSlice.actions;

export default groupsSlice.reducer;
