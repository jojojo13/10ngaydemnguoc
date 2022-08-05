import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestInApplicationsComponent } from './request-in-applications.component';

describe('RequestInApplicationsComponent', () => {
  let component: RequestInApplicationsComponent;
  let fixture: ComponentFixture<RequestInApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestInApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestInApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
