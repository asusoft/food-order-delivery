//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../../assets/constants/theme';
import FormInput from "../../components/FormInput";
import Header from "../../components/Header"
import FooterButton from '../../components/FooterButton';
import { validateCode } from '../../utils/Utils';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

// create a component
const OTP = ({ route }) => {
    const navigation = useNavigation();
    const { name, phoneNumber, email, password } = route.params;
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState('')
    const [confirm, setConfirm] = useState(null);
    const [timer, setTimer] = useState(120);

    const { verifyPhone, linkAccounts, authUser, dbUser } = useAuthContext();

    const handleRequestCode = async () => {
        await verifyPhone(phoneNumber, setConfirm);
    }

    const handleConfirm = async () => {
        try {
            await confirm.confirm(code);
            alert("Phone Number confirmed")
            await linkAccounts(email, password, name, phoneNumber)
        } catch (error) {
            alert('Invalid code.');
        }
    }

    const handleResend = async () => {
        setTimer(120)
        await verifyPhone(phoneNumber, setConfirm);
    }

    React.useEffect(() => {
        if (confirm) {
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
                {
                    confirm ? (
                        <>
                            <Text style={{ fontSize: 16 }}>An authentication code has been sent to</Text>
                            <Text style={{ fontSize: 16 }}>{phoneNumber}</Text>

                        </>
                    ) : (
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
                    )
                }
            </View>
            <View style={styles.containerOTP}>
                <FormInput
                    containerStyle={{
                        height: 50,
                        width: '50%',
                        marginTop: 20
                    }}
                    editable={confirm ? true : false}
                    onChange={value => {
                        validateCode(value, setCodeError)
                        setCode(value);
                    }}
                    inputContainerStyle={{
                        opacity: confirm ? 1 : 0.2,
                        borderColor: code == ''
                            ? COLORS.gray
                            : code != '' && codeError == ''
                                ? COLORS.green
                                : COLORS.red,
                    }}
                    maxLength={6}
                />
                <View style={styles.countdownTimer}>
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
