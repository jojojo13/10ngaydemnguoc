import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpNotPassComponent } from './rp-not-pass.component';

describe('RpNotPassComponent', () => {
  let component: RpNotPassComponent;
  let fixture: ComponentFixture<RpNotPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpNotPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RpNotPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
