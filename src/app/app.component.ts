import { Component } from '@angular/core';
import { UserListPositionService } from './services/user-list-position.service';

@Component({
  selector: 'msg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'msg';

  constructor(private userListPosition: UserListPositionService) {
    this.userListPosition.centrolize();
  }

}
