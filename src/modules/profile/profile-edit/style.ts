import React from "react";
import { StyleSheet } from "react-native";
import { theme } from "src/config/theme";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        paddingHorizontal: RFValue(16),
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: RFValue(25),
    },
    reminderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reminderText: {
        color: theme.colors.textInputColor,
        marginBottom: 20,
        marginLeft: 8,
        fontSize: 12,
    },
    reminderTime: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#979898",
        borderRadius: 7,
    },
    time: {
        paddingVertical: RFValue(3),
        paddingHorizontal: RFValue(7),
    },
    iconButton: {
        margin: -10,
    },
});
export default styles;