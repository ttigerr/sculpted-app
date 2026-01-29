import { Platform } from "react-native";
import { configureFonts, MD3LightTheme as DefaultTheme } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";

export const fonts = {
  helveticaNeueMedium: 'HelveticaNeueMedium',
  helveticaNeueRoman: 'HelveticaNeueRoman',
};

const getFont = (fontFamily : string, fontSize : number, lineHeight : number, fontWeight : string, letterSpacing = 0.2, color = '#F4F4F4') => ({
  fontFamily,
  fontSize: fontSize,
  lineHeight: lineHeight,
  fontWeight,
  letterSpacing,
  color,
});

const baseFont = Platform.select({
  web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
  ios: fonts.helveticaNeueRoman,
  android: fonts.helveticaNeueRoman,
  default: fonts.helveticaNeueRoman,
});

const baseFontMedium = Platform.select({
  web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
  ios: fonts.helveticaNeueMedium,
  android: fonts.helveticaNeueMedium,
  default: fonts.helveticaNeueMedium,
});

export const fontConfig = {

  // Header theme
  h1: getFont(baseFontMedium, 32, 32.33, '500', 0),
  h2: getFont(baseFontMedium, 28, 28.33, '500', 0),
  h3: getFont(baseFontMedium, 24, 24.24, '500', 0),
  h4: getFont(baseFontMedium, 20, 24.24, '500', 0),
  h5: getFont(baseFontMedium, 18, 18.18, '500', 0),
  h6: getFont(baseFontMedium, 16, 16.16, '500', 0),
  //h4: getFont(baseFontMedium, 14, 24.24, '500', 0.5),
  // Body theme
  body: getFont(baseFontMedium, 20, 20.09, '400'),
  body1: getFont(baseFontMedium, 18, 18.09, '400'),
  body2: getFont(baseFontMedium, 16, 16.09, '400'),
  body3: getFont(baseFontMedium, 14, 14.09, '400'),
  body4: getFont(baseFontMedium, 12, 12.09, '400'),
  body5: getFont(baseFontMedium, 10, 10.09, '400'),

  // Button theme
  button: getFont(baseFontMedium, 24, 24.09, '400'),

  // General theme
  paragraph: getFont(baseFont, 15, 19.09, '400'),
  paragraph1: getFont(baseFont, 16, 16, '400'),
  paragraph2: getFont(baseFont, 14, 14.10, '400'),

  // Caption
  caption: getFont(baseFontMedium, 12, 12.65, '500', 0, '#F4F4F494'),
  caption1: getFont(baseFontMedium, 16, 16.65, '400', 0, '#F4F4F494'),
  caption2: getFont(baseFontMedium, 14, 14.65, '400', 0, '#F4F4F494'),
  caption3: getFont(baseFontMedium, 12, 12.65, '400', 0, '#F4F4F494'),

  delete: getFont(baseFontMedium, 16, 19.09, '400', 0.2, '#FF505A'),
  greeting: getFont(baseFontMedium, 32, 42.48, '500', 0.5),
  subtitle: getFont(baseFont, 18, 26, '400'),
  //button: getFont(baseFontMedium, 16, 22, '500', 0.3),
  label: getFont(baseFont, 13, 18, '400'),
  overline: getFont(baseFontMedium, 10, 16, '500', 1.5),
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
    buttonText: '#FFFFFF',
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
    progressBarBackgroundColor: '#1F2021',
    editTextInputColor: '#BDC1C3',
    floatButtonBackgroundColor: '#6B6B6A',

    // ListItem
    listItemColor: '#161616',
    listItemBorderColor: '#2C2C2C',

    // Avatar
    avartarBorderColor: '#353637',
    avartarBadgeDefaultColor: '#393D40',
    // Dashboard
    dashboardCardBackground: '#161718',
    dashboardCardFilledBackground: '#151515',
    todoScreenTextColor: '#FDDF38',
    todoSelectingItemColor: '#FDDF389F',
    // Calendar
    calendarPrimaryTextColor: '#FF505A',

    // Compass progress bar
    compassCardBackgroundColor: "#161718",
    virtueColor1: '#FFC3C3',
    virtueColor2: '#FFB080',
    virtueColor3: '#EE4633',

    // Bottom navigation
    bottomNavColor: '#242526'
  },
  gradientColors: {
    button: ['#3BD0D6', '#428EC5'],
    cardBorder: ['#71727E', '#161618'],
    journalBorder: ['#14191F', '#FFFFFF'],
    gradientBackgroundTop: ['#428EC5D6','#428EC500', '#428EC500'],
    gradientBottomNav: ['#242526', '#242526'],
  },
  fonts: configureFonts({config: fontConfig}),
}