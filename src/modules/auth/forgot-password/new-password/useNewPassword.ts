import React, {useEffect, useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { useForm, FieldValues } from 'react-hook-form';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { resendOtpMockApiCall } from 'src/utils/api/mock-api-call';
import { useDispatch } from 'react-redux';
import { setToken, setUserData } from 'src/store/slices/auth/authSlice';
import { Alert } from 'react-native';

type NewPasswordFormData = FieldValues & {
  password: string;
  confirmPassword: string;
}

const useNewPassword = (navigationProps: NavigationPropsType) => {
  const { navigation } = navigationProps;
  const { control, handleSubmit, formState: { errors, isValid }, getValues, watch } = useForm<NewPasswordFormData>({
    defaultValues: {
      password: 'Matrix-123',
      confirmPassword: 'Matrix-123'
    }
  })
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const [ source, setSource ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isDisable, setIsDisable ] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigationProps.route.params?.source) {
      setSource(navigationProps.route.params.source);
    }
  }, [navigationProps.route.params?.source]);

  // Check password validation
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
  const passwordRules = {
    required: 'Required field',
    pattern: {value: passwordPattern, message: 'Invalid password'},
    minLength: {value: 8, message: 'Invalid password'},
  }
  const confirmPasswordRules = {
    required: 'Required field',
    validate: (value: string) => {
      const passwordValue = getValues('password');
      if (value == passwordValue) return true
      else return 'Passwords not match'
    }
  }

  // Validate if new password and confirmed password is matched or not
  useEffect(() => {
    if ( password && confirmPassword !== null) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [password, confirmPassword]);

  const onSubmit = handleSubmit(async data => {
    setIsLoading(true);
    try {
      const response = await resendOtpMockApiCall();
      dispatch(setUserData(response.user))
      dispatch(setToken(response.token))
    } catch (error) {
      console.log('Error ', error)
    } finally {
      setIsLoading(false)
      Alert.alert("New password has changed successfully")
      navigation.navigate(source === "auth" ? navigationScreenNames.login : navigationScreenNames.bottomNavigation)
    }
  })

  const goBack = () => navigation.goBack()

  return {
    onSubmit,
    control,
    errors,
    isValid,
    passwordRules,
    confirmPasswordRules,
    goBack,
    isLoading,
    isDisable,
  }
}

export default useNewPassword;