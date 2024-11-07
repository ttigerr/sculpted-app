import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';
import Dashboard from 'src/modules/homepage/dashboard';
import Journal from 'src/modules/homepage/journal';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={defaultConfig}>
      <Stack.Screen
        name={navigationScreenNames.dashborad}
        component={Dashboard}
      />
      {/* <Stack.Screen name={navigationScreenNames.journal} component={Journal} /> */}
    </Stack.Navigator>
  );
};

export default HomeNavigation;
