import * as React from 'react';
import {PaperProvider} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {theme} from '@theme';
import MainWrapper from './modules/core/components/wrapper/MainWrapper';
import {Button, Text} from '@ui-library';

const App = () => {
  return (
    <MainWrapper>
      <View style={styles.container}>
        <Text variant="caption">Sculpted</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={() => console.log('Hola')} label="Pressme" />
        </View>
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
