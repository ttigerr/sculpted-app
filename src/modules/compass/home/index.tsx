import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {RFValue} from 'react-native-responsive-fontsize';
import {Separator, Text} from 'src/modules/core/ui-library';
import BackButton from 'src/modules/core/components/back-button';
import {NavigationPropsType} from 'src/utils/types';
import {
  secondaryGradientColorList,
  tertiaryGradientColorList,
} from 'src/consts/arrays';
import DayPicker from 'src/modules/todo/components/day-picker';
import CompassScore from '../components/compass-info-card';
import CompassItem from '../components/compass-item-card';

const CompassHome = (props: NavigationPropsType) => {
  const scrollViewRef = useRef(null);
  const {navigation} = props;
  const VIRTUE_ITEM = [
    {
      id: 1,
      name: 'Professionalism',
    },
    {
      id: 2,
      name: 'Dedication',
    },
    {
      id: 3,
      name: 'Effort',
    },
  ];
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        scrollViewRef.current?.scrollTo({y: 260, animated: true});
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <MainWrapper colorArray={tertiaryGradientColorList}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView style={styles.container} ref={scrollViewRef}>
          <View style={styles.navigationBarContainer}>
            <BackButton
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            />
            <Text variant="paragraph">{'Compass'}</Text>
          </View>
          <Separator height={RFValue(24)} />
          <DayPicker onItemPressed={() => {}} behindDays />
          <Separator height={RFValue(24)} />
          <CompassScore />
          <Separator height={RFValue(24)} />
          <Text variant="h3">{'Virtues'}</Text>
          <Separator height={RFValue(24)} />
          {VIRTUE_ITEM.map(virtue => (
            <CompassItem name={virtue.name} />
          ))}
          <Separator height={RFValue(220)} />
        </ScrollView>
      </KeyboardAvoidingView>
    </MainWrapper>
  );
};

export default CompassHome;

const styles = StyleSheet.create({
  container: {
    paddingTop: RFValue(82),
    paddingHorizontal: RFValue(16),
    flex: 1,
  },
  navigationBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: RFValue(0),
  },
  infoCardsContainer: {
    flex: 1,
  },
});
