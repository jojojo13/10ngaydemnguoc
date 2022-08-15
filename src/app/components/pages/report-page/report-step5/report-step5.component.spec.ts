import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStep5Component } from './report-step5.component';

describe('ReportStep5Component', () => {
  let component: ReportStep5Component;
  let fixture: ComponentFixture<ReportStep5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportStep5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportStep5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
