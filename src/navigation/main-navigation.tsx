import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './auth-navigation';
import BottomNavigation from './bottom-navigation';
import ProfileEdit from 'src/modules/profile/profile-edit';
import Journal from 'src/modules/homepage/journal';
import CompassHome from 'src/modules/compass/home';
import TodoHome from 'src/modules/todo/home';
import TodoIncomplete from 'src/modules/todo/incomplete';
import TodoSchedule from 'src/modules/todo/schedule';
import TodoTaskList from 'src/modules/todo/task-list';
import ReminderEdit from 'src/modules/profile/reminder-edit';
import ProfileMain from 'src/modules/profile/profile-main';
import ProfileNavigation from './profile-navigation';
import EmailVerification from 'src/modules/auth/forgot-password/email-verification/email-verification';
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
        // Supposed to be authNavigation
        initialRouteName={navigationScreenNames.authNavigation}> 
        <Stack.Screen
          name={navigationScreenNames.profile}
          component={ProfileMain}
          initialParams={{source: 'dashboard'}} // To indicate a source
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
          initialParams={{source: 'dashboard'}} // To indicate a source
        />
        <Stack.Screen
          name={navigationScreenNames.compassHome}
          component={CompassHome}
        />
        <Stack.Screen
          name={navigationScreenNames.todoHome}
          component={TodoHome}
        />
        <Stack.Screen
          name={navigationScreenNames.todoIncomplete}
          component={TodoIncomplete}
        />
        <Stack.Screen
          name={navigationScreenNames.todoSchedule}
          component={TodoSchedule}
        />
        <Stack.Screen
          name={navigationScreenNames.todoTaskList}
          component={TodoTaskList}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
