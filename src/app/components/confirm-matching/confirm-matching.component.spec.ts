import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMatchingComponent } from './confirm-matching.component';

describe('ConfirmMatchingComponent', () => {
  let component: ConfirmMatchingComponent;
  let fixture: ComponentFixture<ConfirmMatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmMatchingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
