import React, {useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {theme} from '@theme';
import MainNavigation from './navigation/main-navigation';
import Splash from './modules/core/splash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as ReduxProvider} from 'react-redux';
import {store, persistor} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <Splash onAnimationFinished={() => setShowSplash(false)} />;
  }

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider theme={theme}>
          <GestureHandlerRootView style={{flex: 1}}>
            <MainNavigation />
          </GestureHandlerRootView>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
