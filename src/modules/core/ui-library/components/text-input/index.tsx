import {StyleSheet, View, TextStyle} from 'react-native';
import {TextInput as PaperTextInput, Icon, MD3Colors} from 'react-native-paper';
import {Controller, FieldValues, Control, FieldError} from 'react-hook-form';
import {theme} from 'src/config/theme';
import Text from '../text';
import React from 'react';

type MtxInputPropsType = {
  placeholder?: string;
  label: string;
  name: string;
  type?: 'password' | 'phone' | 'text';
  style?: TextStyle;
  // error?: FieldError;
  errorMessage?: string;
  disabled?: boolean;
  success?: boolean;
  phonePrefix?: number; 
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
  prevPassword?: string;
  validate?: Object | Function;
  defaultValue?: string;
  hasBorderError?: boolean;
  isPasswordRepeat?: boolean;
  bottomLabel?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  icon?:  React.ReactNode;
};

const TextInput: React.FC<MtxInputPropsType> = ({
  placeholder,
  label,
  name,
  type,
  success,
  disabled,
  phonePrefix,
  keyboardType,
  customFunction,
  control,
  rules,
  maxLength,
  autoCapitalize,
  testID,
  autoFocus,
  prevPassword,
  isPasswordRepeat,
  validate,
  defaultValue,
  hasBorderError,
  bottomLabel,
  left,
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
            <PaperTextInput
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
              left={<PaperTextInput.Icon icon={() => left} />}
              right={<PaperTextInput.Icon icon={() => right} />}
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
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {
    color: theme.colors.textInputColor,
    marginBottom: 10,
    marginLeft: 8,
    fontSize: 12,
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
