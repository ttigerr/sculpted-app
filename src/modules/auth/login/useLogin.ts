import React, {useRef, useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { useForm, FieldValues } from 'react-hook-form';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { ScrollView, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserData, setToken } from 'src/store/slices/auth/authSlice';
import { loginMockApiCall } from 'src/utils/api/mock-api-call';

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
}

const useLogin = (navigationProps: NavigationPropsType) => {
  const { navigation } = navigationProps;
  const dispatch = useDispatch();
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const inputRef = useRef(null);
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

  const goToSignUp = () => navigation.navigate(navigationScreenNames.signUp)

  const goToForgotPassword = () => navigation.navigate(navigationScreenNames.emailVerification)

  const onSubmit = handleSubmit(async data => {
    setIsLoading(true);
    try {
      const response = await loginMockApiCall();
      console.log('Login: ', response)
      dispatch(setUserData(response.user))
      dispatch(setToken(response.token))
      navigation.navigate(navigationScreenNames.bottomNavigation)
    } catch (error) {
      console.log('Error ', error)
    } finally {
      setIsLoading(false)
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

  return {
    onSubmit,
    control,
    errors,
    isValid,
    goToSignUp,
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