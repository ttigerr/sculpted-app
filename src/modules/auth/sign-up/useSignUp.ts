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
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FieldValues | SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = handleSubmit(data => console.log('Submit: ', data))

  const goToLogin = () => {
    navigation.navigate('Login')
  }

  return {
    onSubmit,
    control,
    errors,
    isValid,
  }
}

export default useSignUp;