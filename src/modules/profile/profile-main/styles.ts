import React from "react";
import { StyleSheet } from "react-native";
import { theme } from "src/config/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RFValue(55),
  },
  scrollView: {
    paddingHorizontal: RFValue(16),
  },
  userNameContainer: {
    alignItems: 'center',
    marginBottom: RFValue(20),
    position: 'relative',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: RFValue(6),
    backgroundColor: theme.colors.listItemColor,
    paddingVertical: RFValue(5),
    paddingHorizontal: RFValue(6),
    borderRadius: 30,
  },
  detailText: {
    fontSize: 14,
    paddingBottom: RFValue(8),
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.listItemColor,
    borderRadius: RFValue(17),
    padding: 15,
  },
  detailInnerContainer: {
    flex: 1,
    paddingHorizontal: 15
  },
  profileIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  avatarIconWrapper: {
    borderWidth: 8, // RFValue(8)
    borderColor: theme.colors.avartarBorderColor,
    borderRadius: 90,
  },
  userText: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  horizontalDivider: {
    borderColor: theme.colors.listItemBorderColor,
    borderLeftWidth: 1, 
    alignSelf: 'stretch', 
    marginVertical: -15
  },
  icon: {
    borderRadius: 50,
    height: 26, // RFValue(26)
    width: 26, // RFValue(26)
    backgroundColor: theme.colors.avartarBadgeDefaultColor, 
    right: RFValue(5), // RFValue(10)
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingVertical: RFValue(8), 
    fontWeight: '700'
  },
  groupContainer: {
    backgroundColor: theme.colors.listItemColor,
    borderRadius: RFValue(17),
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.listItemBorderColor,
    marginHorizontal: RFValue(16),
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
  backButton: {
    left: 0, 
    position: 'absolute',
  },
});

export default styles;
