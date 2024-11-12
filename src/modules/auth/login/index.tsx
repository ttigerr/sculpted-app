import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useRef} from 'react';
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
import {theme} from 'src/config/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import useLogin from './useLogin';
import {GoogleLogo, AppleLogo} from 'assets/img';
import {IOS} from 'src/consts/constants';

const Login = (props: NavigationPropsType) => {
  const [checked, setChecked] = useState<boolean>(false);

  const {
    onSubmit,
    control,
    errors,
    isValid,
    goToSignUp,
    emailRules,
    passwordRules,
    goToForgotPassword,
    handleInputFocus,
    scrollViewRef,
    inputRefs,
    storeInputPosition,
  } = useLogin(props);
  return (
    <MainWrapper>
      <KeyboardAvoidingView
        behavior={IOS ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView ref={scrollViewRef} style={styles.container}>
          <Separator height={RFValue(92)} />
          <Text variant="h1">{'Unleash Your Full Potential!!'}</Text>
          <Separator height={RFValue(32)} />
          <TextInput
            ref={ref => (inputRefs.current[0] = ref)}
            control={control}
            name="email"
            label="Email"
            rules={emailRules}
            placeholder={'Enter email/Phone number'}
            left={<Icon name="email" size="normal" />}
            autoCapitalize="none"
            onFocus={() => handleInputFocus('firstInput')}
            onLayout={event =>
              storeInputPosition('firstInput', event.nativeEvent.layout.y)
            }
          />
          <Separator height={RFValue(14)} />
          <TextInput
            ref={ref => (inputRefs.current[0] = ref)}
            control={control}
            name="password"
            label="Password"
            rules={passwordRules}
            placeholder={'Enter your password'}
            left={<Icon name="lock" size="normal" />}
            type="password"
            onFocus={() => handleInputFocus('secondInput')}
            onLayout={event =>
              storeInputPosition('secondInput', event.nativeEvent.layout.y)
            }
          />
          <View style={styles.rememberMeContainer}>
            <CheckBox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}>
              <Text variant="caption">{'Remember me'}</Text>
            </CheckBox>
            <Link
              label="Forgot password?"
              onPress={goToForgotPassword}
              style={styles.forgotPasswordLink}
            />
          </View>
          <Separator height={RFValue(32)} />
          <Button onPress={onSubmit} label="Login" />
          <Separator height={RFValue(14)} />
          <Button
            icon={() => <Image source={GoogleLogo} />}
            mode="outlined"
            onPress={onSubmit}
            label="Continue with Google"
          />
          <Separator height={RFValue(14)} />
          <Button
            icon={() => <Image source={AppleLogo} />}
            mode="outlined"
            onPress={onSubmit}
            label="Continue with Apple"
          />
          <Text variant="paragraph" style={styles.bottomLink}>
            {'Don’t have an account?  '}
            <Link label="Sign up" onPress={goToSignUp} />
          </Text>
          <Separator height={RFValue(82)} />
        </ScrollView>
      </KeyboardAvoidingView>
    </MainWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bottomLink: {
    alignSelf: 'center',
    marginTop: 15,
    color: theme.colors.caption,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgotPasswordLink: {
    fontSize: RFValue(12),
    color: theme.colors.caption,
  },
});
