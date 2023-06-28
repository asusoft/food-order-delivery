//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../../assets/constants/theme';
import FormInput from '../../../components/FormInput';
import Header from '../../../components/Header';
import { validateEmail, validatePassword, validatePhoneNumber, comparePassword } from '../../../utils/Utils'
import icons from '../../../../assets/constants/icons';
import FooterButton from '../../../components/FooterButton';
import { useAuthContext } from '../../../contexts/AuthContext';

// create a component
const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { signUp } = useAuthContext();

    const handleSignUp = async () => {
        await signUp(email, password)
    }

    const isEnableSignUp = () => {
        return (
            name !== '' &&
            email !== '' &&
            phoneNumber !== '' &&
            password !== '' &&
            confirmPassword !== '' &&
            emailError === '' &&
            phoneNumberError === '' &&
            passwordError === '' &&
            confirmPasswordError === ''
        );
    };


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
                    onChange={value => {
                        setName(value);
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

                                <Image
                                    source={
                                        email == '' || (email != '' && emailError == '')
                                            ? icons.correct
                                            : icons.cancel
                                    }
                                    style={[
                                        styles.imageCorrect,
                                        {
                                            tintColor:
                                                email == ''
                                                    ? COLORS.gray
                                                    : email != '' && emailError == ''
                                                        ? COLORS.green
                                                        : COLORS.red,
                                        },
                                    ]}
                                />
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
                            onChange={value => {
                                validatePhoneNumber(value, setPhoneNumberError);
                                setPhoneNumber("+234" + value);
                            }}
                            errorMsg={phoneNumberError}
                            appendComponent={
                                <View style={styles.appendComponentPassword}>
                                    <Image
                                        source={
                                            phoneNumber == '' || (phoneNumber != '' && phoneNumberError == '')
                                                ? icons.correct
                                                : icons.cancel
                                        }
                                        style={[
                                            styles.imageCorrect,
                                            {
                                                tintColor:
                                                    phoneNumber == ''
                                                        ? COLORS.gray
                                                        : phoneNumber != '' && phoneNumberError == ''
                                                            ? COLORS.green
                                                            : COLORS.red,
                                            },
                                        ]}
                                    />
                                </View>
                            }
                            maxLength={10}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <FormInput
                        label="Password"
                        placeholder="Choose Password"
                        inputContainerStyle={{
                            borderColor: COLORS.grey
                        }}
                        onChange={value => {
                            validatePassword(value, setPasswordError);
                            setPassword(value);
                        }}
                        secureTextEntry={!showPassword}
                        errorMsg={passwordError}
                        appendComponent={
                            <TouchableOpacity
                                style={styles.appendComponentPassword}
                                onPress={() => setShowPassword(!showPassword)}>
                                <Image
                                    source={showPassword ? icons.eye_close : icons.eye}
                                    style={{
                                        height: 20, width: 20, tintColor: COLORS.gray,
                                        tintColor:
                                            password == ''
                                                ? COLORS.gray
                                                : password != '' && passwordError == ''
                                                    ? COLORS.green
                                                    : COLORS.red,
                                    }}
                                />
                            </TouchableOpacity>
                        }
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <FormInput
                        label="Confirm Password"
                        placeholder="Rewrite Password"
                        inputContainerStyle={{
                            borderColor: COLORS.grey
                        }}
                        onChange={value => {
                            comparePassword(value, password, setConfirmPasswordError);
                            setConfirmPassword(value);
                        }}
                        errorMsg={confirmPasswordError}
                        appendComponent={
                            <View style={styles.appendComponentPassword}>
                                <Image
                                    source={
                                        confirmPassword == '' || (confirmPassword != '' && confirmPasswordError == '')
                                            ? icons.correct
                                            : icons.cancel
                                    }
                                    style={[
                                        styles.imageCorrect,
                                        {
                                            tintColor:
                                                confirmPassword == ''
                                                    ? COLORS.gray
                                                    : confirmPassword != '' && confirmPasswordError == ''
                                                        ? COLORS.green
                                                        : COLORS.red,
                                        },
                                    ]}
                                />
                            </View>
                        }
                    />
                </View>
            </View>
        );
    }

    function RenderFooter() {
        return (
            <FooterButton
                label="Sign Up"
                disabled={isEnableSignUp() ? true : false}
                onPress={() => handleSignUp()}
            />
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
    appendComponentPassword: {
        // width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
    },
    imageCorrect: {
        height: 20,
        width: 20,
    },
});

//make this component available to the app
export default SignUp;
