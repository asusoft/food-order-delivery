//import liraries
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants/theme';


// create a component
const Alert = ({ visible, message, buttons }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', borderBottomColor: COLORS.lightGray, borderWidth: 0.5, borderColor: COLORS.white, marginTop: 10 }}>
                        <Text style={styles.message}>{message}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        {buttons.map((button, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{ ...styles.button, ...button.style }}
                                onPress={button.onPress}
                            >
                                <Text style={styles.buttonText}>{button.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        top: '40%',
        alignSelf: 'center',
        height: '20%',
        width: '70%',
        borderRadius: 20,
        backgroundColor: COLORS.white,
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
    buttonContainer: {
        height: '40%',
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
    },
});
//make this component available to the app
export default Alert;
