import { Action } from '@ngrx/store';

import { User } from './../models/user.model';

export const FETCH = '[Users] Fetch';
export const FETCH_COMPLETE = '[Users] Fetch Complete';


export class FetchAction  implements Action {
  readonly type = FETCH;
}

export class FetchCompleteAction implements Action {
  readonly type = FETCH_COMPLETE;

  constructor (public payload: User[]) {}
}

export type Actions
= FetchAction
| FetchCompleteAction;
