import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/auth/authSlice';
import tasksReducer from './slices/tasks/tasksSlice';
import { AuthState } from 'src/utils/types';

// Strip the access token (and derived timestamp) from the persisted auth
// slice. The token lives in Keychain and is rehydrated into Redux at startup
// via a bootstrap call. Keeping it out of AsyncStorage avoids writing it to
// unencrypted on-disk JSON.
const authPersistTransform = createTransform(
  (inboundState: AuthState) => {
    const { token, tokenStartDate, ...rest } = inboundState;
    return rest;
  },
  (outboundState: Partial<AuthState>): AuthState =>
    ({ ...outboundState, token: null, tokenStartDate: null } as AuthState),
  { whitelist: ['auth'] },
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  transforms: [authPersistTransform],
};

// Only `auth` is persisted (see whitelist above); tasks always come from the API.
const rootReducer = combineReducers({ auth: authReducer, tasks: tasksReducer });
// redux-persist's inferred preloadedState generic doesn't line up with
// configureStore's stricter signature in RTK 2.x. The runtime behavior is
// correct; casting through unknown quiets the type mismatch.
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as unknown as Parameters<typeof persistReducer>[1],
) as unknown as typeof rootReducer;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
