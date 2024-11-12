import {StyleSheet, View, FlatList, ScrollView} from 'react-native';
import React from 'react';
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
      <ScrollView style={styles.container}>
        <View style={styles.navigationBarContainer}>
          <BackButton style={styles.backButton} onPress={goBack} />
          <View style={styles.progressBarContainer}>
            <ProgressBar progress={0.5} />
          </View>
        </View>
        <Separator height={RFValue(32)} />
        <View style={styles.contentContainer}>
          <Text variant="h3" style={styles.h3}>
            {'STEP 1/2'}
          </Text>
          <Text variant="h1" style={styles.h1}>
            {'What are 3 virtues you strive to embody every single day?'}
          </Text>
          <Text variant="paragraph" style={styles.paragraph}>
            {
              'Reflect on your compass daily to ensure you stay true to your values and continuously grow.'
            }
          </Text>
          <Separator height={RFValue(24)} />
          <FlatList
            data={onboardingTenses}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
            ItemSeparatorComponent={() => <Separator width={4} height={12} />}
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
      <View style={styles.buttonContainer}>
        <Button onPress={onSubmit} label="Continue" />
      </View>
      <Toast config={toastConfig} />
    </MainWrapper>
  );
};

export default FirstStep;

const styles = StyleSheet.create({
  container: {
    paddingTop: RFValue(82),
  },
  progressBarContainer: {
    width: RFValue(167),
  },
  navigationBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: RFValue(16),
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  h3: {
    color: theme.colors.caption,
  },
  h1: {
    textAlign: 'center',
    paddingHorizontal: RFValue(16),
    marginBottom: RFValue(16),
  },
  paragraph: {
    color: theme.colors.caption,
    textAlign: 'center',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: theme.colors.background,
    paddingTop: 20,
  },
});
