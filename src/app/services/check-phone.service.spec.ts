import { TestBed } from '@angular/core/testing';

import { CheckPhoneService } from './check-phone.service';

describe('CheckPhoneService', () => {
  let service: CheckPhoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckPhoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
