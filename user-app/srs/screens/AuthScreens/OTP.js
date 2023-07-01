//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native';
import { COLORS, SIZES } from '../../../assets/constants/theme';
import FormInput from "../../components/FormInput";
import FooterButton from '../../components/FooterButton';
import { validateCode, validatePhoneNumber } from '../../utils/Utils';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { handleVerifyPhoneError } from '../../contexts/errorHandler';
import Layout from './Layout';
import Loading from '../../components/Loading';
import icons from '../../../assets/constants/icons';

// create a component
const OTP = ({ route }) => {
    const navigation = useNavigation();
    const { phoneNumber, email, password } = route.params;
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState('')
    const [confirm, setConfirm] = useState(null);
    const [timer, setTimer] = useState(120);
    const [verifyError, setVerifyError] = useState('')

    const [number, setNumber] = useState(phoneNumber)
    const [phoneNumberError, setPhoneNumberError] = useState('')

    const { verifyPhone, linkAccounts } = useAuthContext();

    const [loading, setLoading] = useState(false);

    const handleRequestCode = async () => {
        try {
            await verifyPhone(number, setConfirm);
        } catch (error) {
            handleVerifyPhoneError(error, setVerifyError);
        }
    }

    const handleConfirm = async () => {
        try {
            setLoading(true);
            await confirm.confirm(code);
            await linkAccounts(email, password, number)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            handleVerifyPhoneError(error, setVerifyError);
        }
    }

    const handleResend = async () => {
        setVerifyError('')
        setTimer(120)
        await verifyPhone(number, setConfirm);
    }

    const handleChangeNumber = async () => {
        setNumber('')
        setCode('')
        setConfirm('')
        setCodeError('')
        setVerifyError('')
    }

    React.useEffect(() => {
        if (confirm) {
            setVerifyError('')
            let interval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        return prevTimer;
                    }
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [confirm]);

    const isEnableConfirm = () => {
        return (
            code !== '' &&
            codeError === ''
        );
    };

    const onInfoPressed = () => {
        alert("Phone number are written in the format [+][country code][subscriber number including area code].")
    }

    function RenderFooter() {
        return (
            <FooterButton
                disabled={isEnableConfirm() ? false : true}
                label="Confirm"
                footerStyle={{
                    marginTop: SIZES.padding,
                    height: 50,
                    marginHorizontal: 0
                }}
                onPress={() => handleConfirm()}
            />
        );
    }
    return (
        <Layout
            title="VERIFY PHONE NUMBER"
            titleContainerStyle={{
                opacity: loading ? 0.5 : 1,
                marginTop: SIZES.padding
            }}>
            <View style={styles.container}>
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: SIZES.padding, marginTop: 12, }}>
                    <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <FormInput
                            containerStyle={{
                                height: 50,
                                width: '60%',
                                marginBottom: phoneNumberError ? 60 : 30,
                            }}
                            onChange={value => {
                                validatePhoneNumber(value, setPhoneNumberError);
                                setNumber(value);
                            }}
                            inputContainerStyle={{
                                borderColor: COLORS.background,
                                borderRadius: 0,
                                borderWidth: 0.2,
                                borderBottomColor: COLORS.grey,
                            }}
                            keyboardType='phone-pad'
                            textAlign='center'
                            value={number}
                            errorMsg={phoneNumberError}
                            maxLength={12}
                            placeholder='Your Phone Number'
                        />
                        {
                            phoneNumberError ? <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => onInfoPressed()}>
                                <Image source={icons.info} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                                : []
                        }
                    </View>
                    {
                        confirm ? (
                            <>
                                <Text style={{ fontSize: 16 }}>An authentication code has been sent to</Text>
                                <Text style={{ fontSize: 16 }}>{number}</Text>
                                <TouchableOpacity
                                    onPress={() => handleChangeNumber()}
                                    style={{
                                        marginTop: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text style={{ color: COLORS.primary, marginStart: 10, fontWeight: 'bold' }}>
                                        Change Number
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                {
                                    codeError || verifyError ? (
                                        <TouchableOpacity
                                            onPress={() => handleChangeNumber()}
                                            style={{
                                                marginTop: 20,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Text style={{ color: COLORS.primary, marginStart: 10, fontWeight: 'bold' }}>
                                                Change Number
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            disabled={phoneNumberError !== '' || number === ''}
                                            onPress={() => handleRequestCode()}
                                            style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Text style={{ color: COLORS.primary, marginStart: 10, fontWeight: 'bold', opacity: phoneNumberError == '' && number !== '' ? 1 : 0.5 }}>
                                                REQUEST CODE
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </>
                        )
                    }
                </View>
                <View style={styles.containerOTP}>
                    <FormInput
                        containerStyle={{
                            height: 50,
                            width: '50%',
                            marginTop: 20,
                            marginBottom: codeError || verifyError ? 40 : 20
                        }}
                        editable={confirm ? true : false}
                        onChange={value => {
                            validateCode(value, setCodeError)
                            setCode(value);
                        }}
                        errorMsg={verifyError}
                        inputContainerStyle={{
                            opacity: confirm ? 1 : 0.2,
                            borderColor: code == ''
                                ? COLORS.gray
                                : code != '' && codeError == ''
                                    ? COLORS.green
                                    : COLORS.red,
                        }}
                        textAlign='center'
                        maxLength={6}
                    />
                    <View style={{ ...styles.countdownTimer }}>
                        <Text style={{ color: COLORS.darkGray, opacity: confirm ? 1 : 0.5, }}>
                            Didn't receive code?
                        </Text>
                        <TouchableOpacity
                            disabled={timer === 0 ? false : true}
                            onPress={() => handleResend()}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: timer === 0 ? 1 : 0.5
                            }}>
                            <Text style={{ color: COLORS.primary, marginStart: 10, fontWeight: 'bold' }}>
                                Resend {timer === 0 ? "now" : `(${timer}s)`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {RenderFooter()}
                <View style={{ marginTop: SIZES.padding, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>By signing up, you agree to our</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{ color: COLORS.primary, marginTop: 10, fontWeight: 'bold', fontSize: 14 }}>
                            TERMS AND CONDITIONS
                        </Text>
                    </TouchableOpacity>
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
    containerOTP: {
        flex: 1,
        marginTop: SIZES.padding,
        alignItems: 'center',
    },
    countdownTimer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SIZES.padding,
    },

});

//make this component available to the app
export default OTP;
