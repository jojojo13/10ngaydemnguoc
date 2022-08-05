import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyPageComponent } from './classify-page.component';

describe('ClassifyPageComponent', () => {
  let component: ClassifyPageComponent;
  let fixture: ComponentFixture<ClassifyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassifyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
