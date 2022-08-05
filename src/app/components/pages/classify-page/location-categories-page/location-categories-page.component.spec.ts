import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCategoriesPageComponent } from './location-categories-page.component';

describe('LocationCategoriesPageComponent', () => {
  let component: LocationCategoriesPageComponent;
  let fixture: ComponentFixture<LocationCategoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationCategoriesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
