//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants/theme';

// create a component
const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} color={COLORS.primary} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        opacity: 1,
        top: '40%',
        alignSelf: 'center',
        height: '30%',
        width: '80%',
        margin: SIZES.padding,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: COLORS.secondary,
        position: 'absolute'
    },
});

//make this component available to the app
export default Loading;
