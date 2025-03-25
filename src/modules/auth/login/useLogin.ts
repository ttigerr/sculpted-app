import {useRef, useState} from 'react';
import {NavigationPropsType} from 'src/utils/types';
import {useForm, FieldValues} from 'react-hook-form';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';
import {ScrollView, TextInput, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUserData, setToken} from 'src/store/slices/auth/authSlice';
import {authorize, refresh} from 'react-native-app-auth';
import {authConfig, signUpConfig} from 'src/config/auth-config';
import {Buffer} from 'buffer';

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
      email: 'email@email.com',
      password: 'Matrix123',
      rememberMe: false
    }
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

  // const goToSignUp = () => navigation.navigate(navigationScreenNames.signUp)


  const goToForgotPassword = () => navigation.navigate(navigationScreenNames.emailVerification)
  
  const onSubmit = handleSubmit(async data => {
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

      navigation.navigate(navigationScreenNames.bottomNavigation);
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert(
        'Authentication Failed',
        `Error: ${error.message}\nPlease check your credentials and try again.`
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
          const base64Url = authState.idToken.split('.')[1];
          const decodedToken = Buffer.from(base64Url, 'base64').toString('utf8');
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
          navigation.navigate(navigationScreenNames.onboardingFirstStep);
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
    loading
  }
}

export default useLogin;