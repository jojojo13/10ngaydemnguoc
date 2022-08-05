import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateInRequestComponent } from './candidate-in-request.component';

describe('CandidateInRequestComponent', () => {
  let component: CandidateInRequestComponent;
  let fixture: ComponentFixture<CandidateInRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateInRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateInRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
