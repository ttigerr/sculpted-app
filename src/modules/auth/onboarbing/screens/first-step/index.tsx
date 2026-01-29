import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {
  ProgressBar,
  Separator,
  Text,
  Chip,
  Button,
} from 'src/modules/core/ui-library';
import {RFValue} from 'react-native-responsive-fontsize';
import BackButton from 'src/modules/core/components/back-button';
import {NavigationPropsType} from 'src/utils/types';
import {theme} from 'src/config/theme';
import {onboardingTenses} from 'src/consts/arrays';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';
import useOnboardingFirstStep from './useOnboardingFirst';
import SkillsChip from '../../components/skills-chip';
import Toast from 'react-native-toast-message';
import {toastConfig} from 'src/modules/core/ui-library/components/toast';

const FirstStep = (props: NavigationPropsType) => {
  const {goBack, toggleChip, selectedChips, onSubmit} =
    useOnboardingFirstStep(props);

  return (
    <MainWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Separator height={RFValue(20)} />
          <View style={styles.navigationBarContainer}>
            <BackButton style={styles.backButton} onPress={goBack} />
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={0.5} />
            </View>
          </View>
          <Separator height={RFValue(20)} />
          <View style={styles.contentContainer}>
            <Text variant="h3" style={styles.h3}>
              {'STEP 1/2'}
            </Text>
            <Separator height={RFValue(14)} />
            <Text variant="h1" style={styles.titleText}>
              {'What are 3 virtues you strive to embody every single day?'}
            </Text>
            <Separator height={RFValue(14)} />
            <Text variant="paragraph" style={styles.paragraph}>
              {
                'Reflect on your compass daily to ensure you stay true to your values and continuously grow.'
              }
            </Text>
            <Separator height={RFValue(20)} />
            <FlatList
              data={onboardingTenses}
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
              ItemSeparatorComponent={() => <Separator width={RFValue(7)} height={RFValue(7)} />}
              renderItem={({item}) => (
                <SkillsChip
                  label={item}
                  selected={selectedChips.includes(item)}
                  onPress={() => toggleChip(item)}
                />
              )}
              ListFooterComponent={() => <Separator height={RFValue(180)} />}
            />
          </View>
          <Separator height={RFValue(100)} />
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={styles.buttonContainer}>
        <Button 
          onPress={onSubmit} 
          label="Continue" 
          height={62} 
          buttonFontSize={24}
        />
      </SafeAreaView>
      <Toast config={toastConfig} />
    </MainWrapper>
  );
};

export default FirstStep;

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
    alignItems: 'center'
  },
  h3: {
    color: theme.colors.caption,
  },
  titleText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    letterSpacing: 0.56,
    lineHeight: 35,
  },
  paragraph: {
    color: theme.colors.caption,
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: RFValue(0.28),
    textTransform: 'capitalize',
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
