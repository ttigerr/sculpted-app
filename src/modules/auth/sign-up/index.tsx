import {StyleSheet, ScrollView, View} from 'react-native';
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
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = (props: NavigationPropsType) => {
  const {
    control,
    onSubmit,
    errors,
    goToLogin,
    emailRules,
    nameRules,
    passwordRules,
    confirmPasswordRules,
    handleOpenTermUrl,
    handleOpenPrivacyUrl,
  } = useSignUp(props);
  const [checked, setChecked] = React.useState(true);
  return (
    <MainWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text variant="h1" style={{fontSize: 36, lineHeight: 53}}>{'Unleash Your Full Potential!!'}</Text>
          <Separator height={RFValue(20)} />
          <TextInput
            control={control}
            name="email"
            label="Email"
            rules={emailRules}
            placeholder={'Enter email/Phone number'}
            left={<Icon name="email" size="normal" />}
            autoCapitalize="none"
            borderRoundness={25}
            height={62}
          />
          <Separator height={RFValue(20)} />
          <TextInput
            control={control}
            name="name"
            label="Username"
            rules={nameRules}
            placeholder={'Create username'}
            left={<Icon name="user" size="normal" />}
            maxLength={50}
            borderRoundness={25}
            height={62}
          />
          <Separator height={RFValue(20)} />
          <TextInput
            control={control}
            name="password"
            label="Password"
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

          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            <CheckBox checked={checked} onPress={() => setChecked(!checked)}/>
            <Text
              variant="caption"
              style={{
                flex: 1,
                fontSize: 12,
                
              }}
            >
              {'By signing up, you agree to our '}
              <Link
                label="Terms of Service"
                onPress={handleOpenTermUrl}
                style={{textDecorationLine: 'none', fontSize: 12}}
              />
              {' and '}
              <Link
                label="Privacy Policy"
                onPress={handleOpenPrivacyUrl}
                style={{textDecorationLine: 'none', fontSize: 12}}
              />
            </Text>
          </View>
          <Separator height={RFValue(20)} />
          <Button 
            onPress={onSubmit} 
            label="Sign up" 
            height={62} 
            buttonFontSize={24}
          />
          <Separator height={RFValue(20)} />
          <Text variant="paragraph" style={styles.bottomLink}>
            {'Already have an account? '}
            <Link label="Log in" onPress={goToLogin} style={{fontSize: 16}}/>
          </Text>
          <Separator height={RFValue(42)} />
        </ScrollView>
      </SafeAreaView>
    </MainWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RFValue(20),
  },
  scrollView: {
    paddingHorizontal: RFValue(16)
  },
  bottomLink: {
    fontSize: 16,
    alignSelf: 'center',
    color: theme.colors.caption,
  },
  termsAndCondtionsText: {
    flex: 1,
    flexWrap: 'wrap',
  },
});