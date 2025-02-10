import authReducer from './authSlice';
import { AuthState } from 'src/utils/types';
import { AnyAction } from 'redux';

const userData = {
  name: '',
  email: '',
  gender: null,
  birthday: null,
  profilePictureUrl: '',
}
describe('Auth Slice', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      token: null,
      tokenStartDate: undefined,
      user: userData,
      error: false,
      accountState: 'ACTIVE',
      sessionExpired: false,
    };
  });

  test('Debe retornar el estado inicial', () => {
    expect(authReducer(undefined, {} as AnyAction)).toEqual(initialState);
  });
});
