import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Message } from '../../models/message.model';

@Component({
  selector: 'msg-new-message-form',
  templateUrl: './new-message-form.component.html',
  styleUrls: ['./new-message-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewMessageFormComponent implements OnInit {
  @Output() newMessage = new EventEmitter();

  message: Message = {} as Message;
  messageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.messageForm = this.fb.group({
      text: ['', [
                  Validators.required,
                  Validators.min(1)]
                ]
    });
  }

  ngOnInit() {
  }

  submitForm() {
    this.updateMessage(this.messageForm.value);
    this.newMessage.emit(this.message);
    this.messageForm.reset();
  }
  resetForm () {
    this.messageForm.reset();
  }

  updateMessage( values: Object) {
    Object.assign(this.message, values);
  }

}
