import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxForCandidateComponent } from './combobox-for-candidate.component';

describe('ComboboxForCandidateComponent', () => {
  let component: ComboboxForCandidateComponent;
  let fixture: ComponentFixture<ComboboxForCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboboxForCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboboxForCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
