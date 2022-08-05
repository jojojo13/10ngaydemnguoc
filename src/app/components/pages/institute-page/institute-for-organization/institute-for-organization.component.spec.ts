import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteForOrganizationComponent } from './institute-for-organization.component';

describe('InstituteForOrganizationComponent', () => {
  let component: InstituteForOrganizationComponent;
  let fixture: ComponentFixture<InstituteForOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteForOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteForOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
