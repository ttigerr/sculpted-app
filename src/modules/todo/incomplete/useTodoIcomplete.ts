import React, {useEffect, useRef, useState} from 'react';
import { DayListItem, NavigationPropsType, Task } from 'src/utils/types';
import { VIRTUES_MAX_SELECTION } from 'src/consts/constants';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { tasksListMock } from 'src/consts/arrays';
import moment from 'moment';
import { Alert, Keyboard } from 'react-native';
import { useRoute } from '@react-navigation/native';

export type TaskListProps = {
  tasks: Task[];
};

const useToDoIncomplete = (props: NavigationPropsType) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const startDate = moment().subtract(7, 'days').startOf('day'); // From the past 7 days
  const endDate = moment().endOf('day'); // Today's date
  // Fitler data where is not completed yet
  const [inCompletedTaskList, setInCompletedTaskList] = useState<Task[]>(
    tasksListMock.filter(task => {
      const created = moment(task.creationDate);
      const scheduled = moment(task.scheduledDate);
      return (
        !task.isCompleted &&
        (created.isBetween(startDate, endDate, 'day', '[]') ||
        scheduled.isBetween(startDate, endDate, 'day', '[]'))
      );
    })
  );
  const [filteredTasks, setFilteredTasks] = React.useState(inCompletedTaskList);
  const [selectedDay, setSelectedDay] = React.useState<moment.Moment | null>(moment().startOf('day'));
  const [newTask, setNewTask] = useState<Task | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isShowingCompleted, setIsShowingCompleted] = useState<boolean>(false);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);
  const [allInCompletedTasks, setAllInCompletedTasks] = useState<Task[]>([]);
  const [filteredByDateTasks, setFilteredByDateTasks] = useState<Task[]>([]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });
    
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  // Initially load all Incomplete tasks
  useEffect(() => {
    const tasks = tasksListMock.filter(task => {
      const created = moment(task.creationDate);
      const scheduled = moment(task.scheduledDate);
      return (
        !task.isCompleted &&
        (created.isBetween(startDate, endDate, 'day', '[]') ||
          scheduled.isBetween(startDate, endDate, 'day', '[]'))
      );
    });
    setAllInCompletedTasks(tasks);
  }, []);
  
  // Fitlers tasks by selected day
  useEffect(() => {
    const filtered = allInCompletedTasks.filter(task => {
      const scheduled = moment(task.scheduledDate);
      return scheduled.isSame(selectedDay, 'day');
    });
  
    setFilteredByDateTasks(filtered);
    setFilteredTasks(filtered); // what gets shown
  }, [selectedDay, allInCompletedTasks]);

  // Handles input on search bar
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = tasksListMock.filter(task => {
      const isInDateRange =
        moment(task.creationDate).isBetween(startDate, endDate, 'day', '[]') ||
        moment(task.scheduledDate).isBetween(startDate, endDate, 'day', '[]');
  
      const matchesQuery = task.title.toLowerCase().includes(query.toLowerCase());
  
      return !task.isCompleted && isInDateRange && (!query || matchesQuery);
    });
    setFilteredTasks(filtered);
  };
  

  const toggleTaskCompletion = (taskId: string) => {
    setInCompletedTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleSaveTask = () => {
    if (newTask && newTask.title && newTask.description) {
      setInCompletedTaskList(prevTaskList => [...prevTaskList, newTask]);
      setNewTask(null);
      setIsAdding(false);
    } else {
      Alert.alert("Title and description can't be empty");
    }
  };

  const handleCancelEdit = () => {
    setNewTask(null);
      setIsAdding(false);
  }

  const handleAddTask = () => {
    const tempTask: Task = {
      id: Date.now().toString(),
      creationDate: moment().toDate(),
      title: '',
      description: '',
      isCompleted: false,
      isTemporary: true,
    };
    setNewTask(tempTask);
    setIsAdding(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setInCompletedTaskList(prevTasks =>
      prevTasks.filter(task => task.id !== taskId)
    );
  };

  const handleShowCompleted = (showCompletedOnly: boolean) => {
    if (!showCompletedOnly) {
      setInCompletedTaskList(inCompletedTaskList.filter(task => task.isCompleted));
    } else {
      setInCompletedTaskList(tasksListMock);
    }
    setIsShowingCompleted(!isShowingCompleted);
  };

  const onSelectAllPressed = () => {
    setIsSelectedAll(!isSelectedAll)
    setInCompletedTaskList(inCompletedTaskList.map(task => ({...task, isSelected: true})));
  }

  const handleCancelSelecting = () => {
    setIsSelectedAll(false)
    setInCompletedTaskList(inCompletedTaskList.map(task => ({...task, isSelected: false})));
  }

  const handleToggleSelectItem = (taskId: String, isSelected: boolean) => {
    setInCompletedTaskList(inCompletedTaskList.map((item) =>
      item.id === taskId
        ? { ...item, isSelected: !isSelected}
        : item
    ));
  }

  const handleDateFilter = (day: DayListItem) => {
    if (!day.date) {
      setFilteredTasks(inCompletedTaskList); // "All" selected
      setSelectedDay(null);
    } else {
      const selected = day.date.clone().startOf('day');
      const filtered = inCompletedTaskList.filter(task =>
        moment(task.scheduledDate).isSame(selected, 'day')
      );
      setFilteredTasks(filtered);
      setSelectedDay(selected);
    }
  };

  useEffect(() => {
    if (selectedDay) {
      const filtered = inCompletedTaskList.filter(task =>
        moment(task.scheduledDate).isSame(selectedDay, 'day')
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(inCompletedTaskList);
    }
  }, [inCompletedTaskList, selectedDay]);

  const onDeleteSelectedTaskPressed = () => {
    setIsConfirmationModalVisible(true)
  }

  const onConfirmationModalClose = () => {
    setIsConfirmationModalVisible(false)
  }

  const removeSelectedTasks = (): void => {
    onConfirmationModalClose();
    handleCancelSelecting();
    setInCompletedTaskList(inCompletedTaskList.filter((task) => !task.isSelected));
  };

  const { navigation } = props

  const goBack = () => navigation.goBack();
  return {
    inCompletedTaskList,
    goBack,
    handleSearch,
    toggleTaskCompletion,
    handleAddTask,
    newTask,
    setNewTask,
    scrollViewRef,
    isAdding,
    handleSaveTask,
    handleCancelEdit,
    handleDeleteTask,
    isShowingCompleted,
    handleShowCompleted,
    isSelectedAll,
    onSelectAllPressed,
    handleCancelSelecting,
    handleToggleSelectItem,
    isConfirmationModalVisible,
    onDeleteSelectedTaskPressed,
    onConfirmationModalClose,
    removeSelectedTasks,
    handleDateFilter,
    filteredTasks,
  }
}

export default useToDoIncomplete