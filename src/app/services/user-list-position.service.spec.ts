import { TestBed, inject } from '@angular/core/testing';

import { UserListPositionService } from './user-list-position.service';

describe('UserListPositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserListPositionService]
    });
  });

  it('should be created', inject([UserListPositionService], (service: UserListPositionService) => {
    expect(service).toBeTruthy();
  }));
});
