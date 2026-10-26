import React, {useEffect, useRef, useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { useForm, FieldValues } from 'react-hook-form';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { useDispatch } from 'react-redux';
import { setUserData } from 'src/store/slices/auth/authSlice';
import {ScrollView, TextInput, Alert} from 'react-native';
import {AuthConfiguration, authorize} from 'react-native-app-auth';
import {authConfig, signUpConfig} from 'src/config/auth-config';
import { setTokens } from 'src/config/storage/token-storage';
import { verifyIdToken } from 'src/config/auth/verify-id-token';

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const useLogin = (navigationProps: NavigationPropsType) => {
  const {navigation} = navigationProps;
  const dispatch = useDispatch();
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [inputPositions, setInputPositions] = useState<{ [key: string]: number }>({});
  const [loading, setIsLoading] = useState<boolean>(false);
  
  const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm<FieldValues | LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })
  const emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
  const emailRules = {required: 'Required field', pattern: {
    value: emailPattern, message: 'Invalid email'
  }}
  const passwordRules = {
    required: 'Required field',
    pattern: {value: passwordPattern, message: 'Invalid password'},
    minLength: {value: 8, message: 'Invalid password'},
  }

  const [source, setSource] = useState(''); // default fallback

  useEffect(() => {
    if (navigationProps.route.params?.source) {
      setSource(navigationProps.route.params.source);
    }
  }, [navigationProps.route.params?.source]);

  const goToSignUp = () => navigation.navigate(navigationScreenNames.signUp)

  const onReturn = () => navigation.goBack()

  const goToForgotPassword = () => {
    navigation.navigate({
      name: navigationScreenNames.emailVerification,
      params: { source: 'auth' },
      key: `auth-${Date.now()}`
    })
  }

  const onSubmit = handleSubmit(async () => {
    setIsLoading(true);
    try {
      const authState = await authorize(authConfig);

      if (authState.idToken) {
        try {
          const claims = verifyIdToken(authState.idToken);
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
        } catch (decodeError) {
          Alert.alert('Error', 'Failed to verify user information');
          return;
        }
      }

      navigation.navigate({
        name: navigationScreenNames.bottomNavigation,
        params: { source: source },
      });
    } catch (error) {
      Alert.alert(
        'Authentication Failed',
        `Error: ${(error as Error).message}\nPlease check your credentials and try again.`,
      );
    } finally {
      setIsLoading(false);
    }
  })

  const handleInputFocus = (inputKey: string) => {
    const inputOffsetY = inputPositions[inputKey];
    if (inputOffsetY !== undefined) {
      scrollViewRef.current?.scrollTo({
        y: inputOffsetY + 100,
        animated: true,
      });
    }
  };

  const storeInputPosition = (key: string, yPosition: number) => {
    setInputPositions((prevPositions) => ({
      ...prevPositions,
      [key]: yPosition,
    }));
  };

  const handleDirectSignUp = async () => {
    setIsLoading(true);
    try {
      const authState = await authorize(signUpConfig as AuthConfiguration);

      if (authState.idToken) {
        try {
          const claims = verifyIdToken(authState.idToken);
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
          navigation.navigate(navigationScreenNames.onboardingFirstStep);
        } catch (decodeError) {
          Alert.alert('Error', 'Failed to verify user information');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to complete sign-up process');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
    control,
    errors,
    isValid,
    handleDirectSignUp,
    emailRules,
    passwordRules,
    goToForgotPassword,
    handleInputFocus,
    inputRefs,
    scrollViewRef,
    storeInputPosition,
    loading,
    onReturn,
    goToSignUp,
  }
}

export default useLogin;