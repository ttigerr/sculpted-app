import { StyleSheet } from "react-native";
import { theme } from "src/config/theme";
import { RFValue } from "react-native-responsive-fontsize";


const styles = StyleSheet.create({
  containedContainer: {
    backgroundColor: '#FFFFFF00',
    paddingVertical: 6
  },
  outlinedContainer: {
    borderWidth: 1,
    borderColor: theme.colors.outlinedButtonBorderColor,
    paddingVertical: 6,
    borderRadius: 200,
  },
  gradientContainer: {
    borderRadius: 200,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600'
  },
});

export default styles