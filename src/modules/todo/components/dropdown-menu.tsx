import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Menu,
  IconButton,
  Divider,
  Text,
  MD3Elevation,
} from 'react-native-paper';
import {theme} from 'src/config/theme';

const DropdownMenu = ({onSelectShowCompleted, onSelectAll}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      theme={theme}
      anchor={
        <IconButton
          icon="dots-horizontal"
          size={24}
          iconColor="gray"
          onPress={openMenu}
          style={styles.menuButton}
        />
      }
      contentStyle={styles.menuContent}>
      <Menu.Item
        onPress={() => {
          closeMenu();
          onSelectShowCompleted();
        }}
        title="Show Completed"
        titleStyle={styles.menuText}
        leadingIcon="checkbox-blank-outline"
      />
      <Divider />
      <Menu.Item
        onPress={() => {
          closeMenu();
          onSelectAll();
        }}
        title="Select All"
        titleStyle={styles.menuText}
        leadingIcon="check"
      />
    </Menu>
  );
};

const styles = StyleSheet.create({
  menuContent: {
    backgroundColor: '#333',
    borderRadius: 10,
  },
  menuText: {
    color: 'white',
  },
  anchorContainer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.colors.caption,
  },
});

export default DropdownMenu;
