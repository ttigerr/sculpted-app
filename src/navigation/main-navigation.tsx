import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './auth-navigation';
import ProfileNavigation from './profile-navigation';
import HomeNavigation from './home-navigation';
import BottomNavigation from './bottom-navigation';
import ProfileEdit from 'src/modules/profile/profile-edit';
import Journal from 'src/modules/homepage/journal';
import CompassHome from 'src/modules/compass/home';
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
        <Stack.Screen
          name={navigationScreenNames.bottomNavigation}
          component={BottomNavigation}
        />
        <Stack.Screen
          name={navigationScreenNames.edit}
          component={ProfileEdit}
        />
        <Stack.Screen
          name={navigationScreenNames.journal}
          component={Journal}
        />
        <Stack.Screen
          name={navigationScreenNames.compassHome}
          component={CompassHome}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
