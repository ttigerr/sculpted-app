import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';
import ProfileMain from 'src/modules/profile/profile-main';
import ProfileEdit from 'src/modules/profile/profile-edit';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const ProfileNavigation = () => {
  return (
    <Stack.Navigator screenOptions={defaultConfig}>
      <Stack.Screen
        name={navigationScreenNames.profile}
        component={ProfileMain}
      />
      <Stack.Screen name={navigationScreenNames.edit} component={ProfileEdit} />
    </Stack.Navigator>
  );
};
export default ProfileNavigation;
