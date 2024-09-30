import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';
import SignUp from 'src/modules/auth/sign-up';
import Login from 'src/modules/auth/login';
import OnboardingFirstStep from 'src/modules/auth/onboarbing/screens/first-step';
import OnboardingSecondStep from 'src/modules/auth/onboarbing/screens/second-step';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultConfig}
      initialRouteName={navigationScreenNames.onboardingFirstStep}>
      <Stack.Screen name={navigationScreenNames.login} component={Login} />
      <Stack.Screen name={navigationScreenNames.signUp} component={SignUp} />
      <Stack.Screen
        name={navigationScreenNames.onboardingFirstStep}
        component={OnboardingFirstStep}
      />
      <Stack.Screen
        name={navigationScreenNames.onboardingSecondStep}
        component={OnboardingSecondStep}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
