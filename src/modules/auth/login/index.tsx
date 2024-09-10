import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';

const Login = () => {
  return (
    <MainWrapper>
      <View style={styles.container}>
        <Text>Login</Text>
      </View>
    </MainWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
