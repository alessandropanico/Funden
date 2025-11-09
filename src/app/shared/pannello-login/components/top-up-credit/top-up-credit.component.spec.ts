import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpCreditComponent } from './top-up-credit.component';

describe('TopUpCreditComponent', () => {
  let component: TopUpCreditComponent;
  let fixture: ComponentFixture<TopUpCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopUpCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUpCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
