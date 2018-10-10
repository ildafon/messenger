import { reducer, InitialState } from './users';
import * as fromUsers from './users';
import {
  SelectAction,
   RetrieveUserAction,
   FetchAction,
   FetchCompleteAction,
   RetrieveUserSuccessAction
   } from './../actions/users.actions';
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

  describe('FETCH_COMPLETE', () => {
    function noExistingUsers(action) {
      const user1 = {login: 'user1', avatarUrl: 'www1'} as User;
      const user2 = {login: 'user2', avatarUrl: 'www2'} as User;
      const createAction = new action([user1, user2]);

      const initial = {
        retrievedUsersIds: [],
        entities: {},
        selectedUserId: null,
        isFetching: true
      };

      const expectedResult = {
        retrievedUsersIds: [],
        entities: {
          user1: {login: 'user1', avatarUrl: 'www1'},
          user2: {login: 'user2', avatarUrl: 'www2'}
        },
        selectedUserId: null,
        isFetching: false
      };

      const result = reducer(initial, createAction);
      expect(result).toEqual(expectedResult);
    }

    function existingUsers(action) {
      const user1 = {login: 'user1', avatarUrl: 'www1'} as User;
      const user2 = {login: 'user2', avatarUrl: 'new_www2'} as User;
      const user3 = {login: 'user3', avatarUrl: 'www3'} as User;
      const createAction = new action([user1, user2, user3]);

      const initial = {
        retrievedUsersIds: ['user1'],
        entities: {
          user1: {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'},
          user2: {login: 'user2', avatarUrl: 'www2'} as User
        },
        selectedUserId: null,
        isFetching: false
      };

      const expectedResult = {
        retrievedUsersIds: ['user1'],
        entities: {
          user1: {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'},
          user2: {login: 'user2', avatarUrl: 'new_www2'},
          user3: {login: 'user3', avatarUrl: 'www3'}
        },
        selectedUserId: null,
        isFetching: false
      };

      const result = reducer(initial, createAction);
      expect(result).toEqual(expectedResult);
    }


    it('should add all users to empty store', () => {
      noExistingUsers(FetchCompleteAction);
    });
    it('should add only new users to the store', () => {
      existingUsers(FetchCompleteAction);
    });
  });

  describe('RETRIEVE_USER_SUCCESS', () => {
    function noExistingUsers(action) {
      const user1 = {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'} as User;
      const createAction = new action(user1);


      const expectedResult = {
        retrievedUsersIds: ['user1'],
        entities: {
          user1: {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'}
        },
        selectedUserId: null,
        isFetching: false
      };

      const result = reducer(InitialState, createAction);
      expect(result).toEqual(expectedResult);
    }



    function existingUser(action) {
      const user1 = {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'} as User;
      const createAction = new action(user1);

      const initial = {
        retrievedUsersIds: ['user1'],
        entities: {
          user1: {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'},
          user2: {login: 'user2', avatarUrl: 'www2'}
        },
        selectedUserId: null,
        isFetching: false
      };

      const expectedResult = {
        retrievedUsersIds: ['user1'],
        entities: {
          user1: {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'},
          user2: {login: 'user2', avatarUrl: 'www2'}
        },
        selectedUserId: null,
        isFetching: false
      };

      const result = reducer(initial, createAction);
      expect(result).toEqual(expectedResult);
    }

    function updateUser(action) {
      const user1 = {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'} as User;
      const createAction = new action(user1);

      const initial = {
        retrievedUsersIds: [],
        entities: {
          user1: {login: 'user1', avatarUrl: 'www1'},
          user2: {login: 'user2', avatarUrl: 'www2'}
        },
        selectedUserId: null,
        isFetching: false
      };

      const expectedResult = {
        retrievedUsersIds: ['user1'],
        entities: {
          user1: {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'},
          user2: {login: 'user2', avatarUrl: 'www2'}
        },
        selectedUserId: null,
        isFetching: false
      };

      const result = reducer(initial, createAction);
      expect(result).toEqual(expectedResult);
    }


    it('should update particular user if user exists', () => {
      existingUser(RetrieveUserSuccessAction);
    });
    it('should update particular user if user exists', () => {
      updateUser(RetrieveUserSuccessAction);
    });
    it('should insert particular user if user not exists', () => {
      noExistingUsers(RetrieveUserSuccessAction);
    });
  });

  describe('Selectors', () => {

    const state = {
      retrievedUsersIds: ['user1', 'user2'],
      entities: {
        user1: {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'},
        user2: {login: 'user2', avatarUrl: 'www2', name: 'User2', location: 'B'},
        user3: {login: 'user3', avatarUrl: 'www3'}
      },
      selectedUserId: 'user2',
      isFetching: false
    };

    describe('getEntities', () => {
      it('should return entities', () => {
        const result = fromUsers.getEntities(state);
        expect(result).toBe(state.entities);
      });
    });

    describe('getRetrievedIds', () => {
      it('should return retrievedUsers Ids', () => {
        const result = fromUsers.getRetrievedIds(state);
        expect(result).toBe(state.retrievedUsersIds);
      });
    });

    describe('getSelectedId', () => {
      it('should return selected Ids', () => {
        const result = fromUsers.getSelectedId(state);
        expect(result).toBe(state.selectedUserId);
      });
    });

  });

});

