import {NormalizationService} from './../services/normalization.service';
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

export const getSelectedUserName = createSelector(getUsersSelectedUser, (user) => {
  return user && user.name;
});

export const getUsersCurrentUserId = createSelector(getUsersState, fromUsers.getCurrentUserId);
export const getUsersCurrentUser = createSelector(getUsersEntities, getUsersCurrentUserId, (entities, currentUserId) => {
  return entities[currentUserId];
});

export const getUsersFetched = createSelector(getUsersEntities, getUsersCurrentUserId, (entities, curentId) => {
  // return Object.values(entities).filter(user => user.login !== curentId);
  return Object.keys(entities).map(function(e) {
    return entities[e];
  })
  .filter(user => user.login !== curentId);
});


export const getMessagesState = (state: State) => state.messages;
export const getMessagesIds = createSelector(getMessagesState, fromMessages.getIds);
export const getMessagesEntities = createSelector(getMessagesState, fromMessages.getEntities);
export const getMessagesSelectedId = createSelector(getMessagesState, fromMessages.getSelectedId);
export const getMessagesFetching = createSelector(getMessagesState, fromMessages.getFetching);

export const isSelectedUserhasMessages = createSelector(getMessagesEntities, getUsersSelectedId,
  (messages, ofUser) => {
  // return Object.values(messages).map( message => message.author).indexOf(ofUser) > -1;
  return Object.keys(messages)
    .map(function(e) {
      return messages[e];
    })
    .map( message => message.author)
    .indexOf(ofUser) > -1;
});

export const getMessageIdsOfSelectedUser = createSelector(getMessagesEntities, getUsersSelectedId,
  (messages, ofUser) => {
  // return Object.values(messages).filter( message => message.conversation === ofUser).map( message => message.id);
  return Object.keys(messages)
      .map(function(e) {
        return messages[e];
      })
      .filter( message => message.conversation === ofUser )
      .map( message => message.id);
});

export const getMessagesOfSelectedUser =
   createSelector(getMessagesEntities, getUsersEntities, getMessageIdsOfSelectedUser, (messageEntities, userEntities, ids) => {
    const entitiesAggregated = Object.assign({}, {
      'messages': messageEntities,
      'users':    userEntities
    });

    return ids && NormalizationService.denormalize(ids, entitiesAggregated);
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



export const getRouterState = (state: State) => state.router;
export const getShowState = createSelector(getRouterState, (state: fromRouter.RouterState) => {
  switch (state.path && state.path.split('/').length) {
    case 2: {
      return 'show-state show-state--list';
    }
    case 3: {
      return 'show-state show-state--detail';
    }
    case 4: {
      return 'show-state show-state--chat';
    }
    default:  return '';
  }
});

