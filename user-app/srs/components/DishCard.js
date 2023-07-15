//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants/theme';

// create a component
const DishCard = ({ dish }) => {
    return (
        <View style={styles.container}>
            <View style={{ height: '55%', backgroundColor: COLORS.secondary, borderTopEndRadius: SIZES.radius, borderTopStartRadius: SIZES.radius, }}>
                <Image
                    source={{
                        uri: dish.image,
                    }}
                    style={{ flex: 1, borderTopEndRadius: SIZES.radius, borderTopStartRadius: SIZES.radius }}
                />
            </View>
            <View style={{ padding: 8, height: '25%' }}>
                <Text numberOfLines={2} style={{ fontSize: 15 }}>{dish.name}</Text>
            </View>
            <View style={{ height: '20%', backgroundColor: COLORS.secondary, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>₦ {dish.price}</Text>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        marginVertical: 5,
        padding: 8,
        width: 165,
        height: 260,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.darkSecondary,
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
export default DishCard;
