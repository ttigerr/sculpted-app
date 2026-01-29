import { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigation from './home-navigation';
import ProfileNavigation from './profile-navigation';
import Icon from 'src/modules/core/components/icon';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';
import ProfileMain from 'src/modules/profile/profile-main';
import Dashboard from 'src/modules/homepage/dashboard';
import Journal from 'src/modules/homepage/journal';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationPropsType } from 'src/utils/types';


const BottomNavigation = (navigationProps: NavigationPropsType) => {
  const Tab = createBottomTabNavigator();
  const [source, setSource] = useState<string | null>(null); // use null to indicate loading

  useEffect(() => {
    const incomingSource = navigationProps.route.params?.source || 'tab'; // fallback default
    setSource(incomingSource);
  }, [navigationProps.route.params?.source]);

  if (source === null) return null;
  return (
    <Tab.Navigator
      initialRouteName={
        source === 'auth'
          ? navigationScreenNames.homeNavigation
          : navigationScreenNames.profileNavigation
      }
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case navigationScreenNames.journal:
              iconName = focused ? 'bookmarkFocused' : 'bookmark';
              break;
            case navigationScreenNames.homeNavigation:
              iconName = focused ? 'homeFocused' : 'home';
              break;
            case navigationScreenNames.profileNavigation:
              iconName = focused ? 'profileFocused' : 'profile';
              break;
          }
          return (
            <Icon
              name={iconName}
              width={32}
              height={32}
              strokeColor="#FFFFFF"
              fill="#FFFFFF"
            />
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'white',
        tabBarStyle: styles.tabBarStyle,
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      })}
    >
      <Tab.Screen
        name={navigationScreenNames.journal}
        component={Journal}
        options={{
          headerShown: false,
          tabBarLabel: 'Journal',
        }}
        initialParams={{ source: 'tab' }}
      />
      <Tab.Screen
        name={navigationScreenNames.homeNavigation}
        component={HomeNavigation}
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name={navigationScreenNames.profileNavigation}
        component={ProfileNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
        }}
        initialParams={{ source: 'tab' }}
      />
    </Tab.Navigator>
  );
};
 export default BottomNavigation

const styles = StyleSheet.create({
  tabBarStyle: {
    height: RFValue(80),
    position: 'absolute',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignSelf: 'center',
    backgroundColor: '#242526',
    bottom: 0,
    borderTopWidth: 0,          
    elevation: 0,           
    
  },
  // linearGradient: {
  //   flex: 1,
  //   marginTop: -10,
  //   borderRadius: 25,
  //   // opacity: 0.65,
  // },
});
