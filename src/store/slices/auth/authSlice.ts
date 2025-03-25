import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from 'src/utils/types';

const userData = {
  id: '',
  name: '',
  email: '',
  gender: null,
  birthday: null,
  profilePictureUrl: '',
}

const initialState: AuthState = {
  token: null,
  tokenStartDate: undefined,
  user: userData,
  error: false,
  accountState: 'ACTIVE',
  sessionExpired: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.token = action.payload.token;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.id = action.payload.id;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUserData, setToken } = authSlice.actions;
export default authSlice.reducer;
