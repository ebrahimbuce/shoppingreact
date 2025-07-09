import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If it exists, update the quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // If it doesn't exist, add the new item to the cart
        state.items.push(newItem);
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;

      // Filter out the item with the specified id
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      // Find the item with the specified id
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // If it exists, update the quantity
        existingItem.quantity = quantity;
      }
    },
    clearCart: (state) => {
      // Clear the cart by resetting items to an empty array
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
