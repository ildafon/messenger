
import { Action } from '@ngrx/store';

import { Message } from './../models/message.model';

export const FETCH_MESSAGES =                    '[Messages] Fetch';
export const FETCH_MESSAGES_COMPLETE =           '[Messages] Fetch Complete';

export const SELECT_MESSAGE =                   '[Message] Select';
export const SEND_MESSAGE =                     '[Message] Send';
export const RECIEVE_MESSAGE =                     '[Message] Recieve';



export class FetchMessagesAction  implements Action {
  readonly type = FETCH_MESSAGES;
}

export class FetchMessagesCompleteAction implements Action {
  readonly type = FETCH_MESSAGES_COMPLETE;

  constructor (public payload: Message[]) {}
}

export class SelectMessageAction implements Action {
  readonly type = SELECT_MESSAGE;

  constructor (public payload: string) {}
}

export class SendMessageAction implements Action {
  readonly type = SEND_MESSAGE;

  constructor (public payload: Message) {}
}

export class RecieveMessageAction implements Action {
  readonly type = RECIEVE_MESSAGE;

  constructor (public payload: Message) {}
}




export type Actions
= FetchMessagesAction
| FetchMessagesCompleteAction
| SelectMessageAction
| SendMessageAction
| RecieveMessageAction;
