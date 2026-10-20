import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { formatPrice } from '../data/books';
import { useCart } from '../hooks/useCart';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

export function CheckoutScreen({ route, navigation }: Props) {
  const { total } = route.params;
  const cart = useCart();

  const confirmOrder = () => {
    Alert.alert('Đặt hàng thành công', `Tổng thanh toán: ${formatPrice(total)}`, [
      {
        text: 'OK',
        onPress: () => {
          cart.clear();
          navigation.popToTop();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Xác nhận đơn hàng</Text>
      <Text style={styles.label}>Tổng tiền cần thanh toán</Text>
      <Text style={styles.total}>{formatPrice(total)}</Text>
      <Text style={styles.note}>Đây là màn hình thanh toán minh họa cho bài tập.</Text>
      <Pressable style={styles.button} onPress={confirmOrder}>
        <Text style={styles.buttonText}>Xác nhận đặt hàng</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  heading: { fontSize: 24, fontWeight: '800', marginBottom: 28, textAlign: 'center' },
  label: { color: '#666666', textAlign: 'center' },
  total: { color: '#176B52', fontSize: 28, fontWeight: '800', textAlign: 'center', marginTop: 8, marginBottom: 18 },
  note: { color: '#777777', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  button: { backgroundColor: '#176B52', borderRadius: 10, padding: 15, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
});
