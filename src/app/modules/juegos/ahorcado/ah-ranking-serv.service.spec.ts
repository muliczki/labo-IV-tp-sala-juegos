import { TestBed } from '@angular/core/testing';

import { AhRankingServService } from './ah-ranking-serv.service';

describe('AhRankingServService', () => {
  let service: AhRankingServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AhRankingServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
