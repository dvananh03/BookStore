import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useAppSelector } from '../store/hooks';

const labels: Record<string, string> = {
  Home: 'Trang chủ',
  Category: 'Danh mục',
  Cart: 'Giỏ hàng',
  Account: 'Tài khoản',
};

const icons: Record<string, string> = {
  Home: '⌂',
  Category: '▦',
  Cart: '🛒',
  Account: '☺',
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const cartCount = useAppSelector((root) =>
    root.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const options = descriptors[route.key]?.options;
        const label = options?.tabBarLabel;
        const title =
          typeof label === 'string'
            ? label
            : options?.title ?? labels[route.name] ?? route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.tab}>
            <View>
              <Text style={[styles.icon, focused && styles.active]}>{icons[route.name] ?? '•'}</Text>
              {route.name === 'Cart' && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, focused && styles.active]}>{title}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#D9D9D9',
    paddingTop: 8,
    paddingBottom: 12,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  icon: { fontSize: 21, color: '#777777' },
  label: { fontSize: 11, color: '#777777' },
  active: { color: '#176B52', fontWeight: '700' },
  badge: {
    position: 'absolute',
    right: -12,
    top: -4,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: '#D92D20',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '700' },
});
