import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Header from './components/Header';
import BookCard from './components/BookCard';
import CategoryChips from './components/CategoryChips';

export default function App() {
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <Header />
       {/* CATEGORY */}
        <Text style={styles.sectionTitle}>
          Danh mục sách
        </Text>

        <CategoryChips />

      <ScrollView style={styles.content}>

        {/* BOOK CARD */}
        <Text style={styles.sectionTitle}>
          Danh sách sách
        </Text>

        <BookCard
          image={require('./assets/Nhà_giả_kim.jpg')}
          title="Nhà giả kim"
          author="Paulo Coelho"
          price="89.000đ"
        />

        <BookCard
          image={require('./assets/Đắc_nhân_tâm.jpg')}
          title="Đắc nhân tâm"
          author="Dale Carnegie"
          price="95.000đ"
        />

        <BookCard
          image={require('./assets/Tuổi_trẻ.jpg')}
          title="Tuổi trẻ đáng giá bao nhiêu?"
          author="Rosie Nguyễn"
          price="120.000đ"
        />

        <BookCard
          image={require('./assets/toi-tai-gioi-ban-cung-the-1.webp')}
          title="Tôi tài giỏi, bạn cũng thế"
          author="Adam Khoo"
          price="110.000đ"
        />

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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