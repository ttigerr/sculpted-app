import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {Text, Separator, TextInput, Button} from 'src/modules/core/ui-library';
import {RFValue} from 'react-native-responsive-fontsize';
import BackButton from 'src/modules/core/components/back-button';
import Icon from 'src/modules/core/components/icon';
import useNewPassword from './useNewPassword';
import {NavigationPropsType} from 'src/utils/types';

const NewPassword = (props: NavigationPropsType) => {
  const {goBack, control, passwordRules, confirmPasswordRules, onSubmit} =
    useNewPassword(props);
  return (
    <MainWrapper>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Separator height={RFValue(54)} />
          <View style={styles.navigationBarContainer}>
            <BackButton onPress={goBack} />
          </View>
          <Separator height={RFValue(54)} />
          <Icon name="open-lock" size="xxlarge" />
          <Separator height={RFValue(36)} />
          <Text variant="h2">{'Create new password'}</Text>
          <Separator height={RFValue(36)} />
          <Text variant="body" style={styles.body}>
            {
              'Your new password must be different from previously used passwords'
            }
          </Text>
        </View>
        <Separator height={RFValue(38)} />
        <TextInput
          control={control}
          name="password"
          label="New Password"
          rules={passwordRules}
          placeholder={'Enter your password'}
          left={<Icon name="lock" size="normal" />}
          type="password"
        />
        <Separator height={RFValue(18)} />
        <TextInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          rules={confirmPasswordRules}
          placeholder={'Re-enter your password'}
          left={<Icon name="lock" size="normal" />}
          type="password"
        />
        <Separator height={RFValue(32)} />
        <Button onPress={onSubmit} label="Reset Password" />
        <Separator height={RFValue(42)} />
      </ScrollView>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
  },
  navigationBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  body: {
    textAlign: 'center',
  },
});

export default NewPassword;
