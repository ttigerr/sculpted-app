import {useState} from 'react';
import {NavigationPropsType} from 'src/utils/types';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';
import {AuthConfiguration, authorize} from 'react-native-app-auth';
import {authConfig, signUpConfig} from 'src/config/auth-config';
import {useDispatch} from 'react-redux';
import {setUserData} from 'src/store/slices/auth/authSlice';
import {Buffer} from 'buffer';
import {Alert} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { PRIVACY_STATEMENT, TERM_AND_CONDITION } from 'src/consts/constants';

const useSimpleLogin = ({navigation}: NavigationPropsType) => {
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const authState = await authorize(signUpConfig as AuthConfiguration);

      if (authState.idToken) {
        try {
          const base64Url = authState.idToken.split('.')[1];
          const decodedToken = Buffer.from(base64Url, 'base64').toString(
            'utf8',
          );
          const userInfo = JSON.parse(decodedToken);

          const firstName =
            userInfo.given_name ||
            (userInfo.name ? userInfo.name.split(' ')[0] : '') ||
            '';
          const email = userInfo.emails?.[0] || userInfo.email || '';

          const userData = {
            token: authState.accessToken,
            id: userInfo.sub,
            name: firstName,
            email: email,
            fullName:
              userInfo.name ||
              `${firstName} ${userInfo.family_name || ''}`.trim(),
            refreshToken: authState.refreshToken,
          };
          dispatch(setUserData(userData));
          navigation.navigate(navigationScreenNames.onboardingFirstStep, {
            params: { source: 'auth' },
            key: `auth-${Date.now()}`,
          });
        } catch (decodeError) {
          console.error('Token decode error:', decodeError);
          Alert.alert('Error', 'Failed to decode user information');
        }
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      Alert.alert('Error', 'Failed to complete sign-up process');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const authState = await authorize(authConfig);

      if (authState.idToken) {
        try {
          const base64Url = authState.idToken.split('.')[1];
          const decodedToken = Buffer.from(base64Url, 'base64').toString('utf8');
          const userInfo = JSON.parse(decodedToken);

          const userData = {
            token: authState.accessToken,
            id: userInfo.sub,
            name: userInfo.given_name || userInfo.name,
            email: userInfo.emails[0],
            refreshToken: authState.refreshToken,
          };
          dispatch(setUserData(userData));
        } catch (decodeError) {
          console.error('Token decode error:', decodeError);
          Alert.alert('Error', 'Failed to decode user information');
        }
      }

      navigation.navigate(navigationScreenNames.bottomNavigation, {
        source: 'auth',
      });
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert(
        'Authentication Failed',
        `Error: ${(error as Error).message}\nPlease check your credentials and try again.`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenTermUrl =  async() => {
    //Linking.openURL(TERM_AND_CONDITION).catch(err => console.error('Failed to open URL:', err));
    try {
      await InAppBrowser.isAvailable()
      InAppBrowser.openAuth(TERM_AND_CONDITION,'',{
        dismissButtonStyle: 'cancel',
        ephemeralWebSession: false,

        // For android
        showTitle: true,
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: true,
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleOpenPrivacyUrl = async() => {
    //Linking.openURL(PRIVACY_STATEMENT).catch(err => console.error('Failed to open URL:', err));
    try {
      await InAppBrowser.isAvailable()
      InAppBrowser.openAuth(PRIVACY_STATEMENT,'',{
        dismissButtonStyle: 'cancel',
        ephemeralWebSession: false,

        // For android
        showTitle: true,
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: true,
      })
    } catch (error) {
      console.log(error);
    }
  }

  return {
    loading,
    handleSignUp,
    handleLogin,
    handleOpenTermUrl,
    handleOpenPrivacyUrl,
  };
};

export default useSimpleLogin;
