import { createSelector} from 'reselect';
import { User} from '../models/user.model';
import * as auth from '../actions/auth';

export interface State {
  isAuthenticated: boolean;
  currentUser: User | null;
}

export const InitialState: State = {
  isAuthenticated: false,
  currentUser: null
};

export function reducer( state = InitialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN_SUCCESS: {
      return {
        isAuthenticated: true,
        currentUser: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
