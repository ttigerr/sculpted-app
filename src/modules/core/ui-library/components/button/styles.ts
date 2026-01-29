import { StyleSheet } from "react-native";
import { theme } from "src/config/theme";
import { RFValue } from "react-native-responsive-fontsize";


const styles = StyleSheet.create({
  containedContainer: {
    backgroundColor: '#FFFFFF00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlinedContainer: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.outlinedButtonBorderColor,
    paddingVertical: RFValue(6),
    borderRadius: 25,
  },
  gradientContainer: {
    borderRadius: 25,
  },
  buttonText: {
    justifyContent: 'center',
    color: theme.colors.buttonText,
  },
});

export default styles