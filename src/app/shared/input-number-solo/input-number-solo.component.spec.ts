import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumberSoloComponent } from './input-number-solo.component';

describe('InputNumberSoloComponent', () => {
  let component: InputNumberSoloComponent;
  let fixture: ComponentFixture<InputNumberSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputNumberSoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputNumberSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
