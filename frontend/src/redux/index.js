
// store.js
import { configureStore,combineReducers } from '@reduxjs/toolkit';

import {thunk} from 'redux-thunk'; // Import the thunk function directly
import authSlice from './authSlice';
import alertReducer from './alertSlice';
import modalSlice from './modalSlice';

const rootReducer = combineReducers({
  alerts: alertReducer,
  auth: authSlice,
  modal:modalSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});
// // Initialize current state from the Redux store for subscription comparison
// // preventing undefined error
// let currentState = store.getState();

// store.subscribe(() => {
//   // Keep track of the previous and current state to compare changes
//   const previousState = currentState;
//   currentState = store.getState();

//   // If the token changes, set the value in localStorage and axios headers
//   const previousToken = previousState.auth?.token;
//   const currentToken = currentState.auth?.token;

//   if (previousToken !== currentToken) {
//     setAuthToken(currentToken);
//   }
// });

export default store;
