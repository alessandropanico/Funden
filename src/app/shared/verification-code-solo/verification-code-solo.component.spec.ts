import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationCodeSoloComponent } from './verification-code-solo.component';

describe('VerificationCodeSoloComponent', () => {
  let component: VerificationCodeSoloComponent;
  let fixture: ComponentFixture<VerificationCodeSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificationCodeSoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationCodeSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
