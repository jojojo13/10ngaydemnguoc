import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionCategoiresPageComponent } from './position-categoires-page.component';

describe('PositionCategoiresPageComponent', () => {
  let component: PositionCategoiresPageComponent;
  let fixture: ComponentFixture<PositionCategoiresPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionCategoiresPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionCategoiresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
