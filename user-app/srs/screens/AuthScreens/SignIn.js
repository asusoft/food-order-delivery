//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import FormInput from "../../components/FormInput";
import Header from "../../components/Header"
import { COLORS } from '../../../assets/constants/theme';
import icons from "../../../assets/constants/icons"
import FooterButton from '../../components/FooterButton';
import { useNavigation } from '@react-navigation/native';



// create a component
const SignIn = () => {
    const navigation = useNavigation();

    function RenderHeader() {
        return (
            <Header
                title="SIGN IN"
                containerStyle={{
                    height: 50,
                    marginHorizontal: 20,
                    marginTop: 10
                }}
                titleStyle={{}}
                leftComponent={<View style={{ width: 40 }} />}
                rightComponent={<View style={{ width: 40 }} />}
            />
        );
    }

    function RenderForm() {
        return (
            <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                <View style={{ marginTop: 20 }}>
                    <FormInput
                        label="Email"
                        keyboardType="email-address"
                        placeholder="email@example.com"
                        inputContainerStyle={{
                            borderColor: COLORS.grey
                        }}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <FormInput
                        label="Password"
                        placeholder="Your Password"
                        inputContainerStyle={{
                            borderColor: COLORS.grey
                        }}
                    />
                </View>

            </View>
        );
    }

    function RenderFooter() {
        return (
            <FooterButton
                label="Sign In"
                footerStyle={{
                    position: "absolute",
                    bottom: 50,
                    right: 10,
                    left: 10,
                }}
            />
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {RenderHeader()}
            {RenderForm()}
            {RenderFooter()}
            <View
                style={{ marginHorizontal: 20, flexDirection: "row", marginTop: 25, alignSelf: 'flex-end' }}
            >
                <Pressable>
                    <Text style={{ fontSize: 16, color: COLORS.primary }}>
                        Forgot Password?
                    </Text>
                </Pressable>
            </View>
            <View
                style={{ marginHorizontal: 20, flexDirection: "row", marginTop: 25, alignSelf: 'center' }}
            >
                <Text style={{ fontSize: 16 }}>Don't have an account? </Text>
                <Pressable onPress={() => navigation.navigate("SignUp")}>
                    <Text style={{ fontSize: 16, color: COLORS.primary }}>
                        Sign Up here
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
});

//make this component available to the app
export default SignIn;
