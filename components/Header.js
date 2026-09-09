import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>

      <Text style={styles.logo}>
        BookStore
      </Text>

      <View style={styles.actions}>

        <View style={styles.button}>
          <Text>⌕</Text>
        </View>

        <View style={styles.button}>
          <Text>🛒</Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#303F9F',
  },

  logo: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
  },

  button: {
    width: 55,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: 'white',
  },
});