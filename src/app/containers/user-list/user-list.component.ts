import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'msg-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  showState$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.showState$ = this.store.select(fromRoot.getShowState);
  }
}
