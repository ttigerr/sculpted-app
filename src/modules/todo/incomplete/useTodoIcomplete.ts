import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { NavigationPropsType, Task } from 'src/utils/types';
import moment from 'moment';
import { Keyboard } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useTasks, { taskDay } from '../hooks/useTasks';
import useTaskListState from '../hooks/useTaskListState';

export type TaskListProps = {
  tasks: Task[];
};

const useToDoIncomplete = (props: NavigationPropsType) => {
  const { tasks, isLoading } = useTasks();
  const scrollViewRef = useRef<any>(null);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);
  // Tasks ticked on this screen stay listed (shown ticked) until the user
  // leaves, so a mis-tap can be undone in place.
  const [tickedHereIds, setTickedHereIds] = useState<Set<string>>(new Set());

  useFocusEffect(
    useCallback(() => () => setTickedHereIds(new Set()), []),
  );

  // Not completed yet, from the past 7 days up to today
  const inCompletedTaskList = useMemo(() => {
    const startDate = moment().subtract(7, 'days').startOf('day');
    const endDate = moment().endOf('day');
    return tasks.filter(
      task =>
        (!task.isCompleted || tickedHereIds.has(task.id)) &&
        taskDay(task).isBetween(startDate, endDate, 'day', '[]'),
    );
  }, [tasks, tickedHereIds]);

  const list = useTaskListState(inCompletedTaskList, {
    initialDay: moment().startOf('day'),
    defaultNewTaskDay: () => moment(),
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
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

  const removeSelectedTasks = (): void => {
    onConfirmationModalClose();
    list.removeSelectedTasks();
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTickedHereIds(prev => new Set(prev).add(taskId));
    list.toggleTaskCompletion(taskId);
  };

  const { navigation } = props

  const goBack = () => navigation.goBack();
  return {
    inCompletedTaskList: list.taskList,
    isLoading,
    goBack,
    handleSearch: list.handleSearch,
    toggleTaskCompletion,
    handleAddTask: list.handleAddTask,
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
    handleDateFilter: list.handleDateFilter,
    filteredTasks: list.filteredTasks,
  }
}

export default useToDoIncomplete
