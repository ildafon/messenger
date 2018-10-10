
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
  .map(toPayload)
  .withLatestFrom(this.store.select(fromRoot.alreadyRetrieved))
  .switchMap( ([query, alreadyRetrieved]) => {
    if (alreadyRetrieved) {
      return empty();
    } else {
    return this.api.retrieveUser(query)
      .map(res => new users.RetrieveUserSuccessAction(res))
      .catch(() => of(new users.RetrieveUserFailAction('error')));
    }
  });

  @Effect()
  retrieve$ = this.actions$
  .ofType(users.RETRIEVE_USER)
  .map( action => action.payload )
  .map( payload => {
    return new users.SelectAction(payload);
  });


  constructor(
    private actions$: Actions,
    private api: ApiService,
    private store: Store<fromRoot.State>) {}
}
