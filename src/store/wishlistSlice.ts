import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  bookIds: string[];
}

const initialState: WishlistState = { bookIds: [] };

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const index = state.bookIds.indexOf(action.payload);
      if (index >= 0) state.bookIds.splice(index, 1);
      else state.bookIds.push(action.payload);
    },
    clearWishlist: (state) => {
      state.bookIds = [];
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
