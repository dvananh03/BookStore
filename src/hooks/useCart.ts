import { useMemo } from 'react';
import { books } from '../data/books';
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateQuantity,
} from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const detailedItems = useMemo(
    () =>
      items.flatMap((item) => {
        const book = books.find((entry) => entry.id === item.bookId);
        return book ? [{ ...item, book, subtotal: book.price * item.quantity }] : [];
      }),
    [items]
  );

  const count = items.reduce((total, item) => total + item.quantity, 0);
  const total = detailedItems.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    items: detailedItems,
    count,
    total,
    add: (bookId: string, quantity = 1) =>
      dispatch(addToCart({ bookId, quantity })),
    remove: (bookId: string) => dispatch(removeFromCart(bookId)),
    update: (bookId: string, quantity: number) =>
      dispatch(updateQuantity({ bookId, quantity })),
    clear: () => dispatch(clearCart()),
  };
}
