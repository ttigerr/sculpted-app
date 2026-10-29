import { jest, it, expect, beforeEach } from '@jest/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from './sign-out';
import { store, persistor } from 'src/store/store';
import { setUserData } from 'src/store/slices/auth/authSlice';
import { clearTokens } from 'src/config/storage/token-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  multiRemove: jest.fn(async () => {}),
  getItem: jest.fn(async () => null),
  setItem: jest.fn(async () => {}),
  removeItem: jest.fn(async () => {}),
}));

jest.mock('src/config/storage/token-storage', () => ({
  clearTokens: jest.fn(async () => {}),
}));

jest.spyOn(persistor, 'flush').mockResolvedValue(undefined as never);

beforeEach(() => {
  jest.clearAllMocks();
  store.dispatch(setUserData({ token: 'dev-token', id: 'dev-user', name: 'Nick', email: 'n@x.co' }));
});

it('clears tokens, per-user phone data and the profile', async () => {
  await signOut();

  expect(clearTokens).toHaveBeenCalled();
  expect(AsyncStorage.multiRemove).toHaveBeenCalledWith(
    expect.arrayContaining(['compass', 'journalReminder']),
  );
  expect(store.getState().auth.token).toBeNull();
  expect(store.getState().auth.user.email).toBe('');
  expect(persistor.flush).toHaveBeenCalled();
});

it('still clears the profile when the keychain fails', async () => {
  (clearTokens as ReturnType<typeof jest.fn<(...args: any[]) => any>>).mockRejectedValueOnce(new Error('keychain locked'));

  await signOut();

  expect(AsyncStorage.multiRemove).toHaveBeenCalled();
  expect(store.getState().auth.user.id).toBe('');
});
