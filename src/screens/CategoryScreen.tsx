import React from 'react';
import { View, Text, FlatList, Pressable, Image, StyleSheet } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../types/navigation';
import { books, formatPrice } from '../data/books';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Category'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function CategoryScreen({ navigation }: Props) {
  const categories = Array.from(new Set(books.map((book) => book.category)));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Danh mục sách</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item: category }) => {
          const categoryBooks = books.filter((b) => b.category === category);
          return (
            <View style={styles.categoryCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.categoryTitle}>{category}</Text>
                <Text style={styles.countBadge}>{categoryBooks.length} cuốn</Text>
              </View>

              <View style={styles.booksRow}>
                {categoryBooks.map((book) => (
                  <Pressable
                    key={book.id}
                    style={styles.bookMiniCard}
                    onPress={() => navigation.navigate('BookDetail', { bookId: book.id })}
                  >
                    <Image source={book.image} style={styles.miniCover} resizeMode="cover" />
                    <Text style={styles.miniTitle} numberOfLines={2}>{book.title}</Text>
                    <Text style={styles.miniPrice}>{formatPrice(book.price)}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8F7', padding: 16 },
  heading: { fontSize: 22, fontWeight: '800', marginBottom: 14, color: '#222222' },
  list: { paddingBottom: 20 },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: { fontSize: 17, fontWeight: '700', color: '#176B52' },
  countBadge: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  booksRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  bookMiniCard: { width: 95 },
  miniCover: {
    width: 95,
    height: 130,
    borderRadius: 6,
    backgroundColor: '#F0F2F5',
    marginBottom: 6,
  },
  miniTitle: { fontSize: 13, fontWeight: '600', color: '#222222', lineHeight: 17 },
  miniPrice: { fontSize: 12, fontWeight: '700', color: '#176B52', marginTop: 3 },
});
