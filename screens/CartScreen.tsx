import React, { useState } from 'react';
import { BOOKS_DATA, Book } from '../data/booksData';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';



interface CartItem {
  id: string,
  name: string
  price: number,
  quantity: number
}

const initialItems: CartItem[] = [];

const [items, setItems] = useState<CartItem[]>(initialItems);

const formatPrice = (price: number) =>
  price.toLocaleString('vi-VN') + 'đ';

export default function CartScreen() {
  const [items, setItems] = useState(initialItems);

  const changeQuantity = (id: string, amount: number) => {
    setItems(current =>
      current
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.productCard}>
      <View style={styles.productImage}>
        {/* <Text style={styles.emoji}>{item.emoji}</Text> */}
  
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>
          {formatPrice(item.price)}
        </Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => changeQuantity(item.id, -1)}
          >
            <Ionicons name="remove" size={18} color="#333" />
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => changeQuantity(item.id, 1)}
          >
            <Ionicons name="add" size={18} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() =>
          setItems(current =>
            current.filter(product => product.id !== item.id)
          )
        }
      >
        <Ionicons name="trash-outline" size={21} color="#E53935" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Giỏ hàng</Text>
        <Text style={styles.itemCount}>
          {totalQuantity} sản phẩm
        </Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="cart-outline"
            size={72}
            color="#C5C9D3"
          />
          <Text style={styles.emptyTitle}>
            Giỏ hàng đang trống
          </Text>
          <Text style={styles.emptyDescription}>
            Hãy thêm sản phẩm yêu thích của bạn nhé!
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tạm tính</Text>
              <Text style={styles.totalValue}>
                {formatPrice(totalPrice)}
              </Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Phí vận chuyển</Text>
              <Text style={styles.shipping}>
                Tính khi thanh toán
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.grandTotalLabel}>
                Tổng tiền hàng
              </Text>
              <Text style={styles.grandTotal}>
                {formatPrice(totalPrice)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert(
                  'Thanh toán',
                  `Tổng tiền hàng: ${formatPrice(totalPrice)}`
                )
              }
            >
              <Text style={styles.checkoutText}>
                Tiến hành thanh toán
              </Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#20243A',
  },
  itemCount: {
    fontSize: 14,
    color: '#777E91',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
  },
  productImage: {
    width: 78,
    height: 86,
    borderRadius: 12,
    backgroundColor: '#EEF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 36,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#20243A',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5C7CFA',
    marginTop: 6,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 12,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F0F2F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 12,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  totalLabel: {
    fontSize: 14,
    color: '#777E91',
  },
  totalValue: {
    fontSize: 14,
    color: '#20243A',
    fontWeight: '500',
  },
  shipping: {
    fontSize: 12,
    color: '#777E91',
  },
  divider: {
    height: 1,
    backgroundColor: '#ECEEF4',
    marginBottom: 16,
  },
  grandTotalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#20243A',
  },
  grandTotal: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#5C7CFA',
  },
  checkoutButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: '#5C7CFA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 8,
  },
  checkoutText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#20243A',
    marginTop: 18,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#777E91',
    textAlign: 'center',
    marginTop: 8,
  },
});