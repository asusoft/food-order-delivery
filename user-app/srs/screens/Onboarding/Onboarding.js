//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import { useNavigation } from '@react-navigation/native';

// create a component
const Onboarding = () => {

    const navigation = useNavigation();

    const onSignIn = () => {
        navigation.navigate("Auth", { screen: 'SignIn' })
    }
    const onSignUp = () => {
        navigation.navigate("Auth", { screen: 'SignUp' })
    }
    return (
        <View style={styles.container}>
            <Text>Onboarding</Text>
            <TouchableOpacity onPress={() => onSignIn()}>
                <Text> Login </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 20 }} onPress={() => onSignUp()}>
                <Text> Create an account </Text>
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
        backgroundColor: COLORS.primary,
    },
});

//make this component available to the app
export default Onboarding;
