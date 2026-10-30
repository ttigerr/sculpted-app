import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task } from 'src/utils/types';
import { taskService, TaskChanges } from 'src/config/api/services/task-service';
import { logout, setUserData } from 'src/store/slices/auth/authSlice';

// One shared copy of the user's tasks for every to-do screen, so ticking a
// task on one screen updates the others. Not persisted: always loaded from
// the API.
type TasksState = {
  items: Task[];
  // 'signedOut' stops screens from refetching after logout, which would
  // otherwise 401 → logout → refetch in a loop when a session expires.
  status: 'idle' | 'loading' | 'loaded' | 'failed' | 'signedOut';
};

const initialState: TasksState = { items: [], status: 'idle' };

type ThunkConfig = { state: { tasks: TasksState } };

export const fetchTasks = createAsyncThunk<Task[], void, ThunkConfig>(
  'tasks/fetch',
  () => taskService.getTasks(),
  { condition: (_, { getState }) => getState().tasks.status !== 'loading' },
);

export const createTask = createAsyncThunk(
  'tasks/create',
  (data: TaskChanges & { title: string }) => taskService.createTask(data),
);

// Updates are applied on screen straight away and rolled back if the API
// rejects them.
export const updateTask = createAsyncThunk(
  'tasks/update',
  ({ id, changes }: { id: string; changes: TaskChanges; previous: Task }) =>
    taskService.updateTask(id, changes),
);

// Deletes several tasks; removed on screen straight away. If any delete
// fails, reload from the API so the screen matches what the server has.
export const deleteTasks = createAsyncThunk<void, string[], ThunkConfig>(
  'tasks/delete',
  async (ids, { dispatch }) => {
    const results = await Promise.allSettled(ids.map(id => taskService.deleteTask(id)));
    const failed = results.find(r => r.status === 'rejected') as PromiseRejectedResult | undefined;
    if (failed) {
      dispatch(fetchTasks());
      throw failed.reason;
    }
  },
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'loaded';
      })
      .addCase(fetchTasks.rejected, state => {
        // A 401 during the fetch has already logged out; don't undo that.
        if (state.status === 'loading') state.status = 'failed';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTask.pending, (state, action) => {
        const { id, changes } = action.meta.arg;
        const task = state.items.find(t => t.id === id);
        if (task) Object.assign(task, changes);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        const { previous } = action.meta.arg;
        const index = state.items.findIndex(t => t.id === previous.id);
        if (index !== -1) state.items[index] = previous;
      })
      .addCase(deleteTasks.pending, (state, action) => {
        const ids = new Set(action.meta.arg);
        state.items = state.items.filter(t => !ids.has(t.id));
      })
      .addCase(logout, () => ({ items: [], status: 'signedOut' as const }))
      .addCase(setUserData, (state, action) => {
        // A new sign-in: load that user's tasks.
        if (action.payload.token) return initialState;
        return state;
      });
  },
});

export default tasksSlice.reducer;
