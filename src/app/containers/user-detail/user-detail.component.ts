import 'rxjs/add/operator/switchMap';
import { UserDetail } from './../../models/user-detail.model';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'msg-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: UserDetail;

  constructor(
    private service: ApiService,
    private route: ActivatedRoute,
    private router: Router
   ) {}

  ngOnInit(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.service.getUserDetail(params.get('id')))
    .subscribe( user => this.user = user);
  }

  goToChat() {
    this.router.navigateByUrl(`/conversations/${this.user.id}`);
  }
}
