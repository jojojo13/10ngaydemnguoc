import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfCandidateComponent } from './general-inf-candidate.component';

describe('GeneralInfCandidateComponent', () => {
  let component: GeneralInfCandidateComponent;
  let fixture: ComponentFixture<GeneralInfCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInfCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInfCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
