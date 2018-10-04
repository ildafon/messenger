import { Action } from '@ngrx/store';

import { User } from './../models/user.model';

export enum UserActionTypes {
  LOAD = '[Users] Load',
  LOAD_SUCCESS = '[Users] Load Success',
  LOAD_ERROR = '[Users] LOAD Error',
  SELECT = '[Users] Select One'
}

export type UserActions =
