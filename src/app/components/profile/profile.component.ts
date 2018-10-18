import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { User } from './../../models/user.model';
@Component({
  selector: 'msg-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  user: Observable<User>;
  constructor() { }

  ngOnInit() {
  }

}
