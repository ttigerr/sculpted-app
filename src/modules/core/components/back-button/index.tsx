import {StyleSheet, Pressable, PressableProps} from 'react-native';
import React from 'react';
import Icon from '../icon';

const BackButton: React.FC<PressableProps> = props => {
  return (
    <Pressable {...props}>
      <Icon name="back-button" size="medium" />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
