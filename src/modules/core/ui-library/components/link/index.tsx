import {StyleSheet, TouchableWithoutFeedback, ViewProps} from 'react-native';
import React from 'react';
import {theme} from 'src/config/theme';
import Text from '../text';

type LinkProps = {
  label: string;
  onPress?: () => void;
};
const Link: React.FC<LinkProps & ViewProps> = ({
  label,
  onPress,
  style,
  ...rest
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} {...rest}>
      <Text variant="body" style={[styles.text, style]}>
        {label}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default Link;

const styles = StyleSheet.create({
  text: {
    color: theme.colors.h1,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
