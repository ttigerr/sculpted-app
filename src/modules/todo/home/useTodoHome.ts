import { NavigationPropsType } from 'src/utils/types';
import { navigationScreenNames } from 'src/utils/navigation-screen-names';
import useScheduledTaskList from '../schedule/useTodoSchedule';
import useTaskList from '../task-list/useTaskList';

const useTodoHome = (props: NavigationPropsType) => {

  const { navigation } = props

  const {inCompletedTaskList, todayTaskList, completedTodayTaskList} = useTaskList(props);
  const {scheduledTaskList} = useScheduledTaskList(props);
  const totalTasks = todayTaskList.length;
  const totalCompletedTodayTaskLists = completedTodayTaskList.length;
  // No tasks today counts as 0%, not NaN
  const completedTaskScore = totalTasks === 0 ? 0 : Math.round(totalCompletedTodayTaskLists * 100 / totalTasks);
  const inCompletedTasks = inCompletedTaskList.length;
  const totalScheduledTasks = scheduledTaskList.length;

  const goBack = () => navigation.goBack();
  const onTaskProgressPress = () => navigation.navigate(navigationScreenNames.todoTaskList)
  // Each screen loads its own tasks from the shared task store.
  const onIncompletePress = () => navigation.navigate(navigationScreenNames.todoIncomplete)
  const onScheduledPress = () => navigation.navigate(navigationScreenNames.todoSchedule)
  return {
    goBack,
    onTaskProgressPress,
    onIncompletePress,
    onScheduledPress,
    totalCompletedTodayTaskLists,
    completedTaskScore,
    inCompletedTasks,
    totalScheduledTasks,
    totalTasks,
  }
}

export default useTodoHome
