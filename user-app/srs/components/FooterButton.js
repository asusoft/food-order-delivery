//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../assets/constants/theme'

// create a component
const FooterButton = ({
    label,
    onPress,
    disabled
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            opacity={0.5}
            style={{ ...styles.Footer, opacity: disabled ? 0.5 : 1 }}
        >
            <Text style={{ fontSize: 24, color: COLORS.light, fontWeight: "800" }}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    Footer: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "center",
        padding: 20,
        alignItems: "center",
        bottom: 50,
        right: 30,
        left: 30,
        height: 80,
        borderRadius: 20,
        backgroundColor: COLORS.primary
    },
});

//make this component available to the app
export default FooterButton;
