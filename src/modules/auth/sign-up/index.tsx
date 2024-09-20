import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {
  TextInput,
  Button,
  Text,
  Link,
  Separator,
  CheckBox,
} from 'src/modules/core/ui-library';
import Icon from 'src/modules/core/components/icon';
import {NavigationPropsType} from 'src/utils/types';
import useSignUp from './useSignUp';
import {theme} from 'src/config/theme';
import {RFValue} from 'react-native-responsive-fontsize';

const SignUp = (props: NavigationPropsType) => {
  const {
    control,
    onSubmit,
    errors,
    goToLogin,
    emailRules,
    passwordRules,
    confirmPasswordRules,
  } = useSignUp(props);
  const [checked, setChecked] = React.useState(false);
  return (
    <MainWrapper>
      <ScrollView style={styles.container}>
        <Separator height={RFValue(92)} />
        <Text variant="h1">{'Unleash Your Full Potential!!'}</Text>
        <Separator height={RFValue(32)} />
        <TextInput
          control={control}
          name="email"
          label="Email"
          rules={emailRules}
          placeholder={'Enter email/Phone number'}
          left={<Icon name="email" size="normal" />}
          autoCapitalize="none"
        />
        <TextInput
          control={control}
          name="password"
          label="Password"
          rules={passwordRules}
          placeholder={'Enter your password'}
          left={<Icon name="lock" size="normal" />}
          type="password"
        />
        <TextInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          rules={confirmPasswordRules}
          placeholder={'Re-enter your password'}
          left={<Icon name="lock" size="normal" />}
          type="password"
        />
        <CheckBox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}>
          <Text variant="caption" style={styles.termsAndCondtionsText}>
            {
              'By signing up, you agree to our Teams of Service and Privacy Policy'
            }
          </Text>
        </CheckBox>
        <Separator height={RFValue(32)} />
        <Button onPress={onSubmit} label="Sign Up" />
        <Text variant="paragraph" style={styles.bottomLink}>
          {'Already have an account?  '}
          <Link label="Log in" onPress={goToLogin} />
        </Text>
        <Separator height={RFValue(42)} />
      </ScrollView>
    </MainWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    color: '#FFF',
  },
  bottomLink: {
    alignSelf: 'center',
    marginTop: 15,
    color: theme.colors.caption,
  },
  termsAndCondtionsText: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
