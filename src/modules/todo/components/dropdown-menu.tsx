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
        style={styles.item}
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
      {/* <Divider bold />
      <Menu.Item
        onPress={() => {
          closeMenu();
          onSelectAllPressed(isSelectedAll);
        }}
        title="Select All"
        titleStyle={styles.menuText}
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
              width={RFValue(12)}
              height={RFValue(12)}
            />
          </View>
        )}
      /> */}
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuContent: {
    backgroundColor: '#333',
    borderRadius: 10,
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
    flexDirection: 'row',
    color: theme.colors.textInputColor,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  selectedIconContainer: {
    height: RFValue(20),
    width: undefined,
    aspectRatio: 1 / 1,
    padding: RFValue(3),
    borderWidth: 1,
    borderColor: theme.colors.listItemColor,
    borderRadius: 20,
    // marginLeft: 10,
  },
  selectedIconDot: {
    flex: 1,
    borderRadius: 20,
  },
});

export default DropdownMenu;
