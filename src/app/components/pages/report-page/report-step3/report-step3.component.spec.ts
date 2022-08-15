import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStep3Component } from './report-step3.component';

describe('ReportStep3Component', () => {
  let component: ReportStep3Component;
  let fixture: ComponentFixture<ReportStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportStep3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
