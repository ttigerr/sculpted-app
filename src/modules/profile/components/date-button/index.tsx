import {StyleSheet, View, Pressable} from 'react-native';
import Icon from 'src/modules/core/components/icon';
import React from 'react';
import {Text} from 'src/modules/core/ui-library';
import {theme} from 'src/config/theme';
import { RFValue } from 'react-native-responsive-fontsize';

type DateButtonProps = {
  innerText: string;
  label: string;
  onPress: () => void;
};
const DateButton: React.FC<DateButtonProps> = ({innerText, label, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label} variant="body2">
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
    marginBottom: RFValue(5),
    fontWeight: '500',
  },
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.textInputBorderColor,
    borderRadius: 17,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholder: {
    fontSize: 16,
    color: theme.colors.textInputFocusBorderColor,
  },
});
