import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'msg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  constructor() { }

  ngOnInit() {
  }

}
