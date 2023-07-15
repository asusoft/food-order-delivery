import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SignUp from "../screens/AuthScreens/SignUp";
import SignIn from "../screens/AuthScreens/SignIn";
import OTP from "../screens/AuthScreens/OTP";
import ResetPassword from "../screens/AuthScreens/ResetPassword";
import MerchantsScreen from "../screens/MerchantsScreen/MerchantsScreen";
import Onboarding from "../screens/Onboarding/Onboarding";
import { useAuthContext } from "../contexts/AuthContext";
import Loading from "../screens/Onboarding/Loading";
import MerchantInfoScreen from "../screens/MerchantsScreen/MerchantInfoScreen";
import DishInfoScreen from "../screens/MerchantsScreen/DishInfoScreen";

const RootStack = createNativeStackNavigator();


const RootNavigator = () => {
    const { dbUser } = useAuthContext();
    const [loading, setLoading] = useState(true)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Cleanup the timer when the component unmounts or the dependency changes
        return () => clearTimeout(timer);
    })

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {
                    dbUser ?
                        <RootStack.Screen name="Landing" component={MerchantStackNavigator} />
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
            <AuthStack.Screen
                name="Reset"
                component={ResetPassword}
            />
        </AuthStack.Navigator>
    );
};

const MerchantStack = createNativeStackNavigator();

const MerchantStackNavigator = () => {
    return (
        <MerchantStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
        >
            <MerchantStack.Screen
                name="Home"
                component={HomeScreen}
            />
            <MerchantStack.Screen
                name="Merchants"
                component={MerchantsScreen}
            />
            <MerchantStack.Screen
                name="MerchantInfo"
                component={MerchantInfoScreen}
            />
            <MerchantStack.Screen
                name="DishInfo"
                component={DishInfoScreen}
            />
        </MerchantStack.Navigator>
    );
};

export default RootNavigator