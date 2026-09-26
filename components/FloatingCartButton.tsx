import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FloatingCartButtonProps {
  count?: number;
  onPress?: () => void;
}

export default function FloatingCartButton({
  count = 4,
  onPress,
}: FloatingCartButtonProps) {
  return (
    <TouchableOpacity
      style={styles.cartButton}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Ionicons name="cart" size={22} color="#FFFFFF" />
      <Text style={styles.cartText}>Giỏ hàng</Text>

      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cartButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 68,
    height: 68,
    borderRadius: 34, // width / 2 tạo hình tròn
    backgroundColor: '#5C7CFA',
    justifyContent: 'center',
    alignItems: 'center',

    // Đảm bảo zIndex nổi trên cùng
    zIndex: 999,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  cartText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 2,
  },

  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#E53935',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
