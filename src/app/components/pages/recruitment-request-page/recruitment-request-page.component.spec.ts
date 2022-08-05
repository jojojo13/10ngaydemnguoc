import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentRequestPageComponent } from './recruitment-request-page.component';

describe('RecruitmentRequestPageComponent', () => {
  let component: RecruitmentRequestPageComponent;
  let fixture: ComponentFixture<RecruitmentRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitmentRequestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
