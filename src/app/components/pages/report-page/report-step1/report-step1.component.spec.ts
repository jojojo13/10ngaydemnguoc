import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStep1Component } from './report-step1.component';

describe('ReportStep1Component', () => {
  let component: ReportStep1Component;
  let fixture: ComponentFixture<ReportStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportStep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
