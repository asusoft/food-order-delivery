//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import { useNavigation } from '@react-navigation/native';


// create a component
const SignIn = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{ marginHorizontal: 20, flexDirection: "row", marginTop: 25 }}
            >
                <Text style={{ fontSize: 16 }}>Don't have an account? </Text>
                <Pressable onPress={() => navigation.navigate("SignUp")}>
                    <Text style={{ fontSize: 16, color: COLORS.primary }}>
                        Sign Up here
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
});

//make this component available to the app
export default SignIn;
