import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "../screens/AuthScreens/SignUp";
import SignIn from "../screens/AuthScreens/SignIn";
import OTP from "../screens/AuthScreens/OTP";
import Onboarding from "../screens/Onboarding/Onboarding";
import TempScreen from "../screens/Temp/TempScreen";
import { useAuthContext } from "../contexts/AuthContext";

const RootStack = createNativeStackNavigator();


const RootNavigator = () => {
    const { dbUser, authUser } = useAuthContext();
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {
                dbUser ?
                    <RootStack.Screen name="Temp" component={TempScreen} />
                    :
                    (
                        <>
                            <RootStack.Screen name="Onboard" component={Onboarding} />
                            <RootStack.Screen name="Auth" component={AuthStackNavigator} />
                        </>
                    )

            }
        </RootStack.Navigator>
    )
}

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="SignUp"
        >
            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
            />
            <AuthStack.Screen
                name="SignIn"
                component={SignIn}
            />
            <AuthStack.Screen
                name="OTP"
                component={OTP}
            />
        </AuthStack.Navigator>
    );
};

export default RootNavigator