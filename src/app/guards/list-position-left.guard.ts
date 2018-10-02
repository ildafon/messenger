import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserListPositionService } from './../services/user-list-position.service';

@Injectable()
export class ListPositionLeft implements CanActivate {

  constructor(private userListService: UserListPositionService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.userListService.shiftLeft();
    return true;

  }
}
