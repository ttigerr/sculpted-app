import * as React from 'react';
import {PaperProvider} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {theme} from '@theme';
import MainWrapper from './modules/core/components/wrapper/MainWrapper';
import {Button, Text, Chip} from 'src/modules/core/ui-library';

const App = () => {
  const [isChipSelected, setIsChipSelected] = React.useState(false);
  return (
    <MainWrapper>
      <View style={styles.container}>
        <Text variant="caption">Sculpted</Text>
        <View style={{height: 60}} />
        <View style={styles.buttonContainer}></View>
        <Chip
          selected={isChipSelected}
          onPress={() => setIsChipSelected(!isChipSelected)}>
          {'Honesty'}
        </Chip>
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
