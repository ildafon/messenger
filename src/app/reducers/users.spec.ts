import { reducer } from './users';
import * as fromUsers from './users';
import { SelectAction, RetrieveUserAction } from './../actions/users.actions';
import { User } from '../models/user.model';



describe('UsersReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromUsers.InitialState);
    });
  });

  describe('SELECT', () => {
    it('should set the selected user id on the state', () => {
      const action = new SelectAction('1');

      const result = reducer(fromUsers.InitialState, action);
      expect(result.selectedUserId).toBe('1');
    });
  });


});

