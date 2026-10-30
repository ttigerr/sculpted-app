import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import { Task } from 'src/utils/types';
import type { AppDispatch, RootState } from 'src/store/store';
import { TaskChanges } from 'src/config/api/services/task-service';
import { createTask, deleteTasks, fetchTasks, updateTask } from 'src/store/slices/tasks/tasksSlice';
import { TOAST_SAVE_ERROR_CONFIG } from 'src/consts/constants';

// The day a task belongs to: its scheduled day, or the day it was created
// if it has no schedule.
export const taskDay = (task: Task) => moment(task.scheduledDate ?? task.creationDate);

// Completed tasks first, otherwise keep the API's newest-first order.
export const completedFirst = (a: Task, b: Task) => {
  if (a.isCompleted === b.isCompleted) return 0;
  return a.isCompleted ? -1 : 1;
};

// The signed-in user's tasks from the API, shared by every to-do screen.
// Loads them the first time any screen needs them.
const useTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const status = useSelector((state: RootState) => state.tasks.status);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTasks());
  }, [status, dispatch]);

  const showSaveError = () => Toast.show(TOAST_SAVE_ERROR_CONFIG);

  // Each action resolves to true on success; failures show a message.
  const addTask = useCallback(
    (data: TaskChanges & { title: string }) =>
      dispatch(createTask(data)).unwrap().then(() => true, () => { showSaveError(); return false; }),
    [dispatch],
  );

  const changeTask = useCallback(
    (task: Task, changes: TaskChanges) =>
      dispatch(updateTask({ id: task.id, changes, previous: task }))
        .unwrap().then(() => true, () => { showSaveError(); return false; }),
    [dispatch],
  );

  const removeTasks = useCallback(
    (ids: string[]) =>
      ids.length === 0
        ? Promise.resolve(true)
        : dispatch(deleteTasks(ids)).unwrap().then(() => true, () => { showSaveError(); return false; }),
    [dispatch],
  );

  const reload = useCallback(() => dispatch(fetchTasks()), [dispatch]);

  return {
    tasks,
    isLoading: status === 'loading',
    hasError: status === 'failed',
    addTask,
    changeTask,
    removeTasks,
    reload,
  };
};

export default useTasks;
