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
import useEmailVerification from './useEmailVerification';
import {NavigationPropsType} from 'src/utils/types';
import {theme} from 'src/config/theme';
import BackButton from 'src/modules/core/components/back-button';

const EmailVerification = (props: NavigationPropsType) => {
  const {onSubmit, control, errors, isValid, emailRules, goBack} =
    useEmailVerification(props);
  return (
    <MainWrapper>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Separator height={RFValue(54)} />
          <View style={styles.navigationBarContainer}>
            <BackButton onPress={goBack} />
          </View>
          <Separator height={RFValue(54)} />
          <Icon name="filled-lock" size="xxlarge" />
          <Separator height={RFValue(36)} />
          <Text variant="h2">{'Forgot Password?'}</Text>
          <Separator height={RFValue(36)} />
          <Text variant="body" style={styles.body}>
            {
              'Don‘t worry! It happens sometimes. Enter your email or phone number and we‘ll send you an  OTP.'
            }
          </Text>
        </View>
        <TextInput
          control={control}
          name="email"
          rules={emailRules}
          placeholder={'Enter email/Phone number'}
          autoCapitalize="none"
        />
        <Separator height={RFValue(20)} />
        <Button onPress={onSubmit} label="Send OTP" />
        <Separator height={RFValue(32)} />
      </ScrollView>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
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

export default EmailVerification;
