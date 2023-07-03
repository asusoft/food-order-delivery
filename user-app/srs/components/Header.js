//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants/theme';
import icons from '../../assets/constants/icons';

// create a component
const Header = ({
    leftComponent,
    middleComponent,
    rightComponent
}) => {
    return (
        <View style={styles.container}>
            <Image source={icons.menu} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
            <Pressable style={styles.location}>
                <Text style={styles.locationText} numberOfLines={1}>
                    Sovetskaya 35
                </Text>
            </Pressable>
            <Image source={icons.notification} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.padding,
    },
    location: {
        flex: 1,
        height: 30,
        marginHorizontal: 30,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: COLORS.secondary
    },
    locationText: {
        fontWeight: "500",
        fontSize: 14,
    },
});

//make this component available to the app
export default Header;
