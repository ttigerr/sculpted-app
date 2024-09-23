import React from 'react';
import {StyleSheet, View, TextStyle} from 'react-native';
import {TextInput, Icon, MD3Colors} from 'react-native-paper';
import {Controller, FieldValues, Control, FieldError} from 'react-hook-form';
import {theme} from 'src/config/theme';
import Text from '../text';

type EditTextInputProps = {
    placeholder?: string;
    label: string;
    name: string;
    style?: TextStyle;
    // error?: FieldError;
    errorMessage?: string;
    disabled?: boolean;
    success?: boolean;
    keyboardType?:
        | 'default'
        | 'numeric'
        | 'email-address'
        | 'ascii-capable'
        | 'numbers-and-punctuation'
        | 'url'
        | 'number-pad'
        | 'phone-pad'
        | 'name-phone-pad'
        | 'decimal-pad'
        | 'twitter'
        | 'web-search'
        | 'visible-password';
    customFunction?: Function;
    control?: Control<FieldValues> | undefined;
    rules?: Object;
    maxLength?: number;
    autoCapitalize?: 'sentences' | 'none' | 'words' | 'characters';
    testID?: string;
    autoFocus?: boolean;
    validate?: Object | Function;
    defaultValue?: string;
    hasBorderError?: boolean;
    bottomLabel?: string;
    right?: React.ReactNode;
    icon?:  React.ReactNode;
}

// This is a TextInput for the profile edit's page
const EditTextInput : React.FC <EditTextInputProps> = 
({
    placeholder,
    label,
    name,
    success,
    disabled,
    keyboardType,
    customFunction,
    control,
    rules,
    maxLength,
    autoCapitalize,
    testID,
    autoFocus,
    validate,
    defaultValue,
    hasBorderError,
    bottomLabel,
    right,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label} variant="caption">
                {label}
            </Text>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                    <>
                        <TextInput
                        mode="outlined"
                        outlineColor={theme.colors.textInputBorderColor}
                        activeOutlineColor={theme.colors.textInputFocusBorderColor}
                        textColor={theme.colors.textInputColor}
                        placeholderTextColor={theme.colors.textInputBorderColor}
                        placeholder={placeholder}
                        theme={{roundness: 200}}
                        style={styles.input}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        right={<TextInput.Icon icon={() => right} />}
                        />
                        {error && (
                        <Text style={styles.errorLabel} variant="caption">
                            {error.message}
                        </Text>
                        )}
                    </>
                )}
            />
        </View>
    )
}

export default EditTextInput;

const styles = StyleSheet.create({
    label: {
      color: theme.colors.editTextInputColor,
      marginBottom: 10,
      marginLeft: 8,
      fontSize: 14,
    },
    container: {
      marginBottom: 25,
    },
    input: {
      fontSize: 16,
      color: theme.colors.textInputFocusBorderColor,
      backgroundColor: '#00000000',
    },
    errorLabel: {
      color: 'red',
      alignSelf: 'flex-end',
      marginTop: 8,
    },
  });