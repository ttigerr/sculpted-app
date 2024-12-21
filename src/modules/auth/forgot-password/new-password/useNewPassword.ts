import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { useForm, FieldValues } from 'react-hook-form';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';

type NewPasswordFormData = FieldValues & {
  password: string;
  confirmPassword: string;
}

const useNewPassword = (navigationProps: NavigationPropsType) => {
  const { navigation } = navigationProps;
  const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm<NewPasswordFormData>({
    defaultValues: {
      password: 'Matrix-123',
      confirmPassword: 'Matrix-123'
    }
  })
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
      else return 'Passwords must match'
    }
  }

  const onSubmit = handleSubmit(data => {
    console.log('Submit: ', data)
    navigation.navigate(navigationScreenNames.login)
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
  }
}

export default useNewPassword;