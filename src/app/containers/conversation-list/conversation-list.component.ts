import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Conversation } from '../../models/conversation';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'msg-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {
  conversations: Conversation[];

  constructor(
    private service: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getConversationList()
    .subscribe(convs => this.conversations = convs.json());
  }

}
