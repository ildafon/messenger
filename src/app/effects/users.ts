
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/mapTo';

import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { ApiService } from '../services/api.service';

import * as users from '../actions/users.actions';
import * as fromRoot from '../reducers';


@Injectable()
export class UsersEffects {

  @Effect()
  fetch$: Observable<Action> = this.actions$
  .ofType(users.FETCH)
  .switchMap( () => {

    return this.api.fetchUsers()
      .map(res => new users.FetchCompleteAction(res))
      .catch(() => of(new users.FetchCompleteAction([])));
  });


  @Effect()
  select$ = this.actions$
  .ofType(users.SELECT)
  .switchMap( (action ) => {
      return of(action)
        .withLatestFrom(this.store.select(fromRoot.isUserAlreadyRetrieved(action.payload)));
  })
  .switchMap( ([action, alreadyRetrieved]) => {
    if (alreadyRetrieved) {
      return empty();
    } else {
     return of(new users.RetrieveUserAction(action.payload));
    }
  });

  @Effect()
  current$ = this.actions$
  .ofType( users.CURRENT_USER)
  .switchMap( (action ) => {
      return of(action)
        .withLatestFrom(this.store.select(fromRoot.isUserAlreadyRetrieved(action.payload)));
  })
  .switchMap( ([action, alreadyRetrieved]) => {
    if (alreadyRetrieved) {
      return empty();
    } else {
    return this.api.retrieveUser(action.payload)
      .map(res => new users.RetrieveUserSuccessAction(res))
      .catch(() => of(new users.RetrieveUserFailAction('error')));
    }
  });

  @Effect()
  retrieve$ = this.actions$
  .ofType(users.RETRIEVE_USER)
  .switchMap( (action) => {
    return this.api.retrieveUser(action.payload)
      .map(res => new users.RetrieveUserSuccessAction(res))
      .catch(() => of(new users.RetrieveUserFailAction('error')));
  });



  constructor(
    private actions$: Actions,
    private api: ApiService,
    private store: Store<fromRoot.State>) {}
}
