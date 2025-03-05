import {StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {Text, Link, Separator, Button} from 'src/modules/core/ui-library';
import {NavigationPropsType} from 'src/utils/types';
import useSignUp from './useSignUp';
import {theme} from 'src/config/theme';
import {RFValue} from 'react-native-responsive-fontsize';

const SignUp = (props: NavigationPropsType) => {
  const {handleSignUp, goToLogin, isLoading} = useSignUp(props);

  return (
    <MainWrapper>
      <ScrollView style={styles.container}>
        <Separator height={RFValue(92)} />
        <Text style={styles.title}>Unleash Your Full Potential!!</Text>
        <Separator height={RFValue(32)} />
        <Text style={styles.subtitle}>
          Create an account to start tracking your fitness journey
        </Text>
        <Separator height={RFValue(32)} />
        <Button
          onPress={handleSignUp}
          disabled={isLoading}
          style={styles.signUpButton}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Click here to sign up</Text>
          )}
        </Button>
        <Separator height={RFValue(32)} />
        <Text style={styles.bottomLink}>
          {'Already have an account?  '}
          <Link label="Log in" onPress={goToLogin} />
        </Text>
      </ScrollView>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: RFValue(16),
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: RFValue(16),
    color: theme.colors.primaryTextColor,
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: RFValue(8),
    paddingVertical: RFValue(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  bottomLink: {
    textAlign: 'center',
    fontSize: RFValue(14),
    color: theme.colors.primaryTextColor,
  },
});

export default SignUp;
