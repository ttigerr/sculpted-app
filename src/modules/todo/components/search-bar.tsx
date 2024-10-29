import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {theme} from 'src/config/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {TextInput as PaperTextInput} from 'react-native-paper';
import Icon from 'src/modules/core/components/icon';
import {Separator} from 'src/modules/core/ui-library';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Icon name="search" size="normal" />
      <TextInput
        placeholder="Find your tasks"
        style={styles.textInput}
        placeholderTextColor={theme.colors.editTextInputColor}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.outlinedButtonBorderColor,
    borderWidth: RFValue(1),
    borderRadius: 100,
    flexDirection: 'row',
    padding: RFValue(10),
    alignItems: 'center',
  },
  textInput: {
    color: theme.colors.editTextInputColor,
    marginLeft: RFValue(10),
    fontSize: RFValue(16),
  },
});
