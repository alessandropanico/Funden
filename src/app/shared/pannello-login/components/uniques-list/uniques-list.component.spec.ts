import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquesListComponent } from './uniques-list.component';

describe('UniquesListComponent', () => {
  let component: UniquesListComponent;
  let fixture: ComponentFixture<UniquesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniquesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
