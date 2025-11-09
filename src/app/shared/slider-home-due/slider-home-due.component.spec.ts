import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderHomeDueComponent } from './slider-home-due.component';

describe('SliderHomeDueComponent', () => {
  let component: SliderHomeDueComponent;
  let fixture: ComponentFixture<SliderHomeDueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderHomeDueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderHomeDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
