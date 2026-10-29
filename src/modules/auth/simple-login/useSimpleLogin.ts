import {useState} from 'react';
import {NavigationPropsType} from 'src/utils/types';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';
// Azure B2C auth — temporarily disabled while .env credentials are set up.
// To re-enable: uncomment these imports and the handler bodies below.
// import {AuthConfiguration, authorize} from 'react-native-app-auth';
// import {authConfig, signUpConfig} from 'src/config/auth-config';
// import {verifyIdToken} from 'src/config/auth/verify-id-token';
import {setTokens} from 'src/config/storage/token-storage';
import {useDispatch} from 'react-redux';
import {setUserData} from 'src/store/slices/auth/authSlice';
import {Alert} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { PRIVACY_STATEMENT, TERM_AND_CONDITION } from 'src/consts/constants';
import { userMockData, devAccessToken } from 'src/consts/mock-data';

const useSimpleLogin = ({navigation}: NavigationPropsType) => {
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // --- MOCK AUTH (temporary) ---
  // Short-circuit the OAuth flow so the app can be exercised without a
  // configured Azure B2C tenant. The real implementations are preserved
  // below as a block comment — swap them back in once .env has valid
  // AZURE_* values.
  // The token is saved to the keychain because http-service reads it from
  // there for every API request.
  const mockSignIn = async () => {
    await setTokens(devAccessToken);
    dispatch(
      setUserData({
        token: devAccessToken,
        id: 'dev-user',
        name: userMockData.name,
        email: userMockData.email,
      }),
    );
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      await mockSignIn();
      navigation.navigate(navigationScreenNames.onboardingFirstStep, {
        params: { source: 'auth' },
        key: `auth-${Date.now()}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await mockSignIn();
      navigation.navigate(navigationScreenNames.bottomNavigation, {
        source: 'auth',
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* --- REAL AUTH (restore when AZURE_* env vars are configured) ---
  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const authState = await authorize(signUpConfig as AuthConfiguration);
      if (!authState?.idToken) {
        Alert.alert('Sign-up incomplete', 'No ID token was returned from the sign-up flow.');
        return;
      }
      let claims;
      try {
        claims = verifyIdToken(authState.idToken);
      } catch (decodeError) {
        Alert.alert('Error verifying token', (decodeError as Error).message);
        return;
      }
      const firstName =
        claims.given_name ||
        (claims.name ? claims.name.split(' ')[0] : '') ||
        '';
      const email = claims.emails?.[0] || claims.email || '';
      await setTokens(authState.accessToken, authState.refreshToken);
      dispatch(
        setUserData({
          token: authState.accessToken,
          id: claims.sub,
          name: firstName,
          email,
        }),
      );
      navigation.navigate(navigationScreenNames.onboardingFirstStep, {
        params: { source: 'auth' },
        key: `auth-${Date.now()}`,
      });
    } catch (error) {
      Alert.alert('Sign-up error', (error as Error)?.message ?? String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const authState = await authorize(authConfig);
      if (!authState?.idToken) {
        Alert.alert('Login incomplete', 'No ID token was returned from the login flow.');
        return;
      }
      let claims;
      try {
        claims = verifyIdToken(authState.idToken);
      } catch (decodeError) {
        Alert.alert('Error verifying token', (decodeError as Error).message);
        return;
      }
      const email = claims.emails?.[0] || claims.email || '';
      await setTokens(authState.accessToken, authState.refreshToken);
      dispatch(
        setUserData({
          token: authState.accessToken,
          id: claims.sub,
          name: claims.given_name || claims.name || '',
          email,
        }),
      );
      navigation.navigate(navigationScreenNames.bottomNavigation, {
        source: 'auth',
      });
    } catch (error) {
      Alert.alert('Authentication failed', (error as Error)?.message ?? String(error));
    } finally {
      setIsLoading(false);
    }
  };
  */

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
