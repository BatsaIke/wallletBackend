import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import alertSlice from './slices/alertSlice';
import  contactSlice  from './slices/contactSlice';
import groupSlice from './slices/groupSlice';
import messageSlice from './slices/messageSlice';
import cartSlice from './slices/cartSlice';
import paymentSlice from './slices/paymentSlice';
import orderSlice from './slices/orderSlice';
import productsSlice from './slices/productsSlice';
import affiliateSlice from './slices/affiliateSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  alerts:alertSlice,
  contact:contactSlice,
  groups:groupSlice,
  message:messageSlice,
  cart:cartSlice,
  payment:paymentSlice,
  order:orderSlice,
  product:productsSlice,
  contact:contactSlice,
  affiliate:affiliateSlice
});

export default rootReducer;
