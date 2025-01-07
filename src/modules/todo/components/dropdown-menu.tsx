import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Menu,
  IconButton,
  Divider,
  Text,
  MD3DarkTheme,
} from 'react-native-paper';
import {theme} from 'src/config/theme';
import {PaperProvider} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'src/modules/core/components/icon';

type DropdownMenuProps = {
  onShowCompletedPressed: (showCompleteValue: boolean) => void;
  onSelectAllPressed: (selectAllValue: boolean) => void;
  isShowingCompleted: boolean;
  isSelectedAll: boolean;
};

const SELECTED_ICON_SIZE = 16;

const DropdownMenu = ({
  onShowCompletedPressed,
  onSelectAllPressed,
  isShowingCompleted,
  isSelectedAll,
}: DropdownMenuProps) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      theme={theme}
      style={styles.menuContent}
      anchor={
        <IconButton
          icon="dots-horizontal-circle-outline"
          size={24}
          iconColor="gray"
          onPress={openMenu}
        />
      }
      contentStyle={styles.menuContent}>
      <Menu.Item
        onPress={() => {
          closeMenu();
          onShowCompletedPressed(isShowingCompleted);
        }}
        title="Show Completed"
        style={[styles.item, styles.firstItemBorder]}
        titleStyle={styles.menuText}
        trailingIcon={() => (
          <View style={styles.selectedIconContainer}>
            <View
              style={[
                styles.selectedIconDot,
                {
                  backgroundColor: isShowingCompleted
                    ? theme.colors.todoScreenTextColor
                    : theme.colors.avartarBadgeDefaultColor,
                },
              ]}
            />
          </View>
        )}
      />
      <Menu.Item
        onPress={() => {
          closeMenu();
          onSelectAllPressed && onSelectAllPressed(isSelectedAll);
        }}
        title="Select All"
        titleStyle={styles.menuText}
        contentStyle={{flex: 1}}
        style={styles.item}
        trailingIcon={() => (
          <View style={styles.selectedIconContainer}>
            <Icon
              name="tick"
              strokeColor={
                isSelectedAll
                  ? theme.colors.todoScreenTextColor
                  : theme.colors.avartarBadgeDefaultColor
              }
              width={RFValue(8)}
              height={RFValue(8)}
            />
          </View>
        )}
      />
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuContent: {
    backgroundColor: '#333',
    borderRadius: 22,
    alignItems: 'flex-start',
  },
  menuText: {
    color: theme.colors.textInputColor,
    fontWeight: '600',
    marginRight: 12,
  },
  anchorContainer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.colors.caption,
  },
  item: {
    color: theme.colors.textInputColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },
  selectedIconContainer: {
    height: RFValue(SELECTED_ICON_SIZE),
    width: undefined,
    aspectRatio: 1 / 1,
    padding: RFValue(2),
    borderWidth: 1,
    borderColor: theme.colors.listItemColor,
    borderRadius: 20,
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
