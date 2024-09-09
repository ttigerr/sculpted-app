import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainWrapper from '../components/wrapper/MainWrapper';
import Animated from 'react-native-reanimated';
import {SplashLogo, SplashVector} from 'assets/img';
import {SCREEN_WIDTH} from 'src/consts/constants';

const Splash = () => {
  return (
    <MainWrapper>
      <View style={styles.container}>
        <Animated.Image
          source={SplashVector}
          style={styles.coverContainer}
          resizeMode="contain"
        />
        <Animated.Image
          source={SplashLogo}
          style={styles.logoContainer}
          resizeMode="contain"
        />
      </View>
    </MainWrapper>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    width: 180,
    height: undefined,
    aspectRatio: 1,
  },
  coverContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH * 1.1,
    height: undefined,
    aspectRatio: 1,
  },
});
