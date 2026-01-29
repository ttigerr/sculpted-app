import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {theme} from 'src/config/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {TextInput as PaperTextInput} from 'react-native-paper';
import Icon from 'src/modules/core/components/icon';
import {Separator} from 'src/modules/core/ui-library';
import {IOS} from 'src/consts/constants';

type SearchBarProps = {
  placeholder: string;
  onChangeText: (query: string) => void;
  editable?: boolean;
};
const SearchBar = ({
  placeholder,
  onChangeText,
  editable = true,
}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size="normal" />
      <TextInput
        editable={editable}
        placeholder={placeholder}
        style={styles.textInput}
        placeholderTextColor={"#FFFFFF"}
        onChangeText={onChangeText}
        autoComplete="off"
        autoCorrect={false}
        keyboardType="default"
        spellCheck={false}
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
    paddingHorizontal: 15,
    paddingVertical: IOS ? 10 : 0,
    alignItems: 'center',
  },
  textInput: {
    color: "#FFFFFF",
    marginLeft: RFValue(11),
    fontSize: 16,
    fontWeight: '500',
  },
});
