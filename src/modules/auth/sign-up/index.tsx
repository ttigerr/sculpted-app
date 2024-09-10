import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';

const SignUp = () => {
  return (
    <MainWrapper>
      <View style={styles.container}>
        <Text style={styles.text}>SignUp</Text>
      </View>
    </MainWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
  },
});
