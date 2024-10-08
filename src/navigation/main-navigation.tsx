import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './auth-navigation';
import ProfileNavigation from './profile-navigation';
import HomeNavigation from './home-navigation';
import BottomNavigation from './bottom-navigation';
import ProfileEdit from 'src/modules/profile/profile-edit';
import Journal from 'src/modules/homepage/journal';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultConfig} initialRouteName="BottomNavigation">
        <Stack.Screen name="ProfileNavigation" component={ProfileNavigation} />
        <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="Journal" component={Journal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
