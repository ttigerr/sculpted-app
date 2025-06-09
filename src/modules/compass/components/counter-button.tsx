import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "src/modules/core/ui-library";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "src/modules/core/components/icon";

type CounterButtonProps = {
  value: number;
  setValue: (value: number) => void;
  submitCompass: () => void;
  minValue : number;
  maxValue : number;
};

const CounterButton : React.FC<CounterButtonProps> = ({ value, setValue, submitCompass, minValue, maxValue }) => {
  const shouldSubmitRef = useRef(false);
  const prevValueRef = useRef(value);

  const handleIncrement = () => {
    if (value < maxValue) {
      shouldSubmitRef.current = true;
      setValue(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > minValue) {
      shouldSubmitRef.current = true;
      setValue(value - 1);
    }
  };

  useEffect(() => {
    //if value has been changed by clicking the buttons and not but changing dates, post data
    if(shouldSubmitRef.current && prevValueRef.current !== value){
        submitCompass();
        shouldSubmitRef.current = false;
    }

    prevValueRef.current = value;
  }, [value])

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', maxWidth: 125, justifyContent: 'center'}}>
        <Pressable onPress={handleDecrement} style={styles.iconWrapper}>
            <Icon name="minus" size="normal" color="#B0B0B0" />
        </Pressable>
        <Text variant="body" style={styles.text}>
            {`${value}/${maxValue}`}
        </Text>
        <Pressable onPress={handleIncrement} style={styles.iconWrapper}>
            <Icon name="plus" size="small" color="#F58541" />
        </Pressable>
      </View>
    </View>
  );
};

export default CounterButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#1F2021",
    borderRadius: 25,
    paddingVertical: RFValue(5),
    width: 132
  },
  iconWrapper: {
    padding: RFValue(4),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginHorizontal: RFValue(13),
    color: "#FFFFFF",
    
  },
});
