import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {TextInput, Button, Text} from 'src/modules/core/ui-library';
import Icon from 'src/modules/core/components/icon';
import {NavigationPropsType} from 'src/utils/types';
import useSignUp from './useSignUp';

const SignUp = (props: NavigationPropsType) => {
  const {control, onSubmit, errors} = useSignUp(props);
  return (
    <MainWrapper>
      <View style={styles.container}>
        <Text variant="h1">{'Unleash Your Full Potential!!'}</Text>
        <TextInput
          control={control}
          name="email"
          label="Email"
          rules={{required: 'Required field'}}
          placeholder={'Enter email/Phone number'}
          left={<Icon name="lock-outlined" size="normal" />}
        />
        <TextInput
          control={control}
          name="password"
          label="Password"
          rules={{required: 'Required field'}}
          placeholder={'Enter your password'}
          left={<Icon name="lock" size="normal" />}
        />
        <Button onPress={onSubmit} label="Submit" />
      </View>
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
});
