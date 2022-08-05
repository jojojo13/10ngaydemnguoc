import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEmployeeComponent } from './popup-employee.component';

describe('PopupEmployeeComponent', () => {
  let component: PopupEmployeeComponent;
  let fixture: ComponentFixture<PopupEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
