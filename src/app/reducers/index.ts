import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from './../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';


import * as fromUsers from './users';


export interface State {
  users: fromUsers.State;
  router: fromRouter.RouterState;
}

const reducers = {
  users: fromUsers.reducer,
  router: fromRouter.routerReducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getUsersState = (state: State) => state.users;
export const getRetrievedUserIds = createSelector(getUsersState, fromUsers.getRetrievedIds);
export const getSelectedUserId = createSelector(getUsersState, fromUsers.getSelectedId);


export const alreadyRetrieved = createSelector(getRetrievedUserIds, getSelectedUserId, (ids, selected) => {
  return ids.indexOf(selected) > -1;
});
