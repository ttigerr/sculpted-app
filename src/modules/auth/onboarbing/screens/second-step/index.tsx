import {StyleSheet, View, FlatList, ScrollView} from 'react-native';
import React, {useState} from 'react';
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
import DatePicker from 'react-native-date-picker';
import {navigationScreenNames} from 'src/utils/navigation-screen-names';

type ItemProps = {label: string; selected: boolean};
const FirstStep = (props: NavigationPropsType) => {
  const [date, setDate] = useState(new Date());
  const goBack = () => props.navigation.goBack();
  const ChipComponent: React.FC<ItemProps> = ({label, selected}) => {
    return (
      <Chip selected={selected} style={styles.chip}>
        {label}
      </Chip>
    );
  };
  const onSubmit = () => {
    props.navigation.navigate(navigationScreenNames.bottomNavigation);
  };
  return (
    <MainWrapper>
      <ScrollView style={styles.container}>
        <View style={styles.navigationBarContainer}>
          <BackButton style={styles.backButton} onPress={goBack} />
          <View style={styles.progressBarContainer}>
            <ProgressBar progress={1} />
          </View>
        </View>
        <Separator height={RFValue(32)} />
        <View style={styles.contentContainer}>
          <Text variant="h3" style={styles.h3}>
            {'STEP 2/2'}
          </Text>
          <Text variant="h1" style={styles.h1}>
            {'Daily Reminder for journal'}
          </Text>
          <Text variant="paragraph" style={styles.paragraph}>
            {
              'Daily reflection helps you track progress, stay focused, and achieve your self-Development goals. Lets make each day count!'
            }
          </Text>
          <Separator height={RFValue(24)} />
          <DatePicker
            date={date}
            onDateChange={setDate}
            theme="dark"
            mode="time"
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button onPress={onSubmit} label="Save" />
      </View>
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
  chip: {
    marginRight: 12,
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
