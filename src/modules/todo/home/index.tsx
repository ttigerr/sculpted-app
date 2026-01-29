import {StyleSheet, ScrollView, View, SafeAreaView} from 'react-native';
import React from 'react';
import MainWrapper from 'src/modules/core/components/wrapper/MainWrapper';
import {RFValue} from 'react-native-responsive-fontsize';
import {Separator, Text} from 'src/modules/core/ui-library';
import BackButton from 'src/modules/core/components/back-button';
import {NavigationPropsType} from 'src/utils/types';
import useTodoHome from './useTodoHome';
import {secondaryGradientColorList} from 'src/consts/arrays';
import TaskProgress from '../components/task-progress';
import TodayTask from '../components/today-task';
import InfoCard from '../components/info-card';
import useTaskList from '../task-list/useTaskList';
import useScheduledTaskList from '../schedule/useTodoSchedule';

const TodoHome = (props: NavigationPropsType) => {

  const {
    goBack, 
    onTaskProgressPress, 
    onIncompletePress, 
    onScheduledPress,
    totalCompletedTodayTaskLists,
    completedTaskScore,
    inCompletedTasks,
    totalScheduledTasks,
    totalTasks,
  } = useTodoHome(props);
  
  return (
    <MainWrapper colorArray={secondaryGradientColorList}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Separator height={RFValue(20)}/>

          {/* Top navigation */}
          <View style={styles.navigationBarContainer}>
            <BackButton style={styles.backButton} onPress={goBack} />
            <Text variant="h6">
              {'To-do List'}
            </Text>
          </View>
          <Separator height={RFValue(20)} />
          
          {/* Task progress */}
          <TaskProgress date={new Date()} completedTasks={totalCompletedTodayTaskLists} completedPercent={completedTaskScore} totalTasks={totalTasks} />
          <Separator height={RFValue(12)} />
          <View style={styles.cardsContainer}>
            <View style={{flex: 1}}>
              <TodayTask taskCount={totalCompletedTodayTaskLists} onPress={onTaskProgressPress}/>
            </View>
            <Separator width={RFValue(7)} />
            <View style={styles.infoCardsContainer}>
              <InfoCard
                iconName="tick-square"
                taskCount={inCompletedTasks}
                infoText="Incomplete"
                onPress={onIncompletePress}
              />
              <Separator height={RFValue(7)} />
              <InfoCard
                iconName="schedule"
                taskCount={totalScheduledTasks}
                infoText="Scheduled"
                onPress={onScheduledPress}
              />
            </View>
          </View>
          <Separator height={RFValue(220)} />
        </ScrollView>
      </SafeAreaView>
    </MainWrapper>
  );
};

export default TodoHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RFValue(15),
  },
  scrollView: {
    marginHorizontal: RFValue(16),
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
    // height: RFValue(200),
  },
  infoCardsContainer: {
    flex: 1,
  },
  navigationTitle: {
    fontSize: 16,
    fontWeight: '500'
  }
});
