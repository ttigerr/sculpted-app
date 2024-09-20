import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { useForm, FieldValues } from 'react-hook-form';

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
}

const useSignUp = (navigationProps: NavigationPropsType) => {
  const { navigation } = navigationProps;
  const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm<FieldValues | SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
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
  const confirmPasswordRules = {
    required: 'Required field',
    validate: (value: string) => {
      const passwordValue = getValues('password');
      if (value == passwordValue) return true
      else return 'Passwords must match'
    }
  }

  const onSubmit = handleSubmit(data => console.log('Submit: ', data))

  const goToLogin = () => {
    navigation.navigate('Login')
  }

  return {
    onSubmit,
    control,
    errors,
    isValid,
    goToLogin,
    emailRules,
    passwordRules,
    confirmPasswordRules,
  }
}

export default useSignUp;