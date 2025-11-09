import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginprivateComponent } from './loginprivate.component';

describe('LoginprivateComponent', () => {
  let component: LoginprivateComponent;
  let fixture: ComponentFixture<LoginprivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginprivateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginprivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
