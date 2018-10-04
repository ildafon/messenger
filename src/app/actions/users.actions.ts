import { Action } from '@ngrx/store';

import { User } from './../models/user.model';

export enum UserActionTypes {
  LOAD = '[Users] Load',
  LOAD_COMPLETE = '[Users] Load Complete',
  SELECT = '[Users] Select One'
}

export class LoadAction implements Action {
  readonly type = UserActionTypes.LOAD;
}

export class LoadCompleteAction implements Action {
  readonly type = UserActionTypes.LOAD_COMPLETE;

  constructor(public payload: User[]) {}
}

export class SelectAction implements Action {
  readonly type = UserActionTypes.SELECT;

  constructor(public payload: string) {}
}

export type UserActions =
  LoadAction
| LoadCompleteAction
| SelectAction;

