import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrInchangeComponent } from './hr-inchange.component';

describe('HrInchangeComponent', () => {
  let component: HrInchangeComponent;
  let fixture: ComponentFixture<HrInchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrInchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrInchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
