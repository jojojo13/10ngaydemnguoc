import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCategoriesPageComponent } from './system-categories-page.component';

describe('SystemCategoriesPageComponent', () => {
  let component: SystemCategoriesPageComponent;
  let fixture: ComponentFixture<SystemCategoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemCategoriesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
