import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

import Header from '../components/Header';
import CategoryChips from '../components/CategoryChips';
import BookGrid from '../components/BookGrid';
import FloatingCartButton from '../components/FloatingCartButton';
import { Book } from '../data/booksData';

interface HomeScreenProps {
  onSelectBook?: (book: Book) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function HomeScreen({
  onSelectBook,
  cartCount = 4,
  onOpenCart,
}: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3ac6a8" />

      {/* 1. HEADER CỐ ĐỊNH (Không nằm trong ScrollView) */}
      <Header />

      {/* 2. SCROLLVIEW CHỨA NỘI DUNG CUỘN ĐƯỢC */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* CATEGORY CHIPS */}
        <Text style={styles.sectionTitle}>Danh mục sách</Text>
        <CategoryChips />

        {/* BOOK GRID */}
        <Text style={styles.sectionTitle}>Danh sách sách</Text>
        <BookGrid onSelectBook={onSelectBook} />
      </ScrollView>

      {/* 3. FLOATING CART BUTTON (Absolute, nằm ngoài ScrollView cùng cấp) */}
      <FloatingCartButton count={cartCount} onPress={onOpenCart} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    position: 'relative',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 12,
    // paddingBottom đủ lớn (90px) để FloatingCartButton không che mất sản phẩm cuối cùng của BookGrid
    paddingBottom: 90,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});
