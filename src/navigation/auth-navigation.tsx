import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from 'src/modules/auth/sign-up';
import Login from 'src/modules/auth/login';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={defaultConfig}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
