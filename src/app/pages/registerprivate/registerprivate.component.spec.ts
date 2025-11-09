import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterprivateComponent } from './registerprivate.component';

describe('RegisterprivateComponent', () => {
  let component: RegisterprivateComponent;
  let fixture: ComponentFixture<RegisterprivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterprivateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterprivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
