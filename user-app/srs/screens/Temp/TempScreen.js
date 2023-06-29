//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';

import { useAuthContext } from '../../contexts/AuthContext';

// create a component
const TempScreen = () => {
    const { signOut, dbUser } = useAuthContext();

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
                <Text>Name: {dbUser?.name}</Text>
                <Text>Email: {dbUser?.email}</Text>
                <Text>Phone: {dbUser?.phoneNumber}</Text>
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
