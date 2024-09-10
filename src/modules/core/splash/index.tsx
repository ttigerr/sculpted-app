import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MainWrapper from '../components/wrapper/MainWrapper';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {SplashLogo, SplashVector} from 'assets/img';
import {SCREEN_WIDTH, SPLASH_SCREEN_DURATION} from 'src/consts/constants';

interface SplashProps {
  onAnimationFinished: Function;
}

const Splash: React.FC<SplashProps> = ({onAnimationFinished}) => {
  const logoOpacity = useSharedValue(0);
  const vectorOpacity = useSharedValue(0);

  useEffect(() => {
    logoOpacity.value = withTiming(1, {
      duration: SPLASH_SCREEN_DURATION,
      easing: Easing.inOut(Easing.ease),
    });
    vectorOpacity.value = withTiming(1, {
      duration: SPLASH_SCREEN_DURATION,
      easing: Easing.linear,
    });
  }, []);

  return (
    <MainWrapper>
      <View style={styles.container}>
        <Animated.Image
          source={SplashVector}
          style={[styles.coverContainer, {opacity: vectorOpacity}]}
          resizeMode="contain"
        />
        <Animated.Image
          source={SplashLogo}
          style={[styles.logoContainer, {opacity: logoOpacity}]}
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
