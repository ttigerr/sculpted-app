import {customText} from 'react-native-paper';
import {fontConfig} from 'src/config/theme';

// Any text style defined in the theme's fontConfig can be used as a variant.
const Text = customText<keyof typeof fontConfig>();

export default Text;
