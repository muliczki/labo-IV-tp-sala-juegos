import { TestBed } from '@angular/core/testing';

import { ApipalabrasService } from './apipalabras.service';

describe('ApipalabrasService', () => {
  let service: ApipalabrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApipalabrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
