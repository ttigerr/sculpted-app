import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './auth-navigation';
import ProfileNavigation from './profile-navigation';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={defaultConfig}
        initialRouteName={navigationScreenNames.authNavigation}>
        <Stack.Screen
          name={navigationScreenNames.profileNavigation}
          component={ProfileNavigation}
        />
        <Stack.Screen
          name={navigationScreenNames.authNavigation}
          component={AuthNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
