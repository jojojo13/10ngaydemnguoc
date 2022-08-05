import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationPoppupComponent } from './organization-poppup.component';

describe('OrganizationPoppupComponent', () => {
  let component: OrganizationPoppupComponent;
  let fixture: ComponentFixture<OrganizationPoppupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationPoppupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationPoppupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
