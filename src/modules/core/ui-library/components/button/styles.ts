import { StyleSheet } from "react-native";
import { theme } from "src/config/theme";


const styles = StyleSheet.create({
  containedContainer: {
    backgroundColor: '#FFFFFF00',
  },
  outlinedContainer: {
    borderWidth: 1,
    borderColor: theme.colors.outlinedButtonBorderColor,
  },
  gradientContainer: {
    borderRadius: 200,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'HelveticaNeueMedium',
  },
});

export default styles