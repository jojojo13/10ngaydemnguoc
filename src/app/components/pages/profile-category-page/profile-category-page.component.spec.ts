import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCategoryPageComponent } from './profile-category-page.component';

describe('ProfileCategoryPageComponent', () => {
  let component: ProfileCategoryPageComponent;
  let fixture: ComponentFixture<ProfileCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCategoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
