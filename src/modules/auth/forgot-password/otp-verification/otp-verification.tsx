import {StyleSheet, ScrollView, View} from 'react-native';
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

const OTPVerification = (props: NavigationPropsType) => {
  const {onSubmit, reSendCode, control, goBack, otpRules} =
    useOTPVerification(props);
  return (
    <MainWrapper>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Separator height={RFValue(54)} />
          <View style={styles.navigationBarContainer}>
            <BackButton onPress={goBack} />
          </View>
          <Separator height={RFValue(54)} />
          <Icon name="key" size="xxlarge" />
          <Separator height={RFValue(36)} />
          <Text variant="h2">{'Verify Email'}</Text>
          <Separator height={RFValue(36)} />
          <Text variant="body" style={styles.body}>
            {'A 4 digit code has been sent to N********y@gmail.com'}
          </Text>
          <Separator height={RFValue(24)} />
        </View>
        <OtpInput control={control} name="otp" rules={otpRules} />
        <Separator height={RFValue(24)} />
        <Button onPress={onSubmit} label="Verify" />
        <Separator height={RFValue(24)} />
        <Text variant="paragraph" style={styles.bottomLink}>
          {'Didn’t receive OPT? '}
          <Link label="Resend" onPress={reSendCode} />
        </Text>
        <Separator height={RFValue(32)} />
      </ScrollView>
    </MainWrapper>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 0,
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
  },
  bottomLink: {
    alignSelf: 'center',
    marginTop: 15,
    color: theme.colors.caption,
  },
});
