import {StyleSheet, ScrollView, View, Pressable, KeyboardAvoidingView, Platform} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {
  Text,
  TextInput,
  Button,
  Link,
  Separator,
} from 'src/modules/core/ui-library';
import Icon from 'src/modules/core/components/icon';
import {RFValue} from 'react-native-responsive-fontsize';
import {NavigationPropsType} from 'src/utils/types';
import {theme} from 'src/config/theme';
import BackButton from 'src/modules/core/components/back-button';
import useOTPVerification from './useOTPVerification';
import OtpInput from 'src/modules/core/components/otp-input';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfirmationModal from 'src/modules/core/components/confirmation-modal';
import LoadingModal from 'src/modules/core/components/loading-modal';

const OTPVerification = (props: NavigationPropsType) => {
  const {
    onSubmit, 
    control, 
    goBack, 
    otpRules,
    isDeleteModalVisible,
    onConfirmationModalClose,
    handleChangeEmail,
    handleResendOtp,
    isLoading,
    handleSendOtp,
    isDisable,
    otpCode,
    hasSubmitted,
  } = useOTPVerification(props);
  return (
    <MainWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
          >
            <View style={styles.contentContainer}>
              <View style={styles.navigationBarContainer}>
                <BackButton onPress={goBack} />
              </View>
              <Separator height={RFValue(44)} />
              <Icon name="key" size="xxlarge" />
              <Separator height={RFValue(36)} />
              <Text variant="h2" style={styles.emailText}>{'Verify Email'}</Text>
              <Separator height={RFValue(30)} />
              <Text variant="body" style={styles.body}>
                {'A 4 digit code has been sent to N********y@gmail.com'}
              </Text>
              <Separator height={RFValue(30)} />
            </View>
            <OtpInput control={control} name="otp" rules={otpRules} />
            <Separator height={RFValue(30)} />
            {isDisable && hasSubmitted ?(
              <>
                <Text variant="delete" style={styles.incorrectOtp}>{"*Incorrect code"}</Text>
                <Separator height={RFValue(30)} />
              </>
            ) : ( null )
            }
            <Button 
              onPress={onSubmit} 
              label="Verify" 
              height={62} 
              buttonFontSize={24}
              // disabled={isDisable}
            />
            <Separator height={RFValue(30)} />
            <Text variant="paragraph" style={styles.bottomLink}>
              {'Didn’t receive OPT? '}
              <Link label="Resend" onPress={handleResendOtp} style={{fontSize: 16}}/>
            </Text>
            <Separator height={RFValue(32)} />
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
      <ConfirmationModal
        visible={isDeleteModalVisible}
        title="Didn’t receive your OTP? Make sure your email/ phone number is correct"
        description='If this INSERT_ EMAIL isn’t your email, please change it in your Profile Page'
        onClose={onConfirmationModalClose}
        children={
          <>
            <Pressable style={styles.buttonContainer} onPress={handleChangeEmail}>
              <Text variant="delete" style={styles.primaryButtonText}>
                  {"Change Email"}
              </Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={handleSendOtp}>
              <Text variant="body1" style={styles.primaryButtonText}>
                  {"Send OTP again"}
              </Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={onConfirmationModalClose}>
              <Text variant="paragraph" style={styles.cancelButtonText}>
                  {"Cancel"}
              </Text>
            </Pressable>
          </>
        }
      />
      <LoadingModal visible={isLoading} />
    </MainWrapper>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RFValue(20)
  },
  scrollView: {
    paddingHorizontal: RFValue(16)
  },
  navigationBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  body: {
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 0.32,
  },
  emailText: {
    fontSize: RFValue(24),
    fontWeight: '400',
    letterSpacing: 0.24
  },
  bottomLink: {
    fontSize: 16,
    alignSelf: 'center',
    color: theme.colors.caption,
  },
  buttonContainer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF14',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  cancelButtonText: {
    color: '#595959',
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  incorrectOtp: {
    fontSize: 12,
    alignSelf: 'flex-end',
    fontWeight: '500',
  }
});
