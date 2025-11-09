import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpBalanceComponent } from './top-up-balance.component';

describe('TopUpBalanceComponent', () => {
  let component: TopUpBalanceComponent;
  let fixture: ComponentFixture<TopUpBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopUpBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUpBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
