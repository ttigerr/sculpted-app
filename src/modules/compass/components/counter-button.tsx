import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "src/modules/core/ui-library";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "src/modules/core/components/icon";

type CounterButtonProps = {
    value: number;
    setValue: (val: number) => void;
    minValue: number;
    maxValue: number;
    disable: boolean;
  };
  
  const CounterButton: React.FC<CounterButtonProps> = ({
    value = 0,
    setValue,
    minValue = 0,
    maxValue = 10,
    disable,
  }) => {
    const handleIncrement = () => {
      const newValue = Math.min((value ?? 0) + 1, maxValue);
      setValue(newValue);
    };
  
    const handleDecrement = () => {
      const newValue = Math.max((value ?? 0) - 1, minValue);
      setValue(newValue);
    };
  
    return (
        <View style={[styles.container, {width: disable? 90 : 132}]}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                { disable? (
                    <Text variant="body" style={styles.text}>
                        {`${value ?? 0}/${maxValue}`}
                    </Text>
                ) : (
                    <>
                        <Pressable onPress={handleDecrement} style={styles.iconWrapper} disabled={disable}>
                            <Icon name="minus" size="normal" color="#B0B0B0" />
                        </Pressable>
                        <Text variant="body" style={styles.text}>
                            {`${value ?? 0}/${maxValue}`}
                        </Text>
                        <Pressable onPress={handleIncrement} style={styles.iconWrapper} disabled={disable}>
                            <Icon name="plus" size="small" color="#F58541" />
                        </Pressable>
                    </>
                )}
            </View>
        </View>
    );
  };
  

export default CounterButton;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: "#1F2021",
        borderRadius: RFValue(52),
        paddingVertical: RFValue(8),
        paddingLeft: RFValue(4),
        paddingRight: RFValue(3),
    },
    iconWrapper: {
        paddingHorizontal: RFValue(8),
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        marginHorizontal: RFValue(8),
        color: "#FFFFFF",
    },
});