import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from './../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';


import * as fromUsers from './users';
import * as fromMessages from './messages';

import { User, Message } from '../models';


export interface State {
  users:      fromUsers.State;
  messages:   fromMessages.State;
  router:     fromRouter.RouterState;
}

const reducers = {
  users:    fromUsers.reducer,
  messages: fromMessages.reducer,
  router:   fromRouter.routerReducer
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
export const getUsersEntities = createSelector(getUsersState, fromUsers.getEntities);
export const getUsersRetrievedIds = createSelector(getUsersState, fromUsers.getRetrievedIds);
export const getUsersSelectedId = createSelector(getUsersState, fromUsers.getSelectedId);
export const getUsersFetching = createSelector(getUsersState, fromUsers.getFetching);

export const getUsersSelectedUser = createSelector(getUsersEntities, getUsersSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getMessagesState = (state: State) => state.messages;
export const getMessagesIds = createSelector(getMessagesState, fromMessages.getIds);
export const getMessagesEntities = createSelector(getMessagesState, fromMessages.getEntities);
export const getMessagesSelectedId = createSelector(getMessagesState, fromMessages.getSelectedId);
export const getMessagesFetching = createSelector(getMessagesState, fromMessages.getFetching);

export const getMessagesOfSelectedUser = createSelector(getMessagesEntities, getUsersSelectedId,
  (messages, ofUser) => {
  return Object.values(messages).filter( message => message.conversation === ofUser);
});

export const getAuthorOfMessage = (authorId: string) => {
  return createSelector(getUsersEntities, (entities) => {
    return entities[authorId];
  });
};


export const isUserAlreadyRetrieved = (userId: string) => {
  return createSelector(getUsersRetrievedIds, (ids) => {
    return ids.indexOf(userId) > -1;
  });
};

