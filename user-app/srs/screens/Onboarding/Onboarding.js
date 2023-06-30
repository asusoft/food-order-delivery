//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';

// create a component
const Onboarding = () => {

    const navigation = useNavigation();

    const onSignIn = () => {
        navigation.navigate("Auth", { screen: 'SignIn' })
    }
    const onSignUp = () => {
        navigation.navigate("Auth", { screen: 'SignUp' })
    }

    function renderFooter() {
        return (
            <View style={{ flexDirection: 'row', marginTop: 70, }}>
                <Button
                    text="Login"
                    color={COLORS.black}
                    textColor={COLORS.white}
                    onPress={() => onSignIn()}

                />
                <Button
                    text="Create an Account"
                    color={COLORS.black}
                    textColor={COLORS.white}
                    customStyle={{
                        marginLeft: 10,
                        width: '50%'
                    }}
                    onPress={() => onSignUp()}
                />
            </View>
        )
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
            {renderFooter()}
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
