import React, {useEffect, useMemo, useRef, useState} from 'react';
import { DayListItem, NavigationPropsType, Task } from 'src/utils/types';
import { VIRTUES_MAX_SELECTION } from 'src/consts/constants';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { tasksListMock } from 'src/consts/arrays';
import moment from 'moment';
import { Alert, Keyboard } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TaskListProps = {
  tasks: Task[];
};

const useTaskList = (props: NavigationPropsType) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toDoListData, setToDoListData] = useState([]);
  const startDate = moment().subtract(7, 'days').startOf('day'); // From the past 7 days
  const endDate = moment().endOf('day'); // Today's date

   // Load compass data from AsyncStorage
   useEffect(() => {
    const fetchData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('toDoList');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                if (Array.isArray(parsedData)) {
                    setToDoListData(parsedData);
                } else if (parsedData?.compass) {
                    setToDoListData(parsedData.compass);
                } else {
                    setToDoListData([]);
                }
            } else {
              setToDoListData([]);
            }
        } catch (error) {
          console.error('Error fetching compass data:', error);
          setToDoListData([]);
    }};
    fetchData(); 
    console.log("Here is", toDoListData)
  }, []);

  // Filters only today and last 7 days
  const [taskList, setTaskList] = useState<Task[]>(
    tasksListMock
      .filter(task => {
        const created = moment(task.creationDate);
        const scheduled = moment(task.scheduledDate);
        return (
          created.isBetween(startDate, endDate, 'day', '[]') ||
          scheduled.isBetween(startDate, endDate, 'day', '[]')
        );
      })

      // Rearrange task orders
      .sort((a, b) => {
        if (a.isCompleted === b.isCompleted) return 0;
        return a.isCompleted ? -1 : 1; // Completed goes on top
      })
  );

  // Filters only today's task
  const todayTaskList = useMemo(() => {
    const today = moment().startOf('day');
  
    return tasksListMock
      .filter(
        task => moment(task.creationDate).isSame(today, 'day') || moment(task.scheduledDate).isSame(today, 'day')
      )
      .sort((a, b) => {
        if (a.isCompleted === b.isCompleted) return 0;
        return a.isCompleted ? -1 : 1;
      });
  }, [tasksListMock]); // Add other dependencies if needed
  

  const [completedTodayTaskList, setCompletedtodayTaskList] = useState<Task[]>(
    tasksListMock.filter(
      task => task.isCompleted && 
        moment(task.creationDate).isSame(moment(), 'day')
    )
  ); 

  const [filteredTasks, setFilteredTasks] = useState(taskList);
  const [selectedDay, setSelectedDay] = useState<moment.Moment | null>(moment().startOf('day'));
  
  const hasTodayTask = filteredTasks.some(task =>
    moment(task.creationDate).isSame(moment(), 'day') ||
    moment(task.scheduledDate).isSame(moment(), 'day')
  );
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
  const [newTask, setNewTask] = useState<Task | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isShowingCompleted, setIsShowingCompleted] = useState<boolean>(false);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);
  const scrollViewRef = useRef(null);
  const route = useRoute();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      // scrollViewRef.current?.scrollToEnd({ animated: true });
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
  

  const toggleTaskCompletion = (taskId: string) => {
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleSaveTask = () => {
    if (newTask && newTask.title && newTask.description) {
      setTaskList(prevTaskList => [...prevTaskList, newTask]);
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
    
    // Only not to directly jump on add task in Journal screen
    if (route.name !== navigationScreenNames.journal) {
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }
      }, 300);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskList(prevTasks =>
      prevTasks.filter(task => task.id !== taskId)
    );
  };

  const handleShowCompleted = (showCompletedOnly: boolean) => {
    if (!showCompletedOnly) {
      setTaskList(taskList.filter(task => task.isCompleted));
    } else {
      setTaskList(tasksListMock);
    }
    setIsShowingCompleted(!isShowingCompleted);
  };

  const onSelectAllPressed = () => {
    setIsSelectedAll(!isSelectedAll)
    setTaskList(taskList.map(task => ({...task, isSelected: true})));
  }

  const handleCancelSelecting = () => {
    setIsSelectedAll(false)
    setTaskList(taskList.map(task => ({...task, isSelected: false})));
  }

  const handleToggleSelectItem = (taskId: String, isSelected: boolean) => {
    setTaskList(taskList.map((item) =>
      item.id === taskId
        ? { ...item, isSelected: !isSelected}
        : item
    ));
  }

  const handleDateFilter = (dayItem: DayListItem) => {
    if (!dayItem.date) {
        setFilteredTasks(taskList); // "All" selected
        setSelectedDay(null);
    } else {
      const selected = dayItem.date.clone().startOf('day');
      const filtered = taskList.filter(task =>
        moment(task.scheduledDate).isSame(selected, 'day')
      );
      setFilteredTasks(filtered);
      setSelectedDay(selected);
    }
  };

  useEffect(() => {
    if (selectedDay) {
      const filtered = taskList.filter(task =>
        moment(task.scheduledDate).isSame(selectedDay, 'day')
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(taskList);
    }
  }, [taskList, selectedDay]);
  
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
  
    const updatedList = taskList.filter(task => {
      const isSelected = task.isSelected;

      // If no selectedDay, delete from all dates
      const isSameDate = selectedDay ? moment(task.scheduledDate).isSame(selectedDay, 'day') : true;
      return !(isSelected && isSameDate);
    });
  
    setTaskList(updatedList);
  
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
    taskList,
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
    inCompletedTaskList,
    handleDateFilter,
    filteredTasks,
    todayTaskList,
    completedTodayTaskList,
    hasTodayTask,
  }
}

export default useTaskList