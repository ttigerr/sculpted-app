import {StyleSheet, View} from 'react-native';
import {theme} from 'src/config/theme';
import Toast, {BaseToast, BaseToastProps} from 'react-native-toast-message';
import {RFValue} from 'react-native-responsive-fontsize';
import {BlurView} from '@react-native-community/blur';

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <View style={styles.container}>
      <BaseToast
        {...props}
        style={styles.baseToastContainer}
        contentContainerStyle={{paddingHorizontal: 28, alignItems: 'center', justifyContent: 'center'}}
        text1Style={styles.text}
        text2Style={styles.text}
      />
    </View>
  ),
  error: (props: BaseToastProps) => (
    <View style={styles.container}>
      <BaseToast
        {...props}
        style={styles.errorToastContainer}
        contentContainerStyle={{paddingHorizontal: 28, alignItems: 'center', justifyContent: 'center'}}
        text1Style={styles.text}
        text2Style={styles.text}
      />
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: RFValue(16)
  },
  baseToastContainer: {
    backgroundColor: "#1A1A1A",
    borderLeftWidth: 0,
    borderBottomColor: '#3BD0D6',
    borderBottomWidth: 6,
    height: 100,
    width: '100%',
    borderRadius: 14,
  },
  text: {
    fontWeight: '500',
    color: theme.colors.h1,
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  errorToastContainer: {
    backgroundColor: "#1A1A1A",
    borderLeftWidth: 0,
    borderBottomColor: '#FF505A',
    borderBottomWidth: 6,
    height: 100,
    width: '100%',
    borderRadius: 14,
  },
});
