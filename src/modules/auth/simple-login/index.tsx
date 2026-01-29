import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  ImageStyle,
  Animated,
} from 'react-native';
import {
  Text,
  CheckBox,
  Link,
  Separator,
  Button,
} from 'src/modules/core/ui-library';
import {NavigationPropsType} from 'src/utils/types';
import useSimpleLogin from './useSimpleLogin';
import {SplashLogo} from 'assets/img';
// import {SplashLogo} from 'assets/img'; // Option 1: Use existing image
// import YourNewImage from 'assets/img/your-new-image.png'; // Option 2: Use local file
import LoadingModal from 'src/modules/core/components/loading-modal';
import {styles} from './index.styles';
import {RFValue} from 'react-native-responsive-fontsize';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';

const SimpleLogin = (props: NavigationPropsType) => {
  const {
    loading,
    handleSignUp,
    handleLogin,
    handleOpenTermUrl,
    handleOpenPrivacyUrl,
  } = useSimpleLogin(props);

  const [termsAccepted, setTermsAccepted] = React.useState(true);

  // Handle the animations
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in first text
    Animated.timing(fadeAnim1, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Fade in second text after delay
    setTimeout(() => {
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1200);
  }, []);


  return (
    <MainWrapper>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContent}>
            {/* App's logo */}
            <Image
              source={SplashLogo}
              style={styles.logo as ImageStyle}
              resizeMode="contain"
            />
            
            <Animated.Text style={{ opacity: fadeAnim1 }}>
              <Text variant="body2">
                <Text variant="body2" style={[styles.bold, {lineHeight: RFValue(17)}]}>{"Start "}</Text>
                <Text variant="paragraph1" style={styles.light}>{"small..."}</Text>
              </Text>
            </Animated.Text>

            <Animated.Text style={[styles.bold, { opacity: fadeAnim2 }]}>
              <Text variant="body2">
                <Text variant="body2" style={[styles.bold, {lineHeight: RFValue(17)}]}>{"Every day "}</Text>
                <Text variant="paragraph1" style={styles.light}>{"count"}</Text>
              </Text>
            </Animated.Text>
          </View>

          {/* Term of service and privacy parts */}
          <View style={styles.termsContainer}>
            <CheckBox
              checked={termsAccepted}
              onPress={() => setTermsAccepted(!termsAccepted)}
            />
            <Text variant="caption" style={styles.termsText}>
              {'By signing up, you agree to our '}
              <Link
                label="Terms of Service"
                onPress={handleOpenTermUrl}
                style={styles.linkText}
              />
              {' and '}
              <Link
                label="Privacy Policy"
                onPress={handleOpenPrivacyUrl}
                style={styles.linkText}
              />
            </Text>
          </View>
          <Separator height={RFValue(20)} />

          {/* Sign up button */}
          <Button
            onPress={handleSignUp}
            label="Sign up"
            height={62}
            disabled={!termsAccepted}
          />
          <Separator height={RFValue(20)} />

          <Text variant="paragraph" style={styles.bottomLink}>
            {'Already have an account? '}
            <Link label="Log in" onPress={handleLogin} style={styles.loginText} />
          </Text>
          <Separator height={RFValue(42)} />

          <LoadingModal visible={loading} />
        </View>
      </SafeAreaView>
    </MainWrapper>
  );
};

export default SimpleLogin;
