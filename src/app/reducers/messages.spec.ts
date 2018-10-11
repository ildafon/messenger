import { reducer, InitialState } from './messages';
import * as fromMessages from './messages';
import * as messageAction from './../actions/messages.actions';
import { Message } from '../models/message.model';

describe('MessagesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromMessages.InitialState);
    });
  });

  describe('SELECT', () => {
    it('should set the selected message id on the state', () => {
      const action = new messageAction.SelectMessageAction('1');

      const result = reducer(fromMessages.InitialState, action);
      expect(result.selectedMessageId).toBe('1');
    });
  });

  describe('FETCH_MESSAGES_COMPLETE', () => {
    function noExistingMessages(action) {
      const message1 = {
        id: '2003',
        author: 'atmos',
        text: 'Please, check a mail from me',
        conversation: 'atmos',
        createdAt: '20-09-2018 13:20:36'
      } as Message;
      const message2 = {
        id: '2002',
        author: 'ry',
        text: 'форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметн',
        conversation: 'atmos',
        createdAt: '20-09-2018 13:20:35'
      } as Message;
      const createAction = new action([message1, message2]);
      const initial = {
        ids: [],
        entities: {},
        selectedMessageId: null,
        isFetching: true
      };

      const expected = {
        ids: ['2003', '2002'],
        entities: {
          2003: {
            id: '2003',
            author: 'atmos',
            text: 'Please, check a mail from me',
            conversation: 'atmos',
            createdAt: '20-09-2018 13:20:36'
          },
          2002: {
            id: '2002',
            author: 'ry',
            text: 'форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметн',
            conversation: 'atmos',
            createdAt: '20-09-2018 13:20:35'
          }
        },
        selectedMessageId: null,
        isFetching: false
      };

      const result = reducer(initial, createAction);
      expect(result).toEqual(expected);
    }


    function existingMessages(action) {
      const message1 = {
        id: '3001',
        author: 'benburkert',
        text: 'Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца',
        conversation: 'benburkert',
        createdAt: '20-09-2018 14:30:34'
      } as Message;
      const message2 = {
        id: '2002',
        author: 'ry',
        text: 'форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметн',
        conversation: 'atmos',
        createdAt: '20-09-2018 13:20:35'
      } as Message;
      const createAction = new action([message1, message2]);

      const initial = {
        ids: ['2003', '2002'],
        entities: {
          2003: {
            id: '2003',
            author: 'atmos',
            text: 'Please, check a mail from me',
            conversation: 'atmos',
            createdAt: '20-09-2018 13:20:36'
          },
          2002: {
            id: '2002',
            author: 'ry',
            text: 'форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметн',
            conversation: 'atmos',
            createdAt: '20-09-2018 13:20:35'
          }
        },
        selectedMessageId: null,
        isFetching: false
      };

      const expected = {
        ids: ['2003', '2002', '3001'],
        entities: {
          2003: {
            id: '2003',
            author: 'atmos',
            text: 'Please, check a mail from me',
            conversation: 'atmos',
            createdAt: '20-09-2018 13:20:36'
          },
          2002: {
            id: '2002',
            author: 'ry',
            text: 'форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметн',
            conversation: 'atmos',
            createdAt: '20-09-2018 13:20:35'
          },
          3001: {
            id: '3001',
            author: 'benburkert',
            text: 'Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца',
            conversation: 'benburkert',
            createdAt: '20-09-2018 14:30:34'
          }
        },
        selectedMessageId: null,
        isFetching: false
      };

      const result = reducer(initial, createAction);
      expect(result).toEqual(expected);
    }

    it('should fetch new messages', () => {
      noExistingMessages(messageAction.FetchMessagesCompleteAction);
    });

    it('should fetch new messages and save only new ones', () => {
      existingMessages(messageAction.FetchMessagesCompleteAction);
    });
  });

  describe('SEND_MESSAGE, RECIEVE_MESSAGE', () => {
    function noExistingMessages(action) {
      const message1 = {
        id: '2003',
        author: 'atmos',
        text: 'Please, check a mail from me',
        conversation: 'atmos',
        createdAt: '20-09-2018 13:20:36'
      } as Message;

      const createAction = new action(message1);
      const initial = {
        ids: [],
        entities: {},
        selectedMessageId: null,
        isFetching: false
      };

      const expected = {
        ids: ['2003'],
        entities: {
          2003: {
            id: '2003',
            author: 'atmos',
            text: 'Please, check a mail from me',
            conversation: 'atmos',
            createdAt: '20-09-2018 13:20:36'
          }
        },
        selectedMessageId: null,
        isFetching: false
      };

      const result = reducer(initial, createAction);
      expect(result).toEqual(expected);
    }


    function existingMessage(action) {

      const message1 = {
        id: '2004',
        author: 'atmos',
        text: 'RE:форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметн',
        conversation: 'atmos',
        createdAt: '20-09-2018 13:20:35'
      } as Message;
      const createAction = new action(message1);

      const initial = {
        ids: ['2003', '2002'],
        entities: {
          2003: {
            id: '2003',
            author: 'atmos',
            text: 'Please, check a mail from me',
            conversation: 'atmos',
            createdAt: '20-09-2018 13:20:36'
          },
          2002: {
            id: '2002',
            author: 'ry',
            text: 'форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметн',
            conversation: 'atmos',
            createdAt: '20-09-2018 13:20:35'
          }
        },
        selectedMessageId: null,
        isFetching: false
      };

      const expected = {
        ids: ['2003', '2002', '2004'],
        entities: {
          2003: {
            id: '2003',
            author: 'atmos',
            text: 'Please, check a mail from me',
            conversation: 'atmos',
            createdAt: '20-09-2018 13:20:36'
          },
          2002: {
            id: '2002',
            author: 'ry',
            text: 'форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметн',
            conversation: 'atmos',
            createdAt: '20-09-2018 13:20:35'
          },
          2004: {
            id: '2004',
            author: 'atmos',
            text: 'RE:форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметн',
            conversation: 'atmos',
            createdAt: '20-09-2018 13:20:35'
          }
        },
        selectedMessageId: null,
        isFetching: false
      };

      const result = reducer(initial, createAction);
      expect(result).toEqual(expected);
    }

    it('should add new messages to empty store', () => {
      noExistingMessages(messageAction.SendMessageAction);
    });

    it('should add new message with existing messages', () => {
      existingMessage(messageAction.SendMessageAction);
    });
  });
});
