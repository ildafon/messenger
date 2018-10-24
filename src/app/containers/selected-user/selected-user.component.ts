import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy , EventEmitter, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { User } from './../../models/user.model';
import { relative } from 'path';

@Component({
  selector: 'msg-selected-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <msg-profile [user]="user$ | async" class="">
    <msg-start-chat-button class="msgr-start-chat-button" (click)="startChat()"></msg-start-chat-button>
  </msg-profile>
  `,
  styles: [`
    .msg-profile {
      position: relative;
    }
    .msgr-start-chat-button {
      position: absolute;
      // bottom: 210px;
      top: 20px;
      right: 20px;
    }
  `]
})
export class SelectedUserComponent implements OnInit {
  user$: Observable<User>;
  @Output() chat = new EventEmitter();

  constructor(private store: Store<fromRoot.State>) {
    this.user$ = this.store.select(fromRoot.getUsersSelectedUser);
  }

  ngOnInit() {
  }

  startChat() {
    this.chat.emit();
  }

}
