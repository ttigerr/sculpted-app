import React, {useEffect, useRef, useState} from 'react';
import { NavigationPropsType, Task } from 'src/utils/types';
import { VIRTUES_MAX_SELECTION } from 'src/consts/constants';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { tasksListMock } from 'src/consts/arrays';
import moment from 'moment';
import { Alert, Keyboard } from 'react-native';

export type TaskListProps = {
  tasks: Task[];
};

const useTaskList = (props: NavigationPropsType) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [taskList, setTaskList] = useState<Task[]>(tasksListMock);
  const [filteredTaskList, setFilteredTaskList] = useState<Task[]>(tasksListMock);
  const [newTask, setNewTask] = useState<Task | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isShowingCompleted, setIsShowingCompleted] = useState<boolean>(false);
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
    if (query) {
      const filteredTasks = tasksListMock.filter(task =>
        task.title.toLowerCase().includes(query.toLowerCase())
      );
      setTaskList(filteredTasks);
    } else {
      setTaskList(tasksListMock);
    }
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
    handleShowCompleted
  }
}

export default useTaskList