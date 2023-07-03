import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../assets/constants/theme';

export default function Rating({ rating, showText, size, containerStyle }) {
  const filledStars = Math.floor(rating);
  const maxStars = Array(5 - filledStars).fill('staro');
  const r = [...Array(filledStars).fill('star'), ...maxStars];

  return (
    <View style={{ ...styles.rating, ...containerStyle }}>
      {showText ? <Text style={styles.ratingNumber}>{rating}</Text> : []}
      {r.map((type, index) => {
        return <AntDesign key={index} name={type} size={size} color={COLORS.red} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingNumber: { marginRight: 4, fontFamily: 'Menlo', fontSize: 16, color: "black" },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});