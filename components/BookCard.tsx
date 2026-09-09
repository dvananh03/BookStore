import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

interface BookCardProps {
  image: ImageSourcePropType;
  title: string;
  author: string;
  price: string;
}

export default function BookCard({
  image,
  title,
  author,
  price,
}: BookCardProps) {
  return (
    <View style={styles.card}>

      {/* Ảnh bìa */}
      <Image
        source={image}
        style={styles.bookImage}
        resizeMode="cover"
      />

      {/* Thông tin */}
      <View style={styles.info}>

        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {title}
        </Text>

        <Text style={styles.author}>
          {author}
        </Text>

        <Text style={styles.price}>
          {price}
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    padding: 12,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: '#6C8CFF',
    borderRadius: 6,

    backgroundColor: '#F5F5F5',
  },

  bookImage: {
    width: 80,
    height: 110,
    borderRadius: 5,
  },

  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',

    marginLeft: 12,
    minHeight: 110,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  author: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
  },

  price: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#303F9F',
  },
});