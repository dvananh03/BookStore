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
  discount?: string;
}

export default function BookCard({
  image,
  title,
  author,
  price,
  discount,
}: BookCardProps) {
  return (
    <View style={styles.card}>

      {/* Ảnh bìa */}
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={styles.bookImage}
          resizeMode="cover"
        />
        {discount && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {discount}
            </Text>
          </View>
        )}
      </View>

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

  imageContainer: {
    position: 'relative',
  },

  bookImage: {
    width: 80,
    height: 110,
    borderRadius: 5,
  },

  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#E53935',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    zIndex: 1,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
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