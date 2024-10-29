import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';

const TodoSchedule = () => {
  return (
    <MainWrapper>
      <View style={styles.container}>
        <Text>TodoSchedule</Text>
      </View>
    </MainWrapper>
  );
};

export default TodoSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
