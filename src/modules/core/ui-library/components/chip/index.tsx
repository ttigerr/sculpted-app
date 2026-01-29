import {StyleSheet, View} from 'react-native';
import {
  Chip as PaperChip,
  ChipProps as PaperChipProps,
} from 'react-native-paper';
import React from 'react';
import {theme} from 'src/config/theme';
import {Text} from '@ui-library';
import {LinearGradient} from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';

const Chip: React.FC<PaperChipProps> = ({
  children,
  selected,
  onPress,
  style,
  ...rest
}) => {
  return selected ? (
    <LinearGradient
      colors={theme.gradientColors.button}
      style={[styles.gradientContainer, style]}>
      <PaperChip mode="flat" style={styles.container} onPress={onPress}>
        <Text style={styles.text} variant="paragraph">
          {children}
        </Text>
      </PaperChip>
    </LinearGradient>
  ) : (
    <PaperChip
      mode="outlined"
      style={[styles.outlinedContainer, style]}
      onPress={onPress}>
      <Text style={styles.outlinedText} variant="paragraph">
        {children}
      </Text>
    </PaperChip>
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000000',
  },
  gradientContainer: {
    justifyContent: 'center',
    borderRadius: 13,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    color: theme.colors.buttonText,
  },
  outlinedContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.outlinedButtonBorderColor,
    borderRadius: 13,
    alignItems: 'center',
    backgroundColor: '#00000000',
  },
  outlinedText: {
    fontSize: 16,
    color: theme.colors.outlinedButtonBorderColor,
    textAlign: 'center',
  },
});
