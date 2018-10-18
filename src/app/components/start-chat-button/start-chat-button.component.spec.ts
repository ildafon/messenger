import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartChatButtonComponent } from './start-chat-button.component';

describe('StartChatButtonComponent', () => {
  let component: StartChatButtonComponent;
  let fixture: ComponentFixture<StartChatButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartChatButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartChatButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
