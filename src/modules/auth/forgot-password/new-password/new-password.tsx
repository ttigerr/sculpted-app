import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {Text, Separator, TextInput, Button} from 'src/modules/core/ui-library';
import {RFValue} from 'react-native-responsive-fontsize';
import BackButton from 'src/modules/core/components/back-button';
import Icon from 'src/modules/core/components/icon';
import useNewPassword from './useNewPassword';
import {NavigationPropsType} from 'src/utils/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingModal from 'src/modules/core/components/loading-modal';

const NewPassword = (props: NavigationPropsType) => {
  const {
    goBack, 
    control, 
    passwordRules, 
    confirmPasswordRules, 
    onSubmit,
    isLoading,
    isDisable
  } = useNewPassword(props);
  return (
    <MainWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.navigationBarContainer}>
              <BackButton onPress={goBack} />
            </View>
            <Separator height={RFValue(44)} />
            <Icon name="open-lock" size="xxlarge" />
            <Separator height={RFValue(30)} />
            <Text variant="h2" style={styles.passwordText}>{'Create new password'}</Text>
            <Separator height={RFValue(30)} />
            <Text variant="body" style={styles.body}>
              {
                'Your new password must be different from previously used passwords'
              }
            </Text>
          </View>
          <Separator height={RFValue(44)} />
          <TextInput
            control={control}
            name="password"
            label="New Password"
            rules={passwordRules}
            placeholder={'Enter your password'}
            left={<Icon name="lock" size="normal" />}
            type="password"
            borderRoundness={25}
            height={62}
          />
          <Separator height={RFValue(20)} />
          <TextInput
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            rules={confirmPasswordRules}
            placeholder={'Re-enter your password'}
            left={<Icon name="lock" size="normal" />}
            type="password"
            borderRoundness={25}
            height={62}
          />
          <Separator height={RFValue(20)} />
          <Button 
            onPress={onSubmit} 
            label="Reset Password" 
            height={62} 
            buttonFontSize={24}
            disabled={isDisable}
          />
          <Separator height={RFValue(100)} />
        </ScrollView>
      </SafeAreaView>
      <LoadingModal visible={isLoading} />
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RFValue(20),
  },
  scrollView: {
    paddingHorizontal: RFValue(16)
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
    fontSize: 16,
    letterSpacing: 0.32,
  },
  passwordText: {
    fontSize: RFValue(24),
    fontWeight: '400',
    letterSpacing: 0.24
  },
});

export default NewPassword;
