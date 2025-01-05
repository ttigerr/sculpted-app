import { Platform } from "react-native";
import { configureFonts, MD3LightTheme as DefaultTheme } from "react-native-paper";
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
    fontSize: 28,
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
    fontSize: 20,
    letterSpacing: 0.5,
    color: '#F4F4F4'
  },
  h4: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: fonts.helveticaNeueMedium,
      android: fonts.helveticaNeueMedium,
      default: fonts.helveticaNeueMedium,
    }),
    fontWeight: '500',
    lineHeight: 24.24,
    fontSize: 14,
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
    fontSize: 16,
    letterSpacing: 0.2,
    color: '#F4F4F4'
  },
  body1: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: fonts.helveticaNeueRoman,
      android: fonts.helveticaNeueRoman,
      default: fonts.helveticaNeueRoman,
    }),
    fontWeight: '400',
    lineHeight: 19.09,
    fontSize: 14,
    letterSpacing: 0.2,
    color: '#F4F4F4'
  },
  body2: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: fonts.helveticaNeueRoman,
      android: fonts.helveticaNeueRoman,
      default: fonts.helveticaNeueRoman,
    }),
    fontWeight: '400',
    lineHeight: 19.09,
    fontSize: 12,
    letterSpacing: 0.2,
    color: '#F4F4F4'
  },
  body3: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: fonts.helveticaNeueRoman,
      android: fonts.helveticaNeueRoman,
      default: fonts.helveticaNeueRoman,
    }),
    fontWeight: '400',
    lineHeight: 19.09,
    fontSize: 10,
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
    fontSize: 15,
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
    fontSize: 12,
    letterSpacing: 0.2,
    color: '#F4F4F494'
  },
  delete: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: fonts.helveticaNeueMedium,
      android: fonts.helveticaNeueMedium,
      default: fonts.helveticaNeueMedium,
    }),
    fontWeight: '400',
    lineHeight: 19.09,
    fontSize: 16,
    letterSpacing: 0.2,
    color: '#FF505A'
  },
  greeting: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: fonts.helveticaNeueMedium,
      android: fonts.helveticaNeueMedium,
      default: fonts.helveticaNeueMedium,
    }),
    fontWeight: '500',
    lineHeight: 42.48,
    fontSize: 32,
    letterSpacing: 0.5,
    color: '#F4F4F4'
  },
};


export const theme = {
  ...DefaultTheme,
  elevation: 3,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#42DBF0',
    primaryContainer: '#42DBF0',
    secondary: '#0C0D0E',
    h1: '#F4F4F4',
    h2: '#F4F4F4',
    h3: '#F4F4F4',
    buttonText: '#0C0D0E',
    paragraph: '#919191',
    caption: '#919191',
    background: '#0C0D0E',
    primaryTextColor: '#F4F4F4',
    gradientBackgroundTop: '#0E202CD6',
    gradientBackgroundTopSecondary: '#352013FF',
    gradientBackgroundTopTertiary: '#251A14',
    gradientBackgroundBottom: '#3BD0D636',
    outlinedButtonBorderColor: '#F4F4F4',
    // TextInput
    textInputColor: '#F4F4F4',
    textInputBorderColor: '#606060',
    textInputFocusBorderColor: '#F4F4F4',
    progressBarColor: '#F4F4F4',
    progressBarBackgroundColor: '#E7E7E745',
    editTextInputColor: '#BDC1C3',
    floatButtonBackgroundColor: '#6B6B6A',

    // ListItem
    listItemColor: '#161616',
    listItemBorderColor: '#2C2C2C',

    // Avatar
    avartarBorderColor: '#3A4045',
    avartarBadgeDefaultColor: '#D9D9D9',
    // Dashboard
    dashboardCardBackground: '#15151593',
    dashboardCardFilledBackground: '#151515',
    todoScreenTextColor: '#FDDF38',
    todoSelectingItemColor: '#1877F2'
  },
  gradientColors: {
    button: ['#3BD0D6', '#428EC5'],
    cardBorder: ['#71727E', '#161618'],
    journalBorder: ['#14191F', '#FFFFFF'],
    gradientBackgroundTop: ['#428EC5D6','#428EC500', '#428EC500'],
    gradientBottomNav: ['#535456', '#696E75'],
  },
  fonts: configureFonts({config: fontConfig}),
}