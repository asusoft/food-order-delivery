//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable, StatusBar } from 'react-native';
import { SimpleLineIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from '../../assets/constants/theme';
import icons from '../../assets/constants/icons';

// create a component
const Header = ({
    leftComponent,
    middleComponent,
    rightComponent
}) => {
    return (
        <View>
            <View style={styles.top}>
                <Pressable
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: 35,
                        width: 35,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: COLORS.dark,
                        backgroundColor: COLORS.background
                    }}
                >
                    <Image
                        source={icons.menu}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.dark
                        }}
                    />
                </Pressable>
                <Pressable style={styles.location}>
                    <Text style={styles.locationText} numberOfLines={1}>
                        Sovetskaya 35
                    </Text>
                    <View style={styles.locationIcon}>
                        <SimpleLineIcons name="location-pin" size={17} color="black" />
                    </View>
                </Pressable>
                <StatusBar style="auto" />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    top: {
        margin: 5,
        marginHorizontal: 20,
        padding: 5,
        flexDirection: "row",
        alignItems: "center"
    },

    location: {
        marginLeft: "auto",
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.secondary
    },

    locationIcon: {
        marginLeft: 25
    },

    locationText: {
        color: "gray",
        fontWeight: "500",
        fontSize: 15,
        width: 150
    }
});

//make this component available to the app
export default Header;
