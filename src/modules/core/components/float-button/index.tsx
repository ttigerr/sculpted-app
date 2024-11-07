import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-paper';
import {theme} from 'src/config/theme';

const FloatingButton = ({onPress}: {onPress: () => void}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon source="plus" color={theme.colors.primaryTextColor} size={32} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.floatButtonBackgroundColor, // Color similar al de la imagen
    alignItems: 'center',
    justifyContent: 'center',
    // Sombra en iOS
    shadowColor: '#FFF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Sombra en Android
    // elevation: 8,
  },
});

export default FloatingButton;
