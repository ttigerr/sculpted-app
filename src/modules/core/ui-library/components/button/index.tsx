import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Button as PaperButton,
  ButtonProps as PaperButtonProps,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from 'src/config/theme';

interface UIButtonProps extends React.FC<PaperButtonProps> {
  label?: string;
  loading?: boolean;
}

const Button: React.FC<UIButtonProps & PaperButtonProps> = ({
  onPress,
  label,
  disabled,
  style,
  mode = 'contained',
  loading = false,
  children,
  ...rest
}) => {
  return (
    <LinearGradient
      colors={theme.gradientColors.button}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradientContainer}>
      <PaperButton
        mode={mode}
        onPress={onPress}
        style={styles.containedContainer}>
        {label ? <Text style={styles.buttonText}>{label}</Text> : children}
      </PaperButton>
    </LinearGradient>
  );
};

export default Button;

const styles = StyleSheet.create({
  containedContainer: {
    backgroundColor: '#FFFFFF00',
  },
  gradientContainer: {
    borderRadius: 200,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'HelveticaNeueMedium',
  },
});
