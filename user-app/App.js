import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider from "./srs/contexts/AuthContext";
import RootNavigator from "./srs/Navigations";

const App = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <RootNavigator />
      </AuthContextProvider>
    </NavigationContainer>
  );
}

export default App;