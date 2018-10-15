import { TestBed, inject } from '@angular/core/testing';

import { NormalizationService } from './normalization.service';

import * as fromRoot from '../reducers/index';

describe('MessagesOfSelected', () => {

  const state = {
    messages: {
      ids: ['1', '2'],
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
        }
      },
      selectedMessageId: null,
      isFetching: false
    },
    users: {
      retrievedUsersIds: ['user1', 'user2'],
      entities: {
        user1: {login: 'user1', avatarUrl: 'www1', name: 'User1', location: 'A'},
        user2: {login: 'user2', avatarUrl: 'www2', name: 'User2', location: 'B'}
      },
      selectedUserId: 'user2',
      isFetching: false,
      currentUserId: 'user1'
    },
    router: {
      path: '/'
    }
  };


  const entities = {
    'users': state.users.entities,
    'messages': state.messages.entities
  };



  it('should denormalize messages', () => {
    const ids = fromRoot.getMessageIdsOfSelectedUser(state);
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

    const result = NormalizationService.denormalize(ids, entities );

    expect(result).toEqual(expected);
  });

  it('should return empty array', () => {
    const ids = [];
    const expected = [];
    const result = NormalizationService.denormalize(ids, entities );

    expect(result).toEqual(expected);
  });

});
