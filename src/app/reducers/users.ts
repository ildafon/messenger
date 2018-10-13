import { createSelector} from 'reselect';
import { User } from '../models/user.model';
import * as users from '../actions/users.actions';

export interface State {
  retrievedUsersIds: string[];
  entities: { [id: string]: User};
  selectedUserId: string | null;
  isFetching: boolean;
  currentUserId: string | null;
}

export const InitialState: State = {
  retrievedUsersIds: [],
  entities: {},
  selectedUserId: null,
  isFetching: false,
  currentUserId: null
};

export function reducer( state = InitialState, action: users.Actions): State {
  switch (action.type) {
    case users.CURRENT_USER: {
      return {
        retrievedUsersIds: state.retrievedUsersIds,
        entities: state.entities,
        selectedUserId: action.payload,
        isFetching: state.isFetching,
        currentUserId: action.payload
      };
    }

    case users.SELECT: {
      return {
        retrievedUsersIds: state.retrievedUsersIds,
        entities: state.entities,
        selectedUserId: action.payload,
        isFetching: state.isFetching,
        currentUserId: state.currentUserId
      };
    }

    case users.FETCH: {
      return {
        retrievedUsersIds: state.retrievedUsersIds,
        entities: state.entities,
        selectedUserId: state.selectedUserId,
        isFetching: true,
        currentUserId: state.currentUserId
      };
    }

    case users.FETCH_COMPLETE: {
      const usersFetched = action.payload;
      // If fetched user differ with user infon in store, update it.
      const newUsers = usersFetched.filter( user => !state.entities[user.login]);

      const newUsersEntities = usersFetched.reduce((entities: { [id: string]: User}, user: User) => {
        return Object.assign(entities, {
          // if retrieved users are in the store, save extra data.
          [user.login]: {...state.entities[user.login], ...user}
        });
      }, {});

      return {
        retrievedUsersIds: state.retrievedUsersIds,
        entities: Object.assign({}, state.entities, newUsersEntities),
        selectedUserId: state.selectedUserId,
        isFetching: false,
        currentUserId: state.currentUserId
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
        currentUserId: state.currentUserId
      };
    }

    case users.RETRIEVE_USER: {
      const userIdToRetrieve = action.payload;
      const { [userIdToRetrieve]: value, ...without} = state.entities;
      return {
        retrievedUsersIds: state.retrievedUsersIds.filter( id => id !== userIdToRetrieve ),
        entities: without,
        selectedUserId: state.selectedUserId,
        isFetching: state.isFetching,
        currentUserId: state.currentUserId
      };
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;
export const getRetrievedIds = (state: State) => state.retrievedUsersIds;
export const getSelectedId = (state: State) => state.selectedUserId;
export const getFetching = (state: State) => state.isFetching;
export const getCurrentUserId = (state: State) => state.currentUserId;
export const getCurrentUser = createSelector(getEntities, getCurrentUserId, (entities, id) => {
  return entities[id];
});

