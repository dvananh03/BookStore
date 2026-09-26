import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Alert } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import { Book, BOOKS_DATA } from './data/booksData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'detail'>('home');
  const [selectedBook, setSelectedBook] = useState<Book>(BOOKS_DATA[0]);
  const [cartCount, setCartCount] = useState<number>(4);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setCurrentScreen('detail');
  };

  const handleAddToCart = (book: Book, quantity: number) => {
    setCartCount((prev) => prev + quantity);
    Alert.alert(
      'Giỏ hàng',
      `Đã thêm ${quantity} cuốn "${book.title}" vào giỏ hàng!\nTổng số sản phẩm trong giỏ: ${cartCount + quantity}`
    );
  };

  const handleOpenCart = () => {
    Alert.alert('Giỏ hàng', `Hiện đang có ${cartCount} sản phẩm trong giỏ hàng.`);
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#3ac6a8" />

      <View style={styles.screenContainer}>
        {currentScreen === 'home' ? (
          <HomeScreen
            onSelectBook={handleSelectBook}
            cartCount={cartCount}
            onOpenCart={handleOpenCart}
          />
        ) : (
          <BookDetailScreen
            book={selectedBook}
            onBack={() => setCurrentScreen('home')}
            onAddToCart={handleAddToCart}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#3ac6a8',
  },

  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
