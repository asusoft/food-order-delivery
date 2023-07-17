//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import images from '../../assets/constants/images';
import { COLORS } from '../../assets/constants/theme';

// create a component
const Offer = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image source={images.offer} style={styles.container} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: 318,
        height: 118,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        resizeMode: 'contain',
        backgroundColor: COLORS.secondary,
    },
});

//make this component available to the app
export default Offer;
