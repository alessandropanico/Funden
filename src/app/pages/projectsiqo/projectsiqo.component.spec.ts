import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsiqoComponent } from './projectsiqo.component';

describe('ProjectsiqoComponent', () => {
  let component: ProjectsiqoComponent;
  let fixture: ComponentFixture<ProjectsiqoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsiqoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsiqoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
