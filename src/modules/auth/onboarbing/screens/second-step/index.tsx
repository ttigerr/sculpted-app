import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {
  ProgressBar,
  Separator,
  Text,
  Button,
} from 'src/modules/core/ui-library';
import {RFValue} from 'react-native-responsive-fontsize';
import BackButton from 'src/modules/core/components/back-button';
import {NavigationPropsType} from 'src/utils/types';
import {theme} from 'src/config/theme';
import DatePicker from 'react-native-date-picker';
import LoadingModal from 'src/modules/core/components/loading-modal';
import useOnboardingSecond from './useOnboradingSecond';

const SecondStep = (props: NavigationPropsType) => {

  const {
    date,
    loading,
    setDate,
    goBack,
    onSubmit
  } = useOnboardingSecond(props)

  return (
    <MainWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Separator height={RFValue(20)} />
          <View style={styles.navigationBarContainer}>
            <BackButton style={styles.backButton} onPress={goBack} />
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={1} />
            </View>
          </View>
          <Separator height={RFValue(20)} />
          <View style={styles.contentContainer}>
            <Text variant="h3" style={styles.h3}>
              {'STEP 2/2'}
            </Text>
            <Separator height={RFValue(14)} />
            <Text variant="h1" style={styles.h1}>
              {'Daily Reminder for   journal'}
            </Text>
            <Separator height={RFValue(14)} />
            <Text variant="paragraph2" style={styles.paragraph}>
              {
                'Daily reflection helps you track progress, stay focused, and achieve your self-Development goals. Lets make each day count!'
              }
            </Text>
            <Separator height={RFValue(20)} />
            <DatePicker
              date={date}
              onDateChange={setDate}
              theme="dark"
              mode="date"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={styles.buttonContainer}>
        <Button onPress={onSubmit} label="Save" height={62} buttonFontSize={24}/>
      </SafeAreaView>
      <LoadingModal visible={loading} />
    </MainWrapper>
  );
};

export default SecondStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RFValue(15),
  },
  scrollView: {
    paddingHorizontal: RFValue(16)
  },
  progressBarContainer: {
    width: 167,
  },
  navigationBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(13),
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  contentContainer: {
    alignItems: 'center',
  },
  h3: {
    color: theme.colors.caption,
  },
  h1: {
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: 35,
  },
  paragraph: {
    lineHeight: 16,
    color: theme.colors.caption,
    textAlign: 'center',
  },
  chip: {
    marginRight: 12,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: RFValue(20),
    right: RFValue(16),
    left: RFValue(16),
    backgroundColor: theme.colors.background,
    paddingTop: 30,
  },
});
