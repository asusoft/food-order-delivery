//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../assets/constants/theme';
import icons from '../../assets/constants/icons';

// create a component
const QuantityButton = ({ quntity, size }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ height: size, width: size, borderRadius: 20, borderWidth: 1, borderColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginEnd: 5, }}>
                <Image source={icons.minus} style={{ height: size - 10, width: size - 10, tintColor: COLORS.primary }} />
            </View>
            <View style={{ height: size, width: size, justifyContent: 'center', alignItems: 'center', marginEnd: 5, }}>
                <Text style={{ fontSize: size / 2 + 2 }}>{quntity}</Text>
            </View>
            <View style={{ height: size, width: size, borderRadius: 20, borderWidth: 1, borderColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={icons.plus} style={{ height: size - 10, width: size - 10, tintColor: COLORS.primary }} />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default QuantityButton;
