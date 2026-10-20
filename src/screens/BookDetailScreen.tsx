import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { books, formatPrice } from '../data/books';
import { useCart } from '../hooks/useCart';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleWishlist } from '../store/wishlistSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

export function BookDetailScreen({ route }: Props) {
  const { bookId } = route.params;
  const book = books.find((item) => item.id === bookId);
  const cart = useCart();
  const dispatch = useAppDispatch();
  const saved = useAppSelector((state) => state.wishlist.bookIds.includes(bookId));
  const [quantity, setQuantity] = useState(1);

  if (!book) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Không tìm thấy sách.</Text>
      </View>
    );
  }

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Khung ảnh bìa lớn */}
      <View style={styles.coverWrapper}>
        <View style={styles.coverBox}>
          <Image source={book.image} style={styles.coverImage} resizeMode="cover" />
          {book.discount && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{book.discount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Thông tin sách */}
      <View style={styles.infoSection}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Tác giả: {book.author}</Text>
        {book.category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{book.category}</Text>
          </View>
        )}
      </View>

      {/* Khung giá */}
      <View style={styles.priceSection}>
        <Text style={styles.priceLabel}>Giá bán:</Text>
        <Text style={styles.price}>{formatPrice(book.price)}</Text>
        {book.originalPrice && (
          <Text style={styles.originalPrice}>{formatPrice(book.originalPrice)}</Text>
        )}
      </View>

      {/* Giới thiệu nội dung */}
      <View style={styles.descriptionSection}>
        <Text style={styles.descriptionHeading}>Giới thiệu nội dung</Text>
        <Text style={styles.description}>{book.description}</Text>
      </View>

      {/* Bộ chọn số lượng */}
      <View style={styles.quantityRow}>
        <Text style={styles.quantityLabel}>Số lượng:</Text>
        <View style={styles.quantityControls}>
          <Pressable style={styles.qtyBtn} onPress={handleDecrement}>
            <Text style={styles.qtyBtnText}>−</Text>
          </Pressable>
          <Text style={styles.qtyValue}>{quantity}</Text>
          <Pressable style={styles.qtyBtn} onPress={handleIncrement}>
            <Text style={styles.qtyBtnText}>+</Text>
          </Pressable>
        </View>
      </View>

      {/* Nút thao tác */}
      <Pressable
        style={styles.primaryButton}
        onPress={() => {
          cart.add(book.id, quantity);
          Alert.alert(
            'Giỏ hàng',
            `Đã thêm ${quantity} cuốn "${book.title}" vào giỏ hàng!`
          );
        }}
      >
        <Text style={styles.primaryText}>🛒 Thêm vào giỏ hàng ({quantity})</Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => dispatch(toggleWishlist(book.id))}
      >
        <Text style={styles.secondaryText}>
          {saved ? '♥ Đã lưu vào yêu thích' : '♡ Thêm vào yêu thích'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingBottom: 40,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 16,
    color: '#666',
  },
  coverWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  coverBox: {
    width: 170,
    height: 235,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F0F2F5',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#E53935',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  infoSection: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  author: {
    fontSize: 15,
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '600',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#F0F9F6',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#176B52',
    marginBottom: 20,
    gap: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#555555',
  },
  price: {
    color: '#176B52',
    fontSize: 22,
    fontWeight: '800',
  },
  originalPrice: {
    color: '#9E9E9E',
    fontSize: 15,
    textDecorationLine: 'line-through',
  },
  descriptionSection: {
    marginBottom: 22,
  },
  descriptionHeading: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#444444',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F0F2F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '700',
    minWidth: 24,
    textAlign: 'center',
  },
  primaryButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#176B52',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#176B52',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    width: '100%',
    padding: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#176B52',
    alignItems: 'center',
  },
  secondaryText: {
    color: '#176B52',
    fontWeight: '700',
    fontSize: 15,
  },
});
