import { TestBed, inject } from '@angular/core/testing';

import { ShowStateService } from './show-state.service';

describe('ShowStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowStateService]
    });
  });

  it('should be created', inject([ShowStateService], (service: ShowStateService) => {
    expect(service).toBeTruthy();
  }));
});
