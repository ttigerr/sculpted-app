
import { Dimensions, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const IOS = Platform.OS === 'ios';
export const ANDROID = Platform.OS === 'android';
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const REM = SCREEN_WIDTH / 375;


export const SPLASH_SCREEN_DURATION = 2000;

export const VIRTUES_MAX_SELECTION = 3;

export const CARD_BORDER_RADIUS = RFValue(20)