import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMenuButtonComponent } from './navbar-menu-button.component';

describe('NavbarMenuButtonComponent', () => {
  let component: NavbarMenuButtonComponent;
  let fixture: ComponentFixture<NavbarMenuButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarMenuButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
