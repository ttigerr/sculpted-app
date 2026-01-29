import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Button as PaperButton,
  ButtonProps as PaperButtonProps,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from 'src/config/theme';
import {Text} from '../../';
import styles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';

type UIButtonProps = PaperButtonProps & {
  label?: string;
  loading?: boolean;
  height?: number;
  mode?: 'outlined' | 'contained';
};

const Button: React.FC<UIButtonProps> = ({
  onPress,
  label,
  disabled,
  style,
  mode = 'contained',
  loading = false,
  children,
  height,
  ...rest
}) => {
  const buttonOpacity = disabled ? 0.8 : 1;
  return mode == 'outlined' ? (
    <PaperButton
      mode="outlined"
      onPress={onPress}
      disabled={disabled}
      style={[styles.outlinedContainer, { height: height, opacity: buttonOpacity }, style]}
      {...rest}>
      {label ? (
        <Text style={styles.buttonText} variant="button">
          {label}
        </Text>
      ) : (
        children
      )}
    </PaperButton>
  ) : (
    <LinearGradient
      colors={theme.gradientColors.button}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={[styles.gradientContainer, { opacity: buttonOpacity }]}
    >
      <PaperButton
        mode={mode}
        onPress={onPress}
        style={[styles.containedContainer, {height: height}]}
        {...rest}>
        {label ? <Text variant="button" style={styles.buttonText}>{label}</Text> : children}
      </PaperButton>
    </LinearGradient>
  );
};

export default Button;
