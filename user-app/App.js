import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider from "./srs/contexts/AuthContext";
import RootNavigator from "./srs/Navigations";


export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        {/* <PhoneSignIn /> */}
        <RootNavigator />
      </AuthContextProvider>
    </NavigationContainer>
  );
}

