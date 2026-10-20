import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

interface CartItem {
    id: String,
    name: String,
    price: Number,
    quantity: String
}
interface CartState {
    item: CartItem[],
}