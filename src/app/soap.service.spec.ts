import { TestBed } from '@angular/core/testing';

import { SoapService } from './soap.service';

describe('SoapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoapService = TestBed.get(SoapService);
    expect(service).toBeTruthy();
  });
});
