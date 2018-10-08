import { createSelector} from 'reselect';
import { User } from '../models/user.model';
import * as users from '../actions/users.actions';

export interface State {
  updatedUsersIds: string[];
  entities: { [id: string]: User};
  selectedUserId: string | null;
  isFetching: boolean;
  fetched: boolean;
}

export const InitialState: State = {
  updatedUsersIds: [],
  entities: {},
  selectedUserId: null,
  isFetching: false,
  fetched: false
};

export function reducer( state = InitialState, action: users.Actions): State {
  switch (action.type) {
    case users.FETCH: {
      return {
        updatedUsersIds: state.updatedUsersIds,
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
        updatedUsersIds: state.updatedUsersIds,
        entities: Object.assign({}, state.entities, newUsersEntities),
        selectedUserId: state.selectedUserId,
        isFetching: false,
        fetched: true
      };
    }

    default: {
      return state;
    }
  }
}
