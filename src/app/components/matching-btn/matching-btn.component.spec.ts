import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingBtnComponent } from './matching-btn.component';

describe('MatchingBtnComponent', () => {
  let component: MatchingBtnComponent;
  let fixture: ComponentFixture<MatchingBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchingBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchingBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
