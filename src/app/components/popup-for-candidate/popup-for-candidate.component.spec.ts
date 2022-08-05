import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupForCandidateComponent } from './popup-for-candidate.component';

describe('PopupForCandidateComponent', () => {
  let component: PopupForCandidateComponent;
  let fixture: ComponentFixture<PopupForCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupForCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupForCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
