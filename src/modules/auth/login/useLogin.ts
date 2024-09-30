import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { useForm, FieldValues } from 'react-hook-form';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
}

const useLogin = (navigationProps: NavigationPropsType) => {
  const { navigation } = navigationProps;
  const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm<FieldValues | LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
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

  const onSubmit = handleSubmit(data => console.log('Submit: ', data))
  return {
    onSubmit,
    control,
    errors,
    isValid,
    goToSignUp,
    emailRules,
    passwordRules,
  }
}

export default useLogin;