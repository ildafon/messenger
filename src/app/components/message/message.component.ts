import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { MessageExt} from './../../models';

@Component({
  selector: 'msg-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnInit {
  @Input() message: MessageExt;

  constructor() { }

  ngOnInit() {
  }

  get messageText() {
    return this.message && this.message.text;
  }

  get messageDate() {
    return this.message && this.message.createdAt;
  }

  get authorsName() {
    return this.message  && this.message.author.name;
  }

  get authorsAvatar() {
    return this.message  && this.message.author.avatar_url;
  }

  get messageOfCurrentUser() {
    return this.message && this.message.author.login !== this.message.conversation.login;
  }

}
