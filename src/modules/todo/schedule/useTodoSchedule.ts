import React, {useState, useEffect} from 'react';
import { NavigationPropsType } from 'src/utils/types';
import { VIRTUES_MAX_SELECTION } from 'src/consts/constants';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import { Task, DayListItem } from 'src/utils/types';
import moment from 'moment';

interface GroupedTasks {
  [key: string]: Task[];
}

const useTodoSchedule = (props: NavigationPropsType) => {

  const { navigation, route } = props
  const taskListParams = route.params.taskList
  const [taskList, setTaskList] = useState<Task[]>(taskListParams)
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    console.log(taskListParams.length)
  }, [])

  const goBack = () => navigation.goBack();

  const groupTasksByDate = (tasks: Task[]): GroupedTasks => {
    return tasks.reduce((acc: GroupedTasks, task) => {
      const taskDate = moment(task.scheduledDate).startOf('day');

      const tomorrow = moment().add(1, 'day').startOf('day');
      if (taskDate.isBefore(tomorrow)) {
        return acc;
      }

      const dateKey = taskDate.calendar(null, {
        nextDay: '[Tomorrow]',
        nextWeek: 'DD MMM YYYY',
        sameElse: 'DD MMM YYYY',
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filteredTasks = taskListParams.filter((task: Task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      );
      setTaskList(filteredTasks);
    } else {
      setTaskList(taskListParams);
    }
  };

  const handleDayPress = (day: DayListItem) => {
    let filteredTasks;
    if(day.title == 'All') {
      filteredTasks = taskListParams
    } else {
      filteredTasks = taskListParams.filter((task: Task) => 
        moment(task.scheduledDate).isSame(day.date, 'day')
      );
    }
    setTaskList(filteredTasks);
  }

  const removeTaskById = (taskId: string) => {
    setTaskList((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  };

  return {
    goBack,
    taskList,
    groupTasksByDate,
    toggleTaskCompletion,
    handleSearch,
    handleDayPress,
    removeTaskById
  }
}

export default useTodoSchedule