import {StyleSheet} from 'react-native';
import {theme} from 'src/config/theme';
import Toast, {BaseToast, BaseToastProps} from 'react-native-toast-message';
import {RFValue} from 'react-native-responsive-fontsize';

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={styles.baseToastContainer}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={styles.text}
      text2Style={styles.text}
    />
  ),
};

const styles = StyleSheet.create({
  baseToastContainer: {
    backgroundColor: theme.colors.background,
    borderLeftWidth: 0,
    borderBottomColor: '#3BD0D6',
    borderBottomWidth: 6,
  },
  text: {
    fontWeight: '600',
    color: theme.colors.h1,
    fontSize: 12,
    textAlign: 'center',
  },
});
