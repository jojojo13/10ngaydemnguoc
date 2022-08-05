import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectBtnComponent } from './reject-btn.component';

describe('RejectBtnComponent', () => {
  let component: RejectBtnComponent;
  let fixture: ComponentFixture<RejectBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
