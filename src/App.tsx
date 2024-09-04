import * as React from 'react';
import {PaperProvider} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from './config/theme';
import MainWrapper from './modules/core/components/wrapper/MainWrapper';

const App = () => {
  return (
    <MainWrapper>
      <View style={styles.container}>
        <Text style={styles.text}>Sculpted</Text>
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
});
