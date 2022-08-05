import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvCandidateComponent } from './cv-candidate.component';

describe('CvCandidateComponent', () => {
  let component: CvCandidateComponent;
  let fixture: ComponentFixture<CvCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
