import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.header}>

      <Text style={styles.logo}>
        BookStore
      </Text>

      <View style={styles.actions}>

        <View style={styles.button}>
          <Ionicons
            name="search-outline"
            size={22}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.button}>
          <Ionicons
            name="cart-outline"
            size={22}
            color="#FFFFFF"
          />
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#3ac6a8',
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  button: {
    width: 45,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 4,
  },
});