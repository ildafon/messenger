import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/withLatestFrom';

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
  retrieve$: Observable<Action> = this.actions$
  .ofType(users.RETRIEVE_USER)
  .map(toPayload)
  .switchMap( (query) => {

    return this.api.retrieveUser(query)
      .map(res => new users.RetrieveUserSuccessAction(res))
      .catch(() => of(new users.RetrieveUserFailAction('error')));
  });

  @Effect()
  select$: Observable<Action> = this.actions$
    .ofType(users.SELECT)
    .map(toPayload)
    .withLatestFrom(this.store.select(fromRoot.alreadyRetrieved))
    .map(([userId, isRetrieved]) => {
      if (isRetrieved) {
        return new users.RetrieveUserAction('');
      } else {
        return new users.RetrieveUserAction(userId);
      }
    });



  constructor(
    private actions$: Actions,
    private api: ApiService,
    private store: Store<fromRoot.State>) {}
}
