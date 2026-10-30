import {useEffect, useMemo, useRef, useState} from 'react';
import { NavigationPropsType, Task } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import moment from 'moment';
import { Keyboard } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useTasks, { completedFirst, taskDay } from '../hooks/useTasks';
import useTaskListState from '../hooks/useTaskListState';

export type TaskListProps = {
  tasks: Task[];
};

const useTaskList = (props: NavigationPropsType) => {
  const { tasks, isLoading } = useTasks();
  const route = useRoute();
  const scrollViewRef = useRef<any>(null);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);

  // Today and the past 7 days
  const recentTasks = useMemo(() => {
    const startDate = moment().subtract(7, 'days').startOf('day');
    const endDate = moment().endOf('day');
    return tasks.filter(task => taskDay(task).isBetween(startDate, endDate, 'day', '[]'));
  }, [tasks]);

  const list = useTaskListState(recentTasks, {
    initialDay: moment().startOf('day'),
    defaultNewTaskDay: () => moment(),
  });

  // Today's tasks only (dashboard, to-do home, journal)
  const todayTaskList = useMemo(
    () => tasks.filter(task => taskDay(task).isSame(moment(), 'day')).sort(completedFirst),
    [tasks],
  );
  const completedTodayTaskList = useMemo(
    () => todayTaskList.filter(task => task.isCompleted),
    [todayTaskList],
  );
  const inCompletedTaskList = useMemo(
    () => recentTasks.filter(task => !task.isCompleted),
    [recentTasks],
  );

  const hasTodayTask = list.filteredTasks.some(task => taskDay(task).isSame(moment(), 'day'));

  const handleAddTask = () => {
    list.handleAddTask();
    // Only not to directly jump on add task in Journal screen
    if (route.name !== navigationScreenNames.journal) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      // scrollViewRef.current?.scrollToEnd({ animated: true });
    });
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const onDeleteSelectedTaskPressed = () => {
    setIsConfirmationModalVisible(true)
  }

  const onConfirmationModalClose = () => {
    setIsConfirmationModalVisible(false)
  }

  // Handles remove all items
  const removeSelectedTasks = () => {
    onConfirmationModalClose();
    list.removeSelectedTasks();
  };

  const { navigation } = props

  const goBack = () => navigation.goBack();
  return {
    taskList: list.taskList,
    isLoading,
    goBack,
    handleSearch: list.handleSearch,
    toggleTaskCompletion: list.toggleTaskCompletion,
    handleAddTask,
    handleEditTask: list.handleEditTask,
    newTask: list.newTask,
    setNewTask: list.setNewTask,
    scrollViewRef,
    isAdding: list.isAdding,
    handleSaveTask: list.handleSaveTask,
    handleCancelEdit: list.handleCancelEdit,
    handleDeleteTask: list.handleDeleteTask,
    isShowingCompleted: list.isShowingCompleted,
    handleShowCompleted: list.handleShowCompleted,
    isSelectedAll: list.isSelectedAll,
    onSelectAllPressed: list.onSelectAllPressed,
    handleCancelSelecting: list.handleCancelSelecting,
    handleToggleSelectItem: list.handleToggleSelectItem,
    isConfirmationModalVisible,
    onDeleteSelectedTaskPressed,
    onConfirmationModalClose,
    removeSelectedTasks,
    inCompletedTaskList,
    handleDateFilter: list.handleDateFilter,
    filteredTasks: list.filteredTasks,
    todayTaskList,
    completedTodayTaskList,
    hasTodayTask,
  }
}

export default useTaskList
