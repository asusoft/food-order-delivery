//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants/theme';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import { validateEmail } from '../utils/Utils'


// create a component
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    function RenderHeader() {
        return (
            <Header
                title="SIGN UP"
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
                <FormInput
                    label="Name"
                    placeholder="Your name"
                    inputContainerStyle={{
                        borderColor: COLORS.grey
                    }}
                />
                <View style={{ marginTop: 20 }}>
                    <FormInput
                        label="Email"
                        keyboardType="email-address"
                        placeholder="email@example.com"
                        inputContainerStyle={{
                            borderColor: COLORS.grey
                        }}
                        onChange={value => {
                            validateEmail(value, setEmailError);
                            setEmail(value);
                        }}
                        errorMsg={emailError}
                        appendComponent={
                            <View style={styles.appendComponentEmail}>
                                <Text style={{
                                    color: email == ''
                                        ? COLORS.gray
                                        : email != '' && emailError == ''
                                            ? COLORS.green
                                            : COLORS.red,
                                }}> {
                                        email == '' || (email != '' && emailError == '')
                                            ? "correct"
                                            : "cancel"
                                    }
                                </Text>
                            </View>
                        }
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text>Phone Number</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            height: 52, width: 50, marginTop: 10, alignItems: 'center', justifyContent: 'center', marginEnd: 10, borderWidth: 1,
                            backgroundColor: COLORS.secondary,
                            borderColor: COLORS.grey, borderRadius: 10,
                        }}>
                            <Text>+234</Text>

                        </View>
                        <FormInput
                            placeholder="9012345678"
                            containerStyle={{
                                flex: 1
                            }}
                            inputContainerStyle={{
                                borderColor: COLORS.grey
                            }}
                            maxLength={10}
                        />

                    </View>

                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <FormInput
                        label="Password"
                        placeholder="Choose Password"
                        containerStyle={{
                            flex: 1
                        }}
                        inputContainerStyle={{
                            borderColor: COLORS.grey
                        }}
                    />
                    <FormInput
                        label="Confirm Password"
                        placeholder="Re enter password"
                        containerStyle={{
                            flex: 1,
                            marginLeft: 10
                        }}
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
            <Pressable style={styles.Footer}>
                <Text style={{ fontSize: 24, color: COLORS.light, fontWeight: "800" }}>
                    Sign Up
                </Text>
            </Pressable>
        );
    }


    return (
        <SafeAreaView style={styles.container}>
            {RenderHeader()}
            {RenderForm()}
            {RenderFooter()}
            <View
                style={{ marginHorizontal: 20, flexDirection: "row", marginTop: 25 }}
            >
                <Text style={{ fontSize: 16 }}>Already on App? </Text>
                <Pressable >
                    <Text style={{ fontSize: 16, color: COLORS.primary }}>
                        Sign In here
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
    appendComponentEmail: {
        justifyContent: 'center',
        // borderWidth: 1
    },
});

//make this component available to the app
export default SignUp;
