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
  conversations$: Observable<Conversation[]>;

  constructor(
    private service: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.conversations$ = this.service.getConversationList();
  }

  // https://stackblitz.com/edit/angular-random-color?file=app%2Fapp.component.ts
  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
