//import liraries
import React from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../assets/constants/theme';

// create a component
const KeyboardAvoidingWrapper = ({ children }) => {
    return (
        <KeyboardAwareScrollView style={{ backgroundColor: COLORS.background }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ backgroundColor: COLORS.grey }}>
                {children}
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

//make this component available to the app
export default KeyboardAvoidingWrapper;
