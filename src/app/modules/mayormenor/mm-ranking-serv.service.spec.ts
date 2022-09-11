import { TestBed } from '@angular/core/testing';

import { MmRankingServService } from './mm-ranking-serv.service';

describe('MmRankingServService', () => {
  let service: MmRankingServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MmRankingServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
