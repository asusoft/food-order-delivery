//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants/theme';
import icons from '../../assets/constants/icons';
import Rating from './Rating'

// create a component
const Special = ({ dish }) => {
    return (
        <View style={{ margin: 5, width: 125 }}>
            <View style={styles.container}>
                <Image
                    source={{
                        uri: dish.image,
                    }}
                    style={{ height: 90, width: 90, borderRadius: 50, alignSelf: 'center', marginVertical: 5 }}
                />
                <View style={{ padding: 8 }}>
                    <Text numberOfLines={1} style={{ fontSize: 15 }}>{dish.name}</Text>
                    <Text style={{ marginTop: 5, fontSize: 15, fontWeight: '500' }}>₦ {dish.price}</Text>
                </View>
                <Rating
                    rating={dish.rating.toFixed(1)}
                    showText={false}
                    size={12}
                    containerStyle={{
                        marginLeft: 8,
                        marginTop: -5
                    }}
                />
                <Image source={dish?.isFavorite ? icons.heartFilled : icons.heart} style={{ ...styles.Like, tintColor: dish?.isFavorite ? COLORS.red : COLORS.grey }} />
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 5,
        width: 125,
        height: 180,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.secondary,
    },
    Like: {
        position: "absolute",
        top: 5,
        right: 5,
        height: 20,
        width: 25,
    },
});

//make this component available to the app
export default Special;
