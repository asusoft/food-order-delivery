//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../../assets/constants/theme';
import FormInput from "../../components/FormInput";
import Header from "../../components/Header"
import FooterButton from '../../components/FooterButton';
import { validateCode } from '../../utils/Utils';


// create a component
const OTP = () => {

    const [code, setCode] = useState('')
    const [codeError, setCodeError] = useState('')
    const [timer, setTimer] = useState(60);

    React.useEffect(() => {
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
    }, []);

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
            />
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {RenderHeader()}
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: SIZES.padding, marginTop: SIZES.padding * 2, }}>

                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>VERIFY PHONE NUMBER</Text>
                <Text style={{ fontSize: 16 }}>An authentication code has been sent to</Text>
                <Text style={{ fontSize: 16 }}>+2349012345678</Text>
            </View>
            <View style={styles.containerOTP}>
                <FormInput
                    containerStyle={{
                        height: 50,
                        width: '50%',
                        marginTop: 20
                    }}
                    onChange={value => {
                        validateCode(value, setCodeError)
                        setCode(value);
                    }}
                    inputContainerStyle={{
                        borderColor: code == ''
                            ? COLORS.gray
                            : code != '' && codeError == ''
                                ? COLORS.green
                                : COLORS.red,
                    }}
                    maxLength={6}
                />
                <View style={styles.countdownTimer}>
                    <Text style={{ color: COLORS.darkGray }}>
                        Didn't receive code?
                    </Text>
                    <TouchableOpacity
                        disabled={timer === 0 ? false : true}
                        onPress={() => console.log('Pressed')}
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
