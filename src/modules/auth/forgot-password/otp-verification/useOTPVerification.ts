import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { useForm } from 'react-hook-form';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';

const useOTPVerification = (navigationProps: NavigationPropsType) => {
  const { navigation } = navigationProps;
  const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm()

  const otpRules = {required: 'Required field', minLength: 4, maxLength: 4}

  const onSubmit = handleSubmit(data => {
    console.log('Submit: ', data.otp.join(''))
    navigation.navigate(navigationScreenNames.newPassword)
  })

  const goBack = () => navigation.goBack()

  const reSendCode = () => console.log('Resend Code')

  return {
    onSubmit,
    control,
    errors,
    isValid,
    goBack,
    reSendCode,
    otpRules,
  }
}

export default useOTPVerification;