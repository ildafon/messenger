import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserListPositionService } from '../services/user-list-position.service';
import { UserDetailComponent } from '../containers/user-detail/user-detail.component';


@Injectable()
export class ListPositionCenter implements CanDeactivate<UserDetailComponent> {

  constructor(private userListService: UserListPositionService) {}

  canDeactivate(
    component: UserDetailComponent,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.userListService.centrolize();
    return true;
  }
}
