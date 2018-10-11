import { reducer, InitialState } from './auth';
import * as fromAuth from './auth';
import * as authAction from '../actions/auth';
import { User } from '../models/user.model';

describe('AuthReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromAuth.InitialState);
    });
  });

  describe('LOGIN_SUCCESS', () => {
    function unauthState(action) {
      const user = {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'} as User;
      const createAction = new action(user);


      const expectedResult = {
        isAuthenticated: true,
        currentUser: {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'}
      };

      const result = reducer(InitialState, createAction);
      expect(result).toEqual(expectedResult);
      }


      it('should add new messages to empty store', () => {
        unauthState(authAction.LoginSuccessAction);
      });

    });

  });
