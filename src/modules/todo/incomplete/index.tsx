import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';

const TodoIncomplete = () => {
  return (
    <MainWrapper>
      <View style={styles.container}>
        <Text>TodoIncomplete</Text>
      </View>
    </MainWrapper>
  );
};

export default TodoIncomplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
