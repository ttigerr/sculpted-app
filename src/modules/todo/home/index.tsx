import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {RFValue} from 'react-native-responsive-fontsize';
import {Separator, Text} from 'src/modules/core/ui-library';
import BackButton from 'src/modules/core/components/back-button';
import {NavigationPropsType} from 'src/utils/types';
import useTodoHome from './useTodoHome';
import {secondaryGradientColorList} from 'src/consts/arrays';
import SearchBar from '../components/search-bar';
import DayPicker from '../components/day-picker';
import TaskProgress from '../components/task-progress';
import TodayTask from '../components/today-task';
import InfoCard from '../components/info-card';
import CompassScore from 'src/modules/compass/components/compass-info-card';

const TodoHome = (props: NavigationPropsType) => {
  const {goBack, onTaskProgressPress} = useTodoHome(props);
  return (
    <MainWrapper colorArray={secondaryGradientColorList}>
      <ScrollView style={styles.container}>
        <View style={styles.navigationBarContainer}>
          <BackButton style={styles.backButton} onPress={goBack} />
          <Text variant="paragraph" style={styles.navigationTitle}>
            {'To-do List'}
          </Text>
        </View>
        <Separator height={RFValue(24)} />
        <SearchBar />
        <Separator height={RFValue(16)} />
        <DayPicker />
        <Separator height={RFValue(16)} />
        <TaskProgress
          date={new Date()}
          completedTasks={30}
          totalTasks={40}
          onPress={onTaskProgressPress}
        />
        <Separator height={RFValue(16)} />
        <View style={styles.cardsContainer}>
          <TodayTask taskCount={30} />
          <Separator width={RFValue(10)} />
          <View style={styles.infoCardsContainer}>
            <InfoCard iconName="schedule" taskCount={5} infoText="Scheduled" />
            <Separator height={RFValue(10)} />
            <InfoCard
              iconName="tick-square"
              taskCount={7}
              infoText="Incomplete"
            />
          </View>
        </View>
        <Separator height={RFValue(30)} />
        <CompassScore />
        <Separator height={RFValue(220)} />
      </ScrollView>
    </MainWrapper>
  );
};

export default TodoHome;

const styles = StyleSheet.create({
  container: {
    paddingTop: RFValue(82),
    paddingHorizontal: RFValue(16),
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
  cardsContainer: {
    flexDirection: 'row',
    height: RFValue(200),
  },
  infoCardsContainer: {
    flex: 1,
  },
});
