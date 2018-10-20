import { User } from './../../models/user.model';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'msg-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {
  @Input() user: User;
  @Input() currentlySelected: boolean;
  initials: string;

  constructor() { }

  ngOnInit() {
    const  words = this.user.name.match(/\b\w/g) || [];

    this.initials = ((words.shift() || '') + (words.pop() || '')).toUpperCase();
  }

  get name() {
    return this.user.name;
  }
}
