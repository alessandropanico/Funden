import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBuyPlanComponent } from './modal-buy-plan.component';

describe('ModalBuyPlanComponent', () => {
  let component: ModalBuyPlanComponent;
  let fixture: ComponentFixture<ModalBuyPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBuyPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBuyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
