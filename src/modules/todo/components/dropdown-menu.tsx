import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  findNodeHandle,
  UIManager,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'src/modules/core/components/icon';
import { theme } from 'src/config/theme';

type DropdownMenuProps = {
  onShowCompletedPressed: (showCompleteValue: boolean) => void;
  onSelectAllPressed: (selectAllValue: boolean) => void;
  isShowingCompleted: boolean;
  isSelectedAll: boolean;
};

const SELECTED_ICON_SIZE = 15;

const DropdownMenu = ({
  onShowCompletedPressed,
  onSelectAllPressed,
  isShowingCompleted,
  isSelectedAll,
} : DropdownMenuProps ) => {

  const [visible, setVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const iconRef = useRef<TouchableOpacity>(null);

  const openMenu = () => {
    const handle = findNodeHandle(iconRef.current);
    if (handle) {
      UIManager.measure(handle, (_x, _y, _width, _height, pageX, pageY) => {
        setMenuPosition({ x: pageX, y: pageY + _height });
        setVisible(true);
      });
    }
  };

  const closeMenu = () => setVisible(false);

  const handleShowCompleted = () => {
    closeMenu();
    onShowCompletedPressed(isShowingCompleted);
  };

  const handleSelectAll = () => {
    closeMenu();
    onSelectAllPressed(isSelectedAll);
  };

  return (
    <View>
      <TouchableOpacity onPress={openMenu} ref={iconRef}>
        <Icon name="threeDots" />
      </TouchableOpacity>
      {visible && (
        <Modal transparent animationType="none" visible={visible}>
          <Pressable style={styles.overlay} onPress={closeMenu}>
            <View
              style={[
                styles.menuContent,
                {
                  top: menuPosition.y + 6,
                  right: RFValue(16), // Adjust based on your layout
                },
              ]}
            >
              <TouchableOpacity
                style={[styles.item, styles.firstItemBorder]}
                onPress={handleShowCompleted}
              >
                <Text style={styles.menuText}>Show Completed</Text>
                <View style={styles.selectedIconContainer}>
                  <View
                    style={[
                      styles.selectedIconDot,
                      {
                        backgroundColor: theme.colors.todoScreenTextColor,
                      },
                    ]}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.item} onPress={handleSelectAll}>
                <Text style={styles.menuText}>Select All</Text>
                <View style={styles.selectedTickContainer}>
                  <Icon
                    name="tick"
                    fill={theme.colors.todoScreenTextColor}
                    width={RFValue(8)}
                    height={RFValue(8)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  menuContent: {
    position: 'absolute',
    backgroundColor: '#333',
    borderRadius: 17,
    paddingVertical: 8,
    width: 190,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1000,
  },
  menuText: {
    color: theme.colors.textInputColor,
    fontWeight: '500',
    fontSize: 16,
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  selectedIconContainer: {
    height: RFValue(SELECTED_ICON_SIZE),
    aspectRatio: 1,
    padding: RFValue(2),
    borderWidth: 1,
    borderColor: theme.colors.listItemColor,
    borderRadius: 20,
  },
  selectedTickContainer: {
    height: RFValue(SELECTED_ICON_SIZE),
    aspectRatio: 1,
    padding: RFValue(2),
    borderWidth: 1,
    borderColor: theme.colors.listItemColor,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIconDot: {
    flex: 1,
    borderRadius: 20,
  },
  firstItemBorder: {
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
});

export default DropdownMenu;

