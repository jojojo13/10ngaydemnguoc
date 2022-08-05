import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidatePageComponent } from './view-candidate-page.component';

describe('ViewCandidatePageComponent', () => {
  let component: ViewCandidatePageComponent;
  let fixture: ComponentFixture<ViewCandidatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCandidatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCandidatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
