
import { Dimensions, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const IOS = Platform.OS === 'ios';
export const ANDROID = Platform.OS === 'android';
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const REM = SCREEN_WIDTH / 375;

// Term and condition URL
export const TERM_AND_CONDITION = "https://sculpted.site/investors-glossary/terms-conditions";

// Privacy statement URL
export const PRIVACY_STATEMENT = "https://sculpted.site/investors-glossary/privacy-statement";

export const SPLASH_SCREEN_DURATION = 2000;

export const VIRTUES_MAX_SELECTION = 3;

export const CARD_BORDER_RADIUS = RFValue(20)

export const TOAST_BASE_CONFIG = {
  type: 'success',
  text1: 'Please select exactly 3 virtues to proceed.',
  text2: 'Unselect or add virtues to continue',
  visibilityTime: 2000
}

export const TOAST_SAVE_ERROR_CONFIG = {
  type: 'error',
  text1: "Couldn't save your changes.",
  text2: 'Check your internet connection and try again.',
  visibilityTime: 3000
}

export const TOAST_DELETE_ERROR_CONFIG = {
  type: 'error',
  text1: "Couldn't delete your account.",
  text2: 'Nothing was deleted. Check your internet connection and try again.',
  visibilityTime: 4000
}

export const TOAST_EMAIL_CONFIG = {
  type: 'error',
  text1: 'Error - Failed to complete action',
  text2: 'Please try again',
  visibilityTime: 2000
}

export const FULL_VIRTUE_SCORE = 10;