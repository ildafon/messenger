import { Conversation } from '../../models/conversation.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'msg-avatar-generator',
  templateUrl: './avatar-generator.component.html',
  styleUrls: ['./avatar-generator.component.scss']
})
export class AvatarGeneratorComponent implements OnInit {
  @Input() conversation: Conversation;
  initials: string;
  firstName: string;
  secondName: string;

  constructor() {
   }

  ngOnInit() {
    this.firstName =  (this.conversation) ? this.conversation.firstname : '';
    this.secondName = (this.conversation) ? this.conversation.secondname : '';
    this.initials = this.firstName.charAt(0) + this.secondName.charAt(0);
  }

}
