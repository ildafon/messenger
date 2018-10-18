import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding} from '@angular/core';
import { User } from './../../models/user.model';

@Component({
  selector: 'msg-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListItemComponent implements OnInit {

@Input() user: User;

itemClass: string;

  constructor() { }

  ngOnInit() {
  }

  get login() {
    return this.user.login;
  }

  get name() {
    return this.user.name;
  }
}
