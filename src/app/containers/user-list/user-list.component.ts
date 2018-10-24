import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { User } from '../../models';
import * as users from '../../actions/users.actions';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'msg-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  showState$: Observable<string>;


  constructor(private store: Store<fromRoot.State>) {
    store.dispatch(new users.FetchAction);
    this.users$ = this.store.select(fromRoot.getUsersFetched);
    this.showState$ = this.store.select(fromRoot.getShowState);
   }

  ngOnInit() {
  }

  trackByFn(index, item) {
    return item.id;
 }

}
