import React, {useEffect, useRef} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { useForm, FieldValues } from 'react-hook-form';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { Keyboard } from 'react-native';

type EmailVerificationFormData = FieldValues & {
  email: string;
}

const useEmailVerification = (navigationProps: NavigationPropsType) => {
  const { navigation } = navigationProps;
  const scrollViewRef = useRef(null);
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

  const emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
  const emailRules = {required: 'Required field', pattern: {
    value: emailPattern, message: 'Invalid email'
  }}

  const onSubmit = handleSubmit(data => {
    console.log('Submit: ', data)
    navigation.navigate(navigationScreenNames.otpVerification)
  })

  const goBack = () => navigation.goBack()

  return {
    onSubmit,
    control,
    errors,
    isValid,
    emailRules,
    goBack,
    scrollViewRef,
  }
}

export default useEmailVerification;