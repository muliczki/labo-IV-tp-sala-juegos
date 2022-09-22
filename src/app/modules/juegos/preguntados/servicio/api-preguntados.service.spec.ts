import { TestBed } from '@angular/core/testing';

import { ApiPreguntadosService } from './api-preguntados.service';

describe('ApiPreguntadosService', () => {
  let service: ApiPreguntadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPreguntadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
