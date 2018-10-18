import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'msg-navbar-menu-button',
  templateUrl: './navbar-menu-button.component.html',
  styleUrls: ['./navbar-menu-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarMenuButtonComponent implements OnInit {
  @Output() toUserList = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
