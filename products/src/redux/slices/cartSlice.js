// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // The cart items
  totalQuantity: 0, // Total quantity of items in the cart
  totalPrice: 0,
  totalIncludingShipping: 0, // Total price of items in the cart
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Adds an item to the cart
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      state.totalPrice += newItem.price;
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
    },
    // Removes an item from the cart
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      state.totalQuantity--;
      state.totalPrice -= existingItem.price;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
    // Clears the cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
  setTotalIncludingShipping: (state, action) => {
    state.totalIncludingShipping = action.payload;
  },
});

// Export actions
export const { addItemToCart, removeItemFromCart, clearCart, setTotalIncludingShipping } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
