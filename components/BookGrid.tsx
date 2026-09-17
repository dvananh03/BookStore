
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

export default function BookGrid() {

  const books = [
    {
      id: 1,
      title: 'Nhà giả kim',
      price: '89.000đ',
      image: require('../assets/Nhà_giả_kim.jpg'),
      discount: '-20%',
    },
    {
      id: 2,
      title: 'Đắc nhân tâm',
      price: '95.000đ',
      image: require('../assets/Đắc_nhân_tâm.jpg'),
      discount: '-20%',
    },
    {
      id: 3,
      title: 'Tuổi trẻ đáng giá bao nhiêu?',
      price: '120.000đ',
      image: require('../assets/Tuổi_trẻ.jpg'),
    },
    {
      id: 4,
      title: 'Tôi tài giỏi, bạn cũng thế',
      price: '110.000đ',
      image: require('../assets/toi-tai-gioi-ban-cung-the-1.webp'),
    },
  ];

  return (
    <View style={styles.container}>

      {books.map((book) => (
        <View key={book.id} style={styles.item}>

          {/* Ảnh bìa */}
          <View style={styles.imageBox}>
            <Image
              source={book.image}
              style={styles.image}
              resizeMode="cover"
            />
            {book.discount && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {book.discount}
                </Text>
              </View>
            )}
          </View>

          {/* Tên + giá */}
          <View style={styles.info}>

            <Text style={styles.title}>
              {book.title}
            </Text>

            <Text style={styles.price}>
              {book.price}
            </Text>

          </View>

        </View>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({

  // GRID 2 CỘT
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    padding: 10,
  },

  // Mỗi item chiếm 48%
  item: {
    width: '48%',

    padding: 10,

    borderWidth: 2,
    borderColor: '#6C8CFF',
    borderStyle: 'dashed',

    backgroundColor: '#F5F5F5',
  },

  // Khung ảnh
  imageBox: {
    width: '100%',
    aspectRatio: 3 / 4,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#DDDDDD',

    borderWidth: 1,
    borderColor: '#6C8CFF',

    overflow: 'hidden',
    position: 'relative',
  },

  // Badge giảm giá
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#E53935',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Ảnh
  image: {
    width: '100%',
    height: '100%',
  },

  // Tên + giá
  info: {
    marginTop: 10,
  },

  title: {
    padding: 6,

    textAlign: 'center',

    borderWidth: 1,
    borderColor: '#6C8CFF',

    fontWeight: 'bold',
  },

  price: {
    marginTop: 6,

    padding: 6,

    textAlign: 'center',

    borderWidth: 1,
    borderColor: '#6C8CFF',

    color: '#303F9F',

    fontWeight: 'bold',
  },

});
