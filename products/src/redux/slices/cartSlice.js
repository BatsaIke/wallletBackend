import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // The cart items
  totalQuantity: 0, // Total quantity of items in the cart
  totalPrice: 0,
  totalIncludingShipping: 0, // Total price of items in the cart including shipping
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
    // Loads the cart from local storage or another source
    loadCart: (state, action) => {
      const loadedCart = action.payload;
      state.items = loadedCart.items;
      state.totalQuantity = loadedCart.totalQuantity;
      state.totalPrice = loadedCart.totalPrice;
      // Ensure to load or reset the totalIncludingShipping if needed
    },
    // Clears the cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.totalIncludingShipping = 0; // Reset this as well if you're using it
    },
    // Sets total price including shipping
    setTotalIncludingShipping: (state, action) => {
      state.totalIncludingShipping = action.payload;
    },
  },
});

// Export actions
export const { addItemToCart, removeItemFromCart, loadCart, clearCart, setTotalIncludingShipping } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
