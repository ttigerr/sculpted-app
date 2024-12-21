import React from "react";
import { StyleSheet } from "react-native";
import { theme } from "src/config/theme";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: RFValue(50),
    },
    scrollView: {
      paddingHorizontal: RFValue(16),
    },
    userNameContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: RFValue(20),
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    editContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.listItemColor,
      paddingVertical: RFValue(5),
      paddingHorizontal: RFValue(7),
      borderRadius: 30
    },
    detailText: {
      paddingBottom: RFValue(10),
    },
    detailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.listItemColor,
      borderRadius: 20,
      marginVertical: RFValue(10),
    },
    innerContainer1: {
      flex: 1,
      padding: RFValue(20),
    },
    innerContainer2: {
      flex: 1,
      borderColor: theme.colors.listItemBorderColor,
      borderLeftWidth: 1,
      padding: RFValue(20),
    },
    listContainer: {
      backgroundColor: theme.colors.listItemColor,
      borderRadius: 20,
      marginVertical: RFValue(10),
    },
    listItems: {
      borderColor: theme.colors.listItemBorderColor,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderRadius: 0,
    },
    avartarBorder: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      borderWidth: 8,
      borderColor: theme.colors.avartarBorderColor,
      borderRadius: 50,
    },
    userText: {
      color: theme.colors.primary,
    }
    // icon: {
    //   borderRadius: 50,
    //   height: 28,
    //   width: 28,
    //   backgroundColor: theme.colors.avartarBadgeDefaultColor,
    //   marginLeft: -28,
    //   marginBottom: -10,
    // },
  });

export default styles;