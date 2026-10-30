import {useEffect, useMemo, useRef, useState} from 'react';
import { NavigationPropsType, Task } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import moment from 'moment';
import { Keyboard } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useTasks, { taskDay } from '../hooks/useTasks';
import useTaskListState from '../hooks/useTaskListState';

export type TaskListProps = {
  tasks: Task[];
};

const useScheduledTaskList = (props: NavigationPropsType) => {
  const { tasks, isLoading } = useTasks();
  const route = useRoute();
  const isJournalRoute = route.name === navigationScreenNames.journal;
  const scrollViewRef = useRef<any>(null);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);

  // Upcoming: today to 7 days ahead. The Journal shows tomorrow only.
  const upcomingTasks = useMemo(() => {
    if (isJournalRoute) {
      const tomorrow = moment().add(1, 'days');
      return tasks.filter(task => taskDay(task).isSame(tomorrow, 'day'));
    }
    const startDate = moment().startOf('day');
    const endDate = moment().add(7, 'days').endOf('day');
    return tasks.filter(task => taskDay(task).isBetween(startDate, endDate, 'day', '[]'));
  }, [tasks, isJournalRoute]);

  const list = useTaskListState(upcomingTasks, {
    initialDay: isJournalRoute ? null : moment().startOf('day'),
    // New tasks added from "tomorrow" in the Journal belong to tomorrow.
    defaultNewTaskDay: () => (isJournalRoute ? moment().add(1, 'days') : moment()),
  });

  const completedTaskList = useMemo(() => tasks.filter(task => task.isCompleted), [tasks]);
  const inCompletedTaskList = useMemo(() => tasks.filter(task => !task.isCompleted), [tasks]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleAddScheduledTask = () => {
    list.handleAddTask();
    // Only not to directly jump on add task in Journal screen
    if (!isJournalRoute) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  };

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
    scheduledTaskList: list.taskList,
    isLoading,
    goBack,
    handleSearch: list.handleSearch,
    toggleScheduleTaskCompletion: list.toggleTaskCompletion,
    handleAddScheduledTask,
    handleEditScheduledTask: list.handleEditTask,
    newScheduledTask: list.newTask,
    setNewScheduledTask: list.setNewTask,
    scrollViewRef,
    isScheduleAdding: list.isAdding,
    handleSaveScheduledTask: list.handleSaveTask,
    handleScheduleCancelEdit: list.handleCancelEdit,
    handleDeleteScheduleTask: list.handleDeleteTask,
    isShowingScheduleCompleted: list.isShowingCompleted,
    handleShowScheduleCompleted: list.handleShowCompleted,
    isSelectedAll: list.isSelectedAll,
    onSelectAllPressed: list.onSelectAllPressed,
    handleCancelSelecting: list.handleCancelSelecting,
    handleToggleSelectItem: list.handleToggleSelectItem,
    isConfirmationModalVisible,
    onDeleteSelectedTaskPressed,
    onConfirmationModalClose,
    removeSelectedTasks,
    completedTaskList,
    inCompletedTaskList,
    filteredTasks: list.filteredTasks,
    handleDateFilter: list.handleDateFilter,
    selectedDate: list.selectedDay?.toDate() ?? null,
  }
}

export default useScheduledTaskList
