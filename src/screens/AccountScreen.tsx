import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginSuccess, logout } from '../store/authSlice';

export function AccountScreen() {
  const dispatch = useAppDispatch();
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);

  if (!isLoggedIn || !user) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Tài khoản</Text>
        <Text style={styles.description}>Bạn chưa đăng nhập.</Text>
        <Pressable
          style={styles.button}
          onPress={() => dispatch(loginSuccess({
            user: { id: 'demo-user', name: 'Người dùng Demo', email: 'demo@example.com' },
            token: 'demo-token',
          }))}
        >
          <Text style={styles.buttonText}>Đăng nhập thử</Text>
        </Pressable>
        <Text style={styles.note}>Đây là đăng nhập mô phỏng, chưa kết nối máy chủ.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Xin chào, {user.name}</Text>
      <Text style={styles.description}>Email: {user.email}</Text>
      <Text style={styles.description}>Trạng thái: Đã đăng nhập</Text>
      <Pressable style={styles.button} onPress={() => dispatch(logout())}>
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 24, justifyContent: 'center' },
  heading: { fontSize: 24, fontWeight: '800', marginBottom: 12, textAlign: 'center' },
  description: { color: '#555555', textAlign: 'center', marginBottom: 12 },
  button: { backgroundColor: '#176B52', borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
  note: { color: '#777777', textAlign: 'center', marginTop: 16, lineHeight: 20 },
});
