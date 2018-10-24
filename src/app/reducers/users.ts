import { createSelector} from 'reselect';
import { User } from '../models/user.model';
import * as users from '../actions/users.actions';

export interface State {
  ids: string[];
  entities: { [id: string]: User};
  selectedUserId: string | null;
  isFetching: boolean;
  isRetrieving: boolean;
  retrievedUsersIds: string[];
  currentUserId: string | null;
}

export const InitialState: State = {
  ids: [],
  entities: {},
  selectedUserId: null,
  isFetching: false,
  isRetrieving: false,
  retrievedUsersIds: [],
  currentUserId: null
};

export function reducer( state = InitialState, action: users.Actions): State {
  switch (action.type) {
    case users.CURRENT_USER: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedUserId: state.selectedUserId,
        isFetching: state.isFetching,
        isRetrieving: state.isRetrieving,
        retrievedUsersIds: state.retrievedUsersIds,
        currentUserId: action.payload
      };
    }

    case users.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedUserId: action.payload,
        isFetching: state.isFetching,
        isRetrieving: state.isRetrieving,
        retrievedUsersIds: state.retrievedUsersIds,
        currentUserId: state.currentUserId
      };
    }

    case users.FETCH: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedUserId: state.selectedUserId,
        isFetching: true,
        isRetrieving: state.isRetrieving,
        retrievedUsersIds: state.retrievedUsersIds,
        currentUserId: state.currentUserId
      };
    }

    case users.FETCH_COMPLETE: {
      const usersFetched = action.payload;
      // If fetched user differ with user infon in store, update it.
      const newUsers = usersFetched.filter( user => !state.entities[user.login]);
      const newUsersIds = newUsers.map( user => user.login);
      const newUsersEntities = usersFetched.reduce((entities: { [id: string]: User}, user: User) => {
        return Object.assign(entities, {
          [user.login]: {...state.entities[user.login], ...user}
        });
      }, {});

      return {
        ids: [...state.ids, ...newUsersIds],
        entities: Object.assign({}, state.entities, newUsersEntities),
        selectedUserId: state.selectedUserId,
        isFetching: false,
        isRetrieving: state.isRetrieving,
        retrievedUsersIds: state.retrievedUsersIds,
        currentUserId: state.currentUserId
      };
    }

    case users.RETRIEVE_USER_SUCCESS: {
      const userRetrieved = action.payload;
      const userId = userRetrieved.login;

      const { [userId]: value, ...without} = state.entities;

      return {
        ids: state.ids,
        entities: Object.assign({}, without, {
          [userId]: {...userRetrieved }
        }),
        selectedUserId: state.selectedUserId,
        isFetching: state.isFetching,
        isRetrieving: false,
        retrievedUsersIds: [...state.retrievedUsersIds, userRetrieved.login ],
        currentUserId: state.currentUserId
      };
    }

    case users.RETRIEVE_USER: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedUserId: state.selectedUserId,
        isFetching: state.isFetching,
        isRetrieving: true,
        retrievedUsersIds: state.retrievedUsersIds,
        currentUserId: state.currentUserId
      };
    }


    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedUserId;
export const getFetching = (state: State) => state.isFetching;
export const getRetrieving = (state: State) => state.isRetrieving;
export const getRetrievedIds = (state: State) => state.retrievedUsersIds;
export const getCurrentUserId = (state: State) => state.currentUserId;
export const getCurrentUser = createSelector(getEntities, getCurrentUserId, (entities, id) => {
  return entities[id];
});

