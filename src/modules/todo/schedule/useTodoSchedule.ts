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

const useScheduledTaskList = (props: NavigationPropsType) => {
  
  const route = useRoute();
  const startDate = moment(); // Today's date
  const endDate = moment().add(7, 'days').endOf('day');
  const endTomorrowDate = moment().add(1, 'days').endOf('day'); // The end of next 7 days ahead
  const [scheduledTaskList, setScheduledTaskList] = useState<Task[]>(() => {
    const isJournalRoute = route.name === navigationScreenNames.journal;
    const filteredTasks = tasksListMock.filter(task => {
      const created = moment(task.creationDate);
      const scheduled = moment(task.scheduledDate);
  
      // To filter Journal's day
      if (!isJournalRoute) {
        return (
          created.isBetween(startDate, endDate, 'day', '[]') &&
          scheduled.isBetween(startDate, endDate, 'day', '[]')
        );
      } else {
        return (
          created.isSame(endTomorrowDate, 'day') &&
          scheduled.isSame(endTomorrowDate, 'day')
        );
      }
    });
  
    // Single sort call
    return filteredTasks.sort((a, b) => {
      if (a.isCompleted === b.isCompleted) return 0;
      return a.isCompleted ? -1 : 1; // Completed goes on top
    });
  });
  
  const [filteredTasks, setFilteredTasks] = useState(scheduledTaskList);
  const [selectedDay, setSelectedDay] = useState<moment.Moment | null>(moment().startOf('day'));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [completedTaskList, setCompletedTaskList] = useState<Task[]>(tasksListMock.filter(task => task.isCompleted)); 
  const [inCompletedTaskList, setInCompletedTaskList] = useState<Task[]>(tasksListMock.filter(task => !task.isCompleted)); 
  const [newScheduledTask, setNewScheduledTask] = useState<Task | null>(null);
  const [isScheduleAdding, setIsScheduleAdding] = useState<boolean>(false);
  const [isShowingScheduleCompleted, setIsShowingScheduleCompleted] = useState<boolean>(false);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });
    
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = tasksListMock.filter(task => {
      const isInDateRange =
        moment(task.creationDate).isBetween(startDate, endDate, 'day', '[]') ||
        moment(task.scheduledDate).isBetween(startDate, endDate, 'day', '[]');
  
      const matchesQuery = task.title.toLowerCase().includes(query.toLowerCase());
  
      return isInDateRange && (!query || matchesQuery);
    });
    
    setFilteredTasks(filtered);
  };

  const toggleScheduleTaskCompletion = (taskId: string) => {
    setScheduledTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleSaveScheduledTask = () => {
    if (newScheduledTask && newScheduledTask.title && newScheduledTask.description) {
      setScheduledTaskList(prevTaskList => [...prevTaskList, newScheduledTask]);
      setNewScheduledTask(null);
      setIsScheduleAdding(false);
      console.log("You save the schedule tasks")
    } else {
      Alert.alert("Title and description can't be empty");
    }
  };

  const handleScheduleCancelEdit = () => {
    setNewScheduledTask(null);
      setIsScheduleAdding(false);
  }

  const handleAddScheduledTask = () => {
    const tempTask: Task = {
      id: Date.now().toString(),
      creationDate: moment().toDate(),
      scheduledDate: selectedDay ? selectedDay.toDate() : moment().toDate(),
      title: '',
      description: '',
      isCompleted: false,
      isTemporary: true,
    };
    setNewScheduledTask(tempTask);
    setIsScheduleAdding(true);
    // Only not to directly jump on add task in Journal screen
    {
      route.name !== navigationScreenNames.journal && setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  };

  const handleDeleteScheduleTask = (taskId: string) => {
    setScheduledTaskList(prevTasks =>
      prevTasks.filter(task => task.id !== taskId)
    );
  };

  const handleShowScheduleCompleted = (showCompletedOnly: boolean) => {
    if (!showCompletedOnly) {
      setScheduledTaskList(scheduledTaskList.filter(task => task.isCompleted));
    } else {
      setScheduledTaskList(tasksListMock);
    }
    setIsShowingScheduleCompleted(!isShowingScheduleCompleted);
  };

  const onSelectAllPressed = () => {
    setIsSelectedAll(!isSelectedAll)
    setScheduledTaskList(scheduledTaskList.map(task => ({...task, isSelected: true})));
  }

  const handleCancelSelecting = () => {
    setIsSelectedAll(false)
    setScheduledTaskList(scheduledTaskList.map(task => ({...task, isSelected: false})));
  }

  const handleToggleSelectItem = (taskId: String, isSelected: boolean) => {
    setScheduledTaskList(scheduledTaskList.map((item) =>
      item.id === taskId
        ? { ...item, isSelected: !isSelected}
        : item
    ));
  }

  const handleDateFilter = (day: DayListItem) => {
    if (!day.date) {
      setFilteredTasks(scheduledTaskList); // "All" selected
      setSelectedDay(null);
    } else {
      const selected = day.date.clone().startOf('day');
      const filtered = scheduledTaskList.filter(task =>
        task.scheduledDate && moment(task.scheduledDate).isSame(selected, 'day')
      );
      setFilteredTasks(filtered);
      setSelectedDay(selected);
    }
  };

  useEffect(() => {
    if (selectedDay) {
      const filtered = scheduledTaskList.filter(task =>
        moment(task.scheduledDate).isSame(selectedDay, 'day')
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(scheduledTaskList);
    }
  }, [scheduledTaskList, selectedDay]);
  

  const onDeleteSelectedTaskPressed = () => {
    setIsConfirmationModalVisible(true)
  }

  const onConfirmationModalClose = () => {
    setIsConfirmationModalVisible(false)
  }

  // Handles remove all items
  const removeSelectedTasks = () => {
    onConfirmationModalClose();
    handleCancelSelecting();
  
    const updatedList = scheduledTaskList.filter(task => {
      const isSelected = task.isSelected;

      // If no selectedDay, delete from all dates
      const isSameDate = selectedDay ? moment(task.scheduledDate).isSame(selectedDay, 'day') : true;
      return !(isSelected && isSameDate);
    });
  
    setScheduledTaskList(updatedList);
  
    // Filters based on selectedDay (or show all if null)
  const filtered = selectedDay
    ? updatedList.filter(task =>
        moment(task.scheduledDate).isSame(selectedDay, 'day')
      )
    : updatedList;
    setFilteredTasks(filtered);
  };

  const { navigation } = props

  const goBack = () => navigation.goBack();
  return {
    scheduledTaskList,
    goBack,
    handleSearch,
    toggleScheduleTaskCompletion,
    handleAddScheduledTask,
    newScheduledTask,
    setNewScheduledTask,
    scrollViewRef,
    isScheduleAdding,
    handleSaveScheduledTask,
    handleScheduleCancelEdit,
    handleDeleteScheduleTask,
    isShowingScheduleCompleted,
    handleShowScheduleCompleted,
    isSelectedAll,
    onSelectAllPressed,
    handleCancelSelecting,
    handleToggleSelectItem,
    isConfirmationModalVisible,
    onDeleteSelectedTaskPressed,
    onConfirmationModalClose,
    removeSelectedTasks,
    completedTaskList,
    inCompletedTaskList,
    filteredTasks,
    handleDateFilter,
    selectedDate,
  }
}

export default useScheduledTaskList