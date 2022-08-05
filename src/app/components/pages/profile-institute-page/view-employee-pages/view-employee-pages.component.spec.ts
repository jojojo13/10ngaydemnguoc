import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeePagesComponent } from './view-employee-pages.component';

describe('ViewEmployeePagesComponent', () => {
  let component: ViewEmployeePagesComponent;
  let fixture: ComponentFixture<ViewEmployeePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmployeePagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmployeePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
