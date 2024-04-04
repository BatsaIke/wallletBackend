import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import alertSlice from './slices/alertSlice';
import  contactSlice  from './slices/cantactSlice';
import groupSlice from './slices/groupSlice';
import messageSlice from './slices/messageSlice';
import cartSlice from './slices/cartSlice';
import paymentSlice from './slices/paymentSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  alerts:alertSlice,
  contact:contactSlice,
  groups:groupSlice,
  message:messageSlice,
  cart:cartSlice,
  payment:paymentSlice
});

export default rootReducer;
