
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ApiService } from '../services/api.service';

import * as auth from '../actions/auth';
import * as users from '../actions/users.actions';
import * as fromRoot from '../reducers';


@Injectable()
export class AuthEffects {

  @Effect()
  login$: Observable<Action> = this.actions$
  .ofType(auth.LOGIN)
  .switchMap( () => {

    return this.api.retrieveUser('ildafon')
      .map(res => new auth.LoginSuccessAction(res))
      .catch(() => of(new auth.LoginErrorAction('error')));
  });


  constructor(
    private actions$: Actions,
    private api: ApiService,
    private store: Store<fromRoot.State>) {}
}
