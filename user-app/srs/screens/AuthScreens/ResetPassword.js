//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, Pressable } from 'react-native';
import { COLORS, SIZES } from '../../../assets/constants/theme';
import Layout from './Layout';
import FormInput from '../../components/FormInput';
import FooterButton from '../../components/FooterButton';
import icons from '../../../assets/constants/icons';
import Loading from '../../components/Loading';
import { validateEmail } from '../../utils/Utils';
import { useAuthContext } from '../../contexts/AuthContext';
import { handleResetPasswordError } from '../../contexts/errorHandler';
import { useNavigation } from '@react-navigation/native';


// create a component
const ResetPassword = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);

    const { resetPassword } = useAuthContext();

    const isEnableSignUp = () => {
        return (
            email !== '' &&
            emailError === ''
        );
    };

    const handleSend = async () => {
        try {
            setLoading(true);
            await resetPassword(email);
            setLoading(false);
        } catch (error) {
            setLoading(false)
            handleResetPasswordError(error)
        }
    }
    return (
        <Layout
            title="Forgot your password?"
            subtitle="Enter your email address and we'll send you a link to get back into your account"
            titleContainerStyle={{
                marginTop: SIZES.padding * 2,
                opacity: loading ? 0.5 : 1
            }}>
            <View style={{ ...styles.container, opacity: loading ? 0.5 : 1 }}>
                <FormInput
                    keyboardType="email-address"
                    placeholder="Enter your email address"
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
                <FooterButton
                    disabled={isEnableSignUp() ? false : true}
                    label="Send"
                    footerStyle={{
                        marginTop: SIZES.padding * 2,
                        height: 50,
                        marginHorizontal: 0
                    }}
                    onPress={() => handleSend()}
                />
                <View
                    style={{ marginHorizontal: 20, flexDirection: "row", marginTop: 25, opacity: loading ? 0.5 : 1, alignSelf: 'center' }}
                >
                    <Pressable onPress={() => navigation.navigate("SignIn")}>
                        <Text style={{ fontSize: 16, color: COLORS.primary }}>
                            Back to login
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
        marginTop: SIZES.padding * 2,
        backgroundColor: COLORS.background,
    },
    appendComponentEmail: {
        justifyContent: 'center',
    },
    imageCorrect: {
        height: 20,
        width: 20,
    }
});

//make this component available to the app
export default ResetPassword;
