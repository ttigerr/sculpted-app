import React, {useState, forwardRef} from 'react';
import {
  StyleSheet,
  View,
  TextStyle,
  TextInput as TextInputBase,
  TouchableOpacity,
} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';
import {Controller, FieldValues, Control} from 'react-hook-form';
import {theme} from 'src/config/theme';
import Text from '../text';
import Icon from 'src/modules/core/components/icon';

type MtxInputPropsType = React.ComponentPropsWithRef<typeof TextInputBase> & {
  placeholder?: string;
  label: string;
  name: string;
  type?: 'password' | 'phone' | 'text';
  style?: TextStyle;
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
};

const TextInput = forwardRef<TextInputBase, MtxInputPropsType>(
  (
    {
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
      testID,
      autoFocus,
      prevPassword,
      isPasswordRepeat,
      validate,
      defaultValue,
      hasBorderError,
      bottomLabel,
      left,
      ...rest
    },
    ref,
  ) => {
    const isPassword = type == 'password';
    const [showPassword, setShowPassword] = useState(isPassword);

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
                ref={ref}
                maxLength={maxLength}
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
                left={left && <PaperTextInput.Icon icon={() => left} />}
                right={
                  isPassword && (
                    <PaperTextInput.Icon
                      icon={() => (
                        <Icon
                          name={showPassword ? 'eye-show' : 'eye-hide'}
                          size="normal"
                        />
                      )}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  )
                }
                secureTextEntry={showPassword}
                {...rest}
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
  },
);

export default TextInput;

const styles = StyleSheet.create({
  label: {
    color: theme.colors.textInputColor,
    marginBottom: 10,
    marginLeft: 8,
    fontSize: 12,
  },
  container: {},
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
