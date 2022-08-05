import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCandidatePageComponent } from './create-candidate-page.component';

describe('CreateCandidatePageComponent', () => {
  let component: CreateCandidatePageComponent;
  let fixture: ComponentFixture<CreateCandidatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCandidatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCandidatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
