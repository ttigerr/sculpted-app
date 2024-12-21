import { StyleSheet } from "react-native";
import {theme} from '../../../../config/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background
  },
  topGradient: {
    width: 800,
    height: 900,
    position: 'absolute',
    top: 0,
    left: 0,
  }
})

export default styles