import { TestBed } from '@angular/core/testing';

import { LoginPrivatoService } from './login-privato.service';

describe('LoginPrivatoService', () => {
  let service: LoginPrivatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPrivatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
