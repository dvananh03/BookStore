import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CategoryChips() {

  const categories = [
    'Văn học',
    'Kinh tế',
    'Thiếu nhi',
    'Truyện tranh',
    'Ngoại ngữ',
    'Lịch sử',
  ];

  return (
    <View style={styles.container}>

      {categories.map((category, index) => (
        <View style={styles.chip} key={index}>
          <Text style={styles.text}>
            {category}
          </Text>
        </View>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,

    padding: 12,
  },

  chip: {
    paddingHorizontal: 24,
    paddingVertical: 10,

    borderWidth: 2,
    borderColor: '#6C8CFF',
    borderRadius: 30,
  },

  text: {
    fontSize: 14,
  },
});