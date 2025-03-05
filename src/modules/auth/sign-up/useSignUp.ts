import {useState, useCallback} from 'react';
import {NavigationPropsType} from 'src/utils/types';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';
import {Alert} from 'react-native';
import {authorize, AuthConfiguration} from 'react-native-app-auth';
import {signUpConfig} from 'src/config/auth-config';
import {useDispatch} from 'react-redux';
import {setUserData} from 'src/store/slices/auth/authSlice';
import {Buffer} from 'buffer';

interface DecodedToken {
  given_name?: string;
  name?: string;
  family_name?: string;
  emails?: string[];
  email?: string;
  [key: string]: any;
}

const useSignUp = (navigationProps: NavigationPropsType) => {
  const {navigation} = navigationProps;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUp = useCallback(async () => {
    setIsLoading(true);

    try {
      const authState = await authorize(signUpConfig as AuthConfiguration);

      if (authState.idToken) {
        try {
          const base64Url = authState.idToken.split('.')[1];
          const decodedToken = Buffer.from(base64Url, 'base64').toString(
            'utf8',
          );
          const userInfo: DecodedToken = JSON.parse(decodedToken);

          const firstName =
            userInfo.given_name ||
            (userInfo.name ? userInfo.name.split(' ')[0] : '') ||
            '';
          const email = userInfo.emails?.[0] || userInfo.email || '';

          const userData = {
            token: authState.accessToken,
            name: firstName,
            email: email,
            fullName:
              userInfo.name ||
              `${firstName} ${userInfo.family_name || ''}`.trim(),
            refreshToken: authState.refreshToken,
          };
          dispatch(setUserData(userData));

          navigation.navigate(navigationScreenNames.onboardingFirstStep);
        } catch (decodeError) {
          Alert.alert('Error', 'Failed to decode user information');
          navigation.navigate(navigationScreenNames.login);
        }
      }
    } catch (error) {
      console.error('Sign-up error with standard approach:', error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, navigation]);

  const goToLogin = () => {
    navigation.navigate(navigationScreenNames.login);
  };

  return {
    handleSignUp,
    goToLogin,
    isLoading,
  };
};

export default useSignUp;
