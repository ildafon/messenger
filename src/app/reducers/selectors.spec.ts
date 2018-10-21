
import * as fromRoot from './index';

describe('Selectors', () => {

  const state = {
    messages: {
      ids: ['1', '2', '3'],
      entities: {
        1: {
          id: '1',
          author: 'user1',
          text: 'message text of user1',
          conversation: 'user2',
          createdAt: '20-09-2018 13:20:36'
        },
        2: {
          id: '2',
          author: 'user2',
          text: 'message text of user2',
          conversation: 'user2',
          createdAt: '20-09-2018 13:22:36'
        },
        3: {
          id: '3',
          author: 'user1',
          text: 'message text 2 of user1',
          conversation: 'user3',
          createdAt: '20-09-2018 13:23:36'
        }
      },
      selectedMessageId: null,
      isFetching: false
    },
    users: {
      retrievedUsersIds: ['user1', 'user2'],
      entities: {
        user1: {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'},
        user2: {login: 'user2', avatarUrl: 'www2', name: 'User2', location: 'B'},
        user3: {login: 'user3', avatarUrl: 'www3'}
      },
      selectedUserId: 'user2',
      isFetching: false,
      currentUserId: 'user1'
    },
    router: {
      path: '/'
    }
  };

  describe('getUsersEntities', () => {
    it('should return entities', () => {
      const result = fromRoot.getUsersEntities(state);
      expect(result).toBe(state.users.entities);
    });
  });

  describe('getUsersRetrievedIds', () => {
    it('should return retrievedUsers Ids', () => {
      const result = fromRoot.getUsersRetrievedIds(state);
      expect(result).toBe(state.users.retrievedUsersIds);
    });
  });

  describe('getUsersSelectedId', () => {
    it('should return selected Ids', () => {
      const result = fromRoot.getUsersSelectedId(state);
      expect(result).toBe(state.users.selectedUserId);
    });
  });

  describe('getUsersSelectedUser', () => {
    it('should return selected User', () => {
      const result = fromRoot.getUsersSelectedUser(state);
      expect(result).toBe(state.users.entities[state.users.selectedUserId]);
    });
  });

  describe('getUsersFetching', () => {
    it('should return boolean fetching', () => {
      const result = fromRoot.getUsersFetching(state);
      expect(result).toBe(state.users.isFetching);
    });
  });

  describe('getUsersCurrentUserId', () => {
    it('should return current user id', () => {
      const result = fromRoot.getUsersCurrentUserId(state);
      expect(result).toBe(state.users.currentUserId);
    });
  });


  describe('getUsersCurrentUser', () => {
    it('should return current user', () => {
      const result = fromRoot.getUsersCurrentUser(state);
      expect(result).toBe(state.users.entities[state.users.currentUserId]);
    });
  });


  describe('getMessagesEntities', () => {
    it('should return entities', () => {
      const result = fromRoot.getMessagesEntities(state);
      expect(result).toBe(state.messages.entities);
    });
  });

  describe('getMessagesIds', () => {
    it('should return ids', () => {
      const result = fromRoot.getMessagesIds(state);
      expect(result).toBe(state.messages.ids);
    });
  });

  describe('getMessagesSelectedId', () => {
    it('should return selected message id', () => {
      const result = fromRoot.getMessagesSelectedId(state);
      expect(result).toBe(state.messages.selectedMessageId);
    });
  });

  describe('getMessagesFetching', () => {
    it('should return messages fetching', () => {
      const result = fromRoot.getMessagesFetching(state);
      expect(result).toBe(state.messages.isFetching);
    });
  });


  describe('isSelectedUserhasMessages', () => {
    it('should return is user has messages', () => {

      const expected = true;

      const result = fromRoot.isSelectedUserhasMessages(state);
      expect(result).toEqual(expected);
    });
  });


  describe('getMessageIDsOfSelectedUser', () => {
    it('should return message Ids of selected user', () => {

      const expected = ['1', '2'];

      const result = fromRoot.getMessageIdsOfSelectedUser(state);
      expect(result).toEqual(expected);
    });
  });


  describe('getMessagesOfSelectedUser', () => {
    it('should return messages of selected user', () => {

      const expected = [
        {
        id: '1',
        author: {
          login: 'user1',
          avatarUrl: 'www1',
          name: 'User1',
          location: 'A'
        },
        text: 'message text of user1',
        conversation: {
          login: 'user2',
          avatarUrl: 'www2',
          name: 'User2',
          location: 'B'
        },
        createdAt: '20-09-2018 13:20:36'
      },
      {
        id: '2',
        author: {
          login: 'user2',
          avatarUrl: 'www2',
          name: 'User2',
          location: 'B'
        },
        text: 'message text of user2',
        conversation: {
          login: 'user2',
          avatarUrl: 'www2',
          name: 'User2',
          location: 'B'
        },
        createdAt: '20-09-2018 13:22:36'
      }];


      const result = fromRoot.getMessagesOfSelectedUser(state);
      expect(result).toEqual(expected);
    });
  });



  describe('getMessagesOfSelectedUser2', () => {
    it('should return empty array if no messages ', () => {
      const state2 = {
        messages: {
          ids: [],
          entities: {},
          selectedMessageId: null,
          isFetching: false
        },
        users: {
          retrievedUsersIds: ['user1', 'user2'],
          entities: {
            user1: {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'},
            user2: {login: 'user2', avatarUrl: 'www2', name: 'User2', location: 'B'},
            user3: {login: 'user3', avatarUrl: 'www3'}
          },
          selectedUserId: 'user2',
          isFetching: false,
          currentUserId: 'user1'
        },
        router: {
          path: '/'
        }
      };
      const expected = [];


      const result = fromRoot.getMessagesOfSelectedUser(state2);
      expect(result).toEqual(expected);
    });
  });

  describe('getAuthorOfMessage', () => {
    it('should return user by user id', () => {
      const userId = 'user2';
      const result = fromRoot.getAuthorOfMessage(userId)(state);
      expect(result).toBe(state.users.entities['user2']);
    });
  });

  describe('isUserAlreadyRetrieved', () => {
    it('should return if user1 data in store already', () => {
      const userId = 'user1';
      const expected = state.users.retrievedUsersIds.indexOf(userId) > -1;
      const result = fromRoot.isUserAlreadyRetrieved(userId)(state);
      expect(result).toEqual(expected);
    });
  });

  describe('isUserAlreadyRetrieved', () => {
    it('should return if user3 data in store already', () => {
      const userId = 'user3';
      const expected = state.users.retrievedUsersIds.indexOf(userId) > -1;
      const result = fromRoot.isUserAlreadyRetrieved(userId)(state);
      expect(result).toEqual(expected);
    });
  });
});
