import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

@Injectable()
export class ShowStateService implements OnInit {
  showState$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.showState$  = this.store.select(fromRoot.getShowState);
  }

  getShowState() {
    return this.showState$;
  }

}
