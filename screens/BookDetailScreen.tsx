import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Book, BOOKS_DATA } from '../data/booksData';

interface BookDetailScreenProps {
  book?: Book;
  onBack?: () => void;
  onAddToCart?: (book: Book, quantity: number) => void;
}

export default function BookDetailScreen({
  book = BOOKS_DATA[0], // Mặc định hiển thị sách đầu tiên nếu không truyền
  onBack,
  onAddToCart,
}: BookDetailScreenProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(book, quantity);
    } else {
      Alert.alert(
        'Thành công',
        `Đã thêm ${quantity} cuốn "${book.title}" vào giỏ hàng!`
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3ac6a8" />

      {/* HEADER CỦA MÀN HÌNH CHI TIẾT */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          <Text style={styles.backText}>Trang chủ</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          Chi tiết sách
        </Text>

        <View style={{ width: 60 }} />
      </View>

      {/* 1. ẢNH BÌA LỚN PHÍA TRÊN (CĂN GIỮA, OUTSIDE SCROLLVIEW HOẶC TRÊN CÙNG) */}
      <View style={styles.coverContainer}>
        <View style={styles.imageBox}>
          <Image
            source={book.image}
            style={styles.coverImage}
            resizeMode="cover"
          />
          {book.discount && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{book.discount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* 2. PHẦN NỘI DUNG DÀI ĐẶT TRONG SCROLLVIEW (flex: 1) */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Khung Tên sách + Tác giả */}
        <View style={styles.infoSection}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookAuthor}>Tác giả: {book.author}</Text>
        </View>

        {/* Khung Giá */}
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Giá bán:</Text>
          <Text style={styles.bookPrice}>{book.price}</Text>
          {book.originalPrice && (
            <Text style={styles.originalPrice}>{book.originalPrice}</Text>
          )}
        </View>

        {/* Khung Mô tả dài */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionHeader}>Giới thiệu nội dung</Text>
          <Text style={styles.descriptionText}>{book.description}</Text>
        </View>
      </ScrollView>

      {/* 3. THANH 'THÊM VÀO GIỎ' CỐ ĐỊNH DƯỚI CÙNG (Không nằm trong ScrollView) */}
      <View style={styles.bottomBar}>
        {/* Bộ chọn số lượng */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={handleDecrement}
            activeOpacity={0.7}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qtyText}>{quantity}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={handleIncrement}
            activeOpacity={0.7}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Nút Thêm vào giỏ */}
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={handleAdd}
          activeOpacity={0.8}
        >
          <Ionicons name="cart-outline" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  // Header Bar
  header: {
    height: 54,
    backgroundColor: '#3ac6a8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  backText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Ảnh bìa lớn phía trên: alignSelf: 'center', aspectRatio giữ tỉ lệ
  coverContainer: {
    paddingVertical: 14,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  imageBox: {
    width: '52%', // Width theo %
    aspectRatio: 3 / 4, // AspectRatio giữ tỉ lệ chuẩn
    alignSelf: 'center', // Yêu cầu alignSelf: 'center'
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#6C8CFF',
    backgroundColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
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
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // ScrollView (flex: 1) chứa thông tin & mô tả dài
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },

  infoSection: {
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },

  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
  },

  bookAuthor: {
    fontSize: 15,
    color: '#666666',
    fontStyle: 'italic',
  },

  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F0F4FF',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#6C8CFF',
  },

  priceLabel: {
    fontSize: 14,
    color: '#555555',
    marginRight: 8,
  },

  bookPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#303F9F',
    marginRight: 10,
  },

  originalPrice: {
    fontSize: 14,
    color: '#999999',
    textDecorationLine: 'line-through',
  },

  descriptionSection: {
    marginTop: 4,
  },

  descriptionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },

  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444444',
  },

  // Thanh dưới cùng: flexDirection: 'row', justifyContent: 'space-between', không nằm trong ScrollView
  bottomBar: {
    height: 64,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 8,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    overflow: 'hidden',
  },

  qtyBtn: {
    width: 36,
    height: 38,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },

  qtyText: {
    width: 40,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
  },

  addToCartBtn: {
    backgroundColor: '#3ac6a8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#3ac6a8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },

  addToCartText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
