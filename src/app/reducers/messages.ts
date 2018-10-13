import { createSelector} from 'reselect';
import { Message } from '../models/message.model';
import * as messages from '../actions/messages.actions';

export interface State {
  ids: string[];
  entities: { [id: string]: Message};
  selectedMessageId: string | null;
  isFetching: boolean;
}

export const InitialState: State = {
  ids: [],
  entities: {},
  selectedMessageId: null,
  isFetching: false
};

export function reducer( state = InitialState, action: messages.Actions): State {
  switch (action.type) {
    case messages.FETCH_MESSAGES: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedMessageId: state.selectedMessageId,
        isFetching: true
      };
    }

    case messages.FETCH_MESSAGES_COMPLETE: {
      const messagesFetched = action.payload;
      const newMessages = messagesFetched.filter( message => !state.entities[message.id]);
      const newMessagesIds = newMessages.map( message => message.id);
      const newMessagesEntities = messagesFetched.reduce((entities: { [id: string]: Message}, message: Message) => {
        return Object.assign(entities, {
          [message.id]: message
        });
      }, {});

      return {
        ids: [...state.ids, ...newMessagesIds],
        entities: Object.assign({}, state.entities, newMessagesEntities),
        selectedMessageId: state.selectedMessageId,
        isFetching: false
      };
    }

    case messages.SELECT_MESSAGE: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedMessageId: action.payload,
        isFetching: state.isFetching
      };
    }

    case messages.SEND_MESSAGE:
    case messages.RECIEVE_MESSAGE: {
      const newMessage = action.payload;
      const newMessageId = newMessage.id;

      return {
        ids:  [...state.ids, newMessageId ],
        entities: Object.assign({}, state.entities, {
          [newMessageId]: newMessage
        }),
        selectedMessageId: state.selectedMessageId,
        isFetching: state.isFetching
      };
    }

    default: {
      return state;
    }
  }
}


export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedMessageId;
export const getFetching = (state: State) => state.isFetching;
