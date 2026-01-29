import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Animated, Easing} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'src/modules/core/components/icon';

const CustomCheckbox = ({checked = false, onPress, children}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const scaleValue = new Animated.Value(0);

  const handlePress = () => {
    // Animación para el "check"
    Animated.timing(scaleValue, {
      toValue: isChecked ? 0 : 1,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    const newState = !isChecked;
    setIsChecked(newState);
    if (onPress) {
      onPress(newState);
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <Icon name="thick" size="xsmall" />}
      </View>
      <View>{children}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkbox: {
    width: RFValue(20),
    height: undefined,
    aspectRatio: 1 / 1,
    backgroundColor: '#1c1c1e', // Fondo oscuro
    borderRadius: RFValue(6),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 6,
  },
  checked: {
    backgroundColor: '#292929', // Color ligeramente diferente para indicar que está marcado
  },
});

export default CustomCheckbox;
