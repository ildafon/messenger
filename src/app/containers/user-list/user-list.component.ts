import { Observable } from 'rxjs/Observable';


import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserListPositionService } from './../../services/user-list-position.service';
import { UserListItem, UserId } from './../../models/user-list.model';
import { Router, NavigationStart} from '@angular/router';

@Component({
  selector: 'msg-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userlist$: Observable<UserId[]>;
  listPositionCenter$: Observable<boolean>;

  constructor(
    private service: ApiService,
    private router: Router,
    private userListService: UserListPositionService
    ) {
  }

  ngOnInit() {
    this.userlist$ = this.service.getUserIds();
    this.listPositionCenter$ = this.userListService.positionCenter;
  }

}
