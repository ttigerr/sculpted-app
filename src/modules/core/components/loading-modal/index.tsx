import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Modal, ActivityIndicator} from 'react-native-paper';
import {Text} from '../../ui-library';
import Icon from '../icon';
import {theme} from 'src/config/theme';
import {BlurView} from '@react-native-community/blur';

interface LoadingModalProps {
  visible: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({visible}) => {
  return (
    <Modal visible={visible} contentContainerStyle={styles.modalContainer}>
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={3}
        reducedTransparencyFallbackColor="#000000"
      />
      <ActivityIndicator
        animating={true}
        size={'large'}
        color={theme.colors.paragraph}
      />
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '130%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
