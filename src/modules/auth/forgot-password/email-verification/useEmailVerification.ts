import React, {useEffect, useRef, useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { useForm, FieldValues } from 'react-hook-form';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';
import { TOAST_EMAIL_CONFIG } from 'src/consts/constants';
import { resendOtpMockApiCall } from 'src/utils/api/mock-api-call';
import { useDispatch } from 'react-redux';
import { setToken, setUserData } from 'src/store/slices/auth/authSlice';

type EmailVerificationFormData = FieldValues & {
  email: string;
}

const useEmailVerification = (navigationProps: NavigationPropsType) => {
  const { navigation } = navigationProps;
  const scrollViewRef = useRef(null);
  const [source, setSource] = useState(''); // default fallback
  const OTP_EXAMPLE_EMAIL = "shiai@asdd.com";
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm<EmailVerificationFormData>({
    defaultValues: {
      email: 'shiai@asdd.com'
    }
  })

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });
    
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (navigationProps.route.params?.source) {
      setSource(navigationProps.route.params.source);
    }
  }, [navigationProps.route.params?.source]);

  const emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
  const emailRules = {required: 'Required field', pattern: {
    value: emailPattern, message: 'Invalid email'
  }}

  
  const onSubmit = async () => {
    const email = getValues('email');
    setIsLoading(true); // Start loading
  
    try {
      const response = await resendOtpMockApiCall();
      dispatch(setUserData(response.user));
      dispatch(setToken(response.token));

      // Check if email in valid or not
      if (email === OTP_EXAMPLE_EMAIL) {
        navigation.navigate({
          name: navigationScreenNames.otpVerification,
          params: { source },
        });
      } else {
        Toast.show(TOAST_EMAIL_CONFIG);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  
  const goBack = () => navigation.goBack()

  return {
    onSubmit,
    control,
    errors,
    isValid,
    emailRules,
    goBack,
    scrollViewRef,
    isLoading
  }
}

export default useEmailVerification;