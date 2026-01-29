import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import { ButtonProps } from 'react-native-paper';
import {theme} from 'src/config/theme';
import Icon from '../icon';
import { useRoute } from '@react-navigation/native';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';

type FloatingButtonProps = {
  onPress: () => void;
  iconName?: string;
  width?: number;
  height?: number;
};

const FloatingButton: React.FC<FloatingButtonProps & ButtonProps> = ({
  onPress,
  iconName = 'plusRound',
  width,
  height,  
  style,
}) => {
  const route = useRoute();
  const screenName = navigationScreenNames;
  return (
    <View style={{
      alignItems: route.name == screenName.journal? 'flex-start' : "center",
      justifyContent: 'center',
    }}>
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Icon
          name={iconName}
          strokeColor={theme.colors.primaryTextColor}
          width={width}
          height={height}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 100,
    backgroundColor: theme.colors.floatButtonBackgroundColor, // Color similar al de la imagen
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow properties (optional)
    // Sombra en iOS
    // shadowColor: '#FFF',
    // shadowOffset: {width: 0, height: 4},
    // shadowOpacity: 0.3,
    // shadowRadius: 4.65,
    // Sombra en Android
    // elevation: 8,
  },
});

export default FloatingButton;
