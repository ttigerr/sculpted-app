import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { toastConfig } from 'src/modules/core/ui-library/components/toast';
import LoadingModal from 'src/modules/core/components/loading-modal';

const EmailVerification = (props: NavigationPropsType) => {
  const {
    onSubmit,
    control,
    errors,
    isValid,
    emailRules,
    goBack,
    scrollViewRef,
    isLoading,
  } = useEmailVerification(props);

  const [source, setSource] = useState(''); // default fallback

  useEffect(() => {
    if (props.route.params?.source) {
      setSource(props.route.params.source);
    }
  }, [props.route.params?.source]);

  return (
    <MainWrapper>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView style={styles.scrollView} ref={scrollViewRef}>
            <View style={styles.contentContainer}>
              <View style={styles.navigationBarContainer}>
                { source === "auth" && (
                  <BackButton onPress={goBack} /> // Return button will appear when 
                )}
              </View>
              <Separator height={RFValue(34)} />
              <Icon name="filled-lock" size="xxlarge" />
              <Separator height={RFValue(36)} />
              <Text variant="h2" style={styles.passwordText}>{'Forgot Password?'}</Text>
              <Separator height={RFValue(36)} />
              <Text variant="body" style={styles.body}>
                {
                  'Don‘t worry! It happens sometimes. Enter your email or phone number and we‘ll send you an OTP.'
                }
              </Text>
              <Separator height={RFValue(20)} />
            </View>
            <TextInput
              control={control}
              name="email"
              rules={emailRules}
              placeholder={'Enter email/Phone number'}
              left={<Icon name="email" size="normal" />}
              autoCapitalize="none"
              borderRoundness={25}
              height={62}
            />
            <Separator height={RFValue(20)} />
            <Button onPress={onSubmit} label="Send OTP" height={62} buttonFontSize={24}/>
            <Separator height={RFValue(32)} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Toast config={toastConfig} />
      <LoadingModal visible={isLoading} />
    </MainWrapper>
  );
};

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
  passwordText: {
    fontSize: RFValue(24),
    fontWeight: '400',
    letterSpacing: 0.24
  },
  body: {
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 0.32
  },
  bottomLink: {
    alignSelf: 'center',
    color: theme.colors.caption,
  },
});

export default EmailVerification;
