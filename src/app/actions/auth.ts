
import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const LOGIN =          '[Auth] Login';
export const LOGIN_SUCCESS =  '[Auth] Login Success';
export const LOGIN_ERROR =  '[Auth] Login Error';

export class LoginAction  implements Action {
  readonly type = LOGIN;
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor (public payload: User) {}
}

export class LoginErrorAction implements Action {
  readonly type = LOGIN_ERROR;

  constructor (public payload: string) {}
}

export type Actions = LoginAction | LoginSuccessAction;
