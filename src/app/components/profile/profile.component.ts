
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { User } from './../../models/user.model';
@Component({
  selector: 'msg-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  @Input() user: User;
  @Input() retrieving: boolean;

  constructor() { }

  ngOnInit() {
  }

  get avatar() {
    return this.user && this.user.avatar_url;
  }

  get name() {
    return this.user && this.user.name;
  }

  get location() {
    return this.user && this.user.location;
  }

  get company() {
    return this.user && this.user.company ;
  }

  get blog() {
    return this.user && this.user.blog;
  }

}
