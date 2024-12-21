import React, {useState} from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {Separator, Text} from 'src/modules/core/ui-library';
import { RFValue } from 'react-native-responsive-fontsize';
import CounterButton from "./counter-button";
import AddNotesButton from "./add-notes-button";

type CompassItemProps = {
    name : string;
}

const CompassItem : React.FC<CompassItemProps> = ({name}) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text variant="body1">{name}</Text>
                    <CounterButton/>
                </View>
                <Separator height={RFValue(16)} />
                <AddNotesButton color='#EE7933'/>
            </View>
            <Separator height={RFValue(16)} />
        </>
    )
}

export default CompassItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        borderRadius: 16,
        padding: 16,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        marginHorizontal: 10
    }
});