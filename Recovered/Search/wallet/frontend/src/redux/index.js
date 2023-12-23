
// store.js
import { configureStore, applyMiddleware} from '@reduxjs/toolkit';

import {thunk} from 'redux-thunk'; // Import the thunk function directly
import signupReducer from '../redux/signupSlice';
import loginReducer from '../redux/loginSlice';
import setAuthToken from '../utils/setAuthToken';
import alertReducer from './alertSlice';
import userReducer from './userSlice';
import modalReducer from './modalSlice';


const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    alert: alertReducer,
    user: userReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Use the middleware option to apply middleware
});
// Initialize current state from the Redux store for subscription comparison
// preventing undefined error
let currentState = store.getState();

store.subscribe(() => {
  // Keep track of the previous and current state to compare changes
  const previousState = currentState;
  currentState = store.getState();

  // If the token changes, set the value in localStorage and axios headers
  const previousToken = previousState.auth?.token;
  const currentToken = currentState.auth?.token;

  if (previousToken !== currentToken) {
    setAuthToken(currentToken);
  }
});

export default store;
