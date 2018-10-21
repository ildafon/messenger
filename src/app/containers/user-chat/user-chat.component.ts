
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { MessageExt } from './../../models/message.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'msg-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit {
  name$: Observable<string>;
  messages$: Observable<any>;

  constructor(private store: Store<fromRoot.State>) {
   }

  ngOnInit() {
    this.name$ = this.store.select(fromRoot.getSelectedUserName);
    this.messages$ = this.store.select(fromRoot.getMessagesOfSelectedUser);
    // this.messages$ = this.store.select(fromRoot.getMessageIdsOfSelectedUser);
  }

}
