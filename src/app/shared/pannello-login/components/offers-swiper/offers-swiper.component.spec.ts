import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersSwiperComponent } from './offers-swiper.component';

describe('OffersSwiperComponent', () => {
  let component: OffersSwiperComponent;
  let fixture: ComponentFixture<OffersSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffersSwiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
