import { RETRIEVE_USER_SUCCESS } from './../actions/users.actions';
import { createSelector} from 'reselect';
import { User } from '../models/user.model';
import * as users from '../actions/users.actions';

export interface State {
  retrievedUsersIds: string[];
  entities: { [id: string]: User};
  selectedUserId: string | null;
  isFetching: boolean;
  fetched: boolean;
}

export const InitialState: State = {
  retrievedUsersIds: [],
  entities: {},
  selectedUserId: null,
  isFetching: false,
  fetched: false
};

export function reducer( state = InitialState, action: users.Actions): State {
  switch (action.type) {
    case users.FETCH: {
      return {
        retrievedUsersIds: state.retrievedUsersIds,
        entities: state.entities,
        selectedUserId: state.selectedUserId,
        isFetching: true,
        fetched: false
      };
    }

    case users.FETCH_COMPLETE: {
      const newUsers = action.payload;
      const newUsersEntities = newUsers.reduce((entities: { [id: string]: User}, user: User) => {
        return Object.assign(entities, {
          [user.login]: user
        });
      }, {});

      return {
        retrievedUsersIds: state.retrievedUsersIds,
        entities: Object.assign({}, state.entities, newUsersEntities),
        selectedUserId: state.selectedUserId,
        isFetching: false,
        fetched: true
      };
    }

    case users.SELECT: {
      return {
        retrievedUsersIds: state.retrievedUsersIds,
        entities: state.entities,
        selectedUserId: action.payload,
        isFetching: state.isFetching,
        fetched: state.fetched
      };
    }

    case users.RETRIEVE_USER_SUCCESS: {
      const userRetrieved = action.payload;
      const userId = userRetrieved.login;

      const userInStore = state.entities[userId];

      if (state.retrievedUsersIds.indexOf(userRetrieved.login) > -1) {
        return state;
      }

      return {
        retrievedUsersIds: [...state.retrievedUsersIds, userRetrieved.login ],
        entities: Object.assign({}, state.entities, {
          [userId]: {...userRetrieved, ...userInStore, }
        }),
        selectedUserId: state.selectedUserId,
        isFetching: state.isFetching,
        fetched: state.fetched
      };
    }

    default: {
      return state;
    }
  }
}
