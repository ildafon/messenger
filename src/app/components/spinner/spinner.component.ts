import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'msg-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}