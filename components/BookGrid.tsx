import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function BookGrid() {

  const books = [
    {
      id: 1,
      title: 'Nhà giả kim',
      price: '89.000đ',
    },
    {
      id: 2,
      title: 'Đắc nhân tâm',
      price: '95.000đ',
    },
    {
      id: 3,
      title: 'Tuổi trẻ đáng giá bao nhiêu?',
      price: '120.000đ',
    },
    {
      id: 4,
      title: 'Tôi tài giỏi, bạn cũng thế',
      price: '110.000đ',
    },
  ];

  return (
    <View style={styles.container}>

      {books.map((book) => (
        <View key={book.id} style={styles.item}>

          {/* Ảnh bìa */}
          <View style={styles.imageBox}>
            <Text style={styles.imageText}>
              Ảnh aspectRatio
            </Text>
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

  // GRID
  container: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',

    rowGap: 12,
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

  // Ảnh
  imageBox: {
    width: '100%',

    aspectRatio: 3 / 4,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#DDDDDD',

    borderWidth: 1,
    borderColor: '#6C8CFF',
  },

  imageText: {
    fontWeight: 'bold',
    color: '#333333',
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