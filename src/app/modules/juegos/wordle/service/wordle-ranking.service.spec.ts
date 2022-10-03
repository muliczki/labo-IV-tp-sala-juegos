import { TestBed } from '@angular/core/testing';

import { WordleRankingService } from './wordle-ranking.service';

describe('WordleRankingService', () => {
  let service: WordleRankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordleRankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
