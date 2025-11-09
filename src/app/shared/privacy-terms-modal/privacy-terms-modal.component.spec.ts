import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyTermsModalComponent } from './privacy-terms-modal.component';

describe('PrivacyTermsModalComponent', () => {
  let component: PrivacyTermsModalComponent;
  let fixture: ComponentFixture<PrivacyTermsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivacyTermsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyTermsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
