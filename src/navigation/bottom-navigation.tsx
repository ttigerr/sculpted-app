import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigation from './home-navigation';
import ProfileNavigation from './profile-navigation';
import Icon from 'src/modules/core/components/icon';
import { theme } from 'src/config/theme';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';

const Tab = createBottomTabNavigator();

const colorList = [
    {offset: '0%', color: '#535456', opacity: '0.65'},
    {offset: '65%', color: '#696E75', opacity: '0.65'},
  ];

const BottomNavigation = () => {
    
  return (
    <Tab.Navigator screenOptions = {({route}) => ({
        tabBarIcon: ({color, focused}) => {
            let iconName;
            switch(route.name) {
                case "Stat":
                    iconName= focused? "stat" : "stat";
                    break;
                case "Home":
                    iconName= focused? "home" : "home";
                    break;
                case "Profile":
                    iconName= focused? "profile" : "profile";
                    break;
            }
            return <Icon name={iconName} size="normal"/>
        },
        tabBarBackground: () => (
            <LinearGradient 
            colors={theme.gradientColors.gradientBottomNav}
            start={{x: 0.5, y: 0}} 
            end={{x:0.5, y:1}}
            style={styles.linearGradient}
            />
        ),
        tabBarActiveTintColor: 'white',
        tabBarStyle: styles.tabBarStyle
        
    })} 
    initialRouteName="HomeNavigation">
        <Tab.Screen 
            name="Stat" 
            component={HomeNavigation} 
            options={{
                headerShown: false,
                tabBarLabel: 'Stat',
            }}
        />
        <Tab.Screen 
            name="Home" 
            component={HomeNavigation} 
            options={{
                headerShown: false,
                tabBarLabel: 'Home',
            }}
        />
        <Tab.Screen 
            name="Profile" 
            component={ProfileNavigation}
            options={{
                headerShown: false,
                tabBarLabel: 'Profile',
            }} 
        />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create ({
    tabBarStyle: {
        height: RFValue(70),
        borderRadius: 25,
        position: 'absolute',
    },
    linearGradient: {
        flex: 1,
        borderRadius: 25,
        opacity: 0.65,
    }
})