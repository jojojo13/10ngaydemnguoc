import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionInOrgComponent } from './position-in-org.component';

describe('PositionInOrgComponent', () => {
  let component: PositionInOrgComponent;
  let fixture: ComponentFixture<PositionInOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionInOrgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionInOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
