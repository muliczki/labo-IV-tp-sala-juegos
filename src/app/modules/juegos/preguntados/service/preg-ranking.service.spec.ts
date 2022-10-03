import { TestBed } from '@angular/core/testing';

import { PregRankingService } from './preg-ranking.service';

describe('PregRankingService', () => {
  let service: PregRankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregRankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
