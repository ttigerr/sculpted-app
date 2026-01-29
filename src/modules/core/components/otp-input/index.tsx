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
    otp: number[],
    onChange: (value: number[]) => void,
  ) => {
    let numericValue = parseInt(text, 10);
    if (isNaN(numericValue)) numericValue = 0; // fallback for non-numeric
  
    const newOtp = [...otp];
    newOtp[index] = numericValue;
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
      name="otpCode"
      defaultValue={[0, 0, 0, 0]}
      rules={rules}
      render={({field: {onChange, value}}) => {
        const otp = Array.isArray(value) && value.length === 4 ? value as OtpValue : [0, 0, 0, 0];
        return (
          <View style={styles.container}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                value={digit ? digit.toString() : ''}
                onChangeText={text => handleChangeText(text, index, otp, onChange)}
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
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colors.textInputBorderColor,
    borderRadius: 25,
    width: 80,
    height: 80,
    textAlign: 'center',
    fontSize: RFValue(24),
    color: theme.colors.textInputColor,
    backgroundColor: theme.colors.background,
  },
});

export default OtpInput;
