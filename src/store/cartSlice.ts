import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  bookId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ bookId: string; quantity?: number }>
    ) => {
      const { bookId, quantity = 1 } = action.payload;
      if (quantity <= 0) return;

      const existing = state.items.find((item) => item.bookId === bookId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ bookId, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.bookId !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ bookId: string; quantity: number }>
    ) => {
      const { bookId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.bookId !== bookId);
        return;
      }
      const item = state.items.find((entry) => entry.bookId === bookId);
      if (item) item.quantity = quantity;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);
