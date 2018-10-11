

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

import * as messages from '../actions/messages.actions';
import * as fromRoot from '../reducers';


@Injectable()
export class MessagesEffects {

  @Effect()
  fetch$: Observable<Action> = this.actions$
  .ofType(messages.FETCH_MESSAGES)
  .switchMap( () => {

    return this.api.fetchMessages()
      .map(res => new messages.FetchMessagesCompleteAction(res))
      .catch(() => of(new messages.FetchMessagesCompleteAction([])));
  });


  constructor(
    private actions$: Actions,
    private api: ApiService,
    private store: Store<fromRoot.State>) {}
}
