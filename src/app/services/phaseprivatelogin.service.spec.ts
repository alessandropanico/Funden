import { TestBed } from '@angular/core/testing';

import { PhaseprivateloginService } from './phaseprivatelogin.service';

describe('PhaseprivateloginService', () => {
  let service: PhaseprivateloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhaseprivateloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
