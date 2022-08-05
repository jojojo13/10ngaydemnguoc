import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInstitutePageComponent } from './profile-institute-page.component';

describe('ProfileInstitutePageComponent', () => {
  let component: ProfileInstitutePageComponent;
  let fixture: ComponentFixture<ProfileInstitutePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInstitutePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileInstitutePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
