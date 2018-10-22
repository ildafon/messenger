
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy,
         AfterViewChecked, ElementRef, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { MessageExt } from './../../models/message.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'msg-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  name$: Observable<string>;
  messages$: Observable<any>;

  constructor(private store: Store<fromRoot.State>) {
   }

  ngOnInit() {
    this.name$ = this.store.select(fromRoot.getSelectedUserName);
    this.messages$ = this.store.select(fromRoot.getMessagesOfSelectedUser);
    // this.messages$ = this.store.select(fromRoot.getMessageIdsOfSelectedUser);

    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

// https://stackoverflow.com/questions/35232731/angular2-scroll-to-bottom-chat-style
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

}
