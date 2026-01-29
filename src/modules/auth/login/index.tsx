import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
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
import LoadingModal from 'src/modules/core/components/loading-modal';
import BackButton from 'src/modules/core/components/back-button';

const Login = (props: NavigationPropsType) => {
  const [checked, setChecked] = useState<boolean>(true);

  const {
    onSubmit,
    control,
    errors,
    isValid,
    handleDirectSignUp,
    emailRules,
    passwordRules,
    goToForgotPassword,
    handleInputFocus,
    scrollViewRef,
    inputRefs,
    storeInputPosition,
    loading,
    onReturn
  } = useLogin(props);

  return (
    <MainWrapper>
      <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
          behavior={IOS ? 'padding' : 'height'}
          style={{flex: 1}}>
            <ScrollView ref={scrollViewRef} style={styles.scrollView}>
              {/* <Text variant="h1" style={{fontSize: RFValue(32)}}>{'Unleash Your Full Potential!!'}</Text> */}
              <View style={styles.headerContainer}>
                <BackButton onPress={onReturn} style={styles.backButton}/>
                <Text variant="h3" style={styles.title}>{'Sign In'}</Text>
              </View>
              <Separator height={RFValue(20)} />
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
                borderRoundness={25}
                height={62}
              />
              <Separator height={RFValue(20)} />
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
                borderRoundness={25}
                height={62}
              />
              <Separator height={RFValue(20)} />
              <View style={styles.rememberMeContainer}>
                {/* <CheckBox
                  checked={checked}
                  onPress={() => {
                    setChecked(!checked);
                  }}>
                  <Text variant="caption">{'Remember me'}</Text>
                </CheckBox> */}
                <Link
                  label="Forgot password?"
                  onPress={goToForgotPassword}
                  style={styles.forgotPasswordLink}
                />
              </View>
              <Separator height={RFValue(20)} />
              <Button 
                onPress={onSubmit} 
                label="Login"
                buttonFontSize={24}
                height={62}
              />
              <Separator height={RFValue(15)} />
              <Button
                icon={() => <Icon name='google'/>}
                mode="outlined"
                onPress={onSubmit}
                label="Continue with Google"
                height={62}
                buttonFontSize={15}
              />
              <Separator height={RFValue(15)} />
              <Button
                icon={() => <Icon name='apple' />}
                mode="outlined"
                onPress={onSubmit}
                label="Continue with Apple"
                buttonFontSize={15}
                height={62}
              />
              <Separator height={RFValue(20)} />
              <Text variant="paragraph" style={styles.bottomLink}>
                {'Don’t have an account?  '}
                <Link label="Sign up" onPress={onReturn} style={{fontSize: 16}}/>
              </Text>
              <Separator height={RFValue(82)} />
            </ScrollView>
        </KeyboardAvoidingView>
        <LoadingModal visible={loading} />
      </SafeAreaView>
    </MainWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RFValue(20),
  },
  scrollView: {
    paddingHorizontal: RFValue(16)
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(13),
  },
  backButton: {
    left: 0, 
    position: 'absolute',
  },
  title: {
    fontSize: RFValue(20),
    lineHeight: RFValue(0),
  },
  bottomLink: {
    lineHeight: RFValue(0),
    fontSize: 16,
    alignSelf: 'center',
    color: theme.colors.caption,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  forgotPasswordLink: {
    fontSize: 12,
    color: theme.colors.caption,
  },
});
