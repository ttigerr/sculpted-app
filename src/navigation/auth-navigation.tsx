import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from 'src/modules/auth/sign-up';
import Login from 'src/modules/auth/login';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={defaultConfig}>
      <Stack.Screen name={navigationScreenNames.signUp} component={SignUp} />
      <Stack.Screen name={navigationScreenNames.login} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
