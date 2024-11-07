import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import {Separator, Text} from 'src/modules/core/ui-library';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'src/modules/core/components/icon';

const CounterButton = ({minValue = 0, maxValue = 10}) => {

    const [count, setCount] = useState(minValue);

    // Function to handle incrementing counter
    const handleIncrement = () => {
        if (count < maxValue) {
            setCount((prevCount) => prevCount + 1)
        }
    }

    // Function to handle decrasing counter
    const handleDecrement = () => {
        if (count > minValue) {
            setCount((prevCount) => prevCount - 1)
        }
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={handleDecrement}>
                <Icon name="minus" size="normal"/>
            </Pressable>
            <Text variant="body2">{count + "/" + maxValue}</Text>
            <Pressable onPress={handleIncrement}>
                <Icon name="plus" size="small"/>
            </Pressable>
        </View>
    )
}

export default CounterButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2B2B2B',
        borderRadius: 30,
        padding: RFValue(6),
        width: RFValue(100)
    },
});