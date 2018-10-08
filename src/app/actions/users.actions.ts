
import { Action } from '@ngrx/store';

import { User } from './../models/user.model';

export const FETCH =                    '[Users] Fetch';
export const FETCH_COMPLETE =           '[Users] Fetch Complete';

export const SELECT =                   '[User] Select';

export const RETRIEVE_USER =            '[User] Retrieve User';
export const RETRIEVE_USER_SUCCESS =    '[User] Retrieve User Success';
export const RETRIEVE_USER_FAIL =       '[User] Retrieve User Fail';


export class FetchAction  implements Action {
  readonly type = FETCH;
}

export class FetchCompleteAction implements Action {
  readonly type = FETCH_COMPLETE;

  constructor (public payload: User[]) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor (public payload: string) {}
}

export class RetrieveUserAction implements Action {
  readonly type = RETRIEVE_USER;

  constructor (public payload: string) {}
}

export class RetrieveUserSuccessAction implements Action {
  readonly type = RETRIEVE_USER_SUCCESS;

  constructor (public payload: User) {}
}

export class RetrieveUserFailAction implements Action {
  readonly type = RETRIEVE_USER_FAIL;

  constructor (public payload: any) {}
}



export type Actions
= FetchAction
| FetchCompleteAction
| SelectAction
| RetrieveUserAction
| RetrieveUserSuccessAction
| RetrieveUserFailAction;
