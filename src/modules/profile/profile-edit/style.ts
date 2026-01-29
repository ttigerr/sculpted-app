import React from "react";
import { StyleSheet } from "react-native";
import { theme } from "src/config/theme";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: RFValue(15),
    },
    scrollView: {
        paddingHorizontal: RFValue(16),
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

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
    backButton: {
        left: 0, 
        position: 'absolute',
    },
    buttonContainer: {
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#FFFFFF14',
        alignItems: 'center',
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    cancelButtonText: {
        color: '#595959',
        fontSize: 18,
        fontWeight: '500',
        textTransform: 'capitalize'
    },

});
export default styles;