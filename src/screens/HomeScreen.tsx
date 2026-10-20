import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Alert, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { RootStackParamList, MainTabParamList } from '../types/navigation';
import { books } from '../data/books';
import { BookCard } from '../components/BookCard';
import { useCart } from '../hooks/useCart';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function HomeScreen({ navigation }: Props) {
  const cart = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

  const categories = useMemo(() => {
    const list = Array.from(new Set(books.map((b) => b.category)));
    return ['Tất cả', ...list];
  }, []);

  const filteredBooks = useMemo(() => {
    if (selectedCategory === 'Tất cả') return books;
    return books.filter((b) => b.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Khám phá sách hay</Text>

      {/* Danh mục lọc sách */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <Pressable
                key={cat}
                style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
            onAddToCart={() => {
              cart.add(item.id);
              Alert.alert('Đã thêm', `Đã thêm cuốn "${item.title}" vào giỏ hàng.`);
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8F7', padding: 16, paddingBottom: 0 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: '#222222' },
  categoryContainer: { marginBottom: 14 },
  categoryScroll: { gap: 8, paddingRight: 8 },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DEE9',
  },
  categoryChipActive: {
    backgroundColor: '#176B52',
    borderColor: '#176B52',
  },
  categoryText: {
    fontSize: 13,
    color: '#555555',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  list: { paddingBottom: 24 },
});
