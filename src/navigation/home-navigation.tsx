import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';
import Dashboard from 'src/modules/homepage/dashboard';
import Journal from 'src/modules/homepage/journal';
import TodoHome from 'src/modules/todo/home';
import TodoIncomplete from 'src/modules/todo/incomplete';
import TodoSchedule from 'src/modules/todo/schedule';
import TodoTaskList from 'src/modules/todo/task-list';
import CompassHome from 'src/modules/compass/home';

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
      {/* <Stack.Screen
        name={navigationScreenNames.compassHome}
        component={CompassHome}
      /> */}
    </Stack.Navigator>
  );
};

export default HomeNavigation;
