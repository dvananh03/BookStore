import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import type { Book } from '../data/books';
import { formatPrice } from '../data/books';

type Props = {
  book: Book;
  onPress: () => void;
  onAddToCart: () => void;
};

export function BookCard({ book, onPress, onAddToCart }: Props) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.info}>
        <View style={styles.imageContainer}>
          <Image source={book.image} style={styles.coverImage} resizeMode="cover" />
          {book.discount && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{book.discount}</Text>
            </View>
          )}
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            {book.author}
          </Text>
          {book.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{book.category}</Text>
            </View>
          )}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(book.price)}</Text>
            {book.originalPrice && (
              <Text style={styles.originalPrice}>{formatPrice(book.originalPrice)}</Text>
            )}
          </View>
        </View>
      </Pressable>

      <Pressable onPress={onAddToCart} style={styles.button}>
        <Text style={styles.buttonText}>+ Thêm vào giỏ</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  info: {
    flexDirection: 'row',
    gap: 12,
  },
  imageContainer: {
    width: 85,
    height: 115,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F0F2F5',
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#E53935',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
    lineHeight: 22,
  },
  author: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  categoryText: {
    fontSize: 11,
    color: '#2E7D32',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#176B52',
  },
  originalPrice: {
    fontSize: 13,
    color: '#9E9E9E',
    textDecorationLine: 'line-through',
  },
  button: {
    alignSelf: 'flex-end',
    marginTop: 8,
    backgroundColor: '#176B52',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});
