import {StyleSheet} from 'react-native';
import {theme} from 'src/config/theme';
import {RFValue} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RFValue(20),
    //marginHorizontal: RFValue(16),
  },
  content: {
    flex:1,
    paddingHorizontal: RFValue(16),
  },
  logoContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: RFValue(82),
    height: RFValue(64),
    marginBottom: RFValue(20)
  },
  termsContainer: {
    flexDirection: 'row', 
    alignItems: 'flex-start'
  },
  termsText: {
    flex: 1, 
    fontSize: 12
  },
  linkText: {
    textDecorationLine: 'none', 
    fontSize: 12,
  },
  loginText: {
    fontSize: 16
  },
  bottomLink: {
    fontSize: 16,
    alignSelf: 'center',
    color: theme.colors.caption,
  },
  boldText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  lightText: {
    letterSpacing: 0.16,
    color: '#555',
  },
  bold: {
    fontSize: RFValue(16),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  light: {
    fontSize: RFValue(16),
    fontWeight: '200',
  }
});
