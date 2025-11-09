import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinSoloComponent } from './pin-solo.component';

describe('PinSoloComponent', () => {
  let component: PinSoloComponent;
  let fixture: ComponentFixture<PinSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PinSoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
