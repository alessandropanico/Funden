import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviaCreditoComponent } from './invia-credito.component';

describe('InviaCreditoComponent', () => {
  let component: InviaCreditoComponent;
  let fixture: ComponentFixture<InviaCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviaCreditoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviaCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
