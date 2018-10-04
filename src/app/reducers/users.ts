import { User } from './../models/user.model';
import {UserActionTypes, UserActions} from './../actions/users.actions';

export interface State {
  ids: string[];
  entities: {};
  selectedUserId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedUserId: null,
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.LOAD_COMPLETE: {
      const users = action.payload;

      const userIds = users.map(user => user.id);
      const userEntities = users.reduce(( entities: {[id: string]: User}, user: User) => {
        return Object.assign(entities, {
          [user.id]: user
        });
      } , {});

      return {
        ids: [...state.ids, ...userIds ],
        entities: Object.assign({}, state.entities, userEntities),
        selectedUserId: state.selectedUserId
      };
    }

    case UserActionTypes.SELECT:
      return {
        ids: state.ids,
        entities: state.entities,
        selectedUserId: action.payload
      };

    default:
      return state;
  }
}
