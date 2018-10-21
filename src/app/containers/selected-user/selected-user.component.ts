import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { User } from './../../models/user.model';

@Component({
  selector: 'msg-selected-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <msg-profile [user]="user$ | async"></msg-profile>
  `
})
export class SelectedUserComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store<fromRoot.State>) {
    this.user$ = this.store.select(fromRoot.getUsersSelectedUser);
  }

  ngOnInit() {
  }

}
