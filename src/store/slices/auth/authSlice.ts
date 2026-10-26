import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from 'src/utils/types';

const initialUser: AuthState['user'] = {
  id: '',
  name: '',
  email: '',
  gender: null,
  birthday: null,
  profilePictureUrl: '',
};

const initialState: AuthState = {
  token: null,
  tokenStartDate: null,
  user: initialUser,
  error: false,
  accountState: 'ACTIVE',
  sessionExpired: false,
};

type UserPayload = Partial<AuthState['user']> & { token?: string | null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserPayload>) => {
      const { token, ...user } = action.payload;
      if (token !== undefined) {
        state.token = token;
        state.tokenStartDate = new Date().toISOString();
        state.sessionExpired = false;
      }
      state.user = { ...state.user, ...user };
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.tokenStartDate = action.payload ? new Date().toISOString() : null;
      if (action.payload) state.sessionExpired = false;
    },
    setProfile: (state, action: PayloadAction<Partial<AuthState['user']>>) => {
      state.user = { ...state.user, ...action.payload };
    },
    setSessionExpired: (state, action: PayloadAction<boolean>) => {
      state.sessionExpired = action.payload;
      if (action.payload) state.token = null;
    },
    setAccountState: (
      state,
      action: PayloadAction<AuthState['accountState']>,
    ) => {
      state.accountState = action.payload;
    },
    setAuthError: (state, action: PayloadAction<AuthState['error']>) => {
      state.error = action.payload;
    },
    logout: () => initialState,
  },
});

export const {
  setUserData,
  setToken,
  setProfile,
  setSessionExpired,
  setAccountState,
  setAuthError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
