import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderProjecDetailsComponent } from './slider-projec-details.component';

describe('SliderProjecDetailsComponent', () => {
  let component: SliderProjecDetailsComponent;
  let fixture: ComponentFixture<SliderProjecDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderProjecDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderProjecDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
