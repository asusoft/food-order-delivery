//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import images from '../../../assets/constants/images';

// create a component
const Loading = () => {
    return (
        <View style={styles.container}>
            <Image source={images.logo2} style={{ width: 250, height: 250, resizeMode: 'contain' }} />
            <View style={{ position: 'absolute', bottom: 70, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18 }}>from</Text>
                <Image source={images.savvy} style={{ width: 150, height: 50, resizeMode: 'contain', resizeMode: 'contain', marginEnd: 12 }} />
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
        backgroundColor: COLORS.background,
    },
});

//make this component available to the app
export default Loading;
