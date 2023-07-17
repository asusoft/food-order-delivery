import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider from "./srs/contexts/AuthContext";
import MerchantContextProvider from './srs/contexts/MerchantContext';
import DishContextProvider from './srs/contexts/DishContext';
import RootNavigator from "./srs/Navigations";

const App = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <MerchantContextProvider>
          <DishContextProvider>
            <RootNavigator />
          </DishContextProvider>
        </MerchantContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}

export default App;