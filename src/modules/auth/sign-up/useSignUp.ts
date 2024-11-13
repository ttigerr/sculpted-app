import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { useForm, FieldValues } from 'react-hook-form';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
}

const useSignUp = (navigationProps: NavigationPropsType) => {
  const { navigation } = navigationProps;
  const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm<FieldValues | SignUpFormData>({
    defaultValues: {
      name: 'User',
      email: 'juansebastianp21@gmail.com',
      password: 'Matrix-123',
      confirmPassword: 'Matrix-123'
    }
  })

  const emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
  const nameRules = {required: 'Required field', maxLength: {
    value: 50, message: 'Invalid name'
  }}
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

  const onSubmit = handleSubmit(data => navigation.navigate(navigationScreenNames.onboardingFirstStep))

  const goToLogin = () => {
    navigation.navigate(navigationScreenNames.login)
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
    nameRules,
  }
}

export default useSignUp;