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

import Header from './components/Header';
import BookGrid from './components/BookGrid';
import CategoryChips from './components/CategoryChips';
import FloatingCartButton from './components/FloatingCartButton';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3ac6a8" />

      {/* HEADER */}
      <Header />

      {/* NỘI DUNG */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* CATEGORY */}
        <Text style={styles.sectionTitle}>
          Danh mục sách
        </Text>

        <CategoryChips />

        {/* BOOK LIST */}
        <Text style={styles.sectionTitle}>
          Danh sách sách
        </Text>

        <BookGrid />

      </ScrollView>

      {/* NÚT GIỎ HÀNG NỔI */}
      <FloatingCartButton count={4} />

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

  content: {
    flex: 1,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
  },

});
