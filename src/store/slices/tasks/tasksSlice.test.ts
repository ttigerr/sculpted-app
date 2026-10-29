import { jest, it, expect, beforeEach, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { createTask, deleteTasks, fetchTasks, updateTask } from './tasksSlice';
import authReducer, { logout, setUserData } from 'src/store/slices/auth/authSlice';
import { get, post, patch, del } from 'src/config/api/services/http-service';

jest.mock('src/config/api/services/http-service', () => ({
  get: jest.fn(), post: jest.fn(), patch: jest.fn(), del: jest.fn(),
}));

type AnyMock = ReturnType<typeof jest.fn<(...args: any[]) => any>>;
const mockGet = get as unknown as AnyMock;
const mockPost = post as unknown as AnyMock;
const mockPatch = patch as unknown as AnyMock;
const mockDel = del as unknown as AnyMock;

const dto = (id: string, isCompleted = false) => ({
  id,
  title: `Task ${id}`,
  description: null,
  isCompleted,
  scheduledDate: '2026-10-29T00:00:00.000Z',
  creationDate: '2026-10-28T10:00:00.000Z',
});

const makeStore = () =>
  configureStore({ reducer: { auth: authReducer, tasks: tasksReducer } });

beforeEach(() => {
  jest.clearAllMocks();
});

describe('loading', () => {
  it('converts API tasks into app tasks', async () => {
    mockGet.mockResolvedValue([dto('a')]);
    const store = makeStore();

    await store.dispatch(fetchTasks());

    expect(mockGet).toHaveBeenCalledWith('tasks');
    const [task] = store.getState().tasks.items;
    expect(task).toEqual({
      id: 'a',
      title: 'Task a',
      description: '',
      isCompleted: false,
      scheduledDate: Date.parse('2026-10-29T00:00:00.000Z'),
      creationDate: Date.parse('2026-10-28T10:00:00.000Z'),
    });
    expect(store.getState().tasks.status).toBe('loaded');
  });

  it('fetches only once when several screens ask at the same time', async () => {
    mockGet.mockResolvedValue([]);
    const store = makeStore();
    await Promise.all([store.dispatch(fetchTasks()), store.dispatch(fetchTasks())]);
    expect(mockGet).toHaveBeenCalledTimes(1);
  });
});

describe('saving', () => {
  it('sends scheduledAt (not scheduledDate) when creating', async () => {
    mockPost.mockResolvedValue(dto('new'));
    const store = makeStore();
    const day = Date.parse('2026-10-30T00:00:00.000Z');

    await store.dispatch(createTask({ title: 'Buy protein', description: '5kg', scheduledDate: day }));

    expect(mockPost).toHaveBeenCalledWith('tasks', {
      title: 'Buy protein',
      description: '5kg',
      scheduledAt: '2026-10-30T00:00:00.000Z',
    });
    expect(store.getState().tasks.items.map(t => t.id)).toEqual(['new']);
  });

  it('ticks a task instantly and undoes it if the save fails', async () => {
    mockGet.mockResolvedValue([dto('a')]);
    const store = makeStore();
    await store.dispatch(fetchTasks());
    const previous = store.getState().tasks.items[0];

    let rejectSave!: (e: Error) => void;
    mockPatch.mockReturnValue(new Promise((_, reject) => { rejectSave = reject; }));
    const saving = store.dispatch(updateTask({ id: 'a', changes: { isCompleted: true }, previous }));

    expect(mockPatch).toHaveBeenCalledWith('tasks/a', { isCompleted: true });
    expect(store.getState().tasks.items[0].isCompleted).toBe(true); // instant

    rejectSave(new Error('offline'));
    await saving;
    expect(store.getState().tasks.items[0].isCompleted).toBe(false); // rolled back
  });

  it('removes deleted tasks, and reloads from the API if a delete fails', async () => {
    mockGet.mockResolvedValue([dto('a'), dto('b')]);
    const store = makeStore();
    await store.dispatch(fetchTasks());

    mockDel.mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('offline'));
    mockGet.mockResolvedValue([dto('b')]); // what the server still has
    await store.dispatch(deleteTasks(['a', 'b']));
    await new Promise(resolve => setImmediate(resolve));

    expect(mockDel).toHaveBeenCalledWith('tasks/a');
    expect(store.getState().tasks.items.map(t => t.id)).toEqual(['b']);
  });
});

describe('signing in and out', () => {
  it('clears tasks on logout and does not refetch until the next sign-in', async () => {
    mockGet.mockResolvedValue([dto('a')]);
    const store = makeStore();
    await store.dispatch(fetchTasks());

    store.dispatch(logout());
    expect(store.getState().tasks).toEqual({ items: [], status: 'signedOut' });

    store.dispatch(setUserData({ token: 'dev-token', id: 'dev-user' }));
    expect(store.getState().tasks.status).toBe('idle'); // screens will load again
  });

  it('keeps tasks when only the profile changes', async () => {
    mockGet.mockResolvedValue([dto('a')]);
    const store = makeStore();
    await store.dispatch(fetchTasks());

    store.dispatch(setUserData({ name: 'New name' }));
    expect(store.getState().tasks.items).toHaveLength(1);
  });
});
