//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';

import { useAuthContext } from '../../contexts/AuthContext';

// create a component
const TempScreen = () => {
    const { signOut } = useAuthContext();

    const handleSignOut = () => {
        signOut()
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => handleSignOut()}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{ color: COLORS.primary, marginStart: 10, fontWeight: 'bold' }}>
                    SIGN OUT
                </Text>
            </TouchableOpacity>
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
export default TempScreen;
