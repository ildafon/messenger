import { Injectable } from '@angular/core';
import { ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class UserListPositionService {

  private userListPositionCenterSubject = new ReplaySubject<boolean>(1);
  public positionCenter = this.userListPositionCenterSubject.asObservable();

  constructor() { }

  centrolize() {
    this.userListPositionCenterSubject.next(true);
  }

  shiftLeft() {
    this.userListPositionCenterSubject.next(false);
  }

}
