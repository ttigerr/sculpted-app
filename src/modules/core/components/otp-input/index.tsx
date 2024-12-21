import React, {useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet, Keyboard} from 'react-native';
import {theme} from 'src/config/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {Controller, Control, FieldValues} from 'react-hook-form';
import {OtpValue} from 'src/utils/types';

type OtpInputProps = {
  control: Control;
  name: string;
  rules: FieldValues;
};
const OtpInput: React.FC<OtpInputProps> = ({control, name, rules}) => {
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  const handleChangeText = (
    text: string,
    index: number,
    otp: OtpValue,
    onChange: (value: OtpValue) => void,
  ) => {
    const newOtp: OtpValue = [...otp] as OtpValue;
    newOtp[index] = text;
    onChange(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
    if (index === 3 && text) {
      Keyboard.dismiss();
    }
  };

  const handleBackspace = (
    e: any,
    index: number,
    otp: OtpValue,
    onChange: (value: OtpValue) => void,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0) {
      const newOtp: OtpValue = [...otp] as OtpValue;
      newOtp[index] = '';
      onChange(newOtp);
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={['', '', '', '']}
      rules={rules}
      render={({field: {onChange, value}}) => {
        const otp =
          Array.isArray(value) && value.length === 4 ? value : ['', '', '', ''];
        return (
          <View style={styles.container}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={text =>
                  handleChangeText(text, index, otp, onChange)
                }
                onKeyPress={e => handleBackspace(e, index, otp, onChange)}
                ref={input => (inputs.current[index] = input)}
              />
            ))}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colors.textInputBorderColor,
    borderRadius: 20,
    width: RFValue(74),
    height: RFValue(74),
    textAlign: 'center',
    fontSize: RFValue(24),
    color: theme.colors.textInputColor,
    backgroundColor: theme.colors.background,
  },
});

export default OtpInput;
