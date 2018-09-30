import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Message} from './../../models/message';

@Component({
  selector: 'msg-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  messages: Message[];

  constructor(private service: ApiService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
    .switchMap( (params: ParamMap ) => this.service.getConversationHistory(params.get('id')))
    .subscribe( messages => this.messages = messages);
  }

}
