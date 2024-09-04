import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    primary: '#42DBF0',
    secondary: '#0C0D0E',
    h1: '#F4F4F4',
    h2: '#F4F4F4',
    h3: '#F4F4F4',
    button: '#0C0D0E',
    paragraph: '#919191',
    caption: '#919191',
    background: '#0C0D0E',
    gradientBackgroundTop: '#0E202CD6',
    gradientBackgroundBottom: '#3BD0D636',
  },
  gradientColors: {
    primary: ['#3BD0D6', '#428EC5'],
    gradientBackgroundTop: ['#428EC5D6','#428EC500', '#428EC500']
  }
}