import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpOrganizationsComponent } from './pop-up-organizations.component';

describe('PopUpOrganizationsComponent', () => {
  let component: PopUpOrganizationsComponent;
  let fixture: ComponentFixture<PopUpOrganizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpOrganizationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
