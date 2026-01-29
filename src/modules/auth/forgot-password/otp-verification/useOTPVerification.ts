import React, {useEffect, useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { FieldValues, useForm } from 'react-hook-form';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { resendOtpMockApiCall } from 'src/utils/api/mock-api-call';
import { useDispatch } from 'react-redux';
import { setToken, setUserData } from 'src/store/slices/auth/authSlice';
import { Alert } from 'react-native';

type NewOtpFormData = FieldValues & {
  otpCode: number[];
};

const useOTPVerification = (navigationProps: NavigationPropsType) => {
  const { navigation } = navigationProps;
  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm<NewOtpFormData>({
    defaultValues: {
      otpCode: [0, 0, 0, 0],
    },
  })

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteMordalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const otpRules = {required: 'Required field', minLength: 4, maxLength: 4}
  const [source, setSource] = useState(''); 
  const dispatch = useDispatch();

  const otpCode = watch('otpCode'); // number[]
  const correctOtp = [1, 2, 3, 4];

  // Set the source path navigation
  useEffect(() => {
    if (navigationProps.route.params?.source) {
      setSource(navigationProps.route.params.source);
    }
  }, [navigationProps.route.params?.source]);

  // Enable/Disable button based on otpCode match
  useEffect(() => {
    if (
      Array.isArray(otpCode) &&
      otpCode.length  &&
      otpCode.every((digit, index) => digit === correctOtp[index] && digit !== null && digit !== undefined)
    ) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [otpCode]);

  const onSubmit = handleSubmit(async data => {
    setHasSubmitted(true);
    if (isDisable) {
      return null; // Return nothing
    }
    setIsLoading(true);
    try {
      const response = await resendOtpMockApiCall();
      dispatch(setUserData(response.user))
      dispatch(setToken(response.token))
    } catch (error) {
      console.log('Error ', error)
    } finally {
      setIsLoading(false)
      navigation.navigate({
        name: navigationScreenNames.newPassword,
        params: { source: source },
      })
    }
  })

  const goBack = () => navigation.goBack()

  const handleResendOtp = () => {
    setIsDeleteMordalVisible(true)
  }

  const handleChangeEmail = () => {
    setIsDeleteMordalVisible(true)
    navigation.goBack()
  }

  const handleSendOtp = handleSubmit(async data => {
    setIsLoading(true);
    setIsDeleteMordalVisible(false)
    try {
      const response = await resendOtpMockApiCall();
      dispatch(setUserData(response.user))
      dispatch(setToken(response.token))
    } catch (error) {
      console.log('Error ', error)
    } finally {
      setIsLoading(false)
      Alert.alert("OTP has resent successfully")
    }
  })

  const onConfirmationModalClose = () => {
    setIsConfirmationModalVisible(false)
    setIsDeleteMordalVisible(false)
}

  return {
    onSubmit,
    control,
    errors,
    isValid,
    goBack,
    handleResendOtp,
    otpRules,
    isConfirmationModalVisible,
    onConfirmationModalClose,
    isDeleteModalVisible,
    setIsDeleteMordalVisible,
    handleChangeEmail,
    handleSendOtp,
    isLoading,
    isDisable,
    otpCode,
    hasSubmitted,
  }
}

export default useOTPVerification;
