import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';

const TodoTaskList = () => {
  return (
    <MainWrapper>
      <View style={styles.container}>
        <Text>TodoTaskList</Text>
      </View>
    </MainWrapper>
  );
};

export default TodoTaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
