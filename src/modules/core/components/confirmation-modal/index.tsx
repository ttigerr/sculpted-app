import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Modal} from 'react-native-paper';
import {Text} from '../../ui-library';
import Icon from '../icon';
import {theme} from 'src/config/theme';

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  onClose,
  onPrimaryAction,
  onSecondaryAction,
  primaryButtonText = 'Confirm',
  secondaryButtonText = 'Cancel',
}) => {
  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modalContainer}>
      <View style={styles.header}>
        <Text variant="h3" style={styles.title}>
          {title}
        </Text>
        <Pressable onPress={onClose} style={styles.iconContainer}>
          <Icon name="cancel" width={12} height={12} />
        </Pressable>
      </View>
      <View style={styles.actions}>
        <Pressable style={styles.buttonContainer} onPress={onPrimaryAction}>
          <Text variant="paragraph" style={styles.primaryButtonText}>
            {primaryButtonText}
          </Text>
        </Pressable>
        <Pressable style={styles.buttonContainer} onPress={onSecondaryAction}>
          <Text variant="paragraph" style={styles.secondaryButtonText}>
            {secondaryButtonText}
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: theme.colors.listItemColor,
    borderRadius: 30,
    margin: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF14',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 20,
  },
  title: {
    fontSize: 16,
    maxWidth: 250,
  },
  iconContainer: {
    marginTop: 10,
  },
  actions: {
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF14',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: theme.colors.todoScreenTextColor,
    fontSize: 16,
  },
  secondaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  secondaryButtonText: {
    color: theme.colors.paragraph,
    fontSize: 16,
  },
});
