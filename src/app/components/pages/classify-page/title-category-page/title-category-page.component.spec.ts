import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCategoryPageComponent } from './title-category-page.component';

describe('TitleCategoryPageComponent', () => {
  let component: TitleCategoryPageComponent;
  let fixture: ComponentFixture<TitleCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleCategoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
