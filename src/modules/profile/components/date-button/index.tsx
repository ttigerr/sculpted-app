import {StyleSheet, View, Pressable} from 'react-native';
import Icon from 'src/modules/core/components/icon';
import React from 'react';
import {Text} from 'src/modules/core/ui-library';
import {theme} from 'src/config/theme';

type DateButtonProps = {
  innerText: string;
  label: string;
  onPress: () => void;
};
const DateButton: React.FC<DateButtonProps> = ({innerText, label, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label} variant="caption">
        {label}
      </Text>
      <Pressable style={styles.inputContainer} onPress={onPress}>
        <Text style={styles.placeholder}>{innerText}</Text>
        <Icon name="calendar" />
      </Pressable>
    </View>
  );
};

export default DateButton;

const styles = StyleSheet.create({
  container: {},
  label: {
    color: theme.colors.textInputColor,
    marginBottom: 10,
    marginLeft: 8,
    fontSize: 12,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: theme.colors.textInputBorderColor,
    borderRadius: 100,
    paddingVertical: 16,
    paddingLeft: 14,
    paddingRight: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholder: {
    fontSize: 16,
    color: theme.colors.textInputFocusBorderColor,
  },
});
