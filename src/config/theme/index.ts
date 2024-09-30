import { Platform } from "react-native";
import { configureFonts, MD3LightTheme as DefaultTheme, Paragraph } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";

export const fonts = {
  helveticaNeueMedium: 'HelveticaNeueMedium',
  helveticaNeueRoman: 'HelveticaNeueRoman',
};

const fontConfig = {
  h1: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: fonts.helveticaNeueMedium,
      android: fonts.helveticaNeueMedium,
      default: fonts.helveticaNeueMedium,
    }),
    fontWeight: '500',
    lineHeight: 43.33,
    fontSize: 32,
    letterSpacing: 0.5,
    color: '#F4F4F4'
  },
  h2: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: fonts.helveticaNeueMedium,
      android: fonts.helveticaNeueMedium,
      default: fonts.helveticaNeueMedium,
    }),
    fontWeight: '500',
    lineHeight: 32.33,
    fontSize: RFValue(28),
    letterSpacing: 0.5,
    color: '#F4F4F4'
  },
  h3: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: fonts.helveticaNeueMedium,
      android: fonts.helveticaNeueMedium,
      default: fonts.helveticaNeueMedium,
    }),
    fontWeight: '500',
    lineHeight: 24.24,
    fontSize: RFValue(20),
    letterSpacing: 0.5,
    color: '#F4F4F4'
  },
  body: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: fonts.helveticaNeueRoman,
      android: fonts.helveticaNeueRoman,
      default: fonts.helveticaNeueRoman,
    }),
    fontWeight: '400',
    lineHeight: 19.09,
    fontSize: RFValue(16),
    letterSpacing: 0.2,
    color: '#F4F4F4'
  },
  paragraph: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: fonts.helveticaNeueRoman,
      android: fonts.helveticaNeueRoman,
      default: fonts.helveticaNeueRoman,
    }),
    fontWeight: '400',
    lineHeight: 19.09,
    fontSize: RFValue(15),
    letterSpacing: 0.2,
    color: '#F4F4F4'
  },
  caption: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: fonts.helveticaNeueMedium,
      android: fonts.helveticaNeueMedium,
      default: fonts.helveticaNeueMedium,
    }),
    fontWeight: '500',
    lineHeight: 14.65,
    fontSize: RFValue(12),
    letterSpacing: 0.2,
    color: '#F4F4F494'
  },
};


export const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    primary: '#42DBF0',
    secondary: '#0C0D0E',
    h1: '#F4F4F4',
    h2: '#F4F4F4',
    h3: '#F4F4F4',
    buttonText: '#0C0D0E',
    paragraph: '#919191',
    caption: '#919191',
    background: '#0C0D0E',
    gradientBackgroundTop: '#0E202CD6',
    gradientBackgroundBottom: '#3BD0D636',
    outlinedButtonBorderColor: '#F4F4F4',
    // TextInput
    textInputColor: '#F4F4F4',
    textInputBorderColor: '#606060',
    textInputFocusBorderColor: '#F4F4F4',
    progressBarColor: '#F4F4F4',
    progressBarBackgroundColor: '#E7E7E745',
  },
  gradientColors: {
    button: ['#3BD0D6', '#428EC5'],
    gradientBackgroundTop: ['#428EC5D6','#428EC500', '#428EC500']
  },
  fonts: configureFonts({config: fontConfig}),
}