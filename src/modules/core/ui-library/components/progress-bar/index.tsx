import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  ProgressBar as PaperProgressBar,
  ProgressBarProps,
} from 'react-native-paper';
import {theme} from 'src/config/theme';
import {RFValue} from 'react-native-responsive-fontsize';

const ProgressBar: React.FC<ProgressBarProps> = ({progress = 0, style}) => {
  return (
    <PaperProgressBar
      progress={progress}
      color={theme.colors.progressBarColor}
      style={[styles.container, style]}
    />
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.progressBarBackgroundColor,
    borderRadius: 100,
    height: RFValue(6),
  },
});
