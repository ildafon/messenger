import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as user from '../../actions/users.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'msg-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  showState$: Observable<string>;
  userId: string;
  actionsSubscription: Subscription;

  constructor(
          private store: Store<fromRoot.State>,
          private route: ActivatedRoute,
          private router: Router) {
    this.actionsSubscription = route.params
      .select<string>('id')
      .map(id => {
        this.userId = id;
        return new user.SelectAction(id);
      })
      .subscribe(store);

   }

  ngOnInit() {
    this.showState$ = this.store.select(fromRoot.getShowState);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  startChat() {
    this.router.navigate(['/users', this.userId, 'conversation']);
  }
}
