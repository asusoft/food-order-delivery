import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../assets/constants/theme';

export default function Rating({ rating, showText, size, containerStyle, color }) {
  const filledStars = Math.floor(rating);
  const maxStars = Array(5 - filledStars).fill('staro');
  const r = [...Array(filledStars).fill('star'), ...maxStars];

  return (
    <View style={{ ...styles.rating, ...containerStyle }}>
      {r.map((type, index) => {
        return <AntDesign key={index} name={type} size={size} color={color} />;
      })}
      {showText ? <Text style={styles.ratingNumber}>{rating} Rating</Text> : []}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingNumber: { marginHorizontal: 4, fontSize: 16, color: "black" },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});