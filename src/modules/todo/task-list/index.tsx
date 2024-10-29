import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {RFValue} from 'react-native-responsive-fontsize';
import {Separator, Text} from 'src/modules/core/ui-library';
import BackButton from 'src/modules/core/components/back-button';
import {NavigationPropsType} from 'src/utils/types';
import {secondaryGradientColorList} from 'src/consts/arrays';
import SearchBar from '../components/search-bar';
import DayPicker from '../components/day-picker';
import TaskProgress from '../components/task-progress';
import TodayTask from '../components/today-task';
import InfoCard from '../components/info-card';
import TaskList from '../components/task-list';

const tasks = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Sculpted App',
    isCompleted: true,
  },
  {
    id: '2',
    title: 'Training',
    description: '• 5km Run\n• Swimming\n... more',
    isCompleted: false,
  },
  {
    id: '3',
    title: 'Training',
    description: 'Upper Body Strength',
    isCompleted: false,
  },
  {
    id: '4',
    title: 'Research',
    description: 'How to grow users to 200,000+ Downloads',
    isCompleted: false,
  },
];

const TodoTaskList = () => {
  return (
    <MainWrapper colorArray={secondaryGradientColorList}>
      <ScrollView style={styles.container}>
        <View style={styles.navigationBarContainer}>
          <BackButton style={styles.backButton} onPress={() => {}} />
          <Text variant="paragraph">{'Today’s Task'}</Text>
        </View>
        <Separator height={RFValue(24)} />
        <SearchBar />
        <Separator height={RFValue(16)} />
        <DayPicker />
        <Separator height={RFValue(16)} />
        <TaskList tasks={tasks} onTaskPress={task => console.log(task)} />
        <Separator height={RFValue(220)} />
      </ScrollView>
    </MainWrapper>
  );
};

export default TodoTaskList;

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
