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
import { RFValue } from 'react-native-responsive-fontsize';

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
  height?: number;
  borderRoundness?: number;
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
      height,
      borderRoundness,
      ...rest
    },
    ref,
  ) => {
    const isPassword = type == 'password';
    const [showPassword, setShowPassword] = useState(isPassword);

    return (
      <View style={styles.container}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <>
              <View style={{flexDirection: 'row',}}>
                <Text style={styles.label} variant="body2">
                  {label}
                </Text>
                {error && (
                    <Text style={styles.errorLabel} variant="body2">
                      {"*" + error.message}
                    </Text>
                  )}
              </View>
              <PaperTextInput
                ref={ref}
                maxLength={maxLength}
                mode="outlined"
                outlineColor={theme.colors.textInputBorderColor}
                activeOutlineColor={theme.colors.textInputFocusBorderColor}
                textColor={theme.colors.textInputColor}
                placeholderTextColor={theme.colors.textInputBorderColor}
                placeholder={placeholder}
                theme={{roundness: borderRoundness}}
                style={[styles.input, {height: height}]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                textAlignVertical='top'
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
    flex: 1,
    color: theme.colors.textInputColor,
    marginBottom: RFValue(5),
    fontWeight: '500',
  },
  input: {
    fontSize: 16,
    color: theme.colors.textInputFocusBorderColor,
    backgroundColor: '#00000000',
  },
  errorLabel: {
    color: "#FF505A",
    lineHeight: RFValue(0),
    fontSize: RFValue(12),
  },
});

