import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {theme} from 'src/config/theme';
import Icon from '../icon';

const FloatingButton = ({onPress}: {onPress: () => void}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon
          name="plusRound"
          strokeColor={theme.colors.primaryTextColor}
          width={32}
          height={32}
        />
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
