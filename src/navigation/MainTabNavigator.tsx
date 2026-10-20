import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../types/navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { CategoryScreen } from '../screens/CategoryScreen';
import { CartScreen } from '../screens/CartScreen';
import { AccountScreen } from '../screens/AccountScreen';
import { CustomTabBar } from '../components/CustomTabBar';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
      screenOptions={{ headerTitleAlign: 'center' }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
      <Tab.Screen name="Category" component={CategoryScreen} options={{ title: 'Danh mục' }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Giỏ hàng' }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ title: 'Tài khoản' }} />
    </Tab.Navigator>
  );
}
