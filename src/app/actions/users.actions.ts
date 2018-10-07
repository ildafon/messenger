import { Action } from '@ngrx/store';


export const FEATCH = '[Users] Fetch';
export const FEATCH_COMPLETE = '[Users] Fetch Complete';

export class FeatchAction  implements Action {
  readonly type = FEATCH;
}

export class FeatchCompleteAction implements Action {
  readonly type = FEATCH_COMPLETE;

  constructor (public payload: User[]) {}
}
