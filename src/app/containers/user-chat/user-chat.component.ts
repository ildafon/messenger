
import { SendMessageAction } from './../../actions/messages.actions';
import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy,
         AfterViewChecked, ElementRef, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Message, MessageExt } from './../../models/message.model';
import * as actions from '../../actions/messages.actions';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'msg-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  disableScrollDown = false;

  name$: Observable<string>;
  messages$: Observable<any>;

  currentUserId: string;
  currentUserIdSubscription: Subscription;

  conversation: string;
  conversationSubscription:  Subscription;



  constructor(private store: Store<fromRoot.State>) {
    store.dispatch(new actions.FetchMessagesAction());

   }

  ngOnInit() {
    this.name$ = this.store.select(fromRoot.getSelectedUserName);
    this.messages$ = this.store.select(fromRoot.getMessagesOfSelectedUser);

    this.currentUserIdSubscription = this.store.select(fromRoot.getUsersCurrentUserId)
      .subscribe(id => this.currentUserId = id);
    this.conversationSubscription = this.store.select(fromRoot.getUsersSelectedId)
      .subscribe(id => this.conversation = id);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private onScroll() {
    const element = this.myScrollContainer.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (this.disableScrollDown && atBottom) {
        this.disableScrollDown = false;
    } else {
        this.disableScrollDown = true;
    }
}


// https://stackoverflow.com/questions/35232731/angular2-scroll-to-bottom-chat-style
  scrollToBottom(): void {
    if (this.disableScrollDown) {
      return;
  }
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  // id: string;
  // author: string | User;
  // text: string;
  // conversation: string | User;
  // createdAt: string;
  onNewMessage(messageText) {

    const messageToSend: Message = {
      id: uuid(),
      author: this.currentUserId,
      text: messageText.text,
      conversation: this.conversation,
      createdAt: new Date()
    };
    this.disableScrollDown = false;

    this.store.dispatch(new actions.SendMessageAction(messageToSend));
    // this.scrollToBottom();
  }

  ngOnDestroy() {
    this.currentUserIdSubscription.unsubscribe();
    this.conversationSubscription.unsubscribe();
  }

}
