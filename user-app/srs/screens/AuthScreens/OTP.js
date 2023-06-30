//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, SIZES } from '../../../assets/constants/theme';
import FormInput from "../../components/FormInput";
import Header from "../../components/Header"
import FooterButton from '../../components/FooterButton';
import { validateCode } from '../../utils/Utils';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { handleVerifyPhoneError } from '../../contexts/errorHandler';
import Loading from '../../components/Loading';

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
            setLoading(false);
            alert("Phone Number confirmed")
            setLoading(true);
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
        setConfirm('')
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

    function RenderHeader() {
        return (
            <Header
                title="OTP AUTHENTICATION"
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

    function RenderFooter() {
        return (
            <FooterButton
                label="Confirm"
                disabled={isEnableConfirm() ? false : true}
                onPress={() => handleConfirm()}
            />
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {RenderHeader()}
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: SIZES.padding, marginTop: SIZES.padding * 2, }}>

                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>VERIFY PHONE NUMBER</Text>
                <FormInput
                    containerStyle={{
                        height: 50,
                        width: '50%',
                        marginBottom: 30,
                    }}
                    onChange={value => {
                        setNumber(value);
                    }}
                    inputContainerStyle={{
                        borderColor: COLORS.background,
                        borderRadius: 0,
                        borderWidth: 0.5,
                        borderBottomColor: COLORS.grey,
                    }}
                    keyboardType='phone-pad'
                    textAlign='center'
                    value={number}
                    placeholder='Your Phone Number'
                />
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
                            <TouchableOpacity
                                onPress={() => handleRequestCode()}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text style={{ color: COLORS.primary, marginStart: 10, fontWeight: 'bold' }}>
                                    REQUEST CODE
                                </Text>
                            </TouchableOpacity>
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
                        marginBottom: 20
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
                <Text style={{ fontSize: 16 }}>Buy signing up, you agree to our</Text>
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
            {
                loading ? <Loading /> : []
            }
        </SafeAreaView>
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
