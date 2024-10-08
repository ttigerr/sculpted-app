import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';
import SignUp from 'src/modules/auth/sign-up';
import Login from 'src/modules/auth/login';
import OnboardingFirstStep from 'src/modules/auth/onboarbing/screens/first-step';
import OnboardingSecondStep from 'src/modules/auth/onboarbing/screens/second-step';
import EmailVerification from 'src/modules/auth/forgot-password/email-verification/email-verification';
import OTPVerification from 'src/modules/auth/forgot-password/otp-verification/otp-verification';
import NewPassword from 'src/modules/auth/forgot-password/new-password/new-password';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultConfig}
      initialRouteName={navigationScreenNames.login}>
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
      <Stack.Screen
        name={navigationScreenNames.emailVerification}
        component={EmailVerification}
      />
      <Stack.Screen
        name={navigationScreenNames.otpVerification}
        component={OTPVerification}
      />
      <Stack.Screen
        name={navigationScreenNames.newPassword}
        component={NewPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
