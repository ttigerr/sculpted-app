import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Button as PaperButton,
  ButtonProps as PaperButtonProps,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from 'src/config/theme';
import {Text} from '@ui-library';
import styles from './styles';

interface UIButtonProps extends React.FC<PaperButtonProps> {
  label?: string;
  loading?: boolean;
  mode?: 'outlined' | 'contained';
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
  return mode == 'outlined' ? (
    <PaperButton
      mode="outlined"
      onPress={onPress}
      style={styles.outlinedContainer}>
      {label ? <Text variant="paragraph">{label}</Text> : children}
    </PaperButton>
  ) : (
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
