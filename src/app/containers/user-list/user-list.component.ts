import { Observable } from 'rxjs/Observable';


import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserListItem } from './../../models/user-list.model';

@Component({
  selector: 'msg-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userlist$: Observable<UserListItem[]>;

  constructor(private service: ApiService) { }

  ngOnInit() {
    this.userlist$ = this.service.getUserList();
  }

}
