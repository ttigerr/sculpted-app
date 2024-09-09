import * as React from 'react';
import {PaperProvider} from 'react-native-paper';
import {StyleSheet, View,Text} from 'react-native';
import {theme} from '@theme';
import MainWrapper from './modules/core/components/wrapper/MainWrapper';
import i18next from './config/lang/useLocalization';

const App = () => {
  const [isChipSelected, setIsChipSelected] = React.useState(false);
  return (
    <MainWrapper>
      <View style={styles.container}>
        <Text style={styles.text}>{i18next.t('ns:app-name')}</Text>
      </View>
    </MainWrapper>
  );
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#F4F4F4',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
