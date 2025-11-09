import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessPinComponent } from './access-pin.component';

describe('AccessPinComponent', () => {
  let component: AccessPinComponent;
  let fixture: ComponentFixture<AccessPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessPinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
