import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'msg-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  showState$: Observable<string>;
  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.showState$ = this.store.select(fromRoot.getShowState);
  }

}
