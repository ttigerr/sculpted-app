import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { useForm, FieldValues } from 'react-hook-form';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { Linking } from 'react-native';
import { PRIVACY_STATEMENT, TERM_AND_CONDITION } from 'src/consts/constants';
import InAppBrowser from 'react-native-inappbrowser-reborn';
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
      else return 'Passwords do not match'
    }
  }

  const onSubmit = handleSubmit(data => 
    navigation.navigate({
      name: navigationScreenNames.onboardingFirstStep,
      params: { source: 'auth' },
      key: `auth-${Date.now()}` // this forces a new screen instance
    })
  )

  const goToLogin = () => {
    navigation.navigate({
      name: navigationScreenNames.login,
      params: { source: 'auth' },
      key: `auth-${Date.now()}` // this forces a new screen instance
    })
  }

  const handleOpenTermUrl =  async() => {
    //Linking.openURL(TERM_AND_CONDITION).catch(err => console.error('Failed to open URL:', err));
    try {
      await InAppBrowser.isAvailable()
      InAppBrowser.openAuth(TERM_AND_CONDITION,'',{
        dismissButtonStyle: 'cancel',
        ephemeralWebSession: false,

        // For android
        showTitle: true,
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: true,
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleOpenPrivacyUrl = async() => {
    //Linking.openURL(PRIVACY_STATEMENT).catch(err => console.error('Failed to open URL:', err));
    try {
      await InAppBrowser.isAvailable()
      InAppBrowser.openAuth(PRIVACY_STATEMENT,'',{
        dismissButtonStyle: 'cancel',
        ephemeralWebSession: false,

        // For android
        showTitle: true,
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: true,
      })
    } catch (error) {
      console.log(error);
    }
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
    handleOpenTermUrl,
    handleOpenPrivacyUrl,
  }
}

export default useSignUp;