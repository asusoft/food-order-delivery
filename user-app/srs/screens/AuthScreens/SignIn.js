//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, Alert as NewAlert } from 'react-native';
import FormInput from "../../components/FormInput";
import { COLORS, SIZES } from '../../../assets/constants/theme';
import { validateEmail } from '../../utils/Utils'
import icons from "../../../assets/constants/icons"
import FooterButton from '../../components/FooterButton';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { handleSignInError } from '../../contexts/errorHandler';
import Loading from '../../components/Loading';
import Layout from './Layout';

// create a component
const SignIn = () => {
    const navigation = useNavigation();
    const { signIn } = useAuthContext();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleOnVerifyOK = () => {
        navigation.navigate('OTP', { email: email, password: password })
    };

    const handleSignIn = async () => {
        try {
            setLoading(true);
            await signIn(email, password);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const errorMessage = error.message.trim();
            if (errorMessage.includes("Verify your account before signing in")) {
                NewAlert.alert('', 'Verify your account before signing in', [
                    {
                        text: 'Cancel',
                    },
                    {
                        text: 'Verify',
                        onPress: () => handleOnVerifyOK(),
                        style: 'cancel'
                    },
                ]);
            }
            handleSignInError(error, setPasswordError, setEmailError)
        }
    }

    const isEnableSignIn = () => {
        return (
            email !== '' &&
            password !== '' &&
            emailError === ''
        );
    };
    function RenderForm() {
        return (
            <View>
                <View style={{ marginTop: 20 }}>
                    <FormInput
                        keyboardType="email-address"
                        placeholder="Your email address"
                        inputContainerStyle={{
                            borderColor: email == ''
                                ? COLORS.grey
                                : email != '' && emailError == ''
                                    ? COLORS.grey
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
                <View style={{ marginTop: 20 }}>
                    <FormInput
                        placeholder="Password"
                        inputContainerStyle={{
                            borderColor: password == ''
                                ? COLORS.grey
                                : password != '' && passwordError == ''
                                    ? COLORS.gray
                                    : COLORS.red,
                        }}
                        onChange={value => {
                            setPasswordError('')
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
                                        tintColor: COLORS.gray
                                    }}
                                />
                            </TouchableOpacity>
                        }
                    />
                </View>
            </View>
        );
    }

    function RenderFooter() {
        return (
            <FooterButton
                disabled={isEnableSignIn() ? false : true}
                label="Log in"
                footerStyle={{
                    marginTop: SIZES.padding * 2,
                    height: 50,
                    marginHorizontal: 0
                }}
                onPress={() => handleSignIn()}
            />
        );
    }

    return (
        <Layout
            title="Sign in to your account"
            subtitle="Welcome back"
            titleContainerStyle={{
                marginTop: SIZES.padding * 2,
                opacity: loading ? 0.5 : 1
            }}>
            <View style={{ ...styles.container, opacity: loading ? 0.5 : 1 }}>
                {RenderForm()}

                <View
                    style={{ marginHorizontal: 20, flexDirection: "row", marginTop: 25, alignSelf: 'flex-end', opacity: loading ? 0.5 : 1 }}
                >
                    <Pressable onPress={() => navigation.navigate("Reset")}>
                        <Text style={{ fontSize: 16, color: COLORS.darkPrimary }}>
                            Forgot Password?
                        </Text>
                    </Pressable>
                </View>
                {RenderFooter()}
                <View
                    style={{ marginHorizontal: 20, flexDirection: "row", marginTop: 25, opacity: loading ? 0.5 : 1, alignSelf: 'center' }}
                >
                    <Text style={{ fontSize: 16 }}>Don't have an account? </Text>
                    <Pressable onPress={() => navigation.navigate("SignUp")}>
                        <Text style={{ fontSize: 16, color: COLORS.darkPrimary }}>
                            Sign Up
                        </Text>
                    </Pressable>
                </View>
            </View>
            {
                loading ? <Loading style={{ top: '30%' }} text='Logging in...' /> : []
            }
        </Layout>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: SIZES.padding,
        backgroundColor: COLORS.background,
    },
    appendComponentEmail: {
        justifyContent: 'center',
    },
    appendComponentPassword: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCorrect: {
        height: 20,
        width: 20,
    }
});

//make this component available to the app
export default SignIn;
