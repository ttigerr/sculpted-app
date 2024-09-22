import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './auth-navigation';
import ProfileNavigation from './profile-navigation';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultConfig} initialRouteName="ProfileNavigation">
        <Stack.Screen name="ProfileNavigation" component={ProfileNavigation} />
        <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
