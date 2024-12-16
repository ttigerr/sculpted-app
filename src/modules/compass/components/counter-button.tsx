import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "src/modules/core/ui-library";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "src/modules/core/components/icon";

const CounterButton = ({ minValue = 0, maxValue = 10 }) => {
  const [count, setCount] = useState(minValue);

  const handleIncrement = () => {
    if (count < maxValue) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleDecrement = () => {
    if (count > minValue) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleDecrement} style={styles.iconWrapper}>
        <Icon name="minus" size="normal" color="#B0B0B0" />
      </Pressable>
      <Text variant="body1" style={styles.text}>
        {`${count}/${maxValue}`}
      </Text>
      <Pressable onPress={handleIncrement} style={styles.iconWrapper}>
        <Icon name="plus" size="small" color="#F58541" />
      </Pressable>
    </View>
  );
};

export default CounterButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2B2B2B",
    borderRadius: 30,
    paddingVertical: RFValue(4),
    paddingHorizontal: RFValue(8),
  },
  iconWrapper: {
    padding: RFValue(4),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginHorizontal: RFValue(8),
    color: "#FFFFFF",
    
  },
});
