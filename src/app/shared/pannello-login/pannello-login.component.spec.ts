import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannelloLoginComponent } from './pannello-login.component';

describe('PannelloLoginComponent', () => {
  let component: PannelloLoginComponent;
  let fixture: ComponentFixture<PannelloLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PannelloLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PannelloLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
