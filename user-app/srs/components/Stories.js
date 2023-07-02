//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import images from '../../assets/constants/images';
import { COLORS } from '../../assets/constants/theme';

// create a component
const Stories = ({ item }) => {
    return (
        <View style={{ margin: 10, width: 140 }}>
            <ImageBackground style={styles.container} />
            <View style={{ height: 65, width: 65, borderRadius: 33, backgroundColor: COLORS.green, alignSelf: 'center', marginTop: -40 }}>
            </View>
            <Text numberOfLines={1} style={{ marginTop: 10, fontSize: 16 }}>Restaurant Name Restaurant</Text>
            <Text style={{ marginTop: 2, fontSize: 12, opacity: 0.7 }}>2 Hours ago</Text>
        </View>


    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: 140,
        height: 185,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        resizeMode: 'stretch',
        backgroundColor: COLORS.secondary,
    },
});

//make this component available to the app
export default Stories;
