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
  ...rest
}) => {
  return mode == 'outlined' ? (
    <PaperButton
      mode="outlined"
      onPress={onPress}
      style={styles.outlinedContainer}
      {...rest}>
      {label ? (
        <Text
          style={[styles.buttonText, {fontSize: RFValue(14)}]}
          variant="paragraph">
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
      style={styles.gradientContainer}>
      <PaperButton
        mode={mode}
        onPress={onPress}
        style={styles.containedContainer}
        {...rest}>
        {label ? <Text style={styles.buttonText}>{label}</Text> : children}
      </PaperButton>
    </LinearGradient>
  );
};

export default Button;
