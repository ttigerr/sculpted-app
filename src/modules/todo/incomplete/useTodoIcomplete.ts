import React, {useState} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { VIRTUES_MAX_SELECTION } from 'src/consts/constants';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { Task } from 'src/utils/types';
import moment from 'moment';

interface GroupedTasks {
  [key: string]: Task[];
}

const useTodoIncomplete = (props: NavigationPropsType) => {

  const { navigation, route } = props
  const taskListParams = route.params.taskList
  const [taskList, setTaskList] = useState<Task[]>(taskListParams)

  const goBack = () => navigation.goBack();

  const groupTasksByDate = (tasks: Task[]): GroupedTasks => {
    return tasks.reduce((acc: GroupedTasks, task) => {
      const dateKey = moment(task.creationDate).calendar(null, {
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastWeek: 'ddd DD MMM YYYY',
        sameElse: 'ddd DD MMM YYYY',
      });
  
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(task);  
      return acc;
    }, {});
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return {
    goBack,
    taskList,
    groupTasksByDate,
    toggleTaskCompletion
  }
}

export default useTodoIncomplete