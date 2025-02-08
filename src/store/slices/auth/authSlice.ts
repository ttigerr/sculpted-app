import { createSlice } from '@reduxjs/toolkit';
import { userMockData, jwtMockData } from 'src/consts/mock-data';
import { AuthState } from 'src/utils/types';

const userData = {
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
      state.token = jwtMockData;
      state.user.name = userMockData.name;
      state.user.email = userMockData.email;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUserData, setToken } = authSlice.actions;
export default authSlice.reducer;
