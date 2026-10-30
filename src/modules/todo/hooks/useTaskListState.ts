import { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import moment from 'moment';
import { DayListItem, Task } from 'src/utils/types';
import useTasks, { completedFirst, taskDay } from './useTasks';

type Options = {
  // Day selected in the day picker when the screen opens; null means "All".
  initialDay: moment.Moment | null;
  // Day given to a new task when no day is selected.
  defaultNewTaskDay: () => moment.Moment;
};

// Screen state shared by the to-do lists: search, day filter, "show
// completed", multi-select, and the task draft. `baseTasks` is the
// screen's slice of the user's tasks (e.g. last 7 days, or incomplete only).
//
// The draft (`newTask`) is either a new task or a copy of an existing one
// being edited; `editingId` says which existing task it replaces.
const useTaskListState = (baseTasks: Task[], options: Options) => {
  const { changeTask, addTask, removeTasks } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState<moment.Moment | null>(options.initialDay);
  const [isShowingCompleted, setIsShowingCompleted] = useState(false);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [newTask, setNewTask] = useState<Task | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Sorted, "show completed" applied, with selection marks for the list UI.
  const taskList = useMemo(
    () =>
      [...baseTasks]
        .filter(task => !isShowingCompleted || task.isCompleted)
        .sort(completedFirst)
        .map(task => ({ ...task, isSelected: selectedIds.has(task.id) })),
    [baseTasks, isShowingCompleted, selectedIds],
  );

  // What the list actually shows: day filter and search applied.
  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return taskList.filter(
      task =>
        (!selectedDay || taskDay(task).isSame(selectedDay, 'day')) &&
        (!query || task.title.toLowerCase().includes(query)),
    );
  }, [taskList, selectedDay, searchQuery]);

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleDateFilter = (dayItem: DayListItem) =>
    setSelectedDay(dayItem.date ? dayItem.date.clone().startOf('day') : null);

  const toggleTaskCompletion = (taskId: string) => {
    const task = baseTasks.find(t => t.id === taskId);
    if (task) changeTask(task, { isCompleted: !task.isCompleted });
  };

  const handleShowCompleted = () => setIsShowingCompleted(prev => !prev);

  const handleAddTask = () => {
    const day = selectedDay ?? options.defaultNewTaskDay();
    setEditingId(null);
    setNewTask({
      id: `draft-${Date.now()}`,
      creationDate: Date.now(),
      scheduledDate: +day.clone().startOf('day'),
      title: '',
      description: '',
      isCompleted: false,
      isTemporary: true,
    });
  };

  // Opens an existing task in the draft form.
  const handleEditTask = (task: Task) => {
    if (isSelectedAll) return;
    setEditingId(task.id);
    setNewTask({ ...task, isTemporary: true });
  };

  const handleSaveTask = async () => {
    if (!newTask || !newTask.title.trim() || !newTask.description.trim()) {
      Alert.alert("Title and description can't be empty");
      return;
    }
    if (isSaving) return;

    const original = editingId ? baseTasks.find(t => t.id === editingId) : undefined;
    if (editingId && !original) {
      // The task was deleted meanwhile (e.g. from another screen).
      handleCancelEdit();
      return;
    }

    setIsSaving(true);
    let saved: boolean;
    if (original) {
      const changes = {
        ...(newTask.title !== original.title && { title: newTask.title }),
        ...(newTask.description !== original.description && { description: newTask.description }),
      };
      saved = Object.keys(changes).length === 0 || (await changeTask(original, changes));
    } else {
      saved = await addTask({
        title: newTask.title,
        description: newTask.description,
        scheduledDate: newTask.scheduledDate,
      });
    }
    setIsSaving(false);
    // On failure keep the draft so nothing typed is lost.
    if (saved) handleCancelEdit();
  };

  const handleCancelEdit = () => {
    setNewTask(null);
    setEditingId(null);
  };

  const handleDeleteTask = (taskId: string) => {
    removeTasks([taskId]);
  };

  const onSelectAllPressed = () => {
    setIsSelectedAll(prev => !prev);
    setSelectedIds(new Set(filteredTasks.map(task => task.id)));
  };

  const handleCancelSelecting = () => {
    setIsSelectedAll(false);
    setSelectedIds(new Set());
  };

  const handleToggleSelectItem = (taskId: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return next;
    });
  };

  // Deletes the selected tasks that are visible under the current day filter.
  const removeSelectedTasks = () => {
    const ids = filteredTasks.filter(task => selectedIds.has(task.id)).map(task => task.id);
    handleCancelSelecting();
    removeTasks(ids);
  };

  return {
    taskList,
    filteredTasks,
    selectedDay,
    handleSearch,
    handleDateFilter,
    toggleTaskCompletion,
    isShowingCompleted,
    handleShowCompleted,
    newTask,
    setNewTask,
    isAdding: newTask !== null,
    handleAddTask,
    handleEditTask,
    handleSaveTask,
    handleCancelEdit,
    handleDeleteTask,
    isSelectedAll,
    onSelectAllPressed,
    handleCancelSelecting,
    handleToggleSelectItem,
    removeSelectedTasks,
  };
};

export default useTaskListState;
