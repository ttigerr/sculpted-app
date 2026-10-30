import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {Text, Separator} from '../../ui-library';
import Icon from '../icon';
import {theme} from 'src/config/theme';
import {RFValue} from 'react-native-responsive-fontsize';

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children?: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  onClose,
  children,
  description,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          {/* Blur Background */}
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType= 'dark'
            blurAmount={3}
          />
        </View>
      </TouchableWithoutFeedback>

      {/* Modal Content */}
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text variant="body" style={styles.title}>
                {title}
              </Text>
              {description ? (
                <>
                  <Separator height={RFValue(12)} />
                  <Text variant="body" style={styles.descriptionText}>
                    {description}
                  </Text>
                </>
              ) : null}
              <Separator height={RFValue(20)} />
            </View>
            <Pressable onPress={onClose}>
              <Icon name="cancel" width={12} height={12} />
            </Pressable>
          </View>
          <View>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;


const styles = StyleSheet.create({
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: theme.colors.listItemColor,
    borderRadius: 30,
    marginHorizontal: RFValue(16),
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleContainer: {
    flex: 1,
    marginRight: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6f6f6f',
  },

});
