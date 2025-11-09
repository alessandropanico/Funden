import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverUsComponent } from './discover-us.component';

describe('DiscoverUsComponent', () => {
  let component: DiscoverUsComponent;
  let fixture: ComponentFixture<DiscoverUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscoverUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
