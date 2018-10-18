import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import {User, Message} from './models';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import * as users from './actions/users.actions';
import * as messages from './actions/messages.actions';

@Component({
  selector: 'msg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  value$: Observable<User>;
  constructor (
   private store: Store<fromRoot.State>,
   private router: Router
    ) {
    store.dispatch(new users.CurrentUserAction('ildafon'));
    store.dispatch(new users.FetchAction);
    store.dispatch(new messages.FetchMessagesAction());
  }

  ngOnInit() {
    // this.value$ = this.store.select(fromRoot.getAuthorOfMessage('ry'));

  }

  toUserList() {
    this.router.navigateByUrl('/users');
  }

}
