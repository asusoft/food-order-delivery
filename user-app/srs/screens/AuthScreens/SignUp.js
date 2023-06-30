//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../../assets/constants/theme';
import FormInput from "../../components/FormInput";
import { validateEmail, validatePassword, validatePhoneNumber, comparePassword } from '../../utils/Utils'
import icons from "../../../assets/constants/icons"
import FooterButton from '../../components/FooterButton';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { handleSignUpError } from '../../contexts/errorHandler';
import Loading from '../../components/Loading';
import Layout from './Layout';

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

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const { signUp } = useAuthContext();

    const handleSignUp = async () => {
        try {
            setLoading(true);
            await signUp(email, password, phoneNumber, name);
            setLoading(false);
            navigation.navigate("OTP", {
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                password: password
            });
        } catch (error) {
            setLoading(false);
            handleSignUpError(error, setPasswordError, setEmailError, setPhoneNumberError)
        }
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

    function RenderForm() {
        return (
            <View>
                <FormInput
                    editable={!loading}
                    placeholder="Your name"
                    inputContainerStyle={{
                        borderColor: COLORS.grey
                    }}
                    onChange={value => {
                        setName(value);
                    }}
                />
                <View style={{ marginTop: 15 }}>
                    <FormInput
                        editable={!loading}
                        keyboardType="email-address"
                        placeholder="email@example.com"
                        inputContainerStyle={{
                            borderColor: email == ''
                                ? COLORS.grey
                                : email != '' && emailError == ''
                                    ? COLORS.green
                                    : COLORS.red,
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
                <View style={{ marginTop: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            height: 52, width: 50, marginTop: 10, alignItems: 'center', justifyContent: 'center', marginEnd: 10, borderWidth: 1,
                            backgroundColor: COLORS.secondary,
                            borderColor: COLORS.grey, borderRadius: 10,
                        }}>
                            <Text>+234</Text>

                        </View>
                        <FormInput
                            editable={!loading}
                            placeholder="9012345678"
                            containerStyle={{
                                flex: 1
                            }}
                            inputContainerStyle={{
                                borderColor: phoneNumber == ''
                                    ? COLORS.grey
                                    : phoneNumber != '' && phoneNumberError == ''
                                        ? COLORS.green
                                        : COLORS.red,
                            }}
                            onChange={value => {
                                validatePhoneNumber(value, setPhoneNumberError);
                                setPhoneNumber("+7" + value);
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
                <View style={{ marginTop: 15 }}>
                    <FormInput
                        editable={!loading}
                        placeholder="Choose Password"
                        inputContainerStyle={{
                            borderColor: password == ''
                                ? COLORS.grey
                                : password != '' && passwordError == ''
                                    ? COLORS.green
                                    : COLORS.red,
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
                <View style={{ marginTop: 15 }}>
                    <FormInput
                        editable={!loading}
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
                disabled={isEnableSignUp() ? false : true}
                label="Sign Up"
                footerStyle={{
                    marginTop: SIZES.padding,
                    height: 50,
                    marginHorizontal: 0
                }}
                onPress={() => handleSignUp()}
            />
        );
    }
    return (
        <Layout
            title="Create account"
            titleContainerStyle={{
                opacity: loading ? 0.5 : 1
            }}>
            <View style={styles.container}>
                {RenderForm()}
                {RenderFooter()}
                <View
                    style={{ marginHorizontal: 20, flexDirection: "row", marginTop: 25, opacity: loading ? 0.5 : 1, alignSelf: 'center' }}
                >
                    <Text style={{ fontSize: 16 }}>Already on App? </Text>
                    <Pressable onPress={() => navigation.navigate("SignIn")}>
                        <Text style={{ fontSize: 16, color: COLORS.primary }}>
                            Sign In
                        </Text>
                    </Pressable>
                </View>
            </View>
            {
                loading ? <Loading style={{ top: '30%' }} /> : []
            }
        </Layout>
    );

};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    appendComponentEmail: {
        justifyContent: 'center',
    },
    appendComponentPassword: {
        // width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCorrect: {
        height: 20,
        width: 20,
    },
});

//make this component available to the app
export default SignUp;
