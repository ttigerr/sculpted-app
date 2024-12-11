import {
  View,
  Text,
  ViewProps,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {Checkbox as PaperCheckbox} from 'react-native-paper';

type CheckBoxProps = ViewProps & {
  children?: React.ReactNode;
  status: 'checked' | 'unchecked' | 'indeterminate';
  onPress?: (e: GestureResponderEvent) => void;
};
const CheckBox: React.FC<CheckBoxProps> = props => {
  return (
    <View style={[styles.container, props.style]}>
      <PaperCheckbox
        status={props.status}
        onPress={props.onPress}
        uncheckedColor="#F4F4F48A"
        color="#F4F4F4"
      />
      {props.children}
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
