import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { tasksListMock } from 'src/consts/arrays';
import useScheduledTaskList from '../schedule/useTodoSchedule';
import useTaskList from '../task-list/useTaskList';

const useTodoHome = (props: NavigationPropsType) => {

  const { navigation } = props

  const {taskList, inCompletedTaskList, todayTaskList, completedTodayTaskList} = useTaskList(props);
  const {scheduledTaskList} = useScheduledTaskList(props);
  const totalTasks = todayTaskList.length;
  const totalCompletedTodayTaskLists = completedTodayTaskList.length;
  const completedTaskScore = Math.round(completedTodayTaskList.length * 100 / totalTasks);
  const inCompletedTasks = inCompletedTaskList.length;
  const totalScheduledTasks = scheduledTaskList.length;

  const goBack = () => navigation.goBack();
  const onTaskProgressPress = () => navigation.navigate(navigationScreenNames.todoTaskList)
  const onIncompletePress = () => {
    const incompleteTasks = tasksListMock.filter(task => !task.isCompleted);
    navigation.navigate(navigationScreenNames.todoIncomplete, {
    taskList: incompleteTasks
  })
}
  const onScheduledPress = () => {
    const scheduledTasks = tasksListMock.filter(task => new Date(task.scheduledDate) >= new Date());
    navigation.navigate(navigationScreenNames.todoSchedule, {
      taskList: scheduledTasks
    })
  }
  return {
    goBack,
    onTaskProgressPress,
    onIncompletePress,
    onScheduledPress,
    totalCompletedTodayTaskLists,
    completedTaskScore,
    inCompletedTasks,
    totalScheduledTasks,
    totalTasks,
  }
}

export default useTodoHome