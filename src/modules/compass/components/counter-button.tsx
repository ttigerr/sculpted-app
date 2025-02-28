import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "src/modules/core/ui-library";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "src/modules/core/components/icon";

const CounterButton = ({ minValue = 0, maxValue = 10 }) => {
  const [count, setCount] = useState(0);

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
      <Text variant="body" style={styles.text}>
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
