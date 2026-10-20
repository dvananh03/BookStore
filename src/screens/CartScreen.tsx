import React from 'react';
import { View, Text, Image, FlatList, Pressable, StyleSheet, Alert } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../types/navigation';
import { formatPrice } from '../data/books';
import { useCart } from '../hooks/useCart';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Cart'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function CartScreen({ navigation }: Props) {
  const cart = useCart();

  return (
    <View style={styles.container}>
      {cart.items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Giỏ hàng đang trống</Text>
          <Text style={styles.muted}>Hãy thêm các cuốn sách bạn yêu thích vào giỏ hàng.</Text>
          <Pressable
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseText}>Khám phá sách ngay</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={cart.items}
          keyExtractor={(item) => item.bookId}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Pressable
                style={styles.itemContent}
                onPress={() => navigation.navigate('BookDetail', { bookId: item.bookId })}
              >
                <Image source={item.book.image} style={styles.thumbnail} resizeMode="cover" />
                <View style={styles.info}>
                  <Text style={styles.title} numberOfLines={2}>{item.book.title}</Text>
                  <Text style={styles.author}>{item.book.author}</Text>
                  <Text style={styles.price}>{formatPrice(item.book.price)}</Text>
                  <Text style={styles.subtotal}>Tạm tính: {formatPrice(item.subtotal)}</Text>
                </View>
              </Pressable>

              <View style={styles.actionsRow}>
                <View style={styles.quantityRow}>
                  <Pressable
                    style={styles.qtyButton}
                    onPress={() => cart.update(item.bookId, item.quantity - 1)}
                  >
                    <Text style={styles.qtyBtnText}>−</Text>
                  </Pressable>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <Pressable
                    style={styles.qtyButton}
                    onPress={() => cart.update(item.bookId, item.quantity + 1)}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </Pressable>
                </View>

                <Pressable
                  style={styles.removeBtn}
                  onPress={() => cart.remove(item.bookId)}
                >
                  <Text style={styles.removeText}>Xóa</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}

      {cart.items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tổng cộng ({cart.count} sản phẩm):</Text>
            <Text style={styles.total}>{formatPrice(cart.total)}</Text>
          </View>
          <Pressable
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('Checkout', { total: cart.total })}
          >
            <Text style={styles.checkoutText}>Tiến hành thanh toán</Text>
          </Pressable>
          <Pressable
            style={styles.clearButton}
            onPress={() => {
              Alert.alert('Xóa giỏ hàng', 'Bạn có chắc chắn muốn xóa tất cả sản phẩm?', [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', style: 'destructive', onPress: cart.clear },
              ]);
            }}
          >
            <Text style={styles.clearText}>Xóa toàn bộ giỏ hàng</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8F7' },
  list: { padding: 16, paddingBottom: 20 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyIcon: { fontSize: 50, marginBottom: 12 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#222222', marginBottom: 8 },
  muted: { color: '#666666', textAlign: 'center', marginBottom: 16 },
  browseButton: { backgroundColor: '#176B52', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  browseText: { color: '#FFFFFF', fontWeight: '700' },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  itemContent: { flexDirection: 'row', gap: 12 },
  thumbnail: { width: 65, height: 88, borderRadius: 6, backgroundColor: '#F0F2F5' },
  info: { flex: 1, justifyContent: 'space-between' },
  title: { fontSize: 15, fontWeight: '700', color: '#222222', lineHeight: 20 },
  author: { fontSize: 12, color: '#777777', marginTop: 2 },
  price: { fontSize: 13, color: '#555555', marginTop: 2 },
  subtotal: { color: '#176B52', fontWeight: '700', fontSize: 14, marginTop: 4 },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
  },
  quantityRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#E7F2ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 16, fontWeight: 'bold', color: '#176B52' },
  quantity: { minWidth: 20, textAlign: 'center', fontWeight: '700', fontSize: 14 },
  removeBtn: { paddingVertical: 4, paddingHorizontal: 8 },
  removeText: { color: '#C62828', fontWeight: '600', fontSize: 13 },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 4,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  totalLabel: { fontSize: 15, fontWeight: '600', color: '#333333' },
  total: { fontSize: 20, color: '#176B52', fontWeight: '800' },
  checkoutButton: { backgroundColor: '#176B52', borderRadius: 10, padding: 14, alignItems: 'center' },
  checkoutText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  clearButton: { alignItems: 'center', paddingTop: 10 },
  clearText: { color: '#888888', fontSize: 13 },
});
