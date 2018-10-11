import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import * as users from './actions/users.actions';
import * as messages from './actions/messages.actions';

@Component({
  selector: 'msg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'msg';
  constructor (
   private store: Store<fromRoot.State>
    ) {
     store.dispatch(new messages.FetchMessagesAction());
//      store.dispatch(new users.RetrieveUserAction('ry'));
//      store.dispatch(new users.SelectAction('ry'));
  }
}
