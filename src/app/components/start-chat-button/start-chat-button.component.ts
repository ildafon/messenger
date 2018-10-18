import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'msg-start-chat-button',
  templateUrl: './start-chat-button.component.html',
  styleUrls: ['./start-chat-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartChatButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
