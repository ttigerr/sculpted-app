import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { tasksListMock } from 'src/consts/arrays';

const useTodoHome = (props: NavigationPropsType) => {

  const { navigation } = props

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
  }
}

export default useTodoHome