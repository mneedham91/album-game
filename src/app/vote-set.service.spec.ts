import { TestBed } from '@angular/core/testing';

import { VoteSetService } from './vote-set.service';

describe('VoteSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoteSetService = TestBed.get(VoteSetService);
    expect(service).toBeTruthy();
  });
});
