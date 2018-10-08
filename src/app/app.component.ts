import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import * as users from './actions/users.actions';

@Component({
  selector: 'msg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'msg';

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new users.FetchAction());
  }
}
