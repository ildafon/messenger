import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Message} from './../../models/message';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'msg-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  conversationId: string;
  messages: Message[];
  messageForm: FormGroup;

  constructor(private service: ApiService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap
    .switchMap( (params: ParamMap ) => {
      this.conversationId = params.get('id');
      return this.service.getConversationHistory(this.conversationId);
    })
    .subscribe( messages => this.messages = messages);

    this.messageForm = this.fb.group({
      message: ''
    });
  }

  addMessage() {
    const newMessage: Message = {
      id: '200',
      author: this.conversationId,
      text: this.messageForm.get('message').value,
      createdAt: new Date(Date.now()).toLocaleString()
    };
    this.messages.push(newMessage);
    this.messageForm.reset();
  }

}
