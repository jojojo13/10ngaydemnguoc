import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewACandidatePageComponent } from './view-a-candidate-page.component';

describe('ViewACandidatePageComponent', () => {
  let component: ViewACandidatePageComponent;
  let fixture: ComponentFixture<ViewACandidatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewACandidatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewACandidatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
